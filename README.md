# tf-serving-example
includes 2 models and a react app



open the folder and run this code on the terminal:

docker-compose down
docker-compose up --build


to create databae:
docker cp database/setup_database.sql postgres:/setup_database.sql

docker exec -it postgres psql -U postgres -f /setup_database.sql
