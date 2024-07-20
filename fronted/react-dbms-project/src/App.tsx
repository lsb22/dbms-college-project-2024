import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import DashBoard from "./components/DashBoard";
import { Route, Routes } from "react-router-dom";
import StudentsList from "./components/StudentsList";

function App() {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "200px 1fr",
      }}
    >
      <GridItem area={"nav"}>
        <NavBar />
      </GridItem>
      <Show above="lg">
        <GridItem area={"aside"}>Aside</GridItem>
      </Show>

      <GridItem area={"main"}>
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route
            path="/classroom/students/:classroomId"
            element={<StudentsList />}
          ></Route>
        </Routes>
      </GridItem>
    </Grid>
  );
}

export default App;
