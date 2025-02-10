import express from "express";
import "./loadEnv.js";
import getVocab from "./routes/getVocab.js";
import postVocab from "./routes/postVocab.js";
import putVocab from "./routes/putVocab.js";
import deleteVocab from "./routes/deleteVocab.js";

const PORT = process.env.PORT || 5050;
const FEURL = process.env.FE_URL;
const app = express();

// Manage CORS
app.use(function (req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", FEURL);
	res.setHeader("Access-Control-Allow-Methods", FEURL);
	res.setHeader("Access-Control-Allow-Headers", FEURL);
	next();
});

// Parses incoming requests with JSON payloads
app.use(express.json());

app.use("/", getVocab);
app.use("/", postVocab);
app.use("/", putVocab);
app.use("/", deleteVocab);

// Handle errors
app.use((err, req, res, next) => {
	res.status(500).send("Something went wrong!");
});

app.listen(PORT, () => {
	console.log(`> Server is ready!`);
});
