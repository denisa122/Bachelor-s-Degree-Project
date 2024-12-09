const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let journalEntrySchema = new Schema({
    userID: {type: String},
    content: {type: String, required: true},
    timestamp: {type: Date, default: Date.now}
});

module.exports = mongoose.model('JournalEntry', journalEntrySchema);