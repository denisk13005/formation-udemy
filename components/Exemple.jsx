const Exemple = () => {
  return <div>{JSON.stringify(localStorage.getItem("jwt-token"))}</div>;
};

export default Exemple;
