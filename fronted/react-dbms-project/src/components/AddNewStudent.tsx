import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  ModalCloseButton,
  ModalFooter,
  ModalContent,
} from "@chakra-ui/react";
import StudentForm from "./StudentForm";

const AddNewStudent = () => {
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
            <ModalBody>
              <StudentForm />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" type="submit" mr={3}>
                Submit
              </Button>
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
