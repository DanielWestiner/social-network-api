const { User, Thought } = require('../models');

module.exports = {

  // Get all users
  getAllUsers(req, res) {
    User.find({})
      .then(userData => res.json(userData))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.id })
      .select('-__v')
      .then(userData => res.json(userData))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err));
  },

  // updates a user
  updateUser(req, res) {
    User.findOneAndUpdate({_id: req.params.id}, req.body, {new:true})
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err));
  },

  // Delete a student and remove them from the course
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.id })
      .then((deletedUser) =>
        !deletedUser
          ? res.status(404).json({ message: 'No such user exists' })
          : res.json(deletedUser)
      )
  },

  // Add a friend
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
    .populate('friends')
      .then((userData) =>
        !userData
          ? res
              .status(404)
              .json({ message: 'No user found with that ID :(' })
          : res.json(userData)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Delete friend
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId  } },
      { runValidators: true, new: true }
    )
    .populate('friends')
      .then((userData) =>
        !userData
          ? res
              .status(404)
              .json({ message: 'No user found with that ID :(' })
          : res.json(userData)
      )
      .catch((err) => res.status(500).json(err));
  },
};
