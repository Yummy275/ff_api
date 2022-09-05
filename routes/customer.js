const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.post('/create', customerController.createNewCustomer);
router.post('/new-issue', customerController.customerIssue);
router.get('/delete-issue/:issueId', customerController.deleteIssue);

module.exports = router;
