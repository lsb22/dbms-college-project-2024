import {
  Box,
  Button,
  Modal,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  ModalCloseButton,
  ModalFooter,
  ModalContent,
} from "@chakra-ui/react";
import StudentForm, { FormData } from "./StudentForm";

// used to display modal to get student details

interface Props {
  addNewStudent: (data: FormData) => void;
}

const AddNewStudent = ({ addNewStudent }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box mb={5}>
      <Box>
        <Button onClick={onOpen}>Add Student</Button>
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
          <ModalOverlay
            bg="blackAlpha.300"
            backdropFilter="blur(10px) hue-rotate(30deg)"
          />
          <ModalContent>
            <ModalHeader>
              Enter Student Details
              <ModalCloseButton />
            </ModalHeader>
            <StudentForm addNewStudent={addNewStudent} />
            <ModalFooter>
              <Button variant="ghost" onClick={onClose} colorScheme="red">
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
};

export default AddNewStudent;
