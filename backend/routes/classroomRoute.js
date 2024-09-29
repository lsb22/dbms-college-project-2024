import express from "express";
import db from "../databaseConnect.js";

const classroomRouter = express.Router();

// fetching classrooms

classroomRouter.get("/:teacherId", (req, res) => {
  const { teacherId } = req.params;
  const q = "select * from classrooms where teacher_id = ?";
  db.query(q, [teacherId], (err, data) => {
    if (err) return res.send(err.message);
    res.send(data);
  });
});

// retriving students from a praticular class

classroomRouter.get("/get/:classroomId", (req, res) => {
  const q = "select * from students where classroom_id = ?";
  const { classroomId } = req.params;
  db.query(q, [classroomId], (err, data) => {
    if (err) return res.send(err.message);
    res.send(data);
  });
});

// retriving test_list

classroomRouter.get("/testList/:classroomID", (req, res) => {
  const { classroomID } = req.params;
  const q =
    "select tests -> '$.tests' as testList from class_tests where classroomId = ?";

  db.query(q, [classroomID], (err, data) => {
    if (err)
      return res.status(500).json({ error: "Failed to fetch the test lists." });
    return res.status(200).send(data);
  });
});

// adding new columns -> IA'S

classroomRouter.post("/addColumn/:classroomId/:testName", (req, res) => {
  const { testName, classroomId } = req.params;
  const q = `alter table students add ${testName} int default 0`;
  db.query(q, (err) => {
    if (err && err.errno !== 1060) {
      return res.status(400).json({ message: err.sqlMessage });
    } else {
      const q2 = `
        update class_tests 
        set tests = json_array_append(tests,'$.tests',?)
        where classroomId = ?
      `;

      db.query(q2, [testName, classroomId], (error) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ message: error.message });
        }
        res.status(200).json({ message: "column added successfully" });
      });
    }
  });
});

// updating marks
classroomRouter.patch("/updateMarks/:studentId", (req, res) => {
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

// adding new student
classroomRouter.post("/addStudent", (req, res) => {
  if (!req.body) {
    return res.json({ message: "body is null" });
  }
  console.log(req.body);
  const q =
    "insert into students (id,name,age,year,semester,classroom_id) values(default,?,?,?,?,?)";

  db.query(
    q,
    [
      req.body.name,
      req.body.age,
      req.body.year,
      req.body.semester,
      req.body.classroom_id,
    ],
    (err, data) => {
      if (err) return console.log(err.message);
      return console.log(data);
    }
  );
});

// adding new classrooms

classroomRouter.post("/add/NewClassroom", (req, res) => {
  if (!req.body) {
    return console.log("body is null");
  }
  // console.log(req.body);
  const q = "insert into classrooms values(default,?,?,?,?)";
  db.query(
    q,
    [
      req.body.year,
      req.body.semester,
      req.body.teacher_id,
      req.body.subject_name,
    ],
    (err, data) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Server error. Try after some time." });
      const q2 = `insert into class_tests values (?,'{"tests":[]}')`;
      db.query(q2, [data.insertId], (error) => {
        if (error)
          return res
            .status(500)
            .json({ message: "Server error. Try after some time." });
        res.status(200).json({ message: "Classroom was added successfully." });
      });
    }
  );
});

export default classroomRouter;
