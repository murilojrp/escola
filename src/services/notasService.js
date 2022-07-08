const db = require("../config/db");

const getAllNotas = async () => {
    let sql = 'select * from notas';
    let notas = await db.query(sql);
    return notas.rows;
}

const getMedia = async (params) => {
    let sql = 'select * from notas as n inner join alunos as a on (n.id_aluno = a.id) where a.matricula = $1 and n.id_disciplina = $2';
    let response = await db.query(sql, [params.matricula, params.id_disciplina]);
    let notas = response.rows;
    console.log(notas);
    notas.forEach(nota => {
        media = nota * peso
    });
    console.log(notas);
}

const getNotasById = async (params) => {
    let sql = `select * from notas where id = $1`;
    let notas = await db.query(sql, [params.id]);
    return notas.rows;
}

const persistirNotas = async (params) => {
    if (!params.id) {
      let sql = `insert into notas (nota, peso, id_disciplina, id_aluno, observacao)
        values ($1, $2, $3, $4, $5) returning id;`
      const { nota, peso, id_disciplina, id_aluno, observacao } = params;
      const query = await db.query(sql, [nota, peso, id_disciplina, id_aluno, observacao]);

      return { type: 'info', msg: 'Registro incluído com sucesso!', data: { id: query.rows[0].id } };
    }

    let fields = [];

    Object.keys(params).forEach(e => {
      if (e !== 'id') {
        if (params[e] === '' || params[e] == null) {
          fields.push(`${e} = null`)
        } else {
          fields.push(`${e} = '${params[e]}'`)
        }
      }
    });
    fields = fields.join(', ');
    const sql = `update notas set ${fields} where id = ${params.id}`;

    const response = await db.query(sql);
    const msg = response.rowCount === 0
      ? `Não foi encontrado nenhum registro com o id ${params.id}`
      : `Registro ${params.id} alterado com sucesso!`;

    return { type: 'info', msg }
}

const deleteNotas = async (params) => {
    let sql = 'delete from notas where id = $1;';
    let query = await db.query(sql, [params.id]);
    return query.rowCount == 1;
}

module.exports.getAllNotas = getAllNotas;
module.exports.getNotasById = getNotasById;
module.exports.persistirNotas = persistirNotas;
module.exports.deleteNotas = deleteNotas; 
module.exports.getMedia = getMedia;
