const schema = require("./schema");
const fs = require("fs");

const savePost = async (req, res) => {
  const { postId } = req.body;
  const userId = req.user._id;

  
try {
  const existingSavedPost = await schema.findOne({ userId, postId})
  if(existingSavedPost){
    return res.status(400).json({ message: 'post already saved'})
  }
      const savedPost = new schema({
          userId,
          postId
      });

      await savedPost.save();
      res.status(201).json({ message: 'Post saved successfully' });
  } catch (error) {
      res.status(500).json({ error: 'Error saving post', message: error.message });
  }
};


const getSavedPosts = async (req, res) => {
  const userId = req.user._id; // Assuming req.user has the authenticated user's ID

  try {
      const savedPosts = await schema.find({ userId }).populate('postId');
      res.status(200).json(savedPosts);
  } catch (error) {
      res.status(500).json({ error: 'Error fetching saved posts', message: error.message });
  }
};


const removeSavedPost = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user._id; // Assuming req.user has the authenticated user's ID

  try {
      const result = await schema.deleteOne({ userId, postId });
      res.status(200).json({ message: 'Post removed from saved' });
  } catch (error) {
      res.status(500).json({ error: 'Error removing saved post', message: error.message });
  }
};


module.exports = {
  savePost,
  getSavedPosts,
  removeSavedPost
};
