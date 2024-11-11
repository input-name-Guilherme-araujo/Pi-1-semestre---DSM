/************** MODELAGEM DE DADOS */
/* Como surge um banco de dados?
Uma clinica veterinária deseja saber, inicialmente, quais são os donos dos animais atendidos por ela. Atualmente os cadastros são feitos em papel e a clinica deseja informatizar esses dados. Como fazer isso?
*/

/******** PROCESSOS DE MODELAGEM DE DADOS
1. Modelagem conceitual - DER (Diagrama Entidade Relacionamento) (Rascunho);
2. Modelagem lógica - MER (Modelo Entidade Relacionamento);
3. Modelagem física - SQL (Structured Query Language);
*/
/******** 1a Etapa: Modelagem conceitual
1. Analisar o problema;
2. Verificar os requisitos;
3. difinição do escopo;
*/
/*
cliente 
	nome,
	cpf,
    email,
    telefone,
    endereço,
    sexo
*/
/******** 2a Etapa: Modelagem logico */

/* Utilizar a ferramenta que desejar para criar o MER */

/******** 3a Etapa: Modelagem fisica */
/* Acessando o MySQL */
/* Para acessar o MySQL de seu pc, via "WSL" Windows 11 ou via BASH linux, é necessário instalar o MySQL Client */
$ sudo apt install mysql-client-core-8.0
/* digitar: mysql -h <hostname> -u <username> -p */
$ mysql -h mysql-fatec-monza.mysql.database.azure.com -u error404notfounddd -p

/* Criando banco de dados */
create database projeto; /* ";" delimita o final do comando */
create database teste;
/* Verificando os bancos de dados existentes*/
show databases;
/* Acessando um banco de dados */
use projeto;

/* Criando uma tabela no banco de dados */
/* sintaxe para criar uma tabela: 
create table NOME_TABELA (
    CAMPO1 TIPO, 
    CAMPO2 TIPO, 
    CAMPO3 TIPO, 
    ...
); */
/* Criando a tabela cliente */
create table cliente(
	nome varchar(30),
    sexo char(1),
	cpf int(11),
    email varchar(30),
    telefone varchar(30),
    endereco varchar(100)    
);
/* Diferença entre varchar e char
varchar -> tamanho variável
char -> tamanho fixo
*/

/* Tipos que devem ser atribuidos aos dados de uma tabela.
Caracteres literais: char e varchar,
Números int e float, 
Objetos como fotos e documentos, blob,
Textos extensos, text. 
Há uma profissão dentro da área que é a do analista de performance ou tuning, esse profissional é responsável por analisar o banco de dados e deixá-lo mais rápido. 
Cada caracter no banco de dados, vale 1 byte. Sendo assim, se eu entro com o dado João,
estou entrando com 4 bytes no meu banco. E o que isso tem a ver com a tipagem de tabelas?
Inserindo a palavra joao

varchar(10) = 4 bytes
char(10) = 10 bytes

Isso ocorre pois o char não varia. Os caracteres restantes serao preenchidos com espaço. 
O charé ligeiramente mais performatico, por nao
ter que gastar tempo variando de tamanho. 
A regra é utilizar o char quando sabemos o numero de caracteres da coluna nao vai variar nunca. Por exemplo, unidade federativa, com dois digitos, sexo com um digito e assim por diante. */

/* Verificando as tabelas do banco de dados */
show tables;

/* Verificando a estrutura de uma tabela */
desc cliente;  /* desc -> Describe –> descrever */

/* INSERINDO DADOS NA TABELA */
/* sintaxe para inserir dados na tabela:  INSERT INTO TABELA... */
/* Omitindo as colunas */
Insert into cliente values ('João', 'M', 988221122, 'joao@joao.com', '12345678', 'Av. Brasil, 1234 - Cidade Nova - Franca - SP');
Insert into cliente values ('Maria', 'F', 123456789, NULL, '22222222', 'Rua José da Silva, 5033 - Centro - Franca - SP');
Insert into cliente values ('Pedro', 'M', 1112233445, NULL, '12345678', 'Av. Brasil, 1234 - Cidade Nova - Franca - SP');
Insert into cliente values ('Clara', 'F', 987654321, 'clara@gmail.com', '98775555', 'Rua das Flores, 5322 - Centro - São Paulo - SP');

/* Forma 2 – descrevendo as colunas (forma mais segura) */
Insert into cliente (nome,sexo,cpf,email,telefone,endereco) values ('Ana', 'F', 313233521, 'ana@gmail.com', 12345678, 'Av. Atlântica, 1004 - Copacabana - Rio de Janeiro - RJ');
/* inserindo os campos fora da ordem que foram criados */
Insert into cliente (nome,cpf,telefone,endereco,sexo,email) values ('José', 456789123, '99997777', 'Av. América, 1456 - Jardim América - Belo Horizonte - MG','M','jose@hotmail.com');

/* inserindo registros sem o campo email */
Insert into cliente (nome,cpf,telefone,endereco,sexo) values ('Rosa', 456123123, '95443377', 'Rua José João, 5776 - Cidade Alta - Salvador - BA','F');

/*digitando o campo CPF com 11 dígitos*/
Insert into cliente (nome,sexo,cpf,email,telefone,endereco) values ('Maria', 'F', 99999999999, 'maria@gmail.com', '90011001', 'Rua Presidente Vargas, 2398 - Centro - Belo Horizonte - MG'); 
Insert into cliente (nome,sexo,cpf,email,telefone,endereço) values ('Maria', 'F', 22222222222, 'maria@gmail.com', '90011001', 'Rua Presidente Vargas, 2398 - Centro - Belo Horizonte - MG');

/* Porque o erro de inserção de dados? */
/* Range de valores
int -> -2147483648 a 2147483647 (4 bytes) valor máximo 4294967295 2^32-1
bigint -> -9223372036854775808 a 9223372036854775807 (8 bytes) valor máximo 18446744073709551615 2^64-1
*/
/* verificar onde parei*/
Insert into cliente (nome,sexo,cpf,email,telefone,endereco) values ('Maria', 'F', 2147483645, 'maria@gmail.com', '90011001', 'Rua Presidente Vargas, 2398 - Centro - Belo Horizonte - MG'); 
Insert into cliente (nome,sexo,cpf,email,telefone,endereco) values ('Irene', 'F', 113455789, NULL, '98874555', 'Rua quatro, 701 - Vila ISabel - Rio de Janeiro - RJ');

/* COMANDO SELECT -> seleção – projeção – junção */
/* Exemplos de projeção:*/
Select now(); /*seleciona a data e hora atual: AAAA-MM-DD hh:mm:ss*/
Select 'Alessandro'; /*seleciona o texto entre aspas*/
Select 'Modelagem de dados'; /*seleciona o texto entre aspas*/
select version(); /*mostra a versão do MySQL*/
select current_date; /*seleciona a data atual: AAAA-MM-DD*/
select user(); /*seleciona o usuário atual do MySQL*/

/* alias de coluna: cria um nome para a visualização da coluna */
Select now() as data_processamento;

Select now() as data_processamento, 'Alessandro' as professor;

/* seleciona os campos nome, sexo, email, cpf de cliente */
/* selecione <campos>          de  <tabela>;*/ 
Select nome, sexo, email, cpf from cliente;

/* seleciona os campos nome, sexo, email e cpf da tabela cliente, renomeia o campo nome para cliente */
Select nome as cliente, sexo, email, cpf from cliente;

/* seleciona os campos nome, sexo, email e cpf da tabela cliente, renomeia o campo nome para cliente, e cria uma coluna chamada data_hora e insere a data e hora atual*/
Select nome as cliente, sexo, email, cpf, now() as data_hora from cliente;

/* seleciona todos os campos da tabela cliente */
Select * from cliente; /* não é recomendado a utilização dessa forma de consulta */

/* Seleciona nome, email de cliente onde sexo = 'F' */
Select nome, email
from cliente
Where sexo = 'F';

/* Seleciona nome, endereco de cliente onde endereço contém 'RJ' */
Select nome, endereco
from cliente
Where endereco = 'RJ';

/* Seleciona nome, endereco de cliente onde endereço contém '<qualquer coisa>RJ' */
Select nome, endereco
from cliente
Where endereco like '%RJ';

/* Seleciona nome, endereco de cliente onde endereço contém 'Av. América<qualquer coisa>' */
Select nome, endereco
from cliente
Where endereco like 'Av. América%';

/* Seleciona nome, endereco de cliente onde endereço contém '<qualquer coisa>Centro<qualquer coisa>' */
Select nome, endereco
from cliente
Where endereco like '%Centro%';

/* COUNT() -> conta o número de registros */
select count(*) from cliente; /* conta o número de registros da tabela cliente */
select count(*) as "Quantidade de clientes" from cliente;

/* GROUP BY -> agrupamento - agrupa por item da coluna selecionada */

/* agrupa por sexo e conta o número de registros */
select sexo, count(*) as "Quantidade" 
from cliente 
group by sexo;

/* agrupa por cidade e conta o número de registros */
select cidade 
from cliente 
group by cidade;

/* Selecionando valores nulos */
select nome, email
from cliente
where email is null;

/* Selecionando valores não nulos */
select nome, email
from cliente
where email is not null;

/* UTILIZANDO O UPDATE PARA ATUALIZAR VALORES */
/* Atualizando o email do cliente com nome Maria */
update cliente
set email = 'maria@hotmail.com'
where  nome = 'Maria';
/* Dessa forma atualizamos todos os registros que possuem o nome Maria */

/* Apagando um registro */
delete from cliente
where nome = 'Ana';

/****** EXERCÍCIO DE FIXAÇÃO 1 ******/
/* Abra o arquivo: modelagemBasica01.sql */

/****** EXERCÍCIO DE FIXAÇÃO 2 ******/
/* Abra o arquivo: modelagemBasica02.sql */

/* Retornando ao banco de dados "projeto" */
use projeto;

Insert into cliente values ('João', 'M', 988221122, 'joao@joao.com', '12345678', 'Av. Brasil, 1234 - Cidade Nova - Franca - SP');
/* adicionar outro telefone para o cliente João */
update cliente
set telefone = 975561122
where nome = 'João';

update cliente
set telefone = '988221122 - 975561122'
where nome = 'João';

select sexo, count(*)
from cliente
group by sexo;

select endereco, count(*)
from cliente
group by endereco;

Insert into cliente values ('Clara', 'F', 987654321, 'clara@gmail.com', '911113333', 'Rua das Flores, 5322 - Centro - São Paulo - SP');

select sexo, count(*)
from cliente
group by sexo;

/* Primeira forma normal
1. Todo campo vetorizado (atômico) se tornará uma tabela (vetor são elementos da mesma família);
exemplos:
[azul, amarelo, verde] -> cores
[corolla, civic, gol] -> carros

2. Todo campo multivalorado se tornará uma tabela, ou seja, um campo que pode ter mais de um valor;
exemplo:
Rua José da Silva, 5033 – Centro – Franca -SP -> endereço

3. Toda tabela terá um campo de valor exclusivo que identifique todo o registro (linha) ou seja, uma chave primária (Primary Key);
*/

/****** EXERCÍCIO DE FIXAÇÃO 3 ******/