### `Development`

The server and client can be started from the terminal with this one command in the root directory of the project:

  ```
votesecs> npm run dev
```

### `Production`

Create a build for the client from the client directory in the terminal:

```
votesecs/client> npm run build
```

### `Deploy to EC2`

In EC2:
- launch an Ubuntu Amazon EC2 instance
- add inbound rules to its Service Groups:
  - HTTP port 80 (CIDR blocks 0.0.0.0/0 and ::0)
  - HTTPS port 443 (CIDR blocks 0.0.0.0/0 and ::0)
  - Custom TCP port 5000 (CIDR block 0.0.0.0/0)

Upload code from github:

```
~>$ git clone https://github.com/bchariot/VotesECS.git VotesECS
```

Install modules:

~VotesECS>$ npm install
~VotesECS/client>$ npm install 

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

```
~VotesECS>$ sudo service nginx restart
~VotesECS>$ npm start
```

### `Stop Project`

```
~VotesECS>$ sudo service nginx stop
```
