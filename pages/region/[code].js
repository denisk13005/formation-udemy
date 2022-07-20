import React from "react";
import axios from "axios";

const CodeRegion = ({ code }) => {
  return (
    <div>
      <h1>{code.nom}</h1> <p>{code.code}</p>
    </div>
  );
};
export const getServerSideProps = async ({ params }) => {
  const code = params.code; // on va extraire de l'url code
  const url = "https://geo.api.gouv.fr";
  const { data } = await axios.get(`${url}/regions/${code}`);
  return {
    props: {
      code: data,
    },
  };
};

export default CodeRegion;
