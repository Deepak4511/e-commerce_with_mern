const express = require("express");

const {
  getAllOrdersOfAllUsers,
  getOrderDetailsForAdmin
} = require("../../controllers/admin/order-controller");

const router = express.Router();

router.get("/get", getAllOrdersOfAllUsers);
router.get("/details/:id", getOrderDetailsForAdmin);

module.exports = router;
