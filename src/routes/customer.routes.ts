import express from "express";
import {
  createCustomer,
  deleteCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
} from "../controllers/customer.controller";
import authMiddleware from "../middlewares/auth.middleware";

const customerRouter = express.Router();

customerRouter.post("/api/customers", createCustomer);
customerRouter.get("/api/customers", authMiddleware, getAllCustomers);
customerRouter.get("/api/customers/:id", authMiddleware, getCustomerById);
customerRouter.put("/api/customers/:id", authMiddleware, updateCustomer);
customerRouter.delete("/api/customers/:id", authMiddleware, deleteCustomer);

// A IMPLEMENTER
/*
customerRouter.get("/api/customers/:customerId/orders", customerController.getOrdersByCustomerId);
customerRouter.get("/api/customers/:customerId/orders/:orderId", customerController.getOrderByIdAndCustomerId);
customerRouter.get("/api/customers/:customerId/orders/:orderId/products", customerController.getProductsByOrderIdAndCustomerId);
*/

export default customerRouter;
