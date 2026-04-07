const express = require("express");
const { getAllDocuments } = require("../controllers/docsController");

const router = express.Router();

router.get("/", getAllDocuments);

module.exports = router;
