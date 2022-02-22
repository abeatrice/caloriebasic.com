# Caloriebasic
This is the [CalorieBasic.com](http://caloriebasic.com) front end created with [Vue](https://cli.vuejs.org/) and [Tailwindcss](https://tailwindcss.com/docs/installation/).

##### Local Development
    //get the source from the repository
	$ git clone https://github.com/abeatrice/caloriebasic.git

    //change directory into the source
	$ cd caloriebasic

    //copy the environment file example
	$ cp .env.example .env

    //install the dependencies
    $ npm install

    //start the local development server
	$ npm run serve
    
    //visit local host at port 8080 in a web browser
	$ http://localhost:8080

##### Deploy
[Vue Deployment Guide](https://cli.vuejs.org/guide/deployment.html#deployment)
[Node Installation](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-18-04)

    //install node
    $ sudo apt update
    $ sudo apt install nodejs
    $ sudo apt install npm

    //create the app directory
	$ mkdir ~/app

    //change directory into the app directory
	$ cd ~/app

    //get the source from the repository
    $ git clone https://github.com/abeatrice/caloriebasic.git

    //change directory into the source directory
	$ cd caloriebasic

    //copy the enviornment example file
	$ cp .env.example .env

    //install the dependencies
    $ npm install

    //build the application
	$ npm run build

#### Nginx
[Nginx Installation](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04)

    //install nginx
    $ sudo apt update
    $ sudo apt install nginx3

    //set the firewall to allow nginx
    $ sudo ufw allow 'Nginx HTTP'

    //check nginx status
    $ systemctl status nginx

    //create the nginx server block configuration file
    //replace <installation_user_here> with the user name that installed and built the application
	$ sudo nano /etc/nginx/sites-available/caloriebasic.com
        server {
                listen 80;
                root home/<installation_user_here>/app/caloriebasic/dist;
                index index.html;
                server_name caloriebasic.com www.caloriebasic.com;
                error_page 404 /;
                location / {
                        try_files $uri $uri/ =404;
                }
        }

    //create a link to the site configuration file in the sites enabled directory
    $ sudo ln -s /etc/nginx/sites-available/caloriebasic.com /etc/nginx/sites-enabled/caloriebasic.com

    //test the nginx configuration for errors
	$ nginx -t

    //reload nginx configuration
	$ sudo systemctl reload nginx

#### Nginx Certification: Let's Encrypt & Certbot
[Documentation](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-18-04)

    //install certbot
    $ sudo add-apt-repository ppa:certbot/certbot
    $ sudo apt install python-certbot-nginx

    //allow https through firewall
    $ sudo ufw allow 'Nginx Full'
    $ sudo ufw delete allow 'Nginx HTTP'

    //obtain certificate & update nginx configuration
    $ sudo certbot --nginx -d caloriebasic.com -d www.caloriebasic.com

    //Certificate & Chain: /etc/letsencrypt/live/caloriebasic.com/fullchain.pem
    //Key File: /etc/letsencrypt/live/caloriebasic.com/privkey.pem
    //Account Credentials: configuration directory at /etc/letsencrypt
    
    //Test Configuration
    https://www.ssllabs.com/ssltest/analyze.html?d=caloriebasic.com
    https://www.ssllabs.com/ssltest/analyze.html?d=www.caloriebasic.com

    //Certbot Auto-Renewal
    //Certbot created a crontab entry at /etc/cron.d that will automatically renew
    //any certificate thats within 30 days of expiration

    //Test certbot renew
    $ sudo certbot renew --dry-run

---
TODO:
static:
create s3 bucket with policy can be read from cloudfront
create cloudfront origin with edge lambda redirect index.html
point cloudfront to s3
