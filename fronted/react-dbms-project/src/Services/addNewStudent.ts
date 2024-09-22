import { Dispatch } from "react";
import { Student } from "../hooks/useStudents";
import apiClient from "./api-client";
import { FormData } from "../components/StudentForm";

const addNewStudent = (
  newData: FormData,
  data: Student[],
  setData: Dispatch<React.SetStateAction<Student[]>>,
  setError: Dispatch<React.SetStateAction<string>>
) => {
  const original = [...data];

  const newStudent = { ...newData, id: 0 };

  setData([...data, newStudent]);

  apiClient
    .post("/classrooms/addStudent", newStudent)
    .then((res) => {
      setData([...data, { ...res.data }]);
    })

    .catch((err) => {
      setError(err.message);
      setData(original);
    });
};

export default addNewStudent;
