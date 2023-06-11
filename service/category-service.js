import CategoryModel from '../models/category-model.js';

class CategoryService {
  async findById(id) {
    return await CategoryModel.findById(id);
  }

  async findByName(nameRU) {
    return await CategoryModel.findOne({
      nameRU: new RegExp('^' + nameRU + '$', 'i'),
    });
  }

  async create(data) {
    return await CategoryModel.create(data);
  }

  async update(id, data) {
    await CategoryModel.updateOne({ _id: id }, data);
  }

  async delete(id) {
    await CategoryModel.deleteOne({ _id: id });
  }

  async getAll() {
    return await CategoryModel.find({});
  }

  async getList() {
    return await CategoryModel.find({}, { _id: true, nameRU: true });
  }
}

export default new CategoryService();
