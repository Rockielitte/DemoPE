import { Box, Button, Link, Sheet, Stack } from "@mui/joy";
import { relative } from "path";
import React, { useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";
type Props = {};

const NavBar = (props: Props) => {
  const navLink = useMemo(
    () => [
      {
        name: "Home",
        linkTo: "/",
      },
      {
        name: "Dashboard",
        linkTo: "/dashboard",
      },
      {
        name: "Contact",
        linkTo: "/contact",
      },
      {
        name: "Add",
        linkTo: "/add",
      },
    ],
    []
  );

  return (
    <Box>
      <Sheet
        color="primary"
        sx={(theme) => ({
          display: "flex",
          gap: "8px",
          alignItems: "center",
          py: "10px",
          px: "10px",
          boxShadow: theme.vars.shadow.lg,
        })}
      >
        {navLink.map((item) => (
          <Button
            variant="plain"
            key={item.name}
            component={RouterLink}
            to={item.linkTo}
          >
            {item.name}
          </Button>
        ))}
      </Sheet>
    </Box>
  );
};

export default NavBar;
