import React from "react";
import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import CardIemDetail from "../components/CardDetail";
import { DataType } from "../types";

type Props = {};

const Details = (props: Props) => {
  const getParams = useParams();
  const data = useFetch<DataType>({
    endpoint: `PE/${getParams.slug}`,
  });
  return (
    <>
      {data.error ? (
        <Loading isError />
      ) : data.isLoading ? (
        <Loading />
      ) : (
        <CardIemDetail item={data.data as DataType} />
      )}
    </>
  );
};

export default Details;
