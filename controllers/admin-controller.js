/* eslint-disable */
import roleService from '../service/role-service.js';
import userService from '../service/user-service.js';
import teamService from '../service/team-service.js';

class AdminController {
  async createRole(req, res, next) {
    try {
      const roleData = await roleService.createRole(req.body, req.i18n);
      return res.json(roleData);
    } catch (e) {
      next(e);
    }
  }

  async updateRole(req, res, next) {
    try {
      await roleService.updateRole(req.body, req.i18n);
      return res.end();
    } catch (e) {
      next(e);
    }
  }

  async deleteRole(req, res, next) {
    try {
      const { role } = req.body;
      await roleService.deleteRole(role, req.i18n);
      return res.end();
    } catch (e) {
      next(e);
    }
  }

  async deleteRoles(req, res, next) {
    try {
      const { roles } = req.body;
      for (const role of roles) {
        await roleService.deleteRole(role, req.i18n);
      }
      return res.end();
    } catch (e) {
      next(e);
    }
  }

  async fetchRoles(req, res, next) {
    try {
      const roles = await roleService.getAllRoles();
      return res.json(roles);
    } catch (e) {
      next(e);
    }
  }

  async fetchRolesList(req, res, next) {
    try {
      const roles = await roleService.getRolesList();
      return res.json(roles);
    } catch (e) {
      next(e);
    }
  }

  async createTeam(req, res, next) {
    try {
      const teamData = await teamService.createTeam(req.body, req.i18n);
      return res.json(teamData);
    } catch (e) {
      next(e);
    }
  }

  async updateTeam(req, res, next) {
    try {
      await teamService.updateTeam(req.body, req.i18n);
      return res.end();
    } catch (e) {
      next(e);
    }
  }

  async deleteTeam(req, res, next) {
    try {
      const { team } = req.body;
      await teamService.deleteTeam(team, req.i18n);
      return res.end();
    } catch (e) {
      next(e);
    }
  }

  async fetchTeams(req, res, next) {
    try {
      const teams = await teamService.getAllTeams();
      return res.json(teams);
    } catch (e) {
      next(e);
    }
  }

  async fetchTeamsList(req, res, next) {
    try {
      const teams = await teamService.getTeamsList();
      return res.json(teams);
    } catch (e) {
      next(e);
    }
  }

  async fetchUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async editUser(req, res, next) {
    try {
      const user = await userService.editUser(req.body, req.i18n);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const { user } = req.body;
      await userService.deleteUser(user, req.i18n);
      return res.end();
    } catch (e) {
      next(e);
    }
  }
}

export default new AdminController();
