const CustomerModel = require('../models/Customer');
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
        const issue = req.body.issue;
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
            issues: [issue],
        }).save((err) => {
            if (err)
                return res.json({
                    error: 'Error creating customer',
                });
            res.json({ message: 'Customer created' });
        });
    },
];
