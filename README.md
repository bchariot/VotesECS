### `Development`

The server and client can be started from the terminal with this command in the root directory of the project:

```
votesecs> npm run dev
```

### `Production`

Create a build for the client from the client directory in the terminal:

```
votesecs/client> npm run build
```

### `Deploy to EC2`

In EC2, launch an Ubuntu server and add rules to its Service Groups for HTTP port 80, HTTPS port 443, and a Customer TCP for port 5000.

Make sure ngnix is installed in EC2 Ubuntu server instance.  Configure the following in the file:

/etc/nginx/sites-available/default

```
server {
        listen 80 default_server;
        listen [::]:80 default_server;
        location / {
            root /home/ubuntu/VotesECS/build;
            index index.html index.htm index.nginx-debian.html;
        }

        location /api/ {
            proxy_pass http://localhost:5000/;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }

        server_name _;
}
```

### `Run Project In EC2`

Run from prompt in the instance terminal:

```
>$ sudo service nginx restart
```

Then start the client:

client>$ npm start

