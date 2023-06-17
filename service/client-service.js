import UserModel from '../models/user-model.js';

class ClientService {
  async findById(id) {
    return await UserModel.findById(id);
  }

  async findByIdFull(id) {
    return await UserModel.findById(id).populate('role', 'permissions');
  }

  async findByEmail(email) {
    return await UserModel.findOne({
      email: new RegExp('^' + email + '$', 'i'),
    });
  }

  async findByEmailFull(email) {
    return await UserModel.findOne({
      email: new RegExp('^' + email + '$', 'i'),
    }).populate('role', 'permissions');
  }

  async findByUsername(username) {
    return await UserModel.findOne({
      username: new RegExp('^' + username + '$', 'i'),
    });
  }

  async findByActivationLink(activationLink) {
    return await UserModel.findOne({ activationLink });
  }

  async create(data) {
    return await UserModel.create(data);
  }

  async update(id, data) {
    await UserModel.updateOne({ _id: id }, data);
  }

  async getUserTeamInfo(id) {
    return await UserModel.findOne({ _id: id }, { team: true }).populate('team');
  }
}

export default new ClientService();
