/* eslint-disable */
import TeamModel from '../models/team-model.js';
import ApiError from '../exceptions/api-error.js';
import userService from '../service/user-service.js';

class TeamService {
  async createTeam(data, i18n) {
    data.name = data.name.toLowerCase();
    const isTeam = await TeamModel.findOne({ name: data.name });
    if (isTeam) {
      throw ApiError.BadRequerest(i18n.t('TEAM_SERVICE.HAS_ALREADY'));
    }
    const team = await TeamModel.create(data);
    return team;
  }

  async updateTeam(data, i18n) {
    const team = await TeamModel.findById(data._id);
    if (!team) {
      throw ApiError.BadRequerest(i18n.t('TEAM_SERVICE.NOT_FOUND'));
    }
    data.name = data.name.toLowerCase();
    const isTeam = await TeamModel.findOne({ name: data.name });
    if (isTeam && isTeam._id !== team._id) {
      throw ApiError.BadRequerest(i18n.t('TEAM_SERVICE.HAS_ALREADY'));
    }
    team.name = data.name;
    data.bearer ? (team.bearer = data.bearer) : null;
    team.linkTg = data.linkTg;
    await team.save();
    return null;
  }

  async deleteTeam(_id, i18n) {
    const isTeam = await TeamModel.findById(_id);
    if (!isTeam) {
      throw ApiError.BadRequerest(i18n.t('TEAM_SERVICE.NOT_FOUND'));
    }
    await userService.clearUserTeam(_id);
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
