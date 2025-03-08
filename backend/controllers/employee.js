import { query } from "../utils/connectToDB.js";
import { errorMiddleware } from "../utils/error.js";
import {
  createEmployeeQuery,
  createEmployeeTableQuery,
  createRoleQuery,
  deleteEmployeeQuery,
  getAllEmployeeQuery,
  getSingleEmployeeQuery,
  updateEmployeeQuery,
} from "../utils/sqlQuery.js";

const createEmployee = async (req, res, next) => {
  try {
    const { name, email, age, role, salary } = req.body;

    if (!name || !email || !age || !salary) {
      return next(errorMiddleware(400, "All fields are required"));
    }

    const { rows } = await query(createEmployeeQuery, [
      name,
      email,
      age,
      role,
      salary,
    ]);

    res.status(201).json({ message: "Employee created successfully" });
  } catch (error) {
    console.error(error);
    return next(errorMiddleware(400, error.message));
  }
};

const getAllEmployee = async (req, res, next) => {
  try {
    const response = await query(`
        SELECT to_regclass('employee_details');
        `);

    if (!response.rows[0].to_regclass) {
      await query(createRoleQuery);
      await query(createEmployeeTableQuery);
    }

    const { rows } = await query(getAllEmployeeQuery);

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    return next(errorMiddleware(400, "could not get employee details"));
  }
};

const getEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { rows } = await query(getSingleEmployeeQuery, [id]);

    if (!rows[0]) {
      return next(errorMiddleware(404, "Employee not found"));
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    return next(errorMiddleware(400, error.message));
  }
};

const updateEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, age, role, salary } = req.body;

    const { rows } = await query(getSingleEmployeeQuery, [id]);

    if (!rows[0]) {
      return next(errorMiddleware(404, "Employee not found"));
    }

    const { rows: updatedEmployee } = await query(updateEmployeeQuery, [
      id,
      name,
      email,
      age,
      role,
      salary,
    ]);

    res.status(200).json(updatedEmployee[0]);
  } catch (error) {
    console.error(error);
    return next(errorMiddleware(400, error.message));
  }
};

const deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { rows } = await query(getSingleEmployeeQuery, [id]);

    if (!rows[0]) {
      return next(errorMiddleware(404, "Employee not found"));
    }

    await query(deleteEmployeeQuery, [id]);

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error(error);
    return next(errorMiddleware(400, error.message));
  }
};

export {
  createEmployee,
  getAllEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
