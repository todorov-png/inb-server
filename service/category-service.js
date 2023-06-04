import CategoryModel from '../models/category-model.js';

class CategoryService {
  async findById(id) {
    return await CategoryModel.findById(id);
  }

  async findByName(nameCRM, nameSoftware) {
    return await CategoryModel.findOne({
      nameSoftware: new RegExp('^' + nameSoftware + '$', 'i'),
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
    return await CategoryModel.find({}, { _id: true, nameSoftware: true });
  }
}

export default new CategoryService();
