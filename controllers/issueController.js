const IssueModel = require('../models/Issue');
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const { issueSanitize } = require('../helpers/sanitizers');
const Customer = require('../models/Customer');

exports.createIssue = (req, res) => {
    const errors = validationResult(req);

    // inputs did not pass validation
    if (!errors.isEmpty()) {
        return res.json({
            error: 'Check inputs',
        });
    }

    const issueId = uuidv4();
    const initialIssue = new IssueModel({
        issue: req.body.issue,
        customerId: req.body.issueCustomerId,
        contract: 'TBD',
        id: issueId,
    }).save((err) => {
        if (err) {
            return res.json({ error: err.message });
        }
        Customer.findOneAndUpdate(
            { id: req.body.issueCustomerId },
            { $push: { issues: issueId } }
        ).exec((err) => {
            if (err) {
                return res.json({ error: err.message });
            }
            res.json({ message: 'Customed issue created' });
        });
    });
};

exports.deleteIssue = (req, res) => {
    IssueModel.findOne({ id: req.params.issueId }).exec((err, issue) => {
        if (err || !issue) {
            return res.json({ error: 'Error finding issue' });
        }
        CustomerModel.findOne({ id: issue.customerId }).exec(
            (err, customer) => {
                if (err) {
                    return res.json({ error: err.message });
                }
                customer
                    .updateOne({ $pull: { issues: issue.id } })
                    .exec((err) => {
                        if (err) {
                            return res.json({ error: err.message });
                        }
                        issue.remove();
                        return res.json({ message: 'Deleted issue' });
                    });
            }
        );
    });
};
