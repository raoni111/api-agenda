import genereteId from '../services/generete_id';

const fs = require('fs');
const path = require('path');
const alunos = require('../database/alunos.json')
class Aluno {
  path = path.join(__dirname, '..', 'database', 'alunos.json');

  postAluno(aluno) {
    aluno.id = genereteId(alunos);

    console.log(aluno)
    alunos.push(aluno);
    this.writeAlunos(alunos);

    return aluno;
  }

  postPhotoToAluno(id , photoUrl) {
    alunos.forEach((aluno, index) => {
      if (aluno.id === Number(id)) {
        alunos[index].avatarUrl = photoUrl;
      }
    });

    this.writeAlunos(alunos);
  }

  getAllAluno() {
    return alunos.map((aluno) => ({
      id: aluno.id,
      nome: aluno.nome,
      email: aluno.email,
    }));
  }

  getAlunoByEmail(email) {
    let _user;
    alunos.forEach((aluno) => {
      if (aluno.email === email) {
        _user = aluno;
      }
    })
    console.log(_user);
    return _user;
  }

  getAluno(id) {
    try {
      let _aluno;
      alunos.forEach((aluno) => {
        if (aluno.id === id) {
          _aluno = aluno;
        }
      })
      return _aluno ?_aluno : {
        errors: [
        " aluno not found!"
        ]
      }
    } catch(error) {
      return {
        errors: [
          " aluno not found!"
        ]
      }
    }
    return {
      errors: [
        "aluno not found!"
      ]
    }
  }

  update(id, body) {
    let alunoModified;
    alunos.forEach((aluno, index) => {
      if (aluno.id === id) {
        for (const keyBody in body) {
          for (const key in aluno) {
            if (keyBody === key) {
              alunos[index][key] = body[key]
            }
          }

        }
        alunoModified = alunos[index];
      }
    })
    this.writeAlunos(alunos);
    return alunoModified;
  }

  delete(id) {
    let userDeleted;
    alunos.forEach((aluno, index) => {
      console.log(id, aluno.id);
      if (aluno.id === Number(id)) {
        userDeleted = alunos[index];
        alunos.splice(index, 1);
        this.writeAlunos(alunos);
      }
    });

    if (userDeleted) {
      return userDeleted
    }

    return {
      errors: [
        'aluno not found',
      ],
    }
  }

  writeAlunos(aluno) {
    fs.writeFile(this.path, JSON.stringify(aluno), (error) => {
      throw new Error(error)
    })
  }
}

export default new Aluno();
