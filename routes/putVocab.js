import express from "express";
import { ObjectId } from "mongodb";
import db from "../db/conn.js";

const putVocab = express.Router();

// Update a word card from the collection
putVocab.put("/:id", async (req, res, next) => {
	if (!req.params.id) return;
	try {
		const query = { _id: new ObjectId(req.params.id) };
		const updatedWordCard = {
			word: req.body.word,
			meaning: req.body.meaning,
			example: req.body.example,
		};
		let engVocabColl = await db.collection("eng_vocab");
		let result = await engVocabColl.replaceOne(query, updatedWordCard);
		res.status(200).send(result);
	} catch (error) {
		res
			.status(500)
			.send("Error: Fail to update the word card.");
	}
});

export default putVocab;
