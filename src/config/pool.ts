import Pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";
const connectionString = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;
const mainUrl = isProduction ? process.env.DATABASE_URL : connectionString

const Pool = new Pg.Pool({
  connectionString: mainUrl ,
  ssl: {
    rejectUnauthorized: false, //when deploying make to true for production
  },
});

Pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

export default Pool;
