# Node.js

# Nginx

    sudo apt-get install nginx
    cd /etc/nginx
    sudo mv nginx.conf nginx.conf.old
    sudo ln -s /srv/pingduino/deploy/nginx/nginx.conf .
    sudo service nginx restart
