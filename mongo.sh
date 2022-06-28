#!/bin/bash

#sudo apt-get install libcurl4 openssl liblzma5
#tar -zxvf mongodb-linux-x86_64-ubuntu1804-5.0.9.tgz
#sudo cp <mongodb-install-dir>/bin/* /usr/local/bin/ 

sudo mkdir -p /var/lib/mongo
sudo mkdir -p /var/log/mongodb

sudo chown `whoami` /var/lib/mongo
sudo chown `whoami` /var/log/mongodb






