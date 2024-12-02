const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");
router.post('/identify',contactController.identifyContact);
router.get('/search',contactController.searchContact)
module.exports = router;