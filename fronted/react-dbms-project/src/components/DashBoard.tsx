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
  const { data, setData, error, setError } = useClassrooms(parseInt(teacherId));
  sendTeacherId(parseInt(teacherId));
  const navigate = useNavigate();

  const handleClassroomSelect = (classroomId: number) => {
    navigate(`/classroom/students/${classroomId}`);
  };

  const createNewClassroom = (newData: ClassFormData) => {
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

  return (
    <>
      <ClassRoomSection
        classrooms={data}
        onSelect={handleClassroomSelect}
        error={error}
        createNewClassroom={createNewClassroom}
      />
    </>
  );
};

export default DashBoard;
