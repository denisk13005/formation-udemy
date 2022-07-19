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

### route dynamique avec paramètre d'url

on peut déclarer la même url pour plusieur Link en renseignant ensuite l'attribut 'as' qui indiquera au routeur quelle adresse entrer en url

ex :

```
<Link href = '/blog/[titre] as = {'/blog/react'}>react</Link>
<Link href = '/blog/[titre] as = {'/blog/angular'}>angular</Link>

```
