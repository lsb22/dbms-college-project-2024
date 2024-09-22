import { useParams } from "react-router-dom";
import useStudents from "../hooks/useStudents";
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
import StudentTable from "./StudentTable";
import { useRef } from "react";
import apiClient from "../Services/api-client";
import AddNewStudent from "./AddNewStudent";
import { FormData } from "./StudentForm";

// rerouted here from dashboard, on clicking some classroom
// this component is used to render students of a particular column

const StudentsList = () => {
  const { classroomId } = useParams();
  const id = classroomId ? parseInt(classroomId) : null;
  if (id === null) return;
  const { data, error, setData, setError } = useStudents(id);
  console.log(data);
  const columnRef = useRef<HTMLInputElement>(null);

  // api call to add new column
  const addColumn = (newColumn: string) => {
    if (!newColumn) return;
    const original = [...data];
    setData(
      data.map((student) => ({
        ...student,
        [newColumn]: 0,
      }))
    );

    apiClient
      .post(`/classrooms/addColumn/${newColumn}`, newColumn)
      .catch((err) => {
        setError(err.message);
        setData(original);
      });
  };

  const handleClick = () => {
    if (columnRef.current != null && columnRef.current.value) {
      addColumn(columnRef.current.value);
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

  // api call to update mark
  const updateMark = (id: number, column: string, marks: number) => {
    const original = [...data];
    setData(
      data.map((student) =>
        student.id === id ? { ...student, [column]: marks } : student
      )
    );

    apiClient
      .patch(`/classrooms/updateMarks/${id}`, { [column]: marks })
      .catch((err) => {
        setError(err.message);
        setData(original);
      });
  };

  // api call to add new student
  const addNewStudent = (newData: FormData) => {
    const original = [...data];

    const newStudent = { ...newData, id: 0 };

    setData([...data, newStudent]);

    apiClient
      .post("/classrooms/addStudent", newStudent)
      .then((res) => {
        setData([...data, { ...res.data }]);
      })

      .catch((err) => {
        setError(err.message);
        setData(original);
      });
  };

  return (
    <SimpleGrid padding={6}>
      {error && <Text>{error}</Text>}
      <AddNewStudent addNewStudent={(data) => addNewStudent(data)} />
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
                updateMark={updateMark}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </SimpleGrid>
  );
};

export default StudentsList;
