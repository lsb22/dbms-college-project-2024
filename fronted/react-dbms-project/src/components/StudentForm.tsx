import { FormControl, FormLabel, Input } from "@chakra-ui/react";

const StudentForm = () => {
  return (
    <>
      <FormControl mb={3}>
        <FormLabel>Name</FormLabel>
        <Input placeholder="Name" />
      </FormControl>
      <FormControl mb={3}>
        <FormLabel>Age</FormLabel>
        <Input type="number" placeholder="Age" />
      </FormControl>
      <FormControl mb={3}>
        <FormLabel>Semester</FormLabel>
        <Input type="number" placeholder="Semester" />
      </FormControl>
      <FormControl mb={3}>
        <FormLabel>Year</FormLabel>
        <Input type="number" placeholder="Year" />
      </FormControl>
      <FormControl mb={3}>
        <FormLabel>Classroom Id</FormLabel>
        <Input type="number" placeholder="Classroom Id" />
      </FormControl>
    </>
  );
};

export default StudentForm;
