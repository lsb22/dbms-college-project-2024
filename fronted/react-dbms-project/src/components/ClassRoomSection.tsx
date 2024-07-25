import { SimpleGrid } from "@chakra-ui/react";
import { Classroom } from "../hooks/useClassrooms";
import ClassroomCard from "./ClassroomCard";
import CreateClassroom, { ClassFormData } from "./CreateClassroom";

interface Props {
  classrooms: Classroom[];
  error: string;
  onSelect: (classroomId: number) => void;
  createNewClassroom: (data: ClassFormData) => void;
}

const ClassRoomSection = ({
  classrooms,
  error,
  onSelect,
  createNewClassroom,
}: Props) => {
  return (
    <>
      {error && <p>{error}</p>}
      <SimpleGrid columns={{ sm: 1, lg: 2, xl: 4 }} padding={10} gap={5}>
        <CreateClassroom createNewClassroom={createNewClassroom} />
        {classrooms.map((classroom) => (
          <ClassroomCard
            key={classroom.id}
            classroom={classroom}
            onSelect={onSelect}
          />
        ))}
      </SimpleGrid>
    </>
  );
};

export default ClassRoomSection;
