const db = require("../config/db");

const getAllPessoas = async () => {
    let sql = 'select * from pessoas';
    let pessoas = await db.query(sql);
    return pessoas.rows;
}

const getPessoasById = async (params) => {
    let sql = `select * from pessoas where id = $1`;
    let pessoas = await db.query(sql, [params.id]);
    return pessoas.rows;
}

const persistirPessoas = async (params) => {
    if (!params.id) {
      let sql = `insert into pessoas (nome, cpfcnpj, celular, email, endereco, numero, bairro, complemento, cep, municipio, uf, ibge_municipio)
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) returning id;`
      const { nome, cpfcnpj, celular, email, endereco, numero, bairro, complemento, cep, municipio, uf, ibge_municipio } = params;
      const query = await db.query(sql, [nome, cpfcnpj, celular, email, endereco, numero, bairro, complemento, cep, municipio, uf, ibge_municipio]);

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
    const sql = `update pessoas set ${fields} where id = ${params.id}`;

    const response = await db.query(sql);
    const msg = response.rowCount === 0
      ? `Não foi encontrado nenhum registro com o id ${params.id}`
      : `Registro ${params.id} alterado com sucesso!`;

    return { type: 'info', msg }
}

const deletePessoas = async (params) => {
    let sql = 'delete from pessoas where id = $1;';
    let query = await db.query(sql, [params.id]);
    return query.rowCount == 1;
}

module.exports.getAllPessoas = getAllPessoas;
module.exports.getPessoasById = getPessoasById;
module.exports.persistirPessoas = persistirPessoas;
module.exports.deletePessoas = deletePessoas; 