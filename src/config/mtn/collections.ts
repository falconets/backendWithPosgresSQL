import axios from "axios";
import dotenv from "dotenv";
import { requestToPayArgs, requestToPayResponse } from "@types";

dotenv.config();

const Ocp_Apim_Subscription_Key_col = process.env.Ocp_Apim_Subscription_Key_col;
const X_Reference_Id_Col = process.env.X_Reference_Id_Col;
const apiKey_col = process.env.apiKey_col;
//const X_Target_Environment = process.env.X_Target_Environment;

const connection = axios.create({
  baseURL: "https://sandbox.momodeveloper.mtn.com/collection/",
  maxBodyLength: Infinity,
  headers: {
    "Ocp-Apim-Subscription-Key": Ocp_Apim_Subscription_Key_col,
  },
  httpsAgent: new (require("https").Agent)({ rejectUnauthorized: false }), //solve this before going live
});

let tokenCache: { token: string | null; expiresAt: number } | null = {
  token: null,
  expiresAt: 0,
};

const getToken = async (): Promise<string> => {
  if (tokenCache && tokenCache.expiresAt > Date.now()) {
    return tokenCache.token as string;
  }

  try {
    const response = await connection.post("token/", null, {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${X_Reference_Id_Col}:${apiKey_col}`
        ).toString("base64")}`,
      },
    });

    if (response.status === 200) {
      const expiresIn = response.data.expires_in || 3600; // Assuming the response contains `expires_in`
      tokenCache = {
        token: response.data.access_token,
        expiresAt: Date.now() + expiresIn * 1000 - 60000,
      };
      return tokenCache.token as string;
    } else {
      throw new Error(`Failed to get token: ${response.statusText}`);
    }
  } catch (error) {
    throw new Error("Failed to get token");
  }
};

/**
 * This operation is used to request a payment from a consumer (Payer).
 * The payer will be asked to authorize the payment. The transaction will be
 * executed once the payer has authorized the payment. The requesttopay will
 * be in status PENDING until the transaction is authorized or declined by
 * the payer or it is timed out by the system.
 * @param args of type requestToPayArgs
 * @returns true if request to pay was successful or false otherwise
 */
export const requestToPay = async (
  referenceId: string,
  args: requestToPayArgs
): Promise<boolean> => {
  const token = await getToken();

  console.log("referenceId:", referenceId);
  try {
    const data = JSON.stringify(args);
    const response = await connection.post("v1_0/requesttopay", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Reference-Id": referenceId,
        "Content-Type": "application/json",
        "X-Target-Environment": "sandbox",
      },
    });

    return response.status === 202;
  } catch (error) {
    throw new Error(`Failed to request to pay: ${error.message}`);
  }
};

/**
 * Verify the account holder's active status
 * @param msisdn party id (example: '255730808299')
 * @returns true if the account holder is active or false otherwise
 */
export const verifyAccountHolder = async (msisdn: string): Promise<boolean> => {
  const token = await getToken();
  try {
    const response = await connection.get(
      `v1_0/accountholder/msisdn/${msisdn}/active`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Target-Environment": "sandbox",
        },
      }
    );

    return response.status === 200;
  } catch (error) {
    console.error("Failed to verify:", error.message);
    return false;
  }
};

/**
 * This operation is used to get the status of a request to pay.
 * X-Reference-Id that was passed in the post is used as reference to the request
 * @param referenceId string that is passed when making a POST request to the endpoint /requesttopay  or POST request
 * @returns data of type requestToPayResponse if request to pay transaction was successful or an error message otherwise
 */
export const requestToPayTransaction = async (
  referenceId: string
): Promise<requestToPayResponse> => {
  const token = await getToken();
  try {
    const response = await connection.get(`v1_0/requesttopay/${referenceId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Target-Environment": "sandbox",
      },
    });

    if (response.status === 200) {
      console.log("Transaction status successful:", response.data);
      return response.data as requestToPayResponse;
    } else {
      throw new Error(
        `Failed to request to pay transaction: ${response.statusText}`
      );
    }
  } catch (error) {
    throw new Error(`Failed to request to pay transaction: ${error.message}`);
  }
};
