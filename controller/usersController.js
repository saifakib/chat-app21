const bcrypt = require('bcrypt')
const { User } = require('../models')
const { unlink } = require('fs')
const path = require('path')


// get users page
async function getUsers(req, res, next) {
    try {
        const users = await User.find();
        res.render("users", {
            users: users,
        });
    } catch (err) {
        next(err);
    }
}

// add user
const addUser = async (req, res, next) => {
    let newUser;
    let hashPassword = await bcrypt.hash(req.body.password, 10);

    if (req.files && req.files.length > 0) {
        newUser = new User({
            ...req.body,
            avatar: req.files[0].filename,
            password: hashPassword,
        });
    } else {
        newUser = new User({
            ...req.body,
            password: hashPassword,
        });
    }

    // save user
    try {
        const user = newUser.save();
        res.status(200).json({
            message: "User Created Successfuly"
        })
    } catch (err) {
        res.status(500).json({
            common: {
                errors: {
                    msg: "Unkwoun error occured !"
                }
            }
        })
    }
}

// remove user
async function removeUser(req, res, next) {
    try {
      const user = await User.findByIdAndDelete({
        _id: req.params.id,
      });

      // remove user avatar if any
      if (user.avatar) {
        unlink(
          path.join(__dirname, `/../public/uploads/avatars/${user.avatar}`),
          (err) => {
            if (err) console.log(err);
          }
        );
      }
  
      res.status(200).json({
        message: "User was removed successfully!",
      });
    } catch (err) {
      res.status(500).json({
        errors: {
          common: {
            msg: "Could not delete the user!",
          },
        },
      });
    }
  }

module.exports = {
    getUsers,
    addUser,
    removeUser
};