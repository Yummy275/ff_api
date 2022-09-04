const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IssueSchema = new Schema({
    id: { type: String, required: true },
    issue: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
    customerId: { type: String, required: true },
    notes: { type: Array, default: [] },
    contract: { type: String, default: 'contract', required: true },
});

module.exports = mongoose.model('Issue', IssueSchema);
