import { Dispatch } from "react";
import { Student } from "../hooks/useStudents";
import apiClient from "./api-client";

const updateMarks = (
  id: number,
  column: string,
  marks: number,
  data: Student[],
  setData: Dispatch<React.SetStateAction<Student[]>>,
  setError: Dispatch<React.SetStateAction<string>>
) => {
  const original = [...data];
  setData(
    data.map((student) =>
      student.id === id ? { ...student, [column]: marks } : student
    )
  );

  apiClient
    .patch(`/classrooms/updateMarks/${id}`, { [column]: marks })
    .catch((err) => {
      setError(err.message);
      setData(original);
    });
};

export default updateMarks;
