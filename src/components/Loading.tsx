import { Box, Button, IconButton, Typography } from "@mui/joy";
import ErrorIcon from "@mui/icons-material/Error";
type Props = {
  label?: string;
  isError?: boolean;
};
const Loading = ({ label, isError }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        gap: "4px",
      }}
    >
      {!isError ? (
        <Typography
          level="title-md"
          startDecorator={<Button loading variant="plain" />}
        >
          {label ? label : "Loading resource . . ."}
        </Typography>
      ) : (
        <Typography
          level="title-md"
          startDecorator={
            <IconButton variant="plain" color="danger">
              <ErrorIcon />
            </IconButton>
          }
          color="danger"
          fontWeight={600}
        >
          {label ? label : "Oops, something wrongs !"}
        </Typography>
      )}
    </Box>
  );
};

export default Loading;
