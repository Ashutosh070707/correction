import { Avatar, Box, Flex, Image, Link, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Actions } from "./Actions";
import { useShowToast } from "../../hooks/useShowToast";
import { formatDistanceToNow } from "date-fns";
import { useRecoilValue } from "recoil";
import { loggedInUserAtom } from "../atoms/loggedInUserAtom";
import { DeletePost } from "./DeleteButton";

export const Post = ({ post, postedBy }) => {
  const [user, setUser] = useState(null);
  const showToast = useShowToast();
  const loggedInUser = useRecoilValue(loggedInUserAtom);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch("/api/users/profile/" + postedBy);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setUser(data);
      } catch (error) {
        showToast("Error", error, "error");
        setUser(null);
      }
    };
    getUser();
  }, [postedBy, showToast]);

  if (!user) return null;

  return (
    <Box mt="6%" mb="6%" borderRadius={6}>
      <Flex direction={"column"} gap={4}>
        <Flex justifyContent={"space-between"}>
          <Link
            as={RouterLink}
            to={`/${user.username}`}
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
          >
            <Flex gap={4}>
              {user.profilePic && (
                <Avatar
                  name={user.name}
                  src={user.profilePic}
                  size="md"
                ></Avatar>
              )}
              {!user.profilePic && (
                <Avatar
                  name={user.name}
                  src="https://example.com/default-avatar.png"
                  size="md"
                ></Avatar>
              )}
              <Flex gap={1} justifyContent="center" alignItems="center">
                <Text fontSize={"sm"} fontWeight={"bold"}>
                  {user?.username}
                </Text>
                <Image src="/verified.png" w="4" h={4}></Image>
              </Flex>
            </Flex>
          </Link>

          <Flex alignItems="center" justifyContent="center">
            <Text fontSize="sm" color={"gray.light"} mr="10px">
              {formatDistanceToNow(new Date(post.createdAt)).replace(
                "about ",
                ""
              )}{" "}
              ago
            </Text>
          </Flex>
        </Flex>
        <Flex justifyContent="center">
          <Flex gap={4} direction="column" w="95%">
            <Link
              as={RouterLink}
              to={`/${user.username}/post/${post._id}`}
              textDecoration={"none"}
              _hover={{ textDecoration: "none" }}
            >
              <Text fontSize={"sm"} mb="2%">
                {post.text}
              </Text>
              {post.img && (
                <Box borderRadius={6} overflow={"hidden"}>
                  <Image
                    src={post.img}
                    w={"full"}
                    h={"300px"}
                    objectFit={"contain"}
                  ></Image>
                </Box>
              )}
            </Link>
          </Flex>
          {post.postedBy === loggedInUser._id && (
            <Flex justifyContent="center">
              <DeletePost post={post} />
            </Flex>
          )}
        </Flex>
        <Flex gap={1}>
          <Actions post={post}></Actions>
        </Flex>
        <Box
          border="1px solid"
          mt="2%"
          borderRadius={10}
          borderColor="gray.600"
        ></Box>
      </Flex>
    </Box>
  );
};
