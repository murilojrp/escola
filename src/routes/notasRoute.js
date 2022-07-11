const controller = require('../controllers/notasController');

module.exports = (app) => {
    app.get('/notas', controller.getAllNotas)
    app.post('/media', controller.getMedia)
    app.post('/media2', controller.getMedia2)
    app.get('/notas/:id', controller.getNotasById)
    app.post('/notas', controller.persistirNotas)
    app.delete('/notas/:id', controller.deleteNotas)
}; 