import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import DashBoard from "./components/DashBoard";
import { Route, Routes } from "react-router-dom";
import StudentsList from "./components/StudentsList";
import Login from "./components/Login";
import Register from "./components/Register";
import AuthContextProvider from "./components/AuthContext";

function App() {
  return (
    <AuthContextProvider>
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
            <Route path="/dashboard" element={<DashBoard />} />
            <Route
              path="/classroom/students/:classroomId"
              element={<StudentsList />}
            />
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </GridItem>
      </Grid>
    </AuthContextProvider>
  );
}

export default App;
