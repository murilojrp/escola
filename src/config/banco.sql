create table pessoas (
    id serial primary key,
    nome varchar(200) not null,
    cpfcnpj varchar(18) not null unique,
    celular varchar(16),
    email varchar(200),
    endereco varchar(200),
    numero integer,
    bairro varchar(100),
    complemento varchar(50),
    cep varchar(9),
    municipio varchar(200),
    uf varchar(2),
    ibge_municipio integer
);

create table alunos (
    id serial primary key,
    matricula integer not null unique,
    id_pessoa integer not null unique,
    constraint fk_pessoas_to_alunos foreign key (id_pessoa) references pessoas (id)
);

create table professores (
    id serial primary key,
    matricula integer not null unique,
    id_pessoa integer not null unique,
    constraint fk_pessoas_to_professores foreign key (id_pessoa) references pessoas (id)
);

create table disciplinas (
    id serial primary key,
    descricao varchar(200) not null,
    id_professor integer not null,
    constraint fk_professores_to_disciplinas foreign key (id_professor) references professores (id)
);

create table notas (
    id serial not null,
    nota numeric (4,2) not null,
    peso numeric (4,2) not null,
    id_disciplina integer not null,
    id_aluno integer not null,
    observacao text not null,
    datahora timestamp without time zone not null default now(),
    constraint fk_disciplinas_to_notas foreign key (id_disciplina) references disciplinas (id),
    constraint fk_alunos_to_notas foreign key (id_aluno) references alunos (id)
);