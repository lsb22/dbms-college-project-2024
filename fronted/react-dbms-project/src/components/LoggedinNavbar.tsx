import { HStack, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import logo from "../images/letter-l.png";
import AuthStore from "../store/AuthStore";
import ColorModeSwitch from "./ColorModeSwitch";

const LoggedinNavbar = () => {
  const { logout, teacherId } = AuthStore();
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
          <Link to={`/dashboard/${teacherId}`}>Dashboard</Link>
        </Text>
        <Text paddingRight={6}>
          <Link to={`/dashboard/${teacherId}`}>about</Link>
        </Text>
        <Text paddingRight={6}>
          <Link to="/" onClick={() => logout()}>
            logout
          </Link>
        </Text>
      </HStack>
    </HStack>
  );
};

export default LoggedinNavbar;
