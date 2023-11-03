import { z } from "zod";
import { DataType, arrayKey } from "../types";
import { useForm, Path, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import WarningIcon from "@mui/icons-material/Warning";
import { toast } from "react-toastify";
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Typography,
} from "@mui/joy";
import { IoMdCreate } from "react-icons/io";
import { BsSend } from "react-icons/bs";
import { format } from "date-fns";
import axios from "axios";
type Props = {};
const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2),
  age: z.coerce.number().min(1),
  avatar: z.string().url().min(1),
  createdAt: z.date().default(new Date()),
  address: z.string().min(1),
});
type formSchemaType = z.infer<typeof formSchema>;
const Add = (props: Props) => {
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      createdAt: new Date(),
    },
  });
  const submitHandler: SubmitHandler<formSchemaType> = async (value) => {
    console.log(value);
    await axios<DataType>({
      url: `https://6543c49601b5e279de20edcb.mockapi.io/PE`,
      data: value,
      method: "POST",
      headers: { "content-type": "application/json" },
    })
      .then((res) => {
        toast.success("Successfully!");

        //   refetch && refetch();
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          toast.error("UnSuccessfully");
        }
      });
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        md: {
          width: "50%",
        },
        width: "80%",
        margin: "auto",
        justifyContent: "center",
        height: "100%",
        padding: "16px",
      }}
    >
      <Typography
        level="title-lg"
        color="primary"
        endDecorator={<IoMdCreate />}
        margin={"auto"}
        textAlign="center"
        textTransform={"uppercase"}
      >
        Create
      </Typography>
      <form
        onSubmit={form.handleSubmit(submitHandler)}
        style={{
          height: "70%",
          width: "100%",
          overflow: "auto",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {arrayKey.slice(1).map((item) => {
          switch (item) {
            case "createdAt": {
              return (
                <FormControl>
                  <FormLabel
                    sx={(theme) => ({
                      textTransform: "capitalize",
                      fontWeight: "800",
                    })}
                  >
                    {item}
                  </FormLabel>
                  <Input
                    value={format(
                      form.getValues(item as Path<formSchemaType>) as Date,
                      "PPP"
                    )}
                  />
                </FormControl>
              );
            }
            default: {
              return (
                <FormControl>
                  <FormLabel
                    sx={(theme) => ({
                      textTransform: "capitalize",
                      fontWeight: "800",
                    })}
                  >
                    {item}
                  </FormLabel>
                  <Input
                    placeholder={`Enter your ${item} . . .`}
                    {...form.register(item as Path<formSchemaType>)}
                  />
                  {form.formState.errors[item as Path<formSchemaType>] && (
                    <Alert
                      startDecorator={<WarningIcon />}
                      variant="soft"
                      color="danger"
                      style={{
                        marginTop: "10px",
                      }}
                    >
                      {
                        form.formState.errors[item as Path<formSchemaType>]
                          ?.message
                      }
                    </Alert>
                  )}
                </FormControl>
              );
            }
          }
        })}
        <Button
          type="submit"
          sx={{ mt: 1 /* margin top */ }}
          startDecorator={<BsSend />}
        >
          Send
        </Button>
      </form>
      ;
    </Box>
  );
};

export default Add;
