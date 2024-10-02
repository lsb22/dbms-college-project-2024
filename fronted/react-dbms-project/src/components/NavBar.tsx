import LoggedinNavbar from "./LoggedinNavbar";
import LoggedoutNavbar from "./LoggedoutNavbar";
import AuthStore from "../store/AuthStore";

interface Props {
  id: number;
}

const NavBar = ({ id }: Props) => {
  const { isLoggedIn } = AuthStore();
  return <>{isLoggedIn ? <LoggedinNavbar id={id} /> : <LoggedoutNavbar />}</>;
};

export default NavBar;
