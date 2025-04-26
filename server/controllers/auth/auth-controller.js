const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");

//register

const register = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ userName, email, password });
    await newUser.save();
    res.status(200).json({
        success: true,
        message: "user created successfully",
    })
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "error occured" });
  }
};

//login

const login = async (req, res) => {
  try {
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "error occured" });
  }
};

//logout

//middleware
