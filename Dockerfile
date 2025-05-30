# Étape 1 : Construction de l’app
FROM node:18 AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers du projet
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Étape 2 : Serveur NGINX pour héberger les fichiers statiques
FROM nginx:alpine

# Supprimer la config par défaut de NGINX
RUN rm -rf /usr/share/nginx/html/*

# Copier le build React vers le dossier public de NGINX
COPY --from=build /app/build /usr/share/nginx/html

# Copier une config nginx personnalisée si nécessaire (facultatif)
# COPY nginx.conf /etc/nginx/nginx.conf

# Exposer le port 80
EXPOSE 80

# Commande par défaut
CMD ["nginx", "-g", "daemon off;"]