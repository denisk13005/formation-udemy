# Réalisation de la formation udemy nextJs

`npx create-next-app`

création des différentes pages dans le répertoire page, chaque fichier dans ce répertoire sera une route

### création du composant layout

on crée le composant Layout.jsx dans lequel on place le header pour qu'il soit présent dans toutes les pages, puis on englobe notre appli avec ce composant layout dans index.js

### mise en place des Link dans header.jsx

pour ne pas passer de balise a dans une balise link il faut renseigner l'attribut passHref a la balise Link

### changer le style en fonction de la page active

importer useRouter, l'instancier, la propriété pathname de useRouter nous renvoie la page sur laquelle on se trouve, on se sert de cette propriété pour conditionner le style (voir header)

### routes dynamiques

routes qui changent en fonction des paramètres d'url ou des paramètres de requêtes ! les routes dynamique doivent être entre crochets [titre].js par exemple

### routes dynamique avec paramètre d'url

on peut déclarer la même url pour plusieur Link en renseignant ensuite l'attribut 'as' qui indiquera au routeur quelle adresse entrer en url

ex :

```
<Link href = '/blog/[titre] as = {'/blog/react'}>react</Link>
<Link href = '/blog/[titre] as = {'/blog/angular'}>angular</Link>

```

pour récupérer le titre de la page dynamique on se sert de router.querry.titre (voir /blog/[titre.jsx])

on a refactorisé le code pour créer le composant PostLink

### routes dynamique avec paramètre de requête

on lève le as de la balise Link et on remplace href par {`/blog?titre=${titre}`} on a introduit le point d'intérogation !
on peut récuérer les paramètres de reaquête avec router.querry.titre pour les afficher directement sur la page

### rendu coté serveur (SSR) avec getServerSideProps

ne s'execute que côté serveur
est appelé à chaque requête
la fonction contient un paramètre context qui contient plusieur paramètre : (params , req, res, query, preview)

### récupération de données grace a getServerSideProps

on installe axios !
on va utilisé l'api-geo du gouvernement
on va sur api.gouv ....
on récupère l'url de base
on va sur index.js (page home) et on implémente la fonction getServerSideProps on return en props l'objet qui nous intéresse et on le passe en props à notre composant de page

### routes dynamique avec getServerSideProps

on crée le dossier region et le fichier dynamique [code].js
on crée un link avec un paramètre d'url donc avec as qui va nous permettre de passer dans l'url le code du département afin que l'on puisse le récupérer dans la page dynamiquement créée pour afficher les données relative a ce département , on récupère ça vec getServerSideProps en passant dynamiquement le numéro du département dans le get axios grace au paramètre context qui contient le paramètre params duquel on va extraire le numéro du département de l'url ;)
