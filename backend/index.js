import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import employeeRoutes from "./routes/employee.js";

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());

app.use("/api/employee", employeeRoutes);

app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    message: error.message || "An unknown error occurred!",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
