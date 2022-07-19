import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";
import axios from "axios";
import Link from "next/link";

export default function Home({ data }) {
  const styles = {
    padding: 10,
    margin: 10,
    borderBottom: "1px solid red",
  };
  return (
    <div>
      {data.map((region, index) => (
        <div key={index} style={styles}>
          <Link href="/region/[code]" as={`/region/${region.code}`} passHref>
            <h1>{region.nom}</h1>
          </Link>
          <p>{region.code}</p>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps(context) {
  const url = "https://geo.api.gouv.fr";
  const { data } = await axios.get(url + "/regions");
  return {
    props: {
      data,
    },
  };
}
