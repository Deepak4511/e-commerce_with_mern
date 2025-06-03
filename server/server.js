// Import required modules
const cookieParser = require("cookie-parser"); // For parsing cookies from incoming requests
const express = require("express"); // Express framework for building the server
const mongoose = require("mongoose"); // Mongoose library to interact with MongoDB
const cors = require("cors"); // Middleware to enable Cross-Origin Resource Sharing (CORS)

// Import route handlers from separate route files
const authRouter = require("./routes/auth/auth-routes");
const adminProductRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require('./routes/admin/order-routes')

const shopProductsRouter = require('./routes/shop/products-routes');
const shopCartRouter = require('./routes/shop/cart-routes');
const shopAddressRouter = require('./routes/shop/address-routes');
const shopOrderRouter = require('./routes/shop/order-routes');
const shopSearchRouter = require('./routes/shop/search-routes')



// ------------------- DATABASE CONNECTION -------------------
// You can move this to a separate file like db.js for better structure
mongoose
  .connect(
    "mongodb+srv://deepaksingh451181:byot81kdr8aDQRZs@cluster0.ec65i3c.mongodb.net/"
  )
  .then(() => console.log("MongoDB Connected")) // Successful connection
  .catch((err) => console.log(err)); // Handle connection errors

// ------------------- EXPRESS APP SETUP -------------------
const app = express(); // Create an Express application instance
const port = process.env.PORT || 5000; // Define server port

// ------------------- CORS MIDDLEWARE -------------------
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this origin (frontend URL)
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: [
      "Content-Type",
      "Authorization",  // Allows passing tokens like Bearer tokens (JWT) for authentication
      "cache-control",
      "Expires",
      "Pragma",   // Used for cache control (often `no-cache`)
    ],
    credentials: true, // Enable sending of cookies and authentication headers
  })
);

// ------------------- OTHER MIDDLEWARE -------------------
app.use(express.json()); // Parse incoming JSON payloads
app.use(cookieParser()); // Parse cookies in incoming requests

// ------------------- ROUTES -------------------
// Use respective route handlers for different parts of the API
app.use('/api/auth', authRouter); // Auth-related routes (login, register, etc.)
app.use("/api/admin/products", adminProductRouter); // Admin product management routes
app.use("/api/admin/orders", adminOrderRouter); // Admin order management routes

app.use('/api/shop/products', shopProductsRouter); // Shop product listing and details
app.use('/api/shop/cart', shopCartRouter); // Shopping cart functionality
app.use('/api/shop/address', shopAddressRouter); // Address handling for checkout
app.use('/api/shop/order', shopOrderRouter);
app.use('/api/shop/search', shopSearchRouter);

// ------------------- START THE SERVER -------------------
app.listen(port, () => 
  console.log(`Server is running on port ${port}`)
);
