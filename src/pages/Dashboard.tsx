import { Box, Table } from "@mui/joy";
import React from "react";
import useFetch from "../hooks/useFetch";
import Loading from "../components/Loading";
type Props = {};
import { DataType, arrayKey } from "../types";
import RowItem from "../components/RowItem";
import { z } from "zod";
import ModalForm from "../components/ModalForm";
import { useForm, Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2),
  age: z.coerce.number().min(1),
  avatar: z.string().url().min(1),
  createdAt: z.date().default(new Date()),
  address: z.string().min(1),
});
type formSchemaType = z.infer<typeof formSchema>;
const Dashboard = (props: Props) => {
  const data = useFetch<DataType[]>({
    endpoint: "PE",
  });
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      name: "",
      age: 0,
      avatar: "",
      createdAt: new Date(),
      address: "",
    },
  });
  return (
    <>
      {data.error ? (
        <Loading isError />
      ) : data.isLoading ? (
        <Loading />
      ) : (
        <>
          <Box textAlign={"end"}>
            <ModalForm
              refetch={data.refecth}
              items={arrayKey.slice(1) as Path<formSchemaType>[]}
              method="POST"
              trigger="Create"
              form={form}
              endpoint={""}
              reset
            />
          </Box>

          <Table
            aria-label="basic table"
            style={{
              overflow: "auto",
            }}
          >
            <thead>
              <tr>
                {arrayKey.map((item) => (
                  <th
                    key={item}
                    style={{
                      textTransform: "capitalize",
                    }}
                  >
                    {item}
                  </th>
                ))}
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody
              style={{
                overflow: "auto",
              }}
            >
              {data.data &&
                data?.data.map((item, index) => (
                  <RowItem key={item.id} item={item} refetch={data.refecth} />
                ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default Dashboard;
