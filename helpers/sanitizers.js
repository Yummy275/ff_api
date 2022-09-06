const { body } = require('express-validator');

exports.createCustomerSanitize = [
    body('firstName')
        .trim()
        .isLength({ min: 1, max: 50 })
        .withMessage('First name must be less than 50 characters'),
    body('lastName')
        .trim()
        .isLength({ min: 1, max: 50 })
        .withMessage('First name must be less than 50 characters'),
    body('email').isEmail().normalizeEmail(),
    body('phone').matches(/^(\(\d{3}\)|\d{3})-?\d{3}-?\d{4}$/),
    body('street').trim().isLength({ max: 120 }).toLowerCase(),
    body('city').trim().isLength({ max: 50 }).toLowerCase(),
    body('state').trim().isLength({ max: 50 }),
    body('zip').isLength({ max: 50 }),
];

exports.issueSanitize = [
    body('issue')
        .trim()
        .isLength({ min: 1, max: 1000 })
        .withMessage('Issue must be less than 1000 characters'),
];
