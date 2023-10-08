# Full Stack Developer Job Application

In this project a full stack app was created using Node.js with TypeScript. The application interact with a postgres database using the Sequelize library, a popular Object-Relation Mapping (ORM). Both, app and postgres was containerized separably, but the api depends on the db container.

## Backend Requirements

The backend of the application should be a Node.js application, using TypeScript. Here are the specific requirements:

1. **Database Connection**: The application establish a connection a postgres database.

2. **Containerization**: The Node.js application and the database was containerized with Docker. Each run in its own separate container. Docker-compose was used to manage these containers and the connections between them.

3. **CRUD Operation**: Is possible to perform 4 operations in the api (Create, Read, Update, Delete). The idea is to create a collection of books, creating a new book, reading all books, updating one book, or deleting one book.

## How to run

Make sure that docker and docker compose are installed in the machine and run:

``` 
docker-compose up -d 
```

If everything is alright you should be able to access the app in:

http://localhost:3000/healthcheck

and the output should be: {"status":"UP"}

If you have postman installed you can use the "book_collections.postman_collection.json" file in the root of this project to import to postman. Some crud operations should be ready to be performed.

###  Example of api calls:
- #### Post to http://localhost:3000/v1/api/book
Required body params: title, author, description
with body: 
```json
{
    "title": "Gabriela, Cravo e Canela",
    "author": "Jorge Amado",
    "description": "Publicado em 1958, este romance se passa na fictícia cidade de Ilhéus durante a década de 1920. Conta a história de Gabriela, uma mulher bela e de espírito livre, e Nacib, o dono do bar que se apaixona por ela. O livro explora temas como amor, mudança social e choques culturais."
}
```
or: 
```json
{
    "title": "Dom Casmurro",
    "author": "Machado de Assis",
    "description": "Romance clássico publicado em 1899. É considerado uma das maiores obras da literatura brasileira. A história é narrada por Bento Santiago, um homem idoso que suspeita da infidelidade de sua esposa, Capitu. O romance explora temas como ciúme, memória e narração não confiável."       
}
```
expected status code output:

200 - Successfully created

400 - Bad request

409 - Conflict Error (Book already exist)

500 - Internal server error

- #### Get to http://localhost:3000/v1/api/books
expected output:
```json 
{
    "status": "Ok!",
    "message": "Successfully fetched all books data!",
    "data": [
        {
            "id": 1,
            "title": "Gabriela, Cravo e Canela",
            "author": "Jorge Amado",
            "description": "Publicado em 1958, este romance se passa na fictícia cidade de Ilhéus durante a década de 1920. Conta a história de Gabriela, uma mulher bela e de espírito livre, e Nacib, o dono do bar que se apaixona por ela. O livro explora temas como amor, mudança social e choques culturais.",
            "createdAt": "2023-10-07T21:30:42.786Z",
            "updatedAt": "2023-10-07T21:30:42.786Z"
        },
        {
            "id": 2,
            "title": "Dom Casmurro",
            "author": "Machado de Assis",
            "description": "Romance clássico publicado em 1899. É considerado uma das maiores obras da literatura brasileira. A história é narrada por Bento Santiago, um homem idoso que suspeita da infidelidade de sua esposa, Capitu. O romance explora temas como ciúme, memória e narração não confiável",
            "createdAt": "2023-10-07T20:22:46.181Z",
            "updatedAt": "2023-10-07T21:31:07.123Z"
        }
    ]
}
```
expected status code output:

200 - Successfully got books

500 - Internal server error

- #### Put to http://localhost:3000/v1/api/book
Required body params: title, author, description,
with body:
```json
{
    "title": "Gabriela, Cravo e Canela",
    "author": "Jorge Amado",
    "description": "Publicado em 1958."
}
```
expected status code output:

200 - Successfully updated

400 - Bad request

404 - Not found error

500 - Internal server error


- #### Delete by id to http://localhost:3000/v1/api/book/:id
expected status code output:

200 - Successfully deleted

400 - Bad request

404 - Not found error

500 - Internal server error


#### Run tests:

To run tests execute
```
npm run test
```