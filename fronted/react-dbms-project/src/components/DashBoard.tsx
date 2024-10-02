import { useNavigate, useParams } from "react-router-dom";
import useClassrooms from "../hooks/useClassrooms";
import addNewClassroom from "../Services/addNewClassroom";
import ClassRoomSection from "./ClassRoomSection";

// this component is used to display classroomsection

const DashBoard = () => {
  const { teacherId } = useParams(); // we will navigate here from login page
  if (!teacherId) return;
  const { data, setData, error, setError } = useClassrooms(parseInt(teacherId));
  const navigate = useNavigate();

  const handleClassroomSelect = (classroomId: number) => {
    navigate(`/classroom/students/${classroomId}`);
  };

  return (
    <>
      <ClassRoomSection
        classrooms={data}
        onSelect={handleClassroomSelect}
        error={error}
        createNewClassroom={(newData) =>
          addNewClassroom(newData, data, setData, setError)
        }
      />
    </>
  );
};

export default DashBoard;
