const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); 
const authRouter = require("./routes/auth/auth-routes");
const adminProductRouter = require("./routes/admin/products-routes");

//create database connection
//create a seprate file for this and then import it here

mongoose
  .connect(
    "mongodb+srv://deepaksingh451181:byot81kdr8aDQRZs@cluster0.ec65i3c.mongodb.net/"
  )
  .then(() => console.log(" MongoDB Connected"))
  .catch((err) => console.log(err));

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "cache-control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRouter);
app.use("/api/admin/products", adminProductRouter);

app.listen(port, () => 
  console.log(`Server is running on port ${port}`));

