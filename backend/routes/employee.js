import express from "express";
import {
  createEmployee,
  deleteEmployee,
  getAllEmployee,
  getEmployee,
  updateEmployee,
} from "../controllers/employee.js";

const router = express.Router();

router.get("/", getAllEmployee);

router.post("/", createEmployee);

router.get("/:id", getEmployee);

router.put("/:id", updateEmployee);

router.delete("/:id", deleteEmployee);

export default router;
