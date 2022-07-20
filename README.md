# Réalisation de la formation udemy nextJs

`npx create-next-app`

création des différentes pages dans le répertoire page, chaque fichier dans ce répertoire sera une route

Les images devront être placées dans le répertoire public/images

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

C'est la seule fontion que l'on peut utiliser dans le fichier \_app.js

# hook personnalisé SWR de next rendu coté client CSR

permet la mise en cache et la revalidation des données

il faut l'installer avec `npm install swr`

permet la récupération des données coté client

on l'implémente dans le fichier profile.jsx en déclaratn une fonction fetcher qui dépendra de l'url rentrée en premier paramètre de useSWR

# Comment choisir un rendu

## SSR

Vous ne devez utiliser getServerSideProps que si vous avez besoin de pré-rendre une page dont les données doivent être récupérées au moment de la demande. Le temps jusqu'au premier octet (TTFB) sera plus lent que getStaticProps car le serveur doit caluculer le résultat à chaque demande et le résultat ne peut pa être mis en cache par un CDN sans config supplémentaire

## SSG

Les données requises pour afficher la page sont disponible au moment de la création avant la demande d'un utilisateur.

Si les données proviennent de Headless CMS (strappi) ou d'autres CMS (wordpress)

Si les données peuvent être mises en cache publiquement

## SSR avec getInitialProps

On ne l'utilisera très rarement
Utile pour utiliser Redux coté serveur et coté client
Si vous utiliser l'internationalisation du site avec i18n (librairie )
Si vous utilisz d'autres librairies tiers qui requièrent getInitialProps

## CSR

Si votre page contient des données fréquemment mise à jour et que vous n'avez pas besoin de pré-afficher les données, vous pouvez récupérer les données coté client. Cette approche fonctionne bien pour les pages de tableau de bord utilisateur, par exemple.
Étant donné qu'un tableau de bord est une page privée et spécifique à l'utilisateur, le référencement n'est pas pertinent et la page n'a pas besoin d'être pré-rendue. LEs données sont fréquemment mises à jour, ce qui nécessite une récupération des données au moment de la demande

# Création sur fichier \_document.js qui nous aidera pour le référencement

on crée ce fichier qui va nous permettre d'avoir un head ... cela nous aidera pour le référencement

## on a installé bootstarp avec le link dans la balise Head de \_document.js

### on peut ajouter un titre à chaque page (dans l'onglet du navigateur) grace à la balise Head et title

# Variables d'environnement

Si elles doivent être disponible coté client précéder le nom de la variable par : NEXT_PUBLIC

# Utilisation de styled jsx et module css

mise en place de styled jsx dans le composant Header et ensuite import du module.css pour styliser le header

# Gestion de l'erreur window is not defined

Est dûe au fait que window n'est pas disponible coté serveur lorsqu'on utilise du SSR

pour résoudre ce problème on utilise un useEffect qui se déclenche lorasque la page est montée ou un import dynamique

voir index.js avec le localStorage

voir exemple.js

# Refacto de blog/[id]

On a rajouté une condition data && pour le déploiement ! sinon ça ne fonctionne pas

Toujours mettre une condition dans les routes dynamique

# Déploiement sur vercel

relier vercel au projet git hub dans la console admin vercel et deploy

# Authentification avec Next

Authentifier coté client sinon on est obligé d'utiliser getServerSideProps dans toutes les pages et ça sera moins rapide du coup
Utilisation des cookies pour le stockage du token car disponible coté serveur contrairement à localStorage

## Mise en oeuvre

Utilisation de l'API context pour avoir un state partagé dans tous nos composants et pages
Création d'un composant d'un composant d'ordre supérieur (HOC) qui utilise ce contexte et protège les routes en conséquence
Définition d'un header global dans Axios pour inclure le token d'auth dans toutes les requêtes
Besoin d'un back pour renvoyer un jeton d'auth lorsque la connexion est correcte
Besoin de la librairie `js-cookie`

Nous créons un nouveau projet pour l'authentification avec `npx create-next-app with-auth`

Suite du Readme sur ce projet <a href="https://github.com/denisk13005/formation-udemy-with-auth">https://github.com/denisk13005/formation-udemy-with-auth</a>
