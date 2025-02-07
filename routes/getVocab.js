import express from "express";
import db from "../db/conn.js";

const pageSize = 30;
const getVocab = express.Router();

// Get paginated vocabulary results
getVocab.get("/", async (req, res, next) => {
	const page = Number(req.query.page || 1);
	const pipeline = [
		{
			$facet: {
				// Fetch the paginated results
				paginatedResults: [
					{ $skip: pageSize * (page - 1) },
					{ $limit: pageSize },
					{ $unset: "_id" },
				],
				// Count total documents
				totalCount: [{ $count: "total" }],
			},
		},
	];

	try {
		const engVocabColl = await db.collection("eng_vocab");
		const result = await engVocabColl.aggregate(pipeline).toArray();
		res.status(200).json({
			data: result[0].paginatedResults,
			pager: {
				totalCount: result[0].totalCount[0].total,
				page,
				pageSize
			},
		});
	} catch (error) {
		res.status(500).send(error.message);
	}
});

export default getVocab;
