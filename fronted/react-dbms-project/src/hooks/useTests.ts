import useData from "./useData";

interface TestList {
  testList: string;
}

const useTests = (classroomId: number) =>
  useData<TestList>(`/classrooms/testList/${classroomId}`);

export default useTests;
