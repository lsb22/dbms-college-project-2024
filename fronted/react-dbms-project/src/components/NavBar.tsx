import LoggedinNavbar from "./LoggedinNavbar";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import LoggedoutNavbar from "./LoggedoutNavbar";

interface Props {
  id: number;
}

const NavBar = ({ id }: Props) => {
  const useAuth = useContext(AuthContext);
  return (
    <>
      {useAuth?.isLoggedIn ? <LoggedinNavbar id={id} /> : <LoggedoutNavbar />}
    </>
  );
};

export default NavBar;
