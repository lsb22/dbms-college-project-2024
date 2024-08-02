import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import DashBoard from "./components/DashBoard";
import { Route, Routes } from "react-router-dom";
import StudentsList from "./components/StudentsList";
import Login from "./components/Login";
import Register from "./components/Register";
import AuthContextProvider from "./components/AuthContext";
import { useState } from "react";

function App() {
  const [teacherId, setTeacherId] = useState(0);
  const sendTeacherId = (id: number) => {
    setTeacherId(id);
  };

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
          <NavBar id={teacherId} />
        </GridItem>

        <GridItem area={"main"}>
          <Routes>
            <Route
              path="/dashboard/:teacherId"
              element={<DashBoard sendTeacherId={sendTeacherId} />}
            />
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
