import LoggedinNavbar from "./LoggedinNavbar";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import LoggedoutNavbar from "./LoggedoutNavbar";

const NavBar = () => {
  const useAuth = useContext(AuthContext);
  return (
    <>
      {console.log(useAuth?.isLoggedIn)}
      {useAuth?.isLoggedIn ? <LoggedinNavbar /> : <LoggedoutNavbar />}
    </>
  );
};

export default NavBar;
