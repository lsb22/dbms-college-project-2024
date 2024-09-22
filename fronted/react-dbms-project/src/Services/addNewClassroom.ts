import { Dispatch } from "react";
import { ClassFormData } from "../components/CreateClassroom";
import { Classroom } from "../hooks/useClassrooms";
import apiClient from "./api-client";

const createNewClassroom = (
  newData: ClassFormData,
  data: Classroom[],
  setData: Dispatch<React.SetStateAction<Classroom[]>>,
  setError: Dispatch<React.SetStateAction<string>>
) => {
  const original = [...data];
  const newClassroom = { ...newData, id: 0 };
  setData([...data, newClassroom]);

  apiClient
    .post("/classroom/add/NewClassroom", newClassroom)
    .then((res) => {
      setData([...data, res.data]);
    })
    .catch((err) => {
      setError(err.message);
      setData(original);
    });
};

export default createNewClassroom;
