import alunos from "../../models/Aluno";

class AlunosControllers {
  async create(req, res) {
    const { body } = req;
    const id = req.user.id;
    if (!body.email) {
      res.status(401).json({
        errors: [
          'Email invalido',
        ]
      })
      return;
    }
    body["user_id"] = id;
    const aluno = alunos.postAluno(body);
    res.status(200).send({
      "id": aluno.id,
      "user_id": id,
      "nome": aluno.nome,
      "email": aluno.email,
      "peso": aluno.peso,
      "altura": aluno.altura,
    });
  }

  index(req, res) {
    const _alunos = alunos.getAllAluno();
    if (!_alunos.errors) {
      res.status(200).json(_alunos);
      return;
    }
    res.status(401).json(_alunos.errors)
  }

  show(req, res) {
    const id = req.params.id;
    const aluno = alunos.getAluno(Number(id));

    res.status(200).json(aluno);
  }

  update(req, res) {
    const alunoModified = alunos.update(Number(req.params.id), req.body);
    res.status(200).json(alunoModified);
  }

  delete(req, res) {
    const alunoDeleted = alunos.delete(req.params.id);

    if (!alunoDeleted.errors) {
      res.status(200).json(alunoDeleted);
      return;
    }
    res.status(404).json(alunoDeleted.errors);
  }
}

export default new AlunosControllers();
