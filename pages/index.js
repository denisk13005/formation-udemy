import axios from "axios";
import Link from "next/link";
import Head from "next/head";
import { useEffect } from "react";
// pour le problème window is not defined
import dynamic from "next/dynamic";

//exemple d'import dynamique avec un export default
const Exemple = dynamic(() => import("../components/Exemple"), { ssr: false });
//exemple d'import dynamique avec un export simple
// const Exemple = dynamic(() => import("../components/Exemple").then(mod=> mod.Exemple), { ssr: false });

export default function Home({ data }) {
  const styles = {
    padding: 10,
    margin: 10,
    borderBottom: "1px solid red",
  };
  //règle le problème de window is not defined et
  useEffect(() => {
    localStorage.setItem("jwt-token", "test123");
  }, []);
  return (
    <>
      <Head>
        <title>Liste des régions</title>
      </Head>
      <div className="container-fluid">
        <Exemple />
        <h1>Cette page utilise getServerSideProps</h1>
        {data.map((region, index) => (
          <div key={index} style={styles}>
            <Link href="/region/[code]" as={`/region/${region.code}`} passHref>
              <h1>{region.nom}</h1>
            </Link>
            <p>{region.code}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const { data } = await axios.get(`${process.env.API_GEO}/regions`);

  return {
    props: {
      data,
    },
  };
};
