import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Ling@mysql24",
  database: "school_management",
});

app.get("/", (req, res) => {
  res.send("hello and welcome user");
});

app.get("/classrooms", (req, res) => {
  const q = "select * from classrooms";
  db.query(q, (err, data) => {
    if (err) return res.send(err.message);
    res.send(data);
  });
});

app.get("/classrooms/get/:classroomId", (req, res) => {
  const q = "select * from students where classroom_id = ?";
  const { classroomId } = req.params;
  db.query(q, [classroomId], (err, data) => {
    if (err) return res.send(err.message);
    res.send(data);
  });
});

app.post("/classrooms/addColumn/:classroomName", (req, res) => {
  const { classroomName } = req.params;
  const q = `alter table students add ${classroomName} int default 0`;
  db.query(q, (err) => {
    if (err) return res.send(err.message);
    res.json({ message: "colomn added successfully" });
  });
});

// updating marks
app.patch("/classrooms/updateMarks/:studentId", (req, res) => {
  const { studentId } = req.params;
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.json({ message: "body is null" });
  }
  const [[column, marks]] = Object.entries(req.body);
  const q = `update students set ${column} = ? where id = ?`;

  db.query(q, [marks, studentId], (err) => {
    if (err) return res.json({ message: err.message });
    res.json({ message: "marks updated successfully" });
  });
});

app.listen(3000, () => {
  console.log("Server is running");
});
