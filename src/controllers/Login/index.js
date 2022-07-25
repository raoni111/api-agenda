import users from "../../models/Users";
import bcrypt from 'bcrypt';
import Jwt from "jsonwebtoken";

class Login {
  async login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        errors: [
          'Email invalido',
          'Campo senha deve ser preenchido'
        ]
      });
    }
    const user = users.getUserByEmail(email);

    if (user) {
      await bcrypt.compare(password, user.password).then((boolean) => {
        if (boolean) {
          const usersLimited = {
            id: user.id,
            nome: user.nome,
            email: user.email,
          }
          const token = Jwt.sign(usersLimited, process.env.JSON_WEB_TOKEN, {
            expiresIn: process.env.TOKEN_EXPIRETION,
          });

          return res.status(200).json({
            toke: token
          })
        }
        return res.status(401).json({
          errors: [
            'email ou senha invalida'
          ]
        })
      })
    }
    return res.status(401).json({
      errors: [
        'email ou senha invalida'
      ]
    })
  }
}

export default new Login();
