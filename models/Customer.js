const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    issues: [{ type: Schema.Types.ObjectId, ref: 'Issue' }],
});

module.exports = mongoose.model('Customer', CustomerSchema);
