import React from "react";
import Link from "next/link";

const PostLink = ({ titre }) => {
  return (
    <li>
      {/* exemple avec paramètre d'url */}
      {/* <Link href="/blog/[titre]" as={`/blog/${titre}`}>
        <a>{titre}</a>
      </Link> */}
      {/* exemple avec paramètre de requête */}
      <Link href={`/blog/?titre=${titre}`}>
        <a>{titre}</a>
      </Link>
    </li>
  );
};

export default PostLink;
