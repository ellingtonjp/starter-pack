## Starter-Pack

Boilerplate for quickly starting a react/rails application. Frontend and backend
code are separate with their own `docker-compose.yml` files and can be run
independently. 

Comes with the following configured and containerized:
- React+Redux+TailwindCSS client code
- Rails+Postgres intended to provide REST interface to client
- Toy react/redux CRUD app with persistance in postgres

To run, install docker and:
1. `cd api && docker-compose up -d`
2. `cd client && docker-comopse up -d`
3. http://localhost:3030

More documentation when I get time.
