# Réalisation de la formation udemy nextJs

`npx create-next-app`

création des différentes pages dans le répertoire page, chaque fichier dans ce répertoire sera une route

### création du composant layout

on crée le composant Layout.jsx dans lequel on place le header pour qu'il soit présent dans toutes les pages, puis on englobe notre appli avec ce composant layout dans index.js

### mise en place des Link dans header.jsx

pour ne pas passer de balise a dans une balise link il faut renseigner l'attribut passHref a la balise Link

### changer le style en fonction de la page active

importer useRouter, l'instancier, la propriété pathname de useRouter nous renvoie la page sur laquelle on se trouve, on se sert de cette propriété pour conditionner le style (voir header)

# routes dynamiques

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

# rendu coté serveur (SSR) avec getServerSideProps

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

### refacto

changement des functions getServerSideProps en fonctions fléchées , réecriture de l'url de axios en utilisant les `` ,
destructuration du paramètre context pout récupérer directement params

# Génération statique SSG

utilise getStaticProps
s'execute côté server , n'est pas inclus dans le bundle js
est appelé à la construction
html rendu à la construction

Le paramètre context de getStaticProps contient 3 paramètres :
-params
-query
-preview

on peut utiliser `revalidate` pour rafraichier la page toutes les x secondes (défini par la valeur donnée à revalidate)

### utilisation de getStaticProps

on utilise getStaticProps de la même manière que getServerSideProps, dans le fichier blog.js on fait appel à une api pour récupérer des posts avec axios

en mode dev se comporte comme getServerSideProps (fait une requête à chaque action), en mode prod ne s'appliquera qu'à la construction de l application

### route dynamique avec getStaticProps

Si une page a des routes dynamiques elle doit définir une liste de chemin qui doivent être rendi en html au moment de la construction

Si vous exportez `getStaticProps` à partur d'une oage qui utilise des routes dynamiques, Next pré-rendra statiquement tous les chemins spécifiés par `getStaticPaths` (préconstruira les pages html de ces chemins )

toujours mettre `fallback` a true pour que les nouvelles routes ajoutées ultérieurement soit disponible dans la route dynamique !

## Création de la route dynamique pour chaque post

on renomme le fichier /blog/[titre] en [id]
On met l'image dans une balise Link qui nous ménera au post souhaitez grâce à son id passer en paramètre

on renseigne le getStaticPaths dans /blog/[id] , on récupère les id de chaque post pour générer les routes de chaque correspondant grace au .map qu'on retoure en params

veillez a bien respecter la syntaxe params id ...

une fois qu'on a extrait l'id du post on fait la requête axios dans getStaticProps pour récupérer les données relatives a ce post

du coup l'url a changé et est maintenant sur post et non plus sur posts !!!

on récupère les données du post sélectionné pour construire la page avec

Toutes les pages qui ne contiennent pas getServerSideProps seront servies comme statiques

# getInitialProps SSR

Une page qui contient la fonction getInitialProps est rendu coté serveur, il est l'équivalent de getServerSideProps et était utilisé par défaut dans les versions antérieures de Next.js pour récupérer les données. Elle s'execute coté serveur et coté client.

Depuis la version 9.3, Next a introduit getServerSideProps et GetStaticProps (getStaticPaths) qui ne s'éxecute que coté serveur
