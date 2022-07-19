import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const NameLink = ({ nom }) => {
  return (
    <li>
      <Link href={`/profile?nom=${nom}`}>
        <a> {nom}</a>
      </Link>
    </li>
  );
};

const Profile = () => {
  const router = useRouter();
  return (
    <div>
      <NameLink nom="john Doe" />
      <NameLink nom="james Si" />
      <NameLink nom="franck La" />
      <NameLink nom="jesse Mi" />
      <h1>{router.query.nom}</h1>
    </div>
  );
};

export default Profile;
