const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const issueController = require('../controllers/issueController');
const {
    createCustomerSanitize,
    issueSanitize,
} = require('../helpers/sanitizers');

router.get('/get-list', customerController.getCustomers);
router.post('/create', [
    ...createCustomerSanitize,
    customerController.createNewCustomer,
    ...issueSanitize,
    issueController.createIssue,
]);

module.exports = router;
