const { BadRequest } = require("../errors/index");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;
  //console.log(username, password);
  if (!username || !password) {
    throw new BadRequest("please provide both username and password");
  }

  const id = new Date().getDate();
  console.log(id);
  const token = jwt.sign({ username, id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: `user created`, token });
};

const dashboard = async (req, res) => {
  console.log(req.user);
  const luckyNumber = Math.trunc(Math.random() * 100);
  res.status(200).json({
    msg: `hello ${req.user.username}`,
    secret: `here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
