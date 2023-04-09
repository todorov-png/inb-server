/* eslint-disable */
import UserModel from '../models/user-model.js';
import UserDto from '../dtos/user-dto.js';
import mailService from './mail-service.js';
import tokenService from './token-service.js';
import ApiError from '../exceptions/api-error.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

class UserService {
  async registration(username, email, password) {
    const isEmail = await UserModel.findOne({ email });
    if (isEmail) {
      throw ApiError.BadRequerest('User with this email is registered');
    }

    const isUsername = await UserModel.findOne({ username });
    if (isUsername) {
      throw ApiError.BadRequerest('User with this username is registered');
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = this.createActivationLink();
    const user = await UserModel.create({
      username,
      email,
      password: hashPassword,
      activationLink,
      registrationDate: Date.now(),
    });

    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`
    );

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink });
    if (!user) {
      throw ApiError.BadRequerest('Incorrect activation link');
    }
    user.isActivated = true;
    user.activationDate = Date.now();
    await user.save();
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequerest('User with this email was not found');
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequerest('Incorrect password');
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async getCurrentUser(id) {
    const user = await UserModel.findOne({ _id: id });
    return user;
  }

  createActivationLink() {
    const activationLink = uuidv4();
    return activationLink;
  }

  async getAllUsers() {
    const users = await UserModel.find();
    return users;
  }
}

export default new UserService();
