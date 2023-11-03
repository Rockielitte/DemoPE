import { Box, Stack } from "@mui/joy";
import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
type Props = {
  children?: React.ReactNode;
};

const MainLayout = (props: Props) => {
  return (
    <Box>
      <Stack
        sx={{
          height: "100vh",
          bgcolor: "",
        }}
        display={"flex"}
        direction={"column"}
      >
        <NavBar />
        <Box
          sx={{
            flex: 1,
            p: "10px",
            overflow: "auto",
          }}
        >
          {props.children ? props.children : <Outlet />}
        </Box>
        <Footer />
      </Stack>
    </Box>
  );
};

export default MainLayout;
