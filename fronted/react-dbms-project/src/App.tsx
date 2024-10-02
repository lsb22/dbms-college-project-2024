import { Grid, GridItem } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import DashBoard from "./components/DashBoard";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Register from "./components/Register";
import StudentsList from "./components/StudentsList";

function App() {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav" "main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "1fr",
      }}
    >
      <GridItem area={"nav"}>
        <NavBar />
      </GridItem>

      <GridItem area={"main"}>
        <Routes>
          <Route path="/dashboard/:teacherId" element={<DashBoard />} />
          <Route
            path="/classroom/students/:classroomId"
            element={<StudentsList />}
          />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </GridItem>
    </Grid>
  );
}

export default App;
