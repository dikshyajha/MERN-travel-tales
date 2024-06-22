const schema = require("./schema");
const fs = require("fs");
const create = async (req, res) => {
  const { originalname, path } = req.file;

  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { title, description } = req.body;
  // console.log(req.user.id);

  const createPost = await schema.create({
    title,
    description,
    image: newPath,
    author: req.user._id,
  });

  res.status(201).json({ createPost });
};

const getAll = async (req, res) => {
  const getpost = await schema.find().populate("author", ["username"]).sort({ createdAt : -1});
  res.status(201).json({ getpost });
};

const getById = async (req, res) => {
  const { id: singlePostId } = req.params;
  const singlePost = await schema.findById(singlePostId).populate("author", [
    "username",
  ]);

  res.status(201).send({ singlePost });
};

const getUserPosts = async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const userPosts = await schema.find({ author: id }).populate("author", [
      "username",
    ]);
    res.status(200).json({ userPosts });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
};

const getMyPosts = async (req, res) => {
  try {
    const userPosts = await schema.find({ author: req.user._id, }).populate("author", [
      "username",
    ]);
    res.status(200).json({ userPosts });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
};

const update = async (req, res) => {
  let newPath = null;

  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  const { id: editPostId } = req.params;
  const { description, title } = req.body;

  const editPost = await schema.findById(editPostId);

  if (!editPost) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  const isAuthor = JSON.stringify(editPost.author._id) === JSON.stringify(req.user.id);

  if (!isAuthor) {
    return res.status(403).json({
      message: "You are not the author of this post.",
    });
  }

  editPost.title = title;
  editPost.description = description;
  if (newPath) {
    editPost.image = newPath;
  }

  await editPost.save();

  res.status(200).send({ editPost });
};

const remove = async (req, res) => {
  const { id: deletePost } = req.params;

  const userCheck = await schema.findById({ _id: deletePost });

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
  create,
  getAll,
  getById,
  update,
  remove,
  getUserPosts,
  getMyPosts
};