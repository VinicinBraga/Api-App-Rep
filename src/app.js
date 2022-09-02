const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
require("dotenv").config();

const PORT = process.env.PORT;
const PostModel = require("./models/Posts");

app.get("/", (req, res) => res.send("Hello World!"));

app.post("/create_post", async (req, res) => {
  try {
    const { title, description, content } = req.body;
    const post = await PostModel.create({ title, description, content });
    res.send({ post });
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/list_posts", async (req, res) => {
  try {
    const posts = await PostModel.find({});
    console.log(posts);
    res.send({ posts });
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/show_posts/:post_id", async (req, res) => {
  try {
    const postId = req.params.post_id;

    const post = await PostModel.findById(postId);
    res.send({ post });
  } catch (error) {
    res.status(400).send(error);
  }
});

app.patch("/update_post/:post_id", async (req, res) => {
  try {
    const postId = req.params.post_id;
    const { title, description, content } = req.body;
    const post = await PostModel.findByIdAndUpdate(
      postId,
      {
        title,
        description,
        content,
      },
      { new: true }
    );

    res.send({ post });
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete("/delete_post/:post_id", async (req, res) => {
  try {
    const postId = req.params.post_id;

    await PostModel.findByIdAndDelete(postId);
    res.send({
      msg: `successfully deleted`,
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
