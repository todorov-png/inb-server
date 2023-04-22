/* eslint-disable */
import roleService from '../service/role-service.js';
import userService from '../service/user-service.js';
import teamService from '../service/team-service.js';
import ApiError from '../exceptions/api-error.js';

class AdminController {
  async createRole(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        throw ApiError.UnauthorizedError();
      }
      const { name, permissions } = req.body;
      const roleData = await roleService.createRole({ name, permissions }, req.i18n);
      return res.json(roleData);
    } catch (e) {
      next(e);
    }
  }

  async updateRole(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        throw ApiError.UnauthorizedError();
      }
      const { _id, name, permissions } = req.body;
      await roleService.updateRole({ _id, name, permissions }, req.i18n);
      return res.end();
    } catch (e) {
      next(e);
    }
  }

  async deleteRole(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        throw ApiError.UnauthorizedError();
      }
      const { role } = req.body;
      await roleService.deleteRole(role, req.i18n);
      return res.end();
    } catch (e) {
      next(e);
    }
  }

  async deleteRoles(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        throw ApiError.UnauthorizedError();
      }
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
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        throw ApiError.UnauthorizedError();
      }
      const roles = await roleService.getAllRoles();
      return res.json(roles);
    } catch (e) {
      next(e);
    }
  }

  async fetchRolesList(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        throw ApiError.UnauthorizedError();
      }
      const roles = await roleService.getRolesList();
      return res.json(roles);
    } catch (e) {
      next(e);
    }
  }

  async createTeam(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        throw ApiError.UnauthorizedError();
      }
      const { name, bearer, linkTg } = req.body;
      const teamData = await teamService.createTeam({ name, bearer, linkTg }, req.i18n);
      return res.json(teamData);
    } catch (e) {
      next(e);
    }
  }

  async updateTeam(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        throw ApiError.UnauthorizedError();
      }
      const { _id, name, bearer, linkTg } = req.body;
      await teamService.updateTeam({ _id, name, bearer, linkTg }, req.i18n);
      return res.end();
    } catch (e) {
      next(e);
    }
  }

  async deleteTeam(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        throw ApiError.UnauthorizedError();
      }
      const { team } = req.body;
      await teamService.deleteTeam(team, req.i18n);
      return res.end();
    } catch (e) {
      next(e);
    }
  }

  async fetchTeams(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        throw ApiError.UnauthorizedError();
      }
      const teams = await teamService.getAllTeams();
      return res.json(teams);
    } catch (e) {
      next(e);
    }
  }

  async fetchTeamsList(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        throw ApiError.UnauthorizedError();
      }
      const teams = await teamService.getTeamsList();
      return res.json(teams);
    } catch (e) {
      next(e);
    }
  }

  async fetchUsers(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        throw ApiError.UnauthorizedError();
      }
      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async editUser(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        throw ApiError.UnauthorizedError();
      }
      const { userId, roleId, teamId } = req.body;
      const user = await userService.editUser({ userId, roleId, teamId }, req.i18n);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }
}

export default new AdminController();
