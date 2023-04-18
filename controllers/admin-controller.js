/* eslint-disable */
import roleService from '../service/role-service.js';
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
}

export default new AdminController();
