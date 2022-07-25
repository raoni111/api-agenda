import genereteId from '../services/generete_id';

const fs = require('fs');
const path = require('path');
const users = require('../database/users.json')
class Users {
  path = path.join(__dirname, '..', 'database', 'users.json');

  postAluno(aluno) {
    if (aluno.id) {
      aluno.id = genereteId(users);
    } else {
      aluno.id = 1;
    }
    console.log(aluno)
    users.push(aluno);
    this.writeUsers(users);

    return aluno;
  }

  getAllUsers() {
    return users.map((user) => ({
      id: user.id,
      nome: user.nome,
      email: user.email,
    }));
  }

  getUserByEmail(email) {
    let _user;
    users.forEach((user) => {
      if (user.email === email) {
        _user = user;
      }
    })
    console.log(_user);
    return _user;
  }

  getUser(id) {
    try {
      let _user;
      users.forEach((user) => {
        if (user.id === id) {
          _user = user;
        }
      })
      return _user ? _user : {
        errors: [
        " user not found!"
        ]
      }
    } catch(error) {
      return {
        errors: [
          " user not found!"
        ]
      }
    }
    return {
      errors: [
        "user not found!"
      ]
    }
  }

  update(id, body) {
    let userModified;
    users.forEach((user, index) => {
      if (user.id === id) {
        for (const keyBody in body) {
          for (const key in user) {
            if (keyBody === key) {
              users[index][key] = body[key]
            }
          }

        }
        userModified = users[index];
      }
    })
    this.writeUsers(users);
    return userModified;
  }

  delete(id) {
    let userDeleted;
    users.forEach((user, index) => {
      if (user.id === Number(id)) {
        userDeleted = users[index];
        users.splice(index, 1);
        this.writeUsers(users);
      }
    });

    if (userDeleted) {
      return userDeleted
    }

    return {
      errors: [
        'users not found',
      ],
    }
  }

  writeUsers(users) {
    fs.writeFile(this.path, JSON.stringify(users), (error) => {
      throw new Error(error)
    })
  }
}

export default new Users();
