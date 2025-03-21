import { Avatar, Divider, Flex, Link, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useShowToast } from "../../hooks/useShowToast";
import { Link as RouterLink } from "react-router-dom";

export const Comment = ({ reply, lastReply }) => {
  const [user, setUser] = useState(null);
  const showToast = useShowToast();
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${reply.userId}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setUser(data);
      } catch (error) {
        showToast("Error", error, "error");
      }
    };

    getUser();
  }, [reply]);

  if (!user) return null;
  return (
    <Flex w={"full"} gap={3}>
      <Link
        as={RouterLink}
        to={`/${user.username}`}
        textDecoration="none"
        _hover={{ textDecoration: "none" }}
      >
        {user.profilePic && (
          <Avatar
            name={user.name}
            src={user.profilePic}
            boxSize={{ base: "40px", sm: "50px" }}
          ></Avatar>
        )}
        {!user.profilePic && (
          <Avatar
            name={user.name}
            src="https://example.com/default-avatar.png"
            boxSize={{ base: "40px", sm: "50px" }}
          ></Avatar>
        )}
      </Link>
      <Flex gap={1} w={"full"} flexDirection={"column"}>
        <Flex alignItems={"center"} overflow="hidden">
          <Link
            as={RouterLink}
            to={`/${user.username}`}
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
            overflow="hidden"
          >
            <Text
              fontSize="sm"
              fontWeight="bold"
              isTruncated
              wordBreak="break-word"
              overflowWrap="break-word"
            >
              {user.username}
            </Text>
          </Link>
        </Flex>
        <Text
          fontSize={{ base: "xs", sm: "sm" }}
          isTruncated
          wordBreak="break-word"
          overflowWrap="break-word"
        >
          {reply.text}
        </Text>
      </Flex>

      {!lastReply && <Divider my={2} mb={"10px"}></Divider>}
      {lastReply && <Text mb="20%"></Text>}
    </Flex>
  );
};
