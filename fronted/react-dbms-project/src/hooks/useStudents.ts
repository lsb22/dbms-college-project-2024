import useData from "./useData";

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

const useStudents = (classroomId: number) =>
  useData<Student>(`/classrooms/get/${classroomId}`);

export default useStudents;
