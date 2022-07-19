import React from "react";
import { useRouter } from "next/router";

const Titre = () => {
  const router = useRouter();
  console.log(router);
  return <h1>{router.query.titre}</h1>;
};

export default Titre;
