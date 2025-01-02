const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let sentimentAnalysisSchema = new Schema({
  entryID: { type: mongoose.Schema.Types.ObjectId, ref: "JournalEntry" },
  sentimentScore: { type: Number },
  analysisDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SentimentAnalysis", sentimentAnalysisSchema);
