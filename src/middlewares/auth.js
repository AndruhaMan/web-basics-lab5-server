const jwt = require('jsonwebtoken');
const User = require('../User');

module.exports = async function (req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.json({ message: "Please, enter token" });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id);

    if (!user) {
      throw new Error();
    }

    req.user = user;
  } catch (e) {
    return res.json({ message: "Not authorized" });
  }
  next();
}
