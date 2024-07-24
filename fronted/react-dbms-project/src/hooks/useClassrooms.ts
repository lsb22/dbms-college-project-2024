import { useEffect, useState } from "react";
import apiClient from "../Services/api-client";
import { CanceledError } from "axios";

export interface Classroom {
  id: number;
  semester: number;
  subject_name: string;
  teacher_id: number;
  year: number;
}

const useClassrooms = () => {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    apiClient
      .get("/classrooms", { signal: controller.signal })
      .then((res) => {
        setClassrooms(res.data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });

    return () => controller.abort();
  }, []);

  return { classrooms, error, setClassrooms, setError };
};

export default useClassrooms;
