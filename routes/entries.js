const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const entriesController = require("../controllers/entries");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const entries = require("../controllers/entries");

//Post Routes - simplified for now
router.get("/profile", ensureAuth, entriesController.getEntries);

router.post("/createEntry", entriesController.createEntry);

router.put("/favoriteEntry/:id", entriesController.favoriteEntry);

router.get("/getFavorites", entriesController.getFavorites);

// router.post("/createFeed", entriesController.createFeed)

router.delete("/deleteEntry/:id", entriesController.deleteEntry);

module.exports = router;

// MVC Method:
// The user makes a request
// The server.js receives it
// Figures out if it has a route for it
//  The request would be sent to one of the routes files
// The route will tell the server which path needs to be taken given the request
// The middleware will be run
// Once it runs the middleware will move the request to the next step or give an error if not fulfilled
// Then will decide what controller needs to be run to give the user a response
// Controller is just a way to separate the functions or callbacks that need to be run
// 