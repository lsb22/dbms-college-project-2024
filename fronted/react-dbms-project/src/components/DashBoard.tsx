import useClassrooms from "../hooks/useClassrooms";
import ClassRoomSection from "./ClassRoomSection";
import { useNavigate } from "react-router-dom";

const DashBoard = () => {
  const { classrooms, error } = useClassrooms();
  const navigate = useNavigate();

  const handleClassroomSelect = (classroomId: number) => {
    navigate(`/classroom/students/${classroomId}`);
  };
  return (
    <>
      <ClassRoomSection
        classrooms={classrooms}
        onSelect={handleClassroomSelect}
        error={error}
      />
    </>
  );
};

export default DashBoard;
