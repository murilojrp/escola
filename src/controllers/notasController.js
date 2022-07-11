const service = require('../services/notasService');

const getAllNotas = async (req, res) => {
    try {
        const response = await service.getAllNotas();
        res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err);
    }
}

const getMedia2 = async (req, res) => {
    try {
        const response = await service.getMedia2(req.body);
        res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err);
    }
}

const getMedia = async (req, res) => {
    try {
        const response = await service.getMedia(req.body);
        res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err);
    }
}

const getNotasById = async (req, res) => {
    try {
        const response = await service.getNotasById(req.params);
        res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err);
    }
}

const persistirNotas = async (req, res) => {
    try {
        const response = await service.persistirNotas(req.body);
        res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err);
    }
}

const deleteNotas = async (req, res) => {
    try {
        let deletado = await service.deleteNotas(req.params);
        let response = deletado 
            ? `Registro ${req.params.id} deletado com sucesso` 
            : `Não foi encontrado nenhum registro com o id ${req.params.id} para ser deletado`;
        res.status(200).send({ response });
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports.getAllNotas = getAllNotas;
module.exports.getMedia = getMedia;
module.exports.getMedia2 = getMedia2;
module.exports.getNotasById = getNotasById;
module.exports.persistirNotas = persistirNotas;
module.exports.deleteNotas = deleteNotas; 