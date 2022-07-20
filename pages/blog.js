import Link from "next/link";
import React from "react";
// EX SSR
// import PostLink from "../components/PostLink";
// import { useRouter } from "next/router";
// EX SSG
import axios from "axios";

const Blog = ({ posts }) => {
  const styles = {
    main: {
      padding: 20,
      margin: 20,
      borderBottom: "1px solid #DDD",
    },
    img: {
      height: 200,
      width: 300,
    },
  };
  // const router = useRouter(); //utilisé avec le ssr//
  return (
    <>
      {/* EXEMPLE SSR 1 ERE PARTIE DE LA FORMATION */}
      {/* <ul> */}
      {/* <PostLink titre="react" />
        <PostLink titre="angular" />
        <PostLink titre="vue" />
        <PostLink titre="svelte" />
        <h1>{router.query.titre}</h1> */}
      {/* </ul> */}
      {posts.map((post) => (
        <div key={post._id} style={styles.main}>
          <h1>{post.title}</h1>
          <Link href={`/blog/[id]`} as={`/blog/${post._id}`} passHref>
            <div>
              <img src={post.pictures[0]} style={styles.img} />
            </div>
          </Link>
          <div>{post.body}</div>
        </div>
      ))}
    </>
  );
};
export const getStaticProps = async (context) => {
  const url = "https://aqueous-meadow-07678.herokuapp.com";
  const { data } = await axios.get(`${url}/api/posts`);
  const posts = data.data;
  return {
    props: {
      posts,
    },
  };
};

export default Blog;
