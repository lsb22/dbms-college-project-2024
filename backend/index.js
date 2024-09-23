import cors from "cors";
import express from "express";
import homeRouter from "./routes/homeRoute.js";
import authRouter from "./routes/authenticationRoute.js";
import classroomRouter from "./routes/classroomRoute.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", homeRouter);
app.use("/validate", authRouter);
app.use("/classrooms", classroomRouter);

app.listen(3000, () => {
  console.log("Server is running");
});
