import mailService from '../service/mail-service.js';
import tokenService from '../service/token-service.js';
// import landService from '../service/land-service.js';
import clientService from '../service/client-service.js';
// import crmService from '../service/crm-service.js';
import ApiError from '../exceptions/api-error.js';
import UserDto from '../dtos/user-dto.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
// import { decrypt } from '../helpers/encryption.js';

class ClientController {
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

      const isEmail = await clientService.findByEmail(email);
      if (isEmail) {
        throw ApiError.BadRequerest(i18n.t('USER_SERVICE.REGISTRATION.EMAIL'));
      }

      const isUsername = await clientService.findByUsername(username);
      if (isUsername) {
        throw ApiError.BadRequerest(i18n.t('USER_SERVICE.REGISTRATION.USERNAME'));
      }

      const hashPassword = await bcrypt.hash(password, 3);
      const activationLink = uuidv4();
      const user = await clientService.create({
        username,
        email,
        password: hashPassword,
        activationLink,
        registrationDate: Date.now(),
      });
      await mailService.sendActivationMail(
        email,
        `${process.env.API_URL}/api/activate/${activationLink}`,
        req.i18n
      );

      const userDto = new UserDto(user);
      const tokens = tokenService.generate({ id: user._id, username, email });
      await tokenService.save(user._id, tokens.refreshToken);
      const userData = { ...tokens, user: userDto };

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
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
      const user = await clientService.findByEmailFull(email);
      if (!user) {
        throw ApiError.BadRequerest(req.t('USER_SERVICE.LOGIN.NOT_USER'));
      }
      const isPassEquals = await bcrypt.compare(password, user.password);
      if (!isPassEquals) {
        throw ApiError.BadRequerest(req.t('USER_SERVICE.LOGIN.NOT_MATCH_PASSWORD'));
      }
      const userDto = new UserDto(user);
      const tokens = tokenService.generate({ id: user._id, username: user.username, email });
      await tokenService.save(user._id, tokens.refreshToken);
      const userData = { ...tokens, user: userDto };
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      await tokenService.delete(refreshToken);
      res.clearCookie('refreshToken');
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      const user = await clientService.findByActivationLink(activationLink);
      if (!user) {
        throw ApiError.BadRequerest(req.t('USER_SERVICE.ACTIVATE.LINK'));
      }
      user.isActivated = true;
      user.activationDate = Date.now();
      await clientService.update(user._id, user);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  }

  async sendNewActivationCode(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const tokenData = await tokenService.get(refreshToken);
      if (!tokenData) {
        throw ApiError.BadRequerest(req.t('USER_CONTROLLER.SEND_CODE.NOT_USER'));
      }
      const UserData = await clientService.findById(id);
      if (!UserData) {
        throw ApiError.BadRequerest(req.t('USER_CONTROLLER.SEND_CODE.NOT_USER'));
      }
      if (!UserData.isActivated) {
        const activationLink = uuidv4();
        UserData.activationLink = activationLink;
        await mailService.sendActivationMail(
          UserData.email,
          `${process.env.API_URL}/api/activate/${activationLink}`,
          req.i18n
        );
        await clientService.update(UserData._id, UserData);
      }
      return res.end();
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        throw ApiError.UnauthorizedError();
      }
      const userData = tokenService.validateRefresh(refreshToken);
      const tokenFromDb = await tokenService.get(refreshToken);
      if (!userData || !tokenFromDb) {
        throw ApiError.UnauthorizedError();
      }
      const user = await clientService.findByIdFull(userData.id);
      const userDto = new UserDto(user);
      const tokens = tokenService.generate({
        id: user._id,
        username: user.username,
        email: user.email,
      });
      await tokenService.save(user._id, tokens.refreshToken);
      const userInfo = { ...tokens, user: userDto };
      res.cookie('refreshToken', userInfo.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });
      return res.json(userInfo);
    } catch (e) {
      next(e);
    }
  }

  async updateUser(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const { password, newPassword, username, email } = req.body;
      if (!password) {
        throw ApiError.BadRequerest(req.t('USER_SERVICE.UPDATE_USER.NOT_PASSWORD'));
      }

      const userData = tokenService.validateRefresh(refreshToken);
      const tokenFromDb = await tokenService.get(refreshToken);

      if (!userData || !tokenFromDb) {
        throw ApiError.UnauthorizedError();
      }
      const user = await clientService.findById(userData.id);
      const isPassEquals = await bcrypt.compare(password, user.password);
      if (!isPassEquals) {
        throw ApiError.BadRequerest(req.t('USER_SERVICE.UPDATE_USER.NOT_MATCH_PASSWORD'));
      }
      if (newPassword) user.password = await bcrypt.hash(newPassword, 3);
      if (username) user.username = username;
      if (email) user.email = email;
      await clientService.update(user._id, user);
      const userDto = new UserDto(user);
      return res.json(userDto);
    } catch (e) {
      next(e);
    }
  }

  // async getLands(req, res, next) {
  //   try {
  //     const { refreshToken } = req.cookies;
  //     //TODO добавить переводы и переименовать сервисы в функции в ленды
  //     const tokenData = tokenService.validateRefresh(refreshToken);
  //     if (!tokenData) {
  //       throw ApiError.BadRequerest(req.t('USER_CONTROLLER.GET_PRODUCTS.NOT_USER'));
  //     }

  //     const userData = await clientService.getUserTeamInfo(tokenData.id);
  //     if (!userData.team) {
  //       throw ApiError.BadRequerest(req.t('USER_CONTROLLER.GET_PRODUCTS.NOT_TEAM'));
  //     }

  //     const bearer = decrypt(userData.team.bearer);
  //     const offers = await crmService.getAllOffers(bearer);
  //     if (offers === null) {
  //       throw ApiError.BadRequerest(req.t('USER_CONTROLLER.GET_PRODUCTS.BEARER_INVALID'));
  //     }
  //     //TODO тут нужно еще отфильтровать по разрешению на просмотр от админа
  //     const productsName = offers.data.map((offer) => offer.offer_title);
  //     const dataLands = await landService.getTeamsProductsLends(productsName);
  //     const lands = {};
  //     dataLands.forEach((land) => {
  //       if (!land.privacy || land.teamName.toLocaleLowerCase === userData.team.name) {
  //         const nameKey = land.product.replace(/\W/, '_');
  //         Array.isArray(lands[nameKey]) ? null : (lands[nameKey] = []);
  //         lands[nameKey].push({
  //           country: land.country,
  //           product: land.product,
  //           _id: land._id,
  //         });
  //       }
  //     });
  //     return res.json(lands);
  //   } catch (e) {
  //     next(e);
  //   }
  // }
}

export default new ClientController();
