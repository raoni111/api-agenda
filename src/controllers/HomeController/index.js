class HomeController {
  index(req, res) {
    res.status(200).send({
      online: true,
      code: res.statusCode
    })
  }
}

export default new HomeController();
