import { HStack, Image, Text } from "@chakra-ui/react";
import logo from "../images/letter-l.png";
import ColorModeSwitch from "./ColorModeSwitch";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";

const LoggedinNavbar = () => {
  const useAuth = useContext(AuthContext);
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
          <Link to="/dashboard">Dashboard</Link>
        </Text>
        <Text paddingRight={6}>
          <Link to="/dashboard">about</Link>
        </Text>
        <Text paddingRight={6}>
          <Link to="/" onClick={useAuth?.logout}>
            logout
          </Link>
        </Text>
      </HStack>
    </HStack>
  );
};

export default LoggedinNavbar;
