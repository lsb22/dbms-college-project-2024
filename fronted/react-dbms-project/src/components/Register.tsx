import {
  Card,
  CardBody,
  VStack,
  Image,
  SimpleGrid,
  Text,
  HStack,
  FormControl,
  Input,
  Button,
} from "@chakra-ui/react";
import logo from "../images/login-img.png";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import apiClient from "../Services/api-client";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";

const schema = z.object({
  email: z.string().min(10, { message: "Enter valid email" }),
  password: z.string().min(1, { message: "password is required" }),
  name: z.string().min(4, { message: "name is required" }),
});

type RegisterData = z.infer<typeof schema>;

function Register() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterData>({ resolver: zodResolver(schema) });
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const useAuth = useContext(AuthContext);

  const handleRegister = (data: RegisterData) => {
    apiClient
      .post("/validate/register", data)
      .then((res) => {
        if (res.data.success) {
          useAuth?.loggin();
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        setErrorMessage(err.message);
        alert("Registration failed");
        console.log("no");
      });
  };

  return (
    <SimpleGrid pt="100px" columns={1}>
      {errorMessage && <Text color="red">{errorMessage}</Text>}
      <VStack>
        <Card
          width="400px"
          textAlign="center"
          borderRadius={5}
          boxShadow="dark-lg"
        >
          <HStack justifyContent="center" pt={5}>
            <Image src={logo} height={12} width={150} borderRadius={5} />
          </HStack>
          <CardBody>
            <Text fontSize="1.5rem">Register</Text>
            <form
              onSubmit={handleSubmit((data) => {
                handleRegister(data);
                reset();
              })}
            >
              <FormControl mt={7}>
                <Input type="text" placeholder="name" {...register("name")} />
                {errors.name && (
                  <Text textAlign="left" color="red">
                    {errors.name.message}
                  </Text>
                )}
              </FormControl>
              <FormControl mt={7}>
                <Input
                  type="email"
                  placeholder="email address"
                  {...register("email")}
                />
                {errors.email && (
                  <Text textAlign="left" color="red">
                    {errors.email.message}
                  </Text>
                )}
              </FormControl>
              <FormControl mt={7}>
                <Input
                  type="password"
                  placeholder="password"
                  {...register("password")}
                />
                {errors.password && (
                  <Text textAlign="left" color="red">
                    {errors.password.message}
                  </Text>
                )}
              </FormControl>
              <Button type="submit" mt={10} width="355px" colorScheme="blue">
                Register
              </Button>
            </form>
          </CardBody>
        </Card>
      </VStack>
    </SimpleGrid>
  );
}

export default Register;
