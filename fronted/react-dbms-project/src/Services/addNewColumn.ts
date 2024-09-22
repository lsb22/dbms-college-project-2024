import { Dispatch } from "react";
import { Student } from "../hooks/useStudents";
import apiClient from "./api-client";

// to add new column

const addNewColumn = (
  newColumn: string,
  data: Student[],
  setData: Dispatch<React.SetStateAction<Student[]>>,
  setError: Dispatch<React.SetStateAction<string>>
) => {
  if (!newColumn) return;
  const original = [...data];
  setData(
    data.map((student) => ({
      ...student,
      [newColumn]: 0,
    }))
  );

  apiClient
    .post(`/classrooms/addColumn/${newColumn}`, newColumn)
    .catch((err) => {
      setError(err.message);
      setData(original);
    });
};

export default addNewColumn;
