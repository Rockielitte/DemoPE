import { Grid } from "@mui/joy";
import React from "react";
import CardIem from "../components/Card";
import Loading from "../components/Loading";
import useFetch from "../hooks/useFetch";
import { DataType } from "../types";
type Props = {};
const index = (props: Props) => {
  const data = useFetch<DataType[]>({
    endpoint: "PE",
  });
  return (
    <>
      {data.error ? (
        <Loading isError />
      ) : data.isLoading ? (
        <Loading />
      ) : (
        <Grid container spacing={2}>
          {data?.data?.map((item) => {
            return (
              <Grid xs={12} sm={6} md={3} key={item.id}>
                <CardIem item={item} />
              </Grid>
            );
          })}
        </Grid>
      )}
    </>
  );
};

export default index;
