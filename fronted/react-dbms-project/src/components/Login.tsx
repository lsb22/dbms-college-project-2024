import {
  Button,
  Card,
  CardBody,
  FormControl,
  HStack,
  Image,
  Input,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import z from "zod";
import logo from "../images/login-img.png";
import apiClient from "../Services/api-client";
import AuthStore from "../store/AuthStore";

const schema = z.object({
  email: z.string().min(10, { message: "Enter valid email" }),
  password: z.string().min(1, { message: "password is required" }),
});

type LoginData = z.infer<typeof schema>;

function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginData>({ resolver: zodResolver(schema) });
  const navigate = useNavigate();
  const { login } = AuthStore();

  const handleLogin = (data: LoginData) => {
    apiClient
      .post("/validate/login", data)
      .then((res) => {
        if (res.data.success) {
          login();
          navigate("/dashboard/" + res.data.id);
        } else {
          alert("Invalid credentials or user doesn't exist");
        }
      })
      .catch(() => {
        alert("Invalid credentials");
      });
  };

  return (
    <SimpleGrid pt="100px" columns={1}>
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
            <Text fontSize="1.5rem">Welcome Back</Text>
            <Text>
              Don't have an account yet?{" "}
              <Link to="/register">
                <Text display="inline" _hover={{ color: "blue.400" }}>
                  Sign up
                </Text>
              </Link>
            </Text>
            <form
              onSubmit={handleSubmit((data) => {
                handleLogin(data);
                reset();
              })}
            >
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
                Login
              </Button>
            </form>
          </CardBody>
        </Card>
      </VStack>
    </SimpleGrid>
  );
}

export default Login;
