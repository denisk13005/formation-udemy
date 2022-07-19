import Link from "next/link";
import React from "react";
import PostLink from "../components/PostLink";
import { useRouter } from "next/router";

const Blog = () => {
  const router = useRouter();
  return (
    <div>
      <ul>
        <PostLink titre="react" />
        <PostLink titre="angular" />
        <PostLink titre="vue" />
        <PostLink titre="svelte" />
        <h1>{router.query.titre}</h1>
      </ul>
    </div>
  );
};

export default Blog;
