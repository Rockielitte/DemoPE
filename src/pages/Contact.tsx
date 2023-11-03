import { Box, FormControl, FormLabel, Input, Sheet, Textarea } from "@mui/joy";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import { BsSend } from "react-icons/bs";
type Props = {};

const Contact = (props: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "50%",
        margin: "auto",
        justifyContent: "center",
        height: "100%",
        padding: "10px",
      }}
    >
      <Typography
        level="h3"
        component="h1"
        textAlign={"center"}
        color="primary"
        sx={{
          textTransform: "uppercase",
          fontWeight: "900",
        }}
      >
        Contact me
      </Typography>

      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
          name="email"
          type="email"
          placeholder="johndoe@email.com"
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel>Message</FormLabel>
        <Textarea
          placeholder="Please leave your message here . . . "
          minRows={4}
        />
      </FormControl>
      <Button sx={{ mt: 1 /* margin top */ }} startDecorator={<BsSend />}>
        Send{" "}
      </Button>
    </Box>
  );
};

export default Contact;
