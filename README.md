# Next.js OpenJira App
Para correr localmente, se necesita de la base de datos
```
docker-compose up -d
```

* El -d, significa __detached__

## Configurar las variables de entorno
Renombrar el archivo __.env.template a __.env__

* MongoDB URL Local:
```
MONGO_URL=mongodb://localhost:27017/entriesdb
```

* Reconstruir módulos de Node
```
yarn install
yarn dev
```

## Llenar la base de datos con información de pruebas

Llamara: http://localhost:3001/api/seed