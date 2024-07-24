import {
  Box,
  Button,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

interface Props {
  createNewClassroom: (data: ClassFormData) => void;
}

const schema = z.object({
  teacher_id: z
    .number({ invalid_type_error: "teacherId is required" })
    .min(1, { message: "teacherId should be greater than equal to 1" })
    .max(999, { message: "teacherId should be less than equal to 999" }),
  subject_name: z
    .string()
    .min(3, { message: "subject is required" })
    .max(10, { message: "length should be less than equal 10" }),
  semester: z
    .number({ invalid_type_error: "semester is required" })
    .min(1, { message: "semester should be greater than equal to 1" })
    .max(8, { message: "semester should be less than equal to 8" }),
  year: z
    .number({
      invalid_type_error: "year is required",
    })
    .min(1, { message: "year should be greater than equal to 1" })
    .max(4, { message: "year should be less than equal to 4" }),
});

export type ClassFormData = z.infer<typeof schema>;

const CreateClassroom = ({ createNewClassroom }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ClassFormData>({
    resolver: zodResolver(schema),
  });
  return (
    <Box>
      <Card alignItems="center" paddingY="123px">
        <CardBody alignContent="center">
          <Button
            size="md"
            variant="outline"
            colorScheme="blue"
            onClick={onOpen}
          >
            Create new classroom
          </Button>
        </CardBody>
      </Card>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(30deg)"
        />
        <ModalContent>
          <ModalHeader>
            Enter classroom details
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            <form
              onSubmit={handleSubmit((data) => {
                createNewClassroom(data);
                reset();
              })}
            >
              <FormControl mb={3}>
                <FormLabel htmlFor="tid">Teacher id</FormLabel>
                <Input
                  {...register("teacher_id", { valueAsNumber: true })}
                  type="number"
                  placeholder="Teacher id"
                  id="tid"
                />
                {errors.teacher_id && (
                  <Text color="red">{errors.teacher_id.message}</Text>
                )}
              </FormControl>
              <FormControl mb={3}>
                <FormLabel htmlFor="subject">Subject</FormLabel>
                <Input
                  {...register("subject_name")}
                  type="text"
                  placeholder="subject"
                  id="subject"
                />
                {errors.subject_name && (
                  <Text color="red">{errors.subject_name.message}</Text>
                )}
              </FormControl>
              <FormControl mb={3}>
                <FormLabel htmlFor="sem">Semester</FormLabel>
                <Input
                  {...register("semester", { valueAsNumber: true })}
                  type="number"
                  placeholder="semester"
                  id="sem"
                />
                {errors.semester && (
                  <Text color="red">{errors.semester.message}</Text>
                )}
              </FormControl>
              <FormControl mb={3}>
                <FormLabel htmlFor="year">Year</FormLabel>
                <Input
                  {...register("year", { valueAsNumber: true })}
                  type="number"
                  placeholder="year"
                  id="year"
                />
                {errors.year && <Text color="red">{errors.year.message}</Text>}
              </FormControl>
              <Button colorScheme="green" type="submit">
                Create
              </Button>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="ghost"
              onClick={() => {
                onClose();
                reset();
              }}
              colorScheme="red"
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CreateClassroom;
