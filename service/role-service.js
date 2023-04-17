/* eslint-disable */
import RoleModel from '../models/role-model.js';
import ApiError from '../exceptions/api-error.js';

class RoleService {
  async createRole(data, i18n) {
    const isName = await RoleModel.findOne({ name: data.name });
    if (isName) {
      throw ApiError.BadRequerest(i18n.t('ROLE_SERVICE.CREATE'));
    }
    const role = await RoleModel.create(data);
    return role;
  }

  async updateRole(data, i18n) {
    const role = await RoleModel.findById(data._id);
    if (!role) {
      throw ApiError.BadRequerest(i18n.t('ROLE_SERVICE.UPDATE'));
    }
    role.name = data.name;
    role.permissions = data.permissions;
    await role.save();
    return null;
  }

  async getAllRoles() {
    const roles = await RoleModel.find();
    return roles;
  }
}

export default new RoleService();
