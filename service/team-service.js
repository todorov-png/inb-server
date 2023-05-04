import TeamModel from '../models/team-model.js';

class TeamService {
  async findById(id) {
    return await TeamModel.findById(id);
  }

  async findByName(name) {
    return await TeamModel.findOne({
      name: new RexExp('^' + name + '$', 'i'),
    });
  }

  async create(data) {
    return await TeamModel.create(data);
  }

  async update(id, data) {
    await TeamModel.updateOne({ _id: id }, data);
  }

  async delete(id) {
    await TeamModel.deleteOne({ _id: id });
  }

  async getAll() {
    const teams = await TeamModel.find({}, { _id: true, name: true, members: true, linkTg: true });
    return teams;
  }

  async getList() {
    const teams = await TeamModel.find({}, { _id: true, name: true });
    return teams;
  }

  async getName(id) {
    const team = await TeamModel.findOne({ _id: id }, { _id: true, name: true });
    return team;
  }

  async incUserCounter(id) {
    await TeamModel.updateOne({ _id: id }, { $inc: { members: 1 } });
    return null;
  }

  async decUserCounter(id) {
    await TeamModel.updateOne({ _id: id }, { $inc: { members: -1 } });
    return null;
  }
}
export default new TeamService();
