import { useRef, useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  useToast,
  Input,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { createAndGetBackRoomAction } from "../../state/action/RoomAction";
import { useDispatch } from "react-redux";
const CreateBoard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [roomName, setroomName] = useState("");
  const dispatch = useDispatch();
  const btnRef = useRef();
  const toast = useToast();
  const createARoom = () => {
    const roomAdminID = localStorage.getItem("uid");
    dispatch(createAndGetBackRoomAction({ roomName, roomAdminID })).then(() => {
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 6000,
        isClosable: true,
      });
    });
    setroomName("");
  };

  return (
    <>
      <Button
        ref={btnRef}
        ml="10px"
        p="20px"
        onClick={onOpen}
        backgroundColor="#1c2635"
        color="gray.300"
        borderColor="gray.600"
        width="50px"
        height="10px"
      >
        <AddIcon fontSize="medium" fontWeight="bold" />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent backgroundColor="gray.800" color="white">
          <DrawerCloseButton />
          <DrawerHeader>Create your board</DrawerHeader>

          <DrawerBody>
            <Input
              placeholder="Type here..."
              onChange={(e) => {
                setroomName(e.target.value);
              }}
            />
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={createARoom}>
              Create
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CreateBoard;
