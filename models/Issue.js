const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IssueSchema = new Schema({
    issue: { type: String, required: true },
    date: { type: Date, required: true },
    customerId: { type: String, required: true },
    notes: { type: Array, default: [] },
    contract: { type: String, default: 'contract' },
});

module.exports = mongoose.model('Issue', IssueSchema);
