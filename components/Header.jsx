import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/header.module.css";

const Header = () => {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <Link href="/" passHref>
        <span className={router.pathname === "/" ? styles.active : styles.link}>
          Home
        </span>
      </Link>

      <Link href="/blog" passHref>
        <span
          className={router.pathname === "/blog" ? styles.active : styles.link}
        >
          Blog
        </span>
      </Link>
      <Link href="/profile" passHref>
        <span
          className={
            router.pathname === "/profile" ? styles.active : styles.link
          }
        >
          Profile
        </span>
      </Link>
      <Link href="/blog/items" passHref>
        <span
          className={
            router.pathname === "/blog/items" ? styles.active : styles.link
          }
        >
          Items
        </span>
      </Link>
      <Link href="/blog/categorie" passHref>
        <span
          className={
            router.pathname === "/blog/categorie" ? styles.active : styles.link
          }
        >
          Categories
        </span>
      </Link>

      {/* styled jsx  */}
      {/* <style jsx>
        {`
          .header {
            margin: 20px;
            padding: 20px;
            border: 1px solid red;
          }
        `}
      </style> */}
    </header>
  );
};

export default Header;
