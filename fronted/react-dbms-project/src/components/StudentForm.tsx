import {
  Button,
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  Text,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

interface Props {
  addNewStudent: (data: FormData) => void;
}

const schema = z.object({
  name: z.string().min(4, { message: "name is required" }),
  age: z.number({ invalid_type_error: "Age field is required" }),
  semester: z.number({ invalid_type_error: "Semester is required" }),
  classroom_id: z.number({ invalid_type_error: "classroomId is required" }),
  year: z.number({ invalid_type_error: "year is required" }),
});

export type FormData = z.infer<typeof schema>;

const StudentForm = ({ addNewStudent }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return (
    <>
      <ModalBody>
        <form
          onSubmit={handleSubmit((data) => {
            addNewStudent(data);
            reset();
          })}
        >
          <FormControl mb={3} isRequired>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input placeholder="Name" {...register("name")} id="name" />
            {errors.name && <Text color="red">{errors.name.message}</Text>}
          </FormControl>
          <FormControl mb={3} isRequired>
            <FormLabel htmlFor="age">Age</FormLabel>
            <Input
              type="number"
              placeholder="Age"
              {...register("age", { valueAsNumber: true })}
              id="age"
            />
            {errors.age && <Text color="red">{errors.age.message}</Text>}
          </FormControl>
          <FormControl mb={3} isRequired>
            <FormLabel htmlFor="semester">Semester</FormLabel>
            <Input
              type="number"
              placeholder="Semester"
              {...register("semester", { valueAsNumber: true })}
              id="semester"
            />
            {errors.semester && (
              <Text color="red">{errors.semester.message}</Text>
            )}
          </FormControl>
          <FormControl mb={3} isRequired>
            <FormLabel htmlFor="year">Year</FormLabel>
            <Input
              type="number"
              placeholder="Year"
              {...register("year", { valueAsNumber: true })}
              id="year"
            />
            {errors.year && <Text color="red">{errors.year.message}</Text>}
          </FormControl>
          <FormControl mb={3} isRequired>
            <FormLabel htmlFor="classroomId">Classroom Id</FormLabel>
            <Input
              type="number"
              placeholder="Classroom Id"
              {...register("classroom_id", { valueAsNumber: true })}
              id="classroomId"
            />
            {errors.classroom_id && (
              <Text color="red">{errors.classroom_id.message}</Text>
            )}
          </FormControl>
          <Button colorScheme="green" type="submit">
            Add Student
          </Button>
        </form>
      </ModalBody>
    </>
  );
};

export default StudentForm;
