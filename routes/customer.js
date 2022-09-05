const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const issueController = require('../controllers/issueController');
const {
    createCustomerSanitize,
    issueSanitize,
} = require('../helpers/sanitizers');

router.post('/create', [
    ...createCustomerSanitize,
    customerController.createNewCustomer,
    ...issueSanitize,
    issueController.createIssue,
]);
router.post('/new-issue', ...issueSanitize, issueController.createIssue);
router.get('/delete-issue/:issueId', issueController.deleteIssue);

module.exports = router;
