import { useEffect, useState } from "react";
import apiClient from "../Services/api-client";
import { CanceledError } from "axios";

export interface Student {
  [key: string]: any;
  age: number;
  classroom_id: number;
  id: number;
  name: string;
  semester: number;
  year: number;
  [key: `IA${string}`]: number;
}

const useStudents = (classroomId: number) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    apiClient
      .get(`/classrooms/get/${classroomId}`, { signal: controller.signal })
      .then((res) => setStudents(res.data))
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });

    return () => controller.abort();
  }, []);

  return { students, error, setStudents, setError };
};

export default useStudents;
