const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (updatedUsers) {
    this.users = updatedUsers;
  },
};
const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are necessary" });
  console.log(usersDB);
  const foundUser = usersDB.users.find((person) => person.username === user);
  if (!foundUser) return res.status(401).json({ message: "users not found" });
  // evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    // create JWT
    res.json({ success: `User ${user} is logged in!` });
  } else {
    res.sendStatus(401).json({ message: "user password is wrong" });
  }
};

module.exports = { handleLogin };
