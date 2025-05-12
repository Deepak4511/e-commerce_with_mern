const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");

//register

const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.json({
        success: false,
        message: "User already exists! Please Try another email",
      });
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ userName, email, password: hashPassword });
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registration successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "error occured",
    });
  }
};

//login

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "User not found! Please register",
      });

    const checkpasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkpasswordMatch)
      return res.json({
        success: false,
        message: "Password is incorrect! Please try again",
      });

      const token = jwt.sign(
        { id: checkUser._id, role: checkUser.role , email: checkUser.email },
        'CLIENT_SECRET_KEY', // process.env.JWT_SECRET,
        { expiresIn: "60m" }
        // process.env.JWT_SECRET,
        // { expiresIn: "1d" }
      );

      res.cookie("token", token, {httpOnly: true, secure: false}).json({
        success: true,
        message: "Login successfully",
        user: {
          id: checkUser._id,
          userName: checkUser.userName,
          email: checkUser.email,
          role: checkUser.role,
        },
      })

  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "error occured",
    });
  }
};

//logout


const logout = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      success: true,
      message: "Logout successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "error occured",
    });
  }
};

//middleware

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized - Token missing",
    });
  }

  try {
    const decoded = jwt.verify(token, 'CLIENT_SECRET_KEY'); // use process.env.JWT_SECRET in production
    req.user = decoded; // decoded contains id, role, email
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized - Invalid token",
    });
  }
};


module.exports = { registerUser, loginUser, logout, middleware };
