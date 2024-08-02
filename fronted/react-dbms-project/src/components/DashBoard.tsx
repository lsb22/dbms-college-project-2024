import useClassrooms from "../hooks/useClassrooms";
import ClassRoomSection from "./ClassRoomSection";
import { useNavigate, useParams } from "react-router-dom";
import { ClassFormData } from "./CreateClassroom";
import apiClient from "../Services/api-client";

interface Props {
  sendTeacherId: (id: number) => void;
}

const DashBoard = ({ sendTeacherId }: Props) => {
  const { teacherId } = useParams();
  if (!teacherId) return;
  const { classrooms, setClassrooms, error, setError } = useClassrooms(
    parseInt(teacherId)
  );
  sendTeacherId(parseInt(teacherId));
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
