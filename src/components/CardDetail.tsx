import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import BookmarkAdd from "@mui/icons-material/BookmarkAddOutlined";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Box, Stack } from "@mui/joy";
import { DataType } from "../types";
type Props = {
  item: DataType;
};

const CardIemDetail = ({ item }: Props) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
      }}
    >
      <Stack
        display={"flex"}
        sx={{
          width: "100%",
          height: "100%",
          alignItems: "center",
        }}
        gap={4}
        direction={{ default: "column", md: "row" }}
      >
        <AspectRatio
          sx={(theme) => ({
            width: "100%",
            borderRadius: "20px",
            boxShadow: theme.vars.shadow.lg,
            md: {
              width: "50%",
            },
          })}
        >
          <img
            src={
              item.avatar ||
              "https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
            }
            loading="lazy"
            alt=""
          />
        </AspectRatio>
        <Box
          sx={{
            width: "100%",
            md: {
              width: "50%",
            },
          }}
        >
          <div>
            <Typography level="h1">{item.name}</Typography>
            <Typography level="body-sm">{item.address}</Typography>
            <Typography level="body-sm" startDecorator="Age: ">
              {item.age}
            </Typography>
            <IconButton
              aria-label="bookmark Bahamas Islands"
              variant="plain"
              color="neutral"
              size="sm"
              sx={{ position: "absolute", top: "0.875rem", right: "0.5rem" }}
            >
              {/* <BookmarkAdd /> */}
            </IconButton>
          </div>
          <CardContent orientation="horizontal">
            <div>
              <Typography level="body-xs">Created at:</Typography>
              <Typography fontSize="lg" fontWeight="lg">
                {format(new Date(item.createdAt), "PPP")}
              </Typography>
            </div>
            {/* <Button
              component={Link}
              variant="solid"
              size="md"
              color="primary"
              aria-label="Explore Bahamas Islands"
              sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
              to={`/details/${item.id}`}
            >
              Explore
            </Button> */}
          </CardContent>
        </Box>
      </Stack>
    </Box>
  );
};

export default CardIemDetail;
