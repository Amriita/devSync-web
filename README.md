# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


frontend deploy :   
    - npm install -> dependenices in
    - npm run build -> output in dist folder
    - sudo apt install nginx
    - sudo systemctl start nginx
    - sudo systemctl enable nginx
    - copy dist folder to /var/www/html
    - sudo scp -r  dist/* /var/www/html/
    - Enable port : 80
    - Frontend URL : http://13.49.66.226/

backend deploy : 
    - git clone 
    - npm install
    - allowed ec2 instance public ip on mongodb server
    - install pm2  (npm i pm2 -g)
    - run server (pm2 start npm -- start)
    - pm2 logs
    - pm2 status
    - pm2 flush name
    - pm2 stop <name>
    - pm2 delete <name>
    - pm2 start npm --name "devSync" -- start

    -nginx config
    - sudo nano /etc/nginx/sites-available/devSync
    - sudo ln -s /etc/nginx/sites-available/devSync /etc/nginx/sites-enabled/
    - sudo nginx -t
    - sudo systemctl restart nginx
    - sudo systemctl enable nginx
    - sudo nano /etc/nginx/sites-available/devSync
    - location /api/ {
        proxy_pass http://localhost:3000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    `
   

