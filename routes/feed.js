const express = require("express");
const router = express.Router();
const FeedController = require("../controllers/feed");


// User Info Routes
router.post("/createFeed", FeedController.createFeed);

router.get("/getFeedEntries", FeedController.getFeedEntries);

router.put("/assignFeedEntries", FeedController.assignFeedEntries);



module.exports = router;