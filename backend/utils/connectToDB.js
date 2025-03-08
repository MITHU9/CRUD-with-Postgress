import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const requiredFields = [
  "PG_USER",
  "PG_HOST",
  "PG_PASSWORD",
  "PG_DATABASE",
  "PG_PORT",
];

const missingFields = requiredFields.filter((field) => !process.env[field]);

if (missingFields.length) {
  throw new Error(
    `Missing required environment variables: ${missingFields.join(", ")}`
  );
}

const db = new pg.Pool({
  // user: process.env.PG_USER,
  // host: process.env.PG_HOST,
  // password: process.env.PG_PASSWORD,
  // database: process.env.PG_DATABASE,
  // port: process.env.PG_PORT,
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

db.connect()
  .then(() => console.log("Connected to the database"))
  .catch((err) => {
    console.error("Failed to connect to the database", err);
    process.exit(1);
  });

db.on("error", (err) => {
  console.error("Unexpected error on the database connection", err);
  process.exit(1);
});

export const query = (text, params) => db.query(text, params);
