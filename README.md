# Sistema de Escola

## Instalação

* Após clonar o projeto, rodar:

```bash
    sudo npm install;
``` 

___

## Implementações

* Construir API com CRUD (GetAll, GetById, Persistir (ver modelo no repositório "backend-v2" no service de clientes) e Delete) para todas as tabelas.
  * Alunos
  * Professores
    * Não vai haver uma rota para consumir ou inserir registro na tabela de pessoas. Sempre que tentar cadastrar um aluno ou professor, deve-se validar pelo "cpfcnpj" se aquela pessoa já existe para vincular a chave estrangeira nessas duas tabelas. Caso a pessoa não exista, deve-se criar o registro na tabela pessoas e vincular o registro na tabela de alunos ou professores, de acordo com a situação.
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