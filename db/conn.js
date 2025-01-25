import { MongoClient } from "mongodb";

const connURI = process.env.ATLAS_URI;
let options = {};
if (!connURI) {
	throw new Error("Invalid/Missing environment variable: ATLAS_URI");
}

const client = new MongoClient(connURI, options);
let conn, db;

try {
	conn = await client.connect();
} catch (error) {
	console.error(error);
}
db = conn.db(process.env.DB_NAME);

export default db;
