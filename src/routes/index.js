const pessoas = require('./pessoasRoute');
const professores = require('./professoresRoute');
const alunos = require('./alunosRoute');
const disciplinas = require('./disciplinasRoute');
const notas = require('./notasRoute');

module.exports = (app) => {
    pessoas(app)
    professores(app)
    alunos(app)
    disciplinas(app)
    notas(app)
}; 