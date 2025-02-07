import express from "express";
import "./loadEnv.js";
import getVocab from "./routes/getVocab.js";
import postVocab from "./routes/postVocab.js";
import putVocab from "./routes/putVocab.js";
import deleteVocab from "./routes/deleteVocab.js";

const PORT = process.env.PORT || 5050;
const app = express();
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
