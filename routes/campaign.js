const express = require('express');

const campaignController = require('../controllers/campaign')


const router = express.Router();

router.get('/all', campaignController.getCampaigns);
router.get('/active', campaignController.getActiveCampaigns);
router.get('/closed', campaignController.getClosedCampaigns);


module.exports = router;
