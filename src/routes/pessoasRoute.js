const controller = require('../controllers/pessoasController');

module.exports = (app) => {
    app.get('/pessoas', controller.getAllPessoas)
    app.get('/pessoas/:id', controller.getPessoasById)
    app.post('/pessoas', controller.persistirPessoas)
    app.delete('/pessoas/:id', controller.deletePessoas)
}; 