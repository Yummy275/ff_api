const IssueModel = require('../models/Issue');
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const Customer = require('../models/Customer');
const { createIssuePdf } = require('../helpers/createIssuePdf');

exports.createIssue = (req, res) => {
    const errors = validationResult(req);

    // inputs did not pass validation
    if (!errors.isEmpty()) {
        return res.json({
            error: 'Check inputs',
        });
    }

    const issueId = uuidv4();
    const newIssue = new IssueModel({
        issue: req.body.issue,
        customerId: req.body.customerId,
        contract: 'TBD',
        id: issueId,
    }).save((err) => {
        if (err) {
            return res.json({ error: err.message });
        }
        Customer.findOneAndUpdate(
            { id: req.body.customerId },
            { $push: { issues: issueId } }
        ).exec((err) => {
            if (err) {
                return res.json({ error: err.message });
            }
            createIssuePdf(req.body);
            res.json({ message: 'Customed issue created' });
        });
    });
};

exports.deleteIssue = (req, res) => {
    IssueModel.findOne({ id: req.params.issueId }).exec((err, issue) => {
        if (err || !issue) {
            return res.json({ error: 'Error finding issue' });
        }
        CustomerModel.findOneAndUpdate(
            { id: issue.customerId },
            { $pull: { issues: issue.id } }
        ).exec((err) => {
            if (err) {
                return res.json({ error: err.message });
            }
            issue.remove();
            return res.json({ message: 'Deleted issue' });
        });
    });
};

exports.addIssueNote = (req, res) => {
    const today = new Date().toLocaleDateString();
    const newNote = {
        note: req.body.note,
        date: today,
    };
    IssueModel.findOneAndUpdate(
        { id: req.params.issueId },
        { $push: { notes: newNote } }
    ).exec((err) => {
        if (err) return res.json({ error: err.message });
        res.json({ message: 'Added note' });
    });
};

exports.deleteIssueNote = (req, res) => {
    IssueModel.findOneAndUpdate(
        { id: req.params.issueId },
        { $pull: { notes: { note: req.body.note } } }
    ).exec((err) => {
        if (err) return res.json({ error: err.message });
        res.json({ message: 'Deleted note' });
    });
};
