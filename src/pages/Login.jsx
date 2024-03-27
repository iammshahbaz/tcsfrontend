import { useState } from "react";
import { useDispatch } from 'react-redux';
import axios from "axios";
import {
    Flex,
    Heading,
    Input,
    Button,
    InputGroup,
    Stack,
    InputLeftElement,
    chakra,
    Box,
    Avatar,
    FormControl,
    FormHelperText,
    InputRightElement,
    useToast
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "../redux/action-types";
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const handleShowClick = () => setShowPassword(!showPassword);
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const toast = useToast();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: LOGIN_REQUEST });
        try {
            const response = await axios.post('https://nice-bee-leg-warmers.cyclic.app/users/login', {
                email: email,
                password: password
            });
            if (response && response.data.token) {
                localStorage.setItem('token', response.data.token);
                dispatch({ type: LOGIN_SUCCESS });
                toast({
                    title: "Login Successful",
                    description: "You have successfully loggedIn.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
                navigate('/dashboard')
            }
            console.log(response.data);
        } catch (error) {
            console.error('Error:', error);
            dispatch({ type: LOGIN_FAILURE });
            toast({
                title: "Login Failed",
                description: "Invalid email or password.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Flex
            flexDirection="column"
            width="100wh"
            height="100vh"
            backgroundColor="gray.200"
            justifyContent="center"
            alignItems="center"
        >
            <Stack
                flexDir="column"
                mb="2"
                justifyContent="center"
                alignItems="center"
            >
                <Heading color="blue.400">Login</Heading>
                <Box minW={{ base: "90%", md: "468px" }}>
                    <form>
                        <Stack
                            spacing={4}
                            p="1rem"
                            backgroundColor="whiteAlpha.900"
                            boxShadow="md"
                        >
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<CFaUserAlt color="gray.300" />}
                                    />
                                    <Input onChange={(e) => setemail(e.target.value)} type="email" placeholder="Enter Email" />
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        color="gray.300"
                                        children={<CFaLock color="gray.300" />}
                                    />
                                    <Input onChange={(e) => setpassword(e.target.value)}
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                                            {showPassword ? "Hide" : "Show"}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                
                            </FormControl>
                            <Button
                                borderRadius={0}
                                type="submit"
                                variant="solid"
                                colorScheme="blue"
                                width="full"
                                onClick={handleSubmit}
                            >
                                Login
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Stack>
            <Box>
                Dont have an account?{" "}
                <RouterLink to="/signup" style={{ color: "#319795" }}>
                    Sign Up
                </RouterLink>

            </Box>
        </Flex>
    );
};

export default Login;