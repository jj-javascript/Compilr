const Feed = require("../models/Feed");
const User = require("../models/User");

module.exports = {
  createFeed: async (req, res) => {

    await Feed.create({ createdByID: req.user.id, name: req.body.name, entries: [] })
    res.redirect("/profile")

  },

  assignFeedEntries: async (req, res) => {
   
      const feed  = await Feed.findById (req.body.feedID)
      if (!feed.entries.includes(req.body.entryID) ){
        feed.entries.push(req.body.entryID) 
        feed.save()
      }
      res.send()
    },
  

getFeedEntries: async (req, res) => {
const userFeeds = await Feed.find({createdByID: req.user._id}).sort({name: 1})
const feed = await Feed.findById (req.query.feedID).populate('entries').exec()
const userInfo = await User.find({_id: req.user._id})
res.render("profile.ejs", {entries: feed.entries, userInfo: userInfo, userFeeds: userFeeds, feedName: feed.name, createdByID: req.user.id, url: req.body.url, title: req.body.title, description: req.body.description, favorited: false  })
} 
}
