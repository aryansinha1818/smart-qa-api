const Document = require("../models/Document");

const getAllDocuments = async (req, res, next) => {
  try {
    const documents = await Document.find({}).select("-__v");
    res.json({
      count: documents.length,
      documents,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllDocuments };
