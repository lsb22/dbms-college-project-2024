import { Badge, Card, CardBody, HStack, Image, Text } from "@chakra-ui/react";
import { Classroom } from "../hooks/useClassrooms";
import logo from "../images/classroom-img.jpg";

interface Props {
  classroom: Classroom;
  onSelect: (classroomId: number) => void;
}

const ClassroomCard = ({ classroom, onSelect }: Props) => {
  return (
    <Card
      overflow="hidden"
      borderRadius={5}
      boxShadow="dark-lg"
      onClick={() => onSelect(classroom.id)}
    >
      <Image src={logo} />
      <CardBody>
        <HStack justifyContent="space-between">
          <Text as="i" fontSize="lg">
            Classroom id:
          </Text>
          <Badge fontSize="md" paddingX="30px" colorScheme="blue">
            {classroom.id}
          </Badge>
        </HStack>
        <HStack justifyContent="space-between">
          <Text as="i" fontSize="lg">
            Teacher id:
          </Text>
          <Badge fontSize="md" paddingX="21px" colorScheme="blue">
            {classroom.teacher_id}
          </Badge>
        </HStack>
        <HStack justifyContent="space-between">
          <Text as="i" fontSize="lg">
            Subject:
          </Text>
          <Badge fontSize="md" paddingX="11px" colorScheme="blue">
            {classroom.subject_name}
          </Badge>
        </HStack>
        <HStack justifyContent="space-between">
          <Text as="i" fontSize="lg">
            Semester:
          </Text>
          <Badge fontSize="md" paddingX="30px" colorScheme="blue">
            {classroom.semester}
          </Badge>
        </HStack>
        <HStack justifyContent="space-between">
          <Text as="i" fontSize="lg">
            Year:
          </Text>
          <Badge fontSize="md" paddingX="30px" colorScheme="blue">
            {classroom.year}
          </Badge>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default ClassroomCard;
