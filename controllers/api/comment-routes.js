const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", (req, res) => {
  Comment.findAll({})
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.get("/:id", (req, res) => {
  Comment.findAll({
    where: {
      post_id: req.params.id,
    },
  })
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.post("/", withAuth, (req, res) => {
  // check the session
  if (req.session) {
    Comment.create({
      comment_body: req.body.comment_body,
      post_id: req.body.post_id,
      // use the id from the session
      user_id: req.session.user_id,
    })
      .then((dbCommentData) => res.json(dbCommentData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

router.delete("/:id", (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCommentData) => {
      if (!dbCommentData) {
        res
          .status(404)
          .json({ message: "No comment data has been found with this ID" });
        return;
      }
      res.json(dbCommentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
