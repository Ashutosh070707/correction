import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Link,
  Switch,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

export const SettingsPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex w="full" justifyContent="center">
      <Box
        w="90%"
        alignItems="center"
        mt={8}
        border="1px"
        borderRadius={10}
        // bgColor="#343434"
      >
        <Grid
          templateRows="repeat(5, 1fr)"
          templateColumns="repeat(1, 1fr)"
          gap={2}
        >
          <GridItem>
            <Link
              as={RouterLink}
              to="/followers"
              textDecoration={"none"}
              _hover={{ textDecoration: "none" }}
            >
              <Flex
                justifyContent="space-between"
                alignItems="center"
                borderRadius={10}
                h="60px"
              >
                <Text fontSize="20px" m="25px">
                  Followers
                </Text>
                <Box m="3%">
                  <FaArrowRight size={20} />
                </Box>
              </Flex>
            </Link>
            <Divider w="full" h="1px" bgColor={"white"}></Divider>
          </GridItem>

          <GridItem>
            <Link
              as={RouterLink}
              to="/following"
              textDecoration={"none"}
              _hover={{ textDecoration: "none" }}
            >
              <Flex
                justifyContent="space-between"
                alignItems="center"
                borderRadius={10}
                h="60px"
              >
                <Text fontSize="20px" m="25px">
                  Following
                </Text>
                <Box m="3%">
                  <FaArrowRight size={20} />
                </Box>
              </Flex>
            </Link>
            <Divider w="full" h="1px" bgColor={"white"}></Divider>
          </GridItem>
          <GridItem>
            <Link
              as={RouterLink}
              to="/update"
              textDecoration={"none"}
              _hover={{ textDecoration: "none" }}
            >
              <Flex
                justifyContent="space-between"
                alignItems="center"
                borderRadius={10}
                h="60px"
              >
                <Text fontSize="20px" m="25px">
                  Update Profile
                </Text>
                <Box m="3%">
                  <FaArrowRight size={20} />
                </Box>
              </Flex>
            </Link>
            <Divider w="full" h="1px" bgColor={"white"}></Divider>
          </GridItem>
          <GridItem>
            <Flex
              justifyContent="space-between"
              alignItems="center"
              borderRadius={10}
              h="60px"
            >
              <Text fontSize="20px" m="25px">
                Appearance
              </Text>
              <Box m="3%">
                <Switch
                  isChecked={colorMode === "dark"}
                  onChange={toggleColorMode}
                  colorScheme="blue"
                />
              </Box>
            </Flex>
            <Divider w="full" h="1px" bgColor={"white"}></Divider>
          </GridItem>
          <GridItem>
            <Link
              as={RouterLink}
              to="/freeze"
              textDecoration={"none"}
              _hover={{ textDecoration: "none" }}
            >
              <Flex
                justifyContent="space-between"
                alignItems="center"
                borderRadius={10}
                h="60px"
              >
                <Text fontSize="20px" m="25px">
                  Freeze Account
                </Text>
                <Box m="3%">
                  <FaArrowRight size={20} />
                </Box>
              </Flex>
            </Link>
          </GridItem>
        </Grid>
      </Box>
    </Flex>
  );
};
