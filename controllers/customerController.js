const CustomerModel = require('../models/Customer');
const IssueModel = require('../models/Issue');
const { createCustomerSanitize } = require('../helpers/sanitizers');
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
                error: 'Sorry, something went wrong siging up. Try again later.',
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
            const issue = new IssueModel({
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

exports.newIssue = [(req, res) => {}];
