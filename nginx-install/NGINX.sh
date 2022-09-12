#!/bin/bash

DOMAIN="example.com"
your_server_ip="192.168.122.1" 
port="5000"
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
sudo cp reverse-proxy.conf /etc/nginx/sites-available/reverse-proxy.conf
sudo ln -s /etc/nginx/sites-available/reverse-proxy.conf /etc/nginx/sites-enabled/reverse-proxy.conf

sudo echo "server {" >> /etc/nginx/conf.d/proxy.conf
sudo echo "	listen 80;" >> /etc/nginx/conf.d/proxy.conf
sudo echo "	server_name proxy.example.com;" >> /etc/nginx/conf.d/proxy.conf
sudo echo "	location / {" >> /etc/nginx/conf.d/proxy.conf
sudo echo "		proxy_pass http://$your_server_ip:$port" >> /etc/nginx/conf.d/proxy.conf
sudo echo "		proxy_set_header Host \$host;" >> /etc/nginx/conf.d/proxy.conf
sudo echo "		proxy_set_header X-Real-IP \$remote_addr;" >> /etc/nginx/conf.d/proxy.conf
sudo echo "		proxy_set_header X-forwarded-For \$proxy_add_x_forwarded_for;" >> /etc/nginx/conf.d/proxy.conf
sudo echo "		proxy_set_header X-Forwarded-Proto \$scheme;" >> /etc/nginx/conf.d/proxy.conf
sudo echo "	}" >> /etc/nginx/conf.d/proxy.conf
sudo echo "}" >> /etc/nginx/conf.d/proxy.conf

sudo nginx -t
sudo systemctl restart nginx

