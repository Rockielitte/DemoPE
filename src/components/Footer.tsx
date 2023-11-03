import { Sheet, Typography } from "@mui/joy";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <Sheet
      color="primary"
      sx={{
        p: "8px",
        display: "flex",
        justifyContent: "center",
        boxShadow: "10px",
        fontWeight: "400",
        fontSize: "16px",
      }}
    >
      <Typography
        color="primary"
        level="body-xs"
        fontWeight={"600"}
        endDecorator="@ SE171198"
      >
        CopyRight
      </Typography>
    </Sheet>
  );
};

export default Footer;
