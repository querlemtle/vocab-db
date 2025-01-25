import express from "express";
import { ObjectId } from "mongodb";
import db from "../db/conn.js";

const deleteVocab = express.Router();

// Delete a word card from the collection
deleteVocab.delete("/:id", async (req, res, next) => {
  if (!req.params.id) return;
  try {
		const query = { _id: new ObjectId(req.params.id) };
		const engVocabColl = db.collection("eng_vocab");
		const result = await engVocabColl.deleteOne(query);
		res.status(200).send(result);
	} catch (error) {
    res
			.status(500)
			.send(error.message);
  }
});

export default deleteVocab;
