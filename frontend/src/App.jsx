import { Box, Flex } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";
import { UserPage } from "./pages/UserPage";
import { PostPage } from "./pages/PostPage";
import { AuthPage } from "./pages/AuthPage.jsx";
import "./index.css";
import { useRecoilValue } from "recoil";
import { loggedInUserAtom } from "./atoms/loggedInUserAtom.js";
import { UpdateProfilePage } from "./pages/UpdateProfilePage.jsx";
import { ChatPage } from "./pages/ChatPage.jsx";
import { Sidebar } from "./components/Sidebar.jsx";
import { SettingsPage } from "./pages/SettingsPage.jsx";
import { FreezeAccount } from "./pages/FreezeAccountPage.jsx";
import { FollowersPage } from "./pages/FollowersPage.jsx";
import { FollowingPage } from "./pages/FollowingPage.jsx";
import { CreatePostPage } from "./pages/CreatePostPage.jsx";
import { SearchUserPage } from "./pages/SearchUserPage.jsx";
import { HomePage } from "./pages/HomePage.jsx";

function App() {
  const loggedInUser = useRecoilValue(loggedInUserAtom);

  return (
    <>
      <Box>
        <Flex direction="row" gap={4}>
          {loggedInUser && (
            <Box w="16%">
              <Sidebar />
            </Box>
          )}
          <Box w={loggedInUser ? "84%" : "100%"} alignItems="center">
            <Routes>
              <Route
                path="/"
                element={loggedInUser ? <HomePage /> : <Navigate to="/auth" />}
              ></Route>
              <Route
                path="/auth"
                element={!loggedInUser ? <AuthPage /> : <Navigate to="/" />}
              ></Route>
              <Route
                path="/update"
                element={
                  loggedInUser ? <UpdateProfilePage /> : <Navigate to="/auth" />
                }
              ></Route>
              <Route
                path="/:username"
                element={loggedInUser ? <UserPage /> : <Navigate to="/auth" />}
              ></Route>
              <Route
                path="/search"
                element={
                  loggedInUser ? <SearchUserPage /> : <Navigate to="/auth" />
                }
              ></Route>
              <Route
                path="/create"
                element={
                  loggedInUser ? <CreatePostPage /> : <Navigate to={"/auth"} />
                }
              ></Route>

              <Route path="/:username/post/:pid" element={<PostPage />}></Route>
              <Route
                path="/chat"
                element={
                  loggedInUser ? <ChatPage /> : <Navigate to={"/auth"} />
                }
              ></Route>
              <Route
                path="/settings"
                element={
                  loggedInUser ? <SettingsPage /> : <Navigate to={"/auth"} />
                }
              ></Route>
              <Route
                path="/followers"
                element={
                  loggedInUser ? <FollowersPage /> : <Navigate to="/auth" />
                }
              ></Route>
              <Route
                path="/following"
                element={
                  loggedInUser ? <FollowingPage /> : <Navigate to="/auth" />
                }
              ></Route>
              <Route
                path="/freeze"
                element={
                  loggedInUser ? <FreezeAccount /> : <Navigate to={"/auth"} />
                }
              ></Route>
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Box>
        </Flex>
      </Box>
    </>
  );
}

export default App;
