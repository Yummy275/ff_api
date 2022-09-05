const { body } = require('express-validator');

exports.createCustomerSanitize = [
    body('firstName')
        .trim()
        .isLength({ min: 1, max: 50 })
        .withMessage('First name must be less than 50 characters')
        .isAlpha()
        .withMessage('Name must be letters.'),
    body('lastName')
        .trim()
        .isLength({ min: 1, max: 50 })
        .withMessage('First name must be less than 50 characters')
        .isAlpha()
        .withMessage('Name must be letters.'),
    body('email').isEmail().normalizeEmail(),
    body('phone').isMobilePhone(),
    body('street').trim().isLength({ max: 120 }).toLowerCase(),
    body('city').trim().isLength({ max: 50 }).toLowerCase(),
    body('state').trim().isLength({ max: 2 }),
    body('zip').isPostalCode('any'),
];

exports.issueSanitize = [
    body('issue')
        .trim()
        .isLength({ min: 1, max: 1000 })
        .withMessage('Issue must be less than 1000 characters'),
];
