import jwt from 'jsonwebtoken';

class LoginRequired {
  loginRequired(req, res, next) {
    const { authorization  } = req.headers;
    if (!authorization) {
      return res.status(401).json({
        error: "Você precisa estar logado para acessar essa requisição",
      })
    }

    const token = authorization.split(' ')[1];
    try {
      const user = jwt.verify(token, process.env.JSON_WEB_TOKEN)
      req.user = user;

      return next();
      
    } catch (error) {
      return res.status(401).json({
        errors: [
          'token se expirou ou não existe'
        ]
      })
    }

  }
}

export default new LoginRequired();
