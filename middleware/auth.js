class Auth {
  async validate(req, res, next) {
    const { token } = req.headers;
  }
}

export default new Auth();
