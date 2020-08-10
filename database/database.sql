CREATE DATABASE firstapi;

create table users (
  id serial primary key, 
  name VARCHAR(40) , 
  email TEXT 
);

INSERT INTO USERS (name,email) VALUES
               ('joe','joe@gmail.com'),
               ('ryan','ryan@gmail.com');
           