import Link from "next/link";
import React from "react";

const blog = () => {
  return (
    <div>
      <ul>
        <Link href="/blog/[titre]" as={"/blog/react"} passHref>
          <li>React</li>
        </Link>
        <Link href="/blog/[titre]" as={"/blog/angular"} passHref>
          <li>Angular</li>
        </Link>
        <Link href="/blog/[titre]" as={"/blog/vue"} passHref>
          <li>Vue</li>
        </Link>
        <Link href="/blog/[titre]" as={"/blog/svelte"} passHref>
          <li>Svelte</li>
        </Link>
      </ul>
    </div>
  );
};

export default blog;
blog;
