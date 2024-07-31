import { HStack, Image, Text } from "@chakra-ui/react";
import logo from "../images/letter-l.png";
import ColorModeSwitch from "./ColorModeSwitch";
import { Link } from "react-router-dom";

const LoggedoutNavbar = () => {
  return (
    <HStack
      justifyContent="space-between"
      alignContent="center"
      paddingX={5}
      paddingY={5}
    >
      <Image height={10} src={logo} />
      <HStack>
        <ColorModeSwitch />

        <Text paddingRight={6}>
          <Link to="/">Login</Link>
        </Text>
        <Text paddingRight={6}>
          <Link to="/register">Register</Link>
        </Text>
        <Text paddingRight={6}>
          <Link to="/">about</Link>
        </Text>
      </HStack>
    </HStack>
  );
};

export default LoggedoutNavbar;
