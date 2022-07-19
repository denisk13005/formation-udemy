import React from "react";
import axios from "axios";
import { useRouter } from "next/router";

const CodeRegion = ({ data }) => {
  return (
    <div>
      <h1>{data.nom}</h1> <p>{data.code}</p>
    </div>
  );
};
export async function getServerSideProps(context) {
  const code = context.params.code; // on va extraire de l'url code
  const url = "https://geo.api.gouv.fr";
  const { data } = await axios.get(url + "/regions/" + code);
  return {
    props: {
      data,
    },
  };
}

export default CodeRegion;
