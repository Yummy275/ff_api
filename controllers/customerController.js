const CustomerModel = require('../models/Customer');
const IssueModel = require('../models/Issue');
const {
    createCustomerSanitize,
    issuesSanitize,
} = require('../helpers/sanitizers');
const { validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');

exports.createNewCustomer = [
    ...createCustomerSanitize,
    (req, res) => {
        const errors = validationResult(req);

        // inputs did not pass validation
        if (!errors.isEmpty()) {
            console.log(errors);
            res.json({
                error: 'Check inputs',
            });
        }

        const customerId = uuidv4();
        const issueId = uuidv4();

        const customer = new CustomerModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            id: customerId,
            issues: [issueId],
        }).save((err) => {
            if (err) {
                return res.json({ error: err.message });
            }
            const initialIssue = new IssueModel({
                issue: req.body.issue,
                customerId: customerId,
                contract: 'TBD',
                id: issueId,
            }).save((err) => {
                if (err) {
                    return res.json({ error: err.message });
                }
                res.json({ message: 'Customer created' });
            });
        });
    },
];

exports.customerIssue = [
    ...issuesSanitize,
    (req, res) => {
        const errors = validationResult(req);

        // inputs did not pass validation
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.json({
                error: 'Check inputs',
            });
        }

        const issueId = uuidv4();

        const issue = new IssueModel({
            issue: req.body.issue,
            customerId: req.body.customerId,
            contract: 'TBD',
            id: issueId,
        }).save((err) => {
            if (err) {
                return res.json({ error: err.message });
            }
            const customer = CustomerModel.findOne(
                { id: req.body.customerId },
                (err, customer) => {
                    if (err) {
                        return res.json({ error: err.message });
                    }
                    customer
                        .updateOne({
                            $push: { issues: issueId },
                        })
                        .exec((err) => {
                            if (err)
                                res.json({
                                    error: 'Could not save issue to customer',
                                });
                            res.json({ message: 'New issue successful' });
                        });
                }
            );
        });
    },
];
