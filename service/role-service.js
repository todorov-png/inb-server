/* eslint-disable */
import RoleModel from '../models/role-model.js';
import ApiError from '../exceptions/api-error.js';

class RoleService {
  async createRole(data, i18n) {
    const isRole = await RoleModel.findOne({ name: data.name });
    if (isRole) {
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

  async deleteRole(_id, i18n) {
    const isRole = await RoleModel.findById(_id);
    if (!isRole) {
      throw ApiError.BadRequerest(i18n.t('ROLE_SERVICE.DELETE'));
    }
    await RoleModel.deleteOne({ _id });
    return null;
  }

  async getAllRoles() {
    const roles = await RoleModel.find();
    return roles;
  }

  async getRolesList() {
    const roles = await RoleModel.find({}, { _id: true, name: true });
    return roles;
  }

  async getRoleName(id) {
    const role = await RoleModel.findOne({ _id: id }, { _id: true, name: true });
    return role;
  }
}

export default new RoleService();
