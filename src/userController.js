const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./User.js');

function generateJwt(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
}

class Controller {
  async signup(req, res) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.json({ message: "Please, enter username and password" });
      }

      const newUser = {
        ...req.body,
        password: await bcrypt.hash(password, 5),
        isAdmin: false,
      }

      const createdUser = await User.create(newUser);
      const token = generateJwt({ id: createdUser.id });
      res.json({ token });
    } catch (error) {
      res.json({ message: "Cannot create" });
    }
  }

  async login(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.json({ message: "Please, enter username and password" });
    }

    const foundUser = await User.findOne({ username, })

    if (!foundUser) {
      return res.json({ message: "User does not exist" });
    }

    if (await bcrypt.compare(password, foundUser.password)) {
      const token = generateJwt({ id: foundUser.id });
      return res.json({ token: token });
    }

    return res.json({ message: "Wrong password" });
  }

  async get(req, res) {
    if (req.user.isAdmin) {
      res.json({ users: await User.find() });
      return;
    }

    res.json({ users: [req.user] });
  }

  async delete(req, res) {
    try {
      if (req.user.id === req.params.userId || req.user.isAdmin) {
        await User.deleteOne({ _id: req.params.userId });
        res.json({ status: 'Deleted' });
      } else {
        throw new Error();
      }
    } catch (e) {
      res.json({ message: 'Unable to delete' });
    }
  }

  async update(req, res) {
    try {
      if (req.user.id === req.params.userId || req.user.isAdmin) {
        await User.updateOne({ _id: req.params.userId }, {
          ...req.body,
          password: await bcrypt.hash(req.body.password, 5),
        });
        res.json({ status: 'Updated' });
      } else {
        throw new Error();
      }
    } catch (e) {
      console.log(e)
      res.json({ message: 'Unable to update' });
    }
  }
}

module.exports = new Controller();