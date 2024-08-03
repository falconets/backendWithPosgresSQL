import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import { transferArgs } from "@types";

dotenv.config();

const Ocp_Apim_Subscription_Key_dis = process.env.Ocp_Apim_Subscription_Key_dis;
const X_Reference_Id_dis = process.env.X_Reference_Id_dis;
const apiKey_dis = process.env.apiKey_dis;
const X_Target_Environment = process.env.X_Target_Environment;

const connection = axios.create({
  baseURL: "https://sandbox.momodeveloper.mtn.com/disbursement/",
  maxBodyLength: Infinity,
  headers: {
    "Ocp-Apim-Subscription-Key": Ocp_Apim_Subscription_Key_dis,
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
          `${X_Reference_Id_dis}:${apiKey_dis}`
        ).toString("base64")}`,
      },
    });

    if (response.status === 200) {
      const expiresIn = response.data.expires_in || 3600;
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

export const transfer = async (args: transferArgs) => {
  const token = await getToken();
  const referenceId = uuidv4();

  console.log("referenceId:", referenceId);
  try {
    const data = JSON.stringify(args);
    console.log("args:", data);

    const response = await connection.post("v1_0/transfer", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Reference-Id": referenceId,
        "Content-Type": "application/json",
        "X-Target-Environment": X_Target_Environment,
      },
    });

    if (response.status === 202) {
      console.log("Request to pay successful:", response.status);
    } else {
      throw new Error(`Failed to request to pay: ${response.statusText}`);
    }
  } catch (error) {
    throw new Error(`Failed to request to pay: ${error.message}`);
  }
};

export const checkTransferStatus = async (referenceId: string) => {
  try {
    const token = await getToken();
    const response = await connection.get(`v1_0/transfer/${referenceId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Target-Environment": X_Target_Environment,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(
        `Failed to request to pay transaction: ${response.statusText}`
      );
    }
  } catch (error) {
    throw new Error(`Failed to check transfer status: ${error.message}`);
  }
};

export const validateAccountStatus = async (msisdn: string) => {
  try {
    const token = await getToken();
    const response = await connection.get(
      `v1_0/accountholder/msisdn/${msisdn}/active`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Target-Environment": X_Target_Environment,
        },
      }
    );

    if (response.status === 200) {
      console.log("Verification successful:", response.status);
      return response.data;
    } else {
      throw new Error(`Failed to verify: ${response.statusText}`);
    }
  } catch (error) {
    throw new Error(`Failed to validate account status: ${error.message}`);
  }
};
