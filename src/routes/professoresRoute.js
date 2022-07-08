const controller = require('../controllers/professoresController');

module.exports = (app) => {
    app.get('/professores', controller.getAllProfessores)
    app.get('/professores/:id', controller.getProfessoresById)
    app.post('/professores', controller.persistirProfessores)
    app.delete('/professores/:id', controller.deleteProfessores)
}; 