#!/bin/bash

echo INSTRUCTIONS:
echo sudo apt-get install libcurl4 openssl liblzma5
echo tar -zxvf mongodb-linux-x86_64-ubuntu1804-5.0.9.tgz
echo sudo cp <mongodb-install-dir>/bin/* /usr/local/bin/ 

echo sudo mkdir -p /var/lib/mongo
echo sudo mkdir -p /var/log/mongodb
echo 
echo sudo chown `whoami` /var/lib/mongo
echo sudo chown `whoami` /var/log/mongodb






