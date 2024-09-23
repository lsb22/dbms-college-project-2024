import express from "express";
import db from "../databaseConnect.js";

const authRouter = express.Router();

// logging in

authRouter.post("/login", (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .json({ message: "body is null. Please enter the details." });
  }

  const { email, password } = req.body;

  const q = "select * from teachers where email = ? and password = ?";

  db.query(q, [email, password], (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "database error", success: false });
    }

    if (data.length > 0) {
      return res.json({ success: true, name: data[0].name, id: data[0].id });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  });
});

// registration

authRouter.post("/register", (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      message: "body is null, Please enter the details",
      success: false,
    });
  }

  console.log(req.body);

  const { name, email, password } = req.body;

  const q = "select * from teachers where name = ? and email = ?";

  db.query(q, [name, email], (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "database error", success: false });
    }
    if (data.length > 0) {
      return res
        .status(400)
        .json({ message: "user already exists", success: false });
    } else {
      const q2 = "insert into teachers values(default,?,?,?)";
      db.query(q2, [name, email, password], (error, d) => {
        if (error) {
          return res
            .status(500)
            .json({ message: "database error", success: false });
        }
        return res.json({
          success: true,
          message: "user added successfully",
          id: d.insertId,
        });
      });
    }
  });
});

export default authRouter;
