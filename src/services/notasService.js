const db = require("../config/db");

const getAllNotas = async () => {
    let sql = 'select * from notas';
    let notas = await db.query(sql);
    return notas.rows;
}

const getMedia2 = async (params) => {
    let sql = `
    select 
	  n.nota,
	  n.peso,
	  n.id_disciplina,
	  p.nome,
    a.id
	  from notas as n
	  inner join alunos as a on (n.id_aluno = a.id)
	  inner join pessoas as p on (a.id_pessoa = p.id)
	  where n.id_disciplina = $1 and n.datahora between $2 and $3
    order by a.id
    `;
  let response = await db.query(sql, [params.id_disciplina, params.data_inicio, params.data_fim]);
  let notas = response.rows;

    let somaNotas = 0;
    let somaPesos = 0;
    let media = 0;
    let retorno = [];
    
    for (let i = 0; i < notas.length; i++) {
      
      somaNotas += parseFloat(notas[i].nota) * parseFloat(notas[i].peso);
      somaPesos += parseFloat(notas[i].peso);
    
        if(!notas[i+1] || notas[i].id !== notas[i+1].id){
    
    media = (somaNotas / somaPesos).toFixed(2);
    somaNotas = 0;
    somaPesos = 0;
    
    let status;
  
    if (media < 5) {
      status = `${notas[i].nome}, você está reprovado.`
    } else if (media > 5 && media < 7) {
      status = `${notas[i].nome}, você está em recuperação.`
    } else {
      status = `${notas[i].nome}, você está aprovado!`
    }
  
    retorno.push( { 
      nome: notas[i].nome,
      msg: status,
      media: media
  }); 
    
      }
  }
  return retorno;

}

const getMedia = async (params) => {
    let sql = `
    select * 
    from notas as n 
    inner join alunos as a on (n.id_aluno = a.id) 
    inner join pessoas as p on (a.id_pessoa = p.id)
    where a.matricula = $1 and n.id_disciplina = $2 and n.datahora between $3 and $4;
              `;
    let response = await db.query(sql, [params.matricula, params.id_disciplina, params.data_inicial, params.data_final]);
    let notas = response.rows;

    let somaNotas = 0;
    let somaPesos = 0;
    let media = 0;
    
    notas.forEach(nota => {
      somaNotas += parseFloat(nota.nota) * parseFloat(nota.peso);
      somaPesos += parseFloat(nota.peso);
    });
    
    media = (somaNotas / somaPesos).toFixed(2);
    
    let status;

    if (media < 5) {
      status = `${notas[0].nome}, você está reprovado.`
    } else if (media > 5 && media < 7) {
      status = `${notas[0].nome}, você está em recuperação.`
    } else {
      status = `${notas[0].nome}, você está aprovado!`
    }

    return { 
      msg: status,
      notas: notas.map(nota =>{
        return { nota: nota.nota, peso: nota.peso, observacao: nota.observacao }
      }),
      media: media
  };
}

const getNotasById = async (params) => {
    let sql = `select * from notas where id = $1`;
    let notas = await db.query(sql, [params.id]);
    return notas.rows;
}
module.exports.getMedia = getMedia;

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
module.exports.getMedia = getMedia;

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
module.exports.getMedia2 = getMedia2;
