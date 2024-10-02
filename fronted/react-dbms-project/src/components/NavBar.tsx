import LoggedinNavbar from "./LoggedinNavbar";
import LoggedoutNavbar from "./LoggedoutNavbar";
import AuthStore from "../store/AuthStore";

const NavBar = () => {
  const { isLoggedIn } = AuthStore();
  return <>{isLoggedIn ? <LoggedinNavbar /> : <LoggedoutNavbar />}</>;
};

export default NavBar;
