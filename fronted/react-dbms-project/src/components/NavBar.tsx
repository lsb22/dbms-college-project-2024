import { HStack, Image, Text } from "@chakra-ui/react";
import logo from "../images/letter-l.png";
import ColorModeSwitch from "./ColorModeSwitch";
import { Link } from "react-router-dom";

const NavBar = () => {
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
          <Link to="/">DashBoard</Link>
        </Text>
        <Text paddingRight={6}>
          <Link to="/">About</Link>
        </Text>
        <Text paddingRight={6}>
          <Link to="/">Contact</Link>
        </Text>
      </HStack>
    </HStack>
  );
};

export default NavBar;
