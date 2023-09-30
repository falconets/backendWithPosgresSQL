import { CompanyProps } from "../type";

/**
 * this function return a list of all available company companies 
 * in our database
 * @returns list of companies
 */
const allCompanies = () => {
  return "SELECT * FROM bus_company;";
};


/**
 * This function register a company in the database
 * @param s company props data type
 * @returns the company details
 */
const registerCompany = (s: CompanyProps) => {
  return `INSERT INTO bus_company (company_name, "phone_number", "email", "physical_address", 
            province, "bank_details") VALUES  
      ('${s.company_name}', '${s.phone_number}','${s.email}', '${s.physical_address}', '${s.province}'
      , '${s.bank_details}') RETURNING *;`;
};

export default {
  allCompanies,
  registerCompany,
};
