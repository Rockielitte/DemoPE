type Props = {
  item: DataType;
  refetch: (query?: string | undefined) => void;
};
import { DataType, arrayKey } from "../types";
import { format } from "date-fns";
import AlertDialogModal from "./AlertModal";
import ModalForm from "./ModalForm";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { Path, useForm } from "react-hook-form";
const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2),
  age: z.coerce.number().min(1),
  avatar: z.string().url().min(1),
  createdAt: z.date().default(new Date()),
  address: z.string().min(1),
});
type formSchemaType = z.infer<typeof formSchema>;
const RowItem = ({ item, refetch }: Props) => {
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: item.id,
      name: item.name,
      age: item.age,
      avatar: item.avatar,
      createdAt: new Date(item.createdAt),
      address: item.address,
    },
  });
  return (
    <>
      <tr>
        {arrayKey.map((key) => {
          switch (key) {
            case "avatar": {
              return (
                <td>
                  <img
                    src={item[key]}
                    alt="avt"
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      borderRadius: "999px",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  />
                </td>
              );
            }
            case "createdAt": {
              return <td>{format(new Date(item[key]), "PPP")}</td>;
            }
            default: {
              return <td>{item[key as keyof DataType] as string}</td>;
            }
          }
        })}

        <td>
          <ModalForm
            refetch={refetch}
            items={arrayKey as Path<formSchemaType>[]}
            method="PUT"
            trigger="Update"
            form={form}
            endpoint={item.id}
          />
        </td>
        <td>
          <AlertDialogModal refetch={refetch} id={item.id} />
        </td>
      </tr>
    </>
  );
};

export default RowItem;
