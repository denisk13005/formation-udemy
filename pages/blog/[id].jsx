import React from "react";
import Head from "next/head";
// EX SSR
// import { useRouter } from "next/router";

//EX SSG getStaticProps
import axios from "axios";

const Titre = ({ data }) => {
  // EX SSR
  // const router = useRouter();
  // console.log(router);
  return (
    //EX SSR
    // <h1>{router.query.titre}</h1>;
    <>
      {data && (
        <>
          <Head>
            <title>{data.title}</title>
          </Head>
          <h1>{data.title}</h1>
          <div>
            <img src={data.pictures[0]} alt="" />
          </div>
          <p>{data.description}</p>
        </>
      )}
    </>
  );
};
export const getStaticPaths = async () => {
  //on fait le call api pour récupérer l'id de chaque post
  const url = "https://aqueous-meadow-07678.herokuapp.com";
  const { data } = await axios.get(`${url}/api/posts`);
  const posts = data.data;
  //on récupère l'id de chaque post que l'on retourne
  const paths = posts.map((post) => ({
    params: { id: post._id },
  }));
  //on retourne
  return { paths, fallback: true };
};
export const getStaticProps = async ({ params }) => {
  const url = "https://aqueous-meadow-07678.herokuapp.com";
  const id = params.id;
  //l'url a changé on va sur post et plus sur posts !!
  const { data } = await axios.get(`${url}/api/post/${id}`);

  return {
    props: {
      data,
    },
  };
};
export default Titre;
