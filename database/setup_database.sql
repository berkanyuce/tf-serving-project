\set db_name 'tf_serving'

DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_database WHERE datname = :'db_name') THEN
        EXECUTE 'DROP DATABASE :' || quote_ident('db_name');
    END IF;
END $$;

CREATE DATABASE :db_name;

\c :db_name

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    user_email VARCHAR(100) UNIQUE NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE models (
    model_id SERIAL PRIMARY KEY,
    model_name VARCHAR(100) NOT NULL
);

CREATE TABLE predictions (
    prediction_id SERIAL PRIMARY KEY,
    model_id INTEGER REFERENCES models(model_id),
    result TEXT,
    user_id INTEGER REFERENCES users(user_id),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
