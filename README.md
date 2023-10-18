# <img src="https://i.pinimg.com/originals/af/fb/c9/affbc96be98edecba473e0e630069b3b.png" width=60 height=auto style="border-radius: 43%" /> Adopt Pet

# Acesso
https://adopt-pet-sigma.vercel.a
<br>
O backend não está funcionando no momento, apenas o Frontend. 
<br>
Por esse motivo, não será possível entrar no sistema.

# Tecnologies

[![React][React.js]][React-url]
[![Javascript][Javascript]][Javascript-url]
[![Node][Node]][Node-url] 
[![Express][Express]][Express-url] 
[![MongoDB][MongoDB]][MongoDB-url] 
[![Vercel][Vercel]][Vercel-url] 

<!-- [![Typescript][Typescript]][Typescript-url] -->

# BACK-END

## Install
First, you need to go to the backend path
``` bash
  cd ./backend
```
After this you have to write this command and waiting install dependecies
``` bash
  npm install
```
## Environment
In backend you will need a file called `.env`. In this file you must write the following variables
``` bash
MONGODB_URL=mongodb://<MONGO_USER>:<MONGOPASSWORD>@<MONGOHOST>:<MONGOPORT>
JWT_SECRET=<YOUR_JWT_SECRET>
```

## Notes
* The backend was developed using MongoDB Atlas, in case you want to use a localhost database or anything else, the models(documents) will generate automatically in user database connected.

## Run
Now, with all the dependecies installed you will run the follow command
``` bash
  npm run dev
```

# FRONT-END

## Install
First, you need to go to the frontend path
``` bash
  cd ./frontend
```
After this you have to write this command and waiting install dependecies
``` bash
  npm install
```

## Environment
In frontend you will need a file called `.env`. In this file you must write the following variable
``` bash
REACT_APP_API='http://localhost:5001' # Or your URL_API
```


## Run
Now, with all the dependecies installed you will run the follow command
``` bash
  npm run start
```


[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Typescript]: https://img.shields.io/badge/Typescript-20232A?style=for-the-badge&logo=typescript&logoColor=#007acc
[Typescript-url]: https://www.typescriptlang.org
[Express]: https://img.shields.io/badge/Express-20232A?style=for-the-badge&logo=express&logoColor=#FFF
[Express-url]: https://expressjs.com/pt-br/
[Node]: https://img.shields.io/badge/Node.js-20232A?style=for-the-badge&logo=node.js
[Node-url]: https://nodejs.org/en
[MongoDB]: https://img.shields.io/badge/MongoDB-20232A?style=for-the-badge&logo=mongodb
[MongoDB-url]: https://www.mongodb.com
[Javascript]: https://img.shields.io/badge/Javascript-20232A?style=for-the-badge&logo=javascript&logoColor=#007acc
[Javascript-url]: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript
[Vercel]: https://img.shields.io/badge/Vercel-20232A?style=for-the-badge&logo=vercel&logoColor=#007acc
[Vercel-url]: https://vercel.com
[Image]: https://i.pinimg.com/originals/af/fb/c9/affbc96be98edecba473e0e630069b3b.png

