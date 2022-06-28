#!/bin/bash

DOMAIN="example.com"
sudo apt update
sudo apt install nginx
sudo ufw app list
sudo ufw allow 'Nginx HTTP'


sudo mkdir -p /var/www/$DOMAIN/html
sudo chown -R $USER:$USER /var/www/$DOMAIN/html
sudo chmod -R 755 /var/www/$DOMAIN

sudo cp default.html /var/www/$DOMAIN/html/index.html
sudo touch /etc/nginx/sites-available/$DOMAIN

sudo echo "server {" >> /etc/nginx/sites-available/$DOMAIN
sudo echo "listen 80;" >> /etc/nginx/sites-available/$DOMAIN
sudo echo "listen [::]:80;" >> /etc/nginx/sites-available/$DOMAIN
sudo echo "root /var/www/$DOMAIN/html;" >> /etc/nginx/sites-available/$DOMAIN
sudo echo "index index.html index.htm index.nginx-ubuntu.html;" >> /etc/nginx/sites-available/$DOMAIN
sudo echo "server_name $DOMAIN www.$DOMAIN;" >> /etc/nginx/sites-available/$DOMAIN
sudo echo "location / {" >> /etc/nginx/sites-available/$DOMAIN
sudo echo "try_files \$uri \$uri/ =404;" >> /etc/nginx/sites-available/$DOMAIN
sudo echo "}" >> /etc/nginx/sites-available/$DOMAIN
sudo echo "}" >> /etc/nginx/sites-available/$DOMAIN

sudo ln -s /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/

sudo cp nginx.conf /etc/nginx/nginx.conf
sudo nginx -t
sudo systemctl restart nginx
