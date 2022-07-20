import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import useSWR from "swr";

// EX SSR

// const NameLink = ({ nom }) => {
//   return (
//     <li>
//       <Link href={`/profile?nom=${nom}`}>
//         <a> {nom}</a>
//       </Link>
//     </li>
//   );
// };

const Profile = () => {
  //on crée la fonction fetcher pour nous permettre d'utiliser swr
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  //on utilise swr comme suit le premier paramètre est l'url de la requête qui sera réutilisé dans la fonction fetcher
  const { data, error } = useSWR(
    "https://jsonplaceholder.typicode.com/users",
    fetcher
  );
  if (!data) return <h1>Chargement ...</h1>;
  if (error) return <h1>une erreur ...</h1>;
  //EX SSR
  // const router = useRouter();
  return (
    <>
      <h1>Cette page utilise le rendu coté client </h1>
      {data &&
        data.map((user) => (
          <div key={user.id}>
            <h1>{user.name}</h1>
            <div>Email:{user.email}</div>
            <div>Telephone: {user.phone}</div>
          </div>
        ))}
    </>
  );
};

export default Profile;
