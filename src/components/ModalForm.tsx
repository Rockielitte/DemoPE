import {
  Alert,
  Box,
  Button,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalDialog,
} from "@mui/joy";
import WarningIcon from "@mui/icons-material/Warning";
import axios from "axios";
import React from "react";
import {
  FieldValues,
  Path,
  UseFormReturn,
  SubmitHandler,
} from "react-hook-form";
import { GrUpdate } from "react-icons/gr";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { BsSend } from "react-icons/bs";
import { IoMdCreate } from "react-icons/io";
type Props<T extends FieldValues> = {
  form: UseFormReturn<T>;
  items: Path<T>[];
  trigger: string;
  endpoint: string;
  method: string;
  refetch: () => void;
  reset?: boolean;
};
const ModalForm = <T extends FieldValues>({
  form,
  items,
  trigger,
  endpoint,
  method,
  refetch,
  reset,
}: Props<T>) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const submitHandler: SubmitHandler<T> = async (value) => {
    console.log(value);
    await axios<T>({
      url: `https://6543c49601b5e279de20edcb.mockapi.io/PE/${endpoint}`,
      data: value,
      method: method,
      headers: { "content-type": "application/json" },
    })
      .then((res) => {
        toast.success("Successfully!");
        refetch && refetch();
        setOpen(false);
        reset && form.reset();
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          toast.error("UnSuccessfully");
        }
      });
  };
  return (
    <React.Fragment>
      <Button
        startDecorator={trigger == "Create" ? <IoMdCreate /> : <GrUpdate />}
        color={trigger == "Create" ? "primary" : "warning"}
        size="sm"
        variant="soft"
        onClick={() => {
          setOpen(true);
        }}
      >
        {trigger}
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle sx={{ textAlign: "center", margin: "auto" }}>
            {trigger}
          </DialogTitle>
          <DialogContent
            sx={{
              width: "400px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                md: {
                  width: "50%",
                },
                width: "100%",
                margin: "auto",
                justifyContent: "center",
                height: "100%",
                padding: "16px",
              }}
            >
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
                {items.map((item) => {
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
                              form.getValues(item as Path<T>) as Date,
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
                            {...form.register(item as Path<T>)}
                          />
                          {form.formState.errors[item as Path<T>] && (
                            <Alert
                              startDecorator={<WarningIcon />}
                              variant="soft"
                              color="danger"
                              style={{
                                marginTop: "10px",
                              }}
                            >
                              {
                                form.formState.errors[item as Path<T>]
                                  ?.message as string
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
                  loading={form.formState.isSubmitting}
                >
                  Send
                </Button>
              </form>
              ;
            </Box>
          </DialogContent>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
};
export default ModalForm;
