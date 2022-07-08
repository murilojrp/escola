# Sistema de Escola

## Instalação

* Após clonar o projeto, rodar:

```bash
    sudo npm install;
``` 

___

## Implementações

* Construir API com CRUD (GetAll, GetById, Persistir (ver modelo no repositório "backend-v2" no service de clientes) e Delete) para todas as tabelas.
  * Pessoas
  * Alunos
  * Professores
  * Disciplinas
  * Notas

___

## Implementações Extras

* Criar uma rota para calcular a média de um aluno.
  * Essa deve ser uma rota POST, onde será enviado um JSON com a matricula do aluno, o id da disciplina desejada e uma data inicial e final para considerar.
  * Retornar um objeto (JSON) com:
    * Todas as notas desse aluno, na disciplina e período informados.
    * Retornar a média do aluno.
    * Retornar uma mensagem:
      * Caso a média < 5, 'Nome do Aluno, você está reprovado';
      * Caso a média >= 5 && < 7, 'Nome do Aluno, você está em recuperação'.
      * Caso a média >= 7, 'Nome do Aluno, você está aprovado!'
* Criar uma rota para calcular a média de todos os alunos de uma disciplina dentro de determinado período.
  * Será enviado na requisição um JSON com o id da disciplina e uma data inicial e final;
  * Para cada aluno, retornar a média e uma mensagem conforme os mesmos requisitos da implementação anterior.
  * Retornar todos os alunos em um ARRAY de JSON, com sua média e a mensagem.