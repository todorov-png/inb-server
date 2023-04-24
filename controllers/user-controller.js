/* eslint-disable */
import mailService from '../service/mail-service.js';
import tokenService from '../service/token-service.js';
import userService from '../service/user-service.js';
import crmService from '../service/crm-service.js';
import ApiError from '../exceptions/api-error.js';
import { decrypt } from '../helpers/encryption.js';

class UserController {
  async registration(req, res, next) {
    try {
      const { username, email, password, repeatPassword } = req.body;
      if (!username && !email && !password && !repeatPassword) {
        throw ApiError.BadRequerest(req.t('USER_CONTROLLER.REGISTRATION.EMPTY'));
      }
      if (!/^[0-9a-zA-Z]+$/.test(username)) {
        throw ApiError.BadRequerest(req.t('USER_CONTROLLER.REGISTRATION.USERNAME'));
      }
      if (!/^[^@]+@\w+(\.\w+)+\w$/.test(email)) {
        throw ApiError.BadRequerest(req.t('USER_CONTROLLER.REGISTRATION.EMAIL'));
      }
      if (password !== repeatPassword) {
        throw ApiError.BadRequerest(req.t('USER_CONTROLLER.REGISTRATION.PASSWORD.NOT_MATCH'));
      }
      if (password.length < 4) {
        throw ApiError.BadRequerest(req.t('USER_CONTROLLER.REGISTRATION.PASSWORD.LONG'));
      }
      if (password.length > 32) {
        throw ApiError.BadRequerest(req.t('USER_CONTROLLER.REGISTRATION.PASSWORD.SHORT'));
      }
      const userData = await userService.registration(username, email, password, req.i18n);
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
        throw ApiError.BadRequerest(req.t('USER_CONTROLLER.LOGIN.EMPTY'));
      }
      if (!/^[^@]+@\w+(\.\w+)+\w$/.test(email)) {
        throw ApiError.BadRequerest(req.t('USER_CONTROLLER.LOGIN.EMAIL'));
      }
      const userData = await userService.login(email, password, req.i18n);
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
      await userService.activate(activationLink, req.i18n);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  }

  async sendNewActivationCode(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const tokenData = await tokenService.findToken(refreshToken);
      if (!tokenData) {
        throw ApiError.BadRequerest(req.t('USER_CONTROLLER.SEND_CODE.NOT_USER'));
      }

      const UserData = await userService.getUser(tokenData.user);
      if (!UserData) {
        throw ApiError.BadRequerest(req.t('USER_CONTROLLER.SEND_CODE.NOT_USER'));
      }

      if (!UserData.isActivated) {
        const activationLink = userService.createActivationLink();
        UserData.activationLink = activationLink;

        await mailService.sendActivationMail(
          UserData.email,
          `${process.env.API_URL}/api/activate/${activationLink}`,
          req.i18n
        );

        await UserData.save();
      }
      return res.end();
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

  async updateUser(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const user = await userService.updateUser(refreshToken, req.body, req.i18n);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async getProducts(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      //TODO добавить переводы и переименовать сервисы в функции в ленды
      const tokenData = tokenService.validateRefreshToken(refreshToken);
      if (!tokenData) {
        throw ApiError.BadRequerest(req.t('USER_CONTROLLER.GET_PRODUCTS.NOT_USER'));
      }

      const userData = await userService.getUserTeamBearer(tokenData.id);
      if (!userData.team) {
        throw ApiError.BadRequerest(req.t('USER_CONTROLLER.GET_PRODUCTS.NOT_TEAM'));
      }

      const bearer = decrypt(userData.team.bearer);
      const offers = await crmService.getAllOffers(bearer);
      if (offers === null) {
        throw ApiError.BadRequerest(req.t('USER_CONTROLLER.GET_PRODUCTS.BEARER_INVALID'));
      }
      const lends = [];
      //TODO тут получаем с базы все ленды что им подходят и формируем массив с ними
      // offers.data.forEach(offer => {
      //   offer.offer_title
      // })

      console.log(offers.data);

      return res.json(lends);
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();
