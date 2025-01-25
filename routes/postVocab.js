import express from "express";
import db from "../db/conn.js";

const postVocab = express.Router();

// Add a new word card to the collection
postVocab.post("/", async (req, res, next) => {
  try {
    const engVocabColl = await db.collection("eng_vocab");
    const newWordDoc = {
			word: req.body.word,
			meaning: req.body.meaning,
			example: req.body.example,
		};
    const result = await engVocabColl.insertOne(newWordDoc);
    res.status(200).send({id: result.insertedId});
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default postVocab;
