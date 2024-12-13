const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const journalEntrySchema = new Schema({
  userID: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const JournalEntry = mongoose.model('JournalEntry', journalEntrySchema);

module.exports = { JournalEntry };
