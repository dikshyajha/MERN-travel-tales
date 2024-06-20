const Post = require("./schema");
const fs = require("fs");

const CreatePost = async (req, res) => {
  const { originalname, path } = req.file;

  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { title, description } = req.body;
  // console.log(req.user.id);

  const createPost = await Post.create({
    title,
    description,
    image: newPath,
    author: req.user._id,
  });

  res.status(201).json({ createPost });
};

const GetPost = async (req, res) => {
  const getpost = await Post.find().populate("author", ["username"]);
  res.status(201).json({ getpost });
};

const getSinglePost = async (req, res) => {
  const { id: singlePostId } = req.params;
  const singlePost = await Post.find({ _id: singlePostId }).populate("author", [
    "username",
  ]);

  res.status(201).send({ singlePost });
};

const getUserPosts = async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const userPosts = await Post.find({ author: id }).populate("author", [
      "username",
    ]);
    res.status(200).json({ userPosts });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }

  // const authorId = "66710d963c6947d43d8421a5"; // Example author ID
  // const posts = await Post.find({ author: authorId }).populate("author", [
  //   "username",
  // ]);
  // console.log(posts);

  // try {
  //   const { authorId } = req.params;
  //   console.log("Author ID:", authorId); // Debugging
  //   const userPosts = await Post.find({ author: authorId }).populate("author", [
  //     "username",
  //   ]);
  //   console.log("User Posts:", userPosts); // Debugging
  //   res.status(200).json({ userPosts });
  // } catch (error) {
  //   console.error("Error fetching posts:", error); // Debugging
  //   res.status(500).json({ message: "Error fetching posts", error });
  // }
};

const editPost = async (req, res) => {
  let newPath = null;

  if (req.file) {
    const { originalname, path } = req.file;

    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  const { id: editPostId } = req.params;
  const { description, title, _id } = req.body;

  const editPost = await Post.findById({ _id: editPostId });

  const isAuthor =
    JSON.stringify(editPost?.author._id) === JSON.stringify(req.user.ID);

  if (!isAuthor) {
    return res.status(500).json({
      message: "You are not the author of this post.",
    });
  }

  await editPost.update({
    title,
    description,
    image: newPath ? newPath : editPost.image,
  });

  res.status(201).send({ editPost });
};

const deletePost = async (req, res) => {
  const { id: deletePost } = req.params;

  const userCheck = await Post.findById({ _id: deletePost });

  const isAuthor =
    JSON.stringify(userCheck?.author?._id) === JSON.stringify(req?.user?.ID);

  if (!isAuthor) {
    return res.status(500).json({
      message: "You are not the author of this post.",
    });
  }

  await userCheck.delete();

  res.status(200).json({ userCheck });
};

module.exports = {
  CreatePost,
  GetPost,
  getSinglePost,
  editPost,
  deletePost,
  getUserPosts,
};