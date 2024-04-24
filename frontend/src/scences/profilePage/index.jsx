import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scences/navbar";
import FriendsListWidget from "scences/widgets/FriendsListWidget";
import MyPostWidget from "scences/widgets/MyPostWidget";
import PostsWidget from "scences/widgets/PostsWidget";
import UserWidget from "scences/widgets/UserWidget";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };
  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if(!user) return null;
  return <Box>
    <Navbar />
    <Box
        display={isNonMobileScreens ? "flex" : "block"}
        width="100%"
        padding="2rem 6%"
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <FriendsListWidget userId={userId}/>
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={user.picturePath}/>
          <Box m="2rem 0" />
          {/* <PostsWidget userId={userId} isProfile/> */}
        </Box>
        
      </Box>
  </Box>;
};

export default ProfilePage;
