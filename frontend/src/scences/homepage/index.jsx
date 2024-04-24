import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import Navbar from "scences/navbar";
import { useSelector } from "react-redux";
import UserWidget from "scences/widgets/UserWidget";
import MyPostWidget from "scences/widgets/MyPostWidget";
import PostsWidget from "scences/widgets/PostsWidget";
import FriendsListWidget from "scences/widgets/FriendsListWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  return (
    <Box>
      <Navbar />
      <Box
        display={isNonMobileScreens ? "flex" : "block"}
        width="100%"
        padding="2rem 6%"
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath}/>
          {/* <PostsWidget userId={_id}/> */}
        </Box>
        {isNonMobileScreens ? (
          <Box flexBasis="26%">
            <FriendsListWidget userId={_id}/>
          </Box>
        ):undefined}
      </Box>
    </Box>
  );
};

export default HomePage;
