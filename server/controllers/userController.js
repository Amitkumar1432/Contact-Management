import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import User from

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered");
  }

  //hash passsword
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(`hashed password ${hashedPassword}`);

  const user = await User.create({ username, email, password: hashedPassword });

  if (user) {
    res.status(201).json({
      _id: user.id,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }

  res.json({ message: "Register a user" });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  //finding for the existance of user
  const user = await User.findOne({ email });
  if (!user) {
    res.status(403);
    throw new Error("Invalid user name");
  }
  //compare password if user exists
  const compare = await bcrypt.compare(password, user.password);
  if (compare) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    res.status(200).json(accessToken);
  }
  else{
    res.status(403);
    throw new Error("Invalid password");
}
});

const currentUser = asyncHandler(async (req, res) => {
    
  res.json({ message: "current user info" });
});

export { registerUser, loginUser, currentUser };
