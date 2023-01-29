import pg from "pg";

const connectionString = { connectionString: process.env.POSTGRES_URL };
export const pool = new pg.Pool(connectionString);
// client.connect((err) => {
//   if (err) {
//     return console.error("could not connect to postgres", err);
//   }
//   client.query('SELECT NOW() AS "theTime"', (err, result) => {
//     if (err) {
//       return console.error("error running query", err);
//     }
//     console.log(result.rows[0].theTime);
//     client.end();
//   });
// });
