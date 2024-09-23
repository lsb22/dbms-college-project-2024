import express from "express";

const homeRouter = express.Router();

homeRouter.get("/", (req, res) => {
  res.send("hello and welcome user");
});

export default homeRouter;
