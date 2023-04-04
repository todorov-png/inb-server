/* eslint-disable */
import userService from '../service/user-service.js';
import ApiError from '../exceptions/api-error.js';

class UserController {
  async registration(req, res, next) {
    try {
      const { username, email, password, repeatPassword } = req.body;
      if (!username && !email && !password && !repeatPassword) {
        throw ApiError.BadRequerest('Complete the form!');
      }
      if (!/^[^@]+@\w+(\.\w+)+\w$/.test(email)) {
        throw ApiError.BadRequerest('Invalid email');
      }
      if (password !== repeatPassword) {
        throw ApiError.BadRequerest('Passwords do not match!');
      }
      if (password.length < 4) {
        throw ApiError.BadRequerest('Password must be longer than 4 characters!');
      }
      if (password.length > 32) {
        throw ApiError.BadRequerest('The password must be shorter than 32 characters!');
      }
      const userData = await userService.registration(username, email, password);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email && !password) {
        throw ApiError.BadRequerest('Complete the form!');
      }
      if (!/^[^@]+@\w+(\.\w+)+\w$/.test(email)) {
        throw ApiError.BadRequerest('Invalid email');
      }
      const userData = await userService.login(email, password);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();
