/* eslint-disable */
import TeamModel from '../models/team-model.js';
import ApiError from '../exceptions/api-error.js';

class TeamService {
  async createTeam(data, i18n) {
    const isTeam = await TeamModel.findOne({ name: data.name });
    if (isTeam) {
      throw ApiError.BadRequerest(i18n.t('TEAM_SERVICE.CREATE'));
    }
    const team = await TeamModel.create(data);
    return team;
  }

  async updateTeam(data, i18n) {
    const team = await TeamModel.findById(data._id);
    if (!team) {
      throw ApiError.BadRequerest(i18n.t('TEAM_SERVICE.UPDATE'));
    }
    //TODO добавить проверку на наличие команды с таким именем и отвечать ошибкой если оно есть
    team.name = data.name;
    team.bearer = data.bearer;
    team.linkTg = data.linkTg;
    await team.save();
    return null;
  }

  async deleteTeam(_id, i18n) {
    const isTeam = await TeamModel.findById(_id);
    if (!isTeam) {
      throw ApiError.BadRequerest(i18n.t('TEAM_SERVICE.DELETE'));
    }
    await TeamModel.deleteOne({ _id });
    return null;
  }

  async getAllTeams() {
    const teams = await TeamModel.find({}, { _id: true, name: true, linkTg: true });
    return teams;
  }

  async getTeamsList() {
    const teams = await TeamModel.find({}, { _id: true, name: true });
    return teams;
  }

  async getTeamName(id) {
    const team = await TeamModel.findOne({ _id: id }, { _id: true, name: true });
    return team;
  }
}

export default new TeamService();
