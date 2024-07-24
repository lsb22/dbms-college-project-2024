import useClassrooms from "../hooks/useClassrooms";
import ClassRoomSection from "./ClassRoomSection";
import { useNavigate } from "react-router-dom";
import { ClassFormData } from "./CreateClassroom";
import apiClient from "../Services/api-client";

const DashBoard = () => {
  const { classrooms, setClassrooms, error, setError } = useClassrooms();
  const navigate = useNavigate();

  const handleClassroomSelect = (classroomId: number) => {
    navigate(`/classroom/students/${classroomId}`);
  };

  const createNewClassroom = (data: ClassFormData) => {
    const original = [...classrooms];
    const newClassroom = { ...data, id: 0 };
    setClassrooms([...classrooms, newClassroom]);

    apiClient
      .post("/classroom/add/NewClassroom", newClassroom)
      .then((res) => {
        setClassrooms([...classrooms, res.data]);
      })
      .catch((err) => {
        setError(err.message);
        setClassrooms(original);
      });
  };

  return (
    <>
      <ClassRoomSection
        classrooms={classrooms}
        onSelect={handleClassroomSelect}
        error={error}
        createNewClassroom={createNewClassroom}
      />
    </>
  );
};

export default DashBoard;
