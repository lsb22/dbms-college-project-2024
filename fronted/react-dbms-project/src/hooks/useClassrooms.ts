import useData from "./useData";

export interface Classroom {
  id: number;
  semester: number;
  subject_name: string;
  teacher_id: number;
  year: number;
}

const useClassrooms = (teacherId: number) =>
  useData<Classroom>(`classrooms/${teacherId}`);

export default useClassrooms;
