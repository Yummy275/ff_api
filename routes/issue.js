const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issueController');
const { issueSanitize } = require('../helpers/sanitizers');

router.post('/new-issue', ...issueSanitize, issueController.createIssue);
router.get('/delete-issue/:issueId', issueController.deleteIssue);
router.post('/add-note/:issueId', issueController.addIssueNote);
router.post('/delete-note/:issueId', issueController.deleteIssueNote);

module.exports = router;
