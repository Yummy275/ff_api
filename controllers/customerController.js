const CustomerModel = require('../models/Customer');
const { validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');

exports.createNewCustomer = (req, res, next) => {
    const errors = validationResult(req);
    console.log(`Creating customer ${req.body.firstName} ${req.body.lastName}`);
    // if inputs did not pass validation
    if (!errors.isEmpty()) {
        console.log(errors);
        res.json({
            error: 'Check inputs',
        });
    }

    const customerId = uuidv4();

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
    }).save((err) => {
        if (err) {
            return res.json({ error: err.message });
        }
        if (req.body.issue) {
            //issue creation
            req.body.customerId = customerId;
            next();
        } else {
            res.json({ message: 'Created customer' });
        }
    });
};

exports.getCustomers = (req, res) => {
    CustomerModel.find({}).exec((err, customers) => {
        res.send(customers);
    });
};
