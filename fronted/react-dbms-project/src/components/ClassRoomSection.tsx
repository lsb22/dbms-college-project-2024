import { SimpleGrid } from "@chakra-ui/react";
import { Classroom } from "../hooks/useClassrooms";
import ClassroomCard from "./ClassroomCard";

interface Props {
  classrooms: Classroom[];
  error: string;
  onSelect: (classroomId: number) => void;
}

const ClassRoomSection = ({ classrooms, error, onSelect }: Props) => {
  return (
    <>
      {error && <p>{error}</p>}
      <SimpleGrid columns={{ sm: 2, lg: 2, xl: 4 }} padding={10} gap={5}>
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
