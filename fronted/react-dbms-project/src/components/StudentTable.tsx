import { Input, Td, Text, Tr } from "@chakra-ui/react";
import { Student } from "../hooks/useStudents";

interface Props {
  student: Student;
  updateMark: (id: number, column: string, marks: number) => void;
  testList: string[];
}

const StudentTable = ({ student, updateMark, testList }: Props) => {
  const renderMarks = () => {
    if (!student || !testList) return null;

    const marks = [];
    const set = new Set<string>(testList);
    let i = 0;

    for (const keys in student) {
      if (set.has(keys)) {
        marks.push(
          <Td key={i++} isNumeric>
            <Input
              type="number"
              variant="flushed"
              placeholder={student[keys]}
              textAlign="center"
              onChange={(e) =>
                updateMark(student.id, keys, Number(e.target.value))
              }
            />
          </Td>
        );
      }
    }

    return marks;
  };

  return (
    <Tr>
      <Td isNumeric>
        <Text textAlign="center">{student.id}</Text>
      </Td>
      <Td>
        <Text textAlign="center">{student.name}</Text>
      </Td>
      <Td isNumeric>
        <Text textAlign="center">{student.age}</Text>
      </Td>
      <Td isNumeric>
        <Text textAlign="center">{student.semester}</Text>
      </Td>
      <Td isNumeric>
        <Text textAlign="center">{student.year}</Text>
      </Td>
      <Td isNumeric>
        <Text textAlign="center">{student.classroom_id}</Text>
      </Td>
      {renderMarks()}
    </Tr>
  );
};

export default StudentTable;
