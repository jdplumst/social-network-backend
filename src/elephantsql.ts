import pg from "pg";

const connectionString = { connectionString: process.env.POSTGRES_URL };
export const pool = new pg.Pool(connectionString);
