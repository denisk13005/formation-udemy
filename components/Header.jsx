import React from "react";
import Link from "next/link";

const Header = () => {
  const styles = {
    header: {
      margin: 20,
      padding: 20,
      border: "1px solid #DDD",
    },
    link: {
      margin: 15,
      cursor: "pointer",
    },
  };
  return (
    <header style={styles.header}>
      <Link href="/" passHref>
        <span style={styles.link}>Home</span>
      </Link>

      <Link href="/blog" passHref>
        <span style={styles.link}>Blog</span>
      </Link>
      <Link href="/profile" passHref>
        <span style={styles.link}>Profile</span>
      </Link>
      <Link href="/blog/items" passHref>
        <span style={styles.link}>Items</span>
      </Link>
      <Link href="/blog/categorie" passHref>
        <span style={styles.link}>Categories</span>
      </Link>
    </header>
  );
};

export default Header;
