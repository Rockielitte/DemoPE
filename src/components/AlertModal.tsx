import * as React from "react";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DeleteForever from "@mui/icons-material/DeleteForever";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import axios from "axios";
import {toast} from "react-toastify"
type Props={
    refetch?:()=>void,
    id:string
}
export default function AlertDialogModal({refetch,id}:Props) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [isLoading,setIsLoading]=React.useState(false)
  return (
    <React.Fragment>
      <Button
        variant="soft"
        color="danger"
        endDecorator={<DeleteForever />}
        onClick={() => setOpen(true)}
      >
        Delete
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRoundedIcon />
            Confirmation
          </DialogTitle>
          <Divider />
          <DialogContent>
            Are you sure you want to delete this item?
          </DialogContent>
          <DialogActions>
            <Button
            loading={isLoading}
              variant="solid"
              color="danger"
              onClick={() => {
                setIsLoading(true)
                axios({
                  url: `https://6543c49601b5e279de20edcb.mockapi.io/PE/${id}`,
                  method: "DELETE",
                  headers: { "content-type": "application/json" },
                })
                  .then(() => {
                    toast.success("Delete successfully !");
                    setOpen(false)
                    setIsLoading(false)
                    refetch && refetch();
                  })
                  .catch((err) => {
                    if (axios.isAxiosError(err)) {
                      toast.error("Delete error !");
                      setIsLoading(false)
                    }
                  });
              }}
            >
              Delete
            </Button>
            <Button
              variant="plain"
              color="neutral"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
