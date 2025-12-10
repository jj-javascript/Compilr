// const cloudinary = require("../middleware/cloudinary");
const Entry = require("../models/Entries");
const cheerio = require('cheerio');
const getFavicons = require('node-get-favicons');
const Feed = require("../models/Feed")
const User = require("../models/User")

module.exports = {
  getEntries: async (req, res) => {
    try {
      const entries = await Entry.find({ createdByID: req.user._id }).sort({ createdAt: -1 });
      const userFeeds = await Feed.find({createdByID: req.user._id}).sort({name: 1})
      const userInfo = await User.find({_id: req.user._id})
      console.log(userInfo)
      // const entries = await Entry.find({
      //   createdAt: {$lt: lastEntryDate}
      // })
      // .sort({createdAt: -1})
      // .limit(limit);
     
      res.render("profile.ejs", { entries: entries, userFeeds: userFeeds, userInfo: userInfo, createdByID: req.user.id, url: req.body.url, title: req.body.title, description: req.body.description, favorited: false, feedName: 'main' })
      // console.log('mcburger', favoriteEntries)
    } catch (err) {
      console.log(err)
    }
  },
  getFavorites: async (req, res) => {
    try {
      const entries = await Entry.find({ favorited: true });
      const userFeeds = await Feed.find({createdByID: req.user._id}).sort({name: 1})
      const userInfo = await User.find({_id: req.user._id})
      // console.log(req.user._id)
      // console.log('delivery', entries)
      //       const pipeline = [
      //         {
      //           $match: {
      //             "Entry.favorited": true
      //           }
      //         }
      //       ];

      //       const changeStream = Entry.watch(pipeline);
      //       changeStream.on('change', (change) => {
      //         printjson(change);
      //       });
      // console.log('yesborg', pipeline)      
      res.render("profile.ejs", { entries: entries, userInfo: userInfo, createdByID: req.user.id, userFeeds: userFeeds, feedName: 'favorite' })
      console.log('mcburgered', entries)
      // What I need to figure out is how you can have something replace what's already rendered?
    } catch (err) {
      console.log(err)
    }
  },
  createEntry: async (req, res) => {
    try {
      // console.log(req.body)
      const metadata = await fetch(req.body.url)

      if (metadata) {
        const html = await metadata.text()
        // console.log('metadata', html)
        // Build document object from the HTML response
        var doc = cheerio.load(html);
        console.log({ doc })

        let faviconUrl = null;
        try {
          const favicons = await getFavicons(req.body.url);
          console.log('Favicons found:', favicons);

          if (favicons && favicons.length > 0) {
            const pngIcon = favicons.find(icon =>
              icon.imgType = 'image/png' &&
              icon.sizes &&
              parseInt(icon.sizes) >= 32
              );

              const appleIcon = favicons.find(icon => icon.type === 'apple-touch-icon');
              console.log('applio', appleIcon)
              const anyIcon = favicons.find(icon => icon.href);
              console.log('anymeal', anyIcon)
              const selectedIcon = pngIcon || appleIcon || anyIcon;
              faviconUrl = selectedIcon ? selectedIcon.href : null
              console.log('selectah', selectedIcon)
              console.log('favorito', faviconUrl)
          }
        } catch (faviconErr) {
          console.log('Favicon fetch failed:', faviconErr);
          const urlObj = new URL(req.body.url);
          faviconUrl = `${urlObj.origin}/favicon.ico`
        }

        var title = doc("head title")
        var meta = doc('meta[name="description"]')
        // var logo = doc('meta[type="image/png"]')
        // console.log('logo', logo)

        console.log('Selected favicon URL:', faviconUrl)
        console.log(title)
        await Entry.create({ createdByID: req.user.id, url: req.body.url, title: title.text(), description: meta.attr('content'), favorited: false, favicon: faviconUrl})
      }
      res.redirect("/profile")

    } catch (err) {
      console.log(err)
    }
  },
  deleteEntry: async (req, res) => {
    console.log(req.params)
    try {
      let entry = await Entry.findById({ _id: req.params.id });
      await entry.deleteOne({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile")
      console.log(err)
    }
  }, favoriteEntry: async (req, res) => {
    try {
      await Entry.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            favorited: req.body.favorited === 'false'
          },
        }, {
        sort: { _id: -1 },
      }
      );
      console.log("favorited!")
      res.send()
    } catch (err) {
      console.log(err);
    }
  },
  // createFeed: async (req, res) => {
  //   try {
  //     await Entry.
  //   }
  // }

  // getFeed,
  // createFeed,
  // shareContent,
  // updateFeed,
  // deleteFeed,


  // getProfile: async (req, res) => {
  //   try {
  //     const posts = await Post.find({ user: req.user.id });
  //     res.render("profile.ejs", { posts: posts, user: req.user });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  // getFeed: async (req, res) => {
  //   try {
  //     const posts = await Post.find().sort({ createdAt: "desc" }).lean();
  //     res.render("feed.ejs", { posts: posts });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  // getPost: async (req, res) => {
  //   try {
  //     const post = await Post.findById(req.params.id);
  //     res.render("post.ejs", { post: post, user: req.user });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  // createPost: async (req, res) => {
  //   try {
  //     // Upload image to cloudinary
  //     const result = await cloudinary.uploader.upload(req.file.path);

  //     await Post.create({
  //       title: req.body.title,
  //       image: result.secure_url,
  //       cloudinaryId: result.public_id,
  //       caption: req.body.caption,
  //       likes: 0,
  //       user: req.user.id,
  //     });
  //     console.log("Post has been added!");
  //     res.redirect("/profile");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  // likePost: async (req, res) => {
  //   try {
  //     await Post.findOneAndUpdate(
  //       { _id: req.params.id },
  //       {
  //         $inc: { likes: 1 },
  //       }
  //     );
  //     console.log("Likes +1");
  //     res.redirect(`/post/${req.params.id}`);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  // deletePost: async (req, res) => {
  //   try {
  //     // Find post by id
  //     let post = await Post.findById({ _id: req.params.id });

  //     // Delete image from cloudinary
  //     await cloudinary.uploader.destroy(post.cloudinaryId);
  //     // Delete post from db
  //     await Post.deleteOne({ _id: req.params.id });
  //     console.log("Deleted Post");
  //     res.redirect("/profile");
  //   } catch (err) {
  //     res.redirect("/profile");
  //   }
  // },
};
