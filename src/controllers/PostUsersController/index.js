import users from "../../models/Users";
import bcrypt from "bcrypt";

class UsersController {
  async create(req, res) {
    const { body } = req;
    if (!body.password || !body.email) {
      res.status(401).json({
        errors: [
          'Email invalido',
          'campo senha nao prenchido',
        ]
      })
      return;
    }

    bcrypt.genSalt(10, (error, salt) => {
      bcrypt.hash(body.password, salt, (error, encrypted) => {
        body.password = encrypted;

        const aluno = users.postAluno(body);
        res.status(200).send({
          "nome": aluno.nome,
          "email": aluno.email,
          "id": aluno.id,
        });
      })
    })
  }

  show(req, res) {
    const id = req.user.id;
    const user = users.getUser(Number(id));

    res.status(200).json({
      id: user.id,
      nome: user.nome,
      email: user.email
    })
  }

  index(req, res) {
    const _users = users.getAllUsers();
    if (!_users.errors) {
      res.status(200).json(_users);
      return;
    }
    res.status(404).json(_users.errors)
  }

  update(req, res) {
    const userModified = users.update(Number(req.params.id), req.body);
    if (!userModified.errors) {
      res.status(200).json(userModified);
      return;
    }
    res.status(404).json(userModified.errors)
  }

  delete(req, res) {
    const userDeleted = users.delete(req.user.id);

    if (!userDeleted.errors) {
      res.status(200).json(userDeleted);
      return;
    }
    res.status(404).json(userDeleted.errors);
  }
}

export default new UsersController();
