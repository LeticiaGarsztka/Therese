create database therese;
use therese;

drop table objetos;

create table objetos (
    id int primary key auto_increment,
    nome varchar(50) not null,
    descricao varchar(100) not null,
    preco decimal (10,2) not null,
    quantidade int not null,
    foto varchar(255)
);