import {
  Box,
  Button,
  Input,
  SimpleGrid,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import useStudents from "../hooks/useStudents";
import addNewColumn from "../Services/addNewColumn";
import addNewStudent from "../Services/addNewStudent";
import updateMarks from "../Services/updateMarks";
import AddNewStudent from "./AddNewStudent";
import StudentTable from "./StudentTable";

// re-routed here from dashboard, on clicking some classroom
// this component is used to render students of a particular classroom

const StudentsList = () => {
  const { classroomId } = useParams();
  const id = classroomId ? parseInt(classroomId) : null;
  if (id === null) return;
  const { data, error, setData, setError } = useStudents(id);
  console.log(data);
  const columnRef = useRef<HTMLInputElement>(null);

  // api call to update mark
  const handleClick = () => {
    if (columnRef.current != null && columnRef.current.value) {
      addNewColumn(columnRef.current.value, data, setData, setError);
    }
  };

  const renderHeading = () => {
    if (data.length === 0) return null;

    const iaColumns = [];
    for (const keys in data[0]) {
      if (keys.slice(0, 2) === "IA") {
        iaColumns.push(
          <Th key={keys} isNumeric width="50px">
            <Text textAlign="center">{keys}</Text>
          </Th>
        );
      }
    }
    return iaColumns;
  };

  return (
    <SimpleGrid padding={6}>
      {error && <Text>{error}</Text>}
      <AddNewStudent
        addNewStudent={(studentData) =>
          addNewStudent(studentData, data, setData, setError)
        }
      />
      <Box>
        <Box mb={8}>
          <Input
            type="text"
            placeholder="Insert new column as IA{number}"
            width="lg"
            display="block"
            ref={columnRef}
          />
          <Button
            colorScheme="blue"
            mt={4}
            variant="outline"
            onClick={handleClick}
          >
            Create Column
          </Button>
        </Box>
      </Box>
      {error && <Text color="red">{error}</Text>}
      <TableContainer
        borderWidth="1px"
        borderColor="gray.500"
        borderRadius={5}
        boxShadow="dark-lg"
        height="400px"
        overflowY="scroll"
      >
        <Table variant="striped" colorScheme="teal" size="md">
          <Thead
            position="sticky"
            top={0}
            zIndex={1}
            backdropFilter="blur(10px)"
          >
            <Tr>
              <Th isNumeric width="50px">
                <Text textAlign="center">Id</Text>
              </Th>
              <Th width="100px">
                <Text textAlign="center">Name</Text>
              </Th>
              <Th isNumeric width="50px">
                <Text textAlign="center">Age</Text>
              </Th>
              <Th isNumeric width="50px">
                <Text textAlign="center">Semester</Text>
              </Th>
              <Th isNumeric width="50px">
                <Text textAlign="center">Year</Text>
              </Th>
              <Th isNumeric width="50px" textAlign="center">
                <Text textAlign="center">Classroom Id</Text>
              </Th>
              {renderHeading()}
            </Tr>
          </Thead>
          <Tbody>
            {data.map((student) => (
              <StudentTable
                key={student.id}
                student={student}
                updateMark={(id, column, marks) =>
                  updateMarks(id, column, marks, data, setData, setError)
                }
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </SimpleGrid>
  );
};

export default StudentsList;
