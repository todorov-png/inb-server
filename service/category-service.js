import CategoryModel from '../models/category-model.js';

class CategoryService {
  async findById(id) {
    return await CategoryModel.findById(id);
  }

  async findByName(name) {
    return await CategoryModel.findOne({
      name: new RexExp('^' + name + '$', 'i'),
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

  async getList() {
    return await CategoryModel.find({}, { _id: true, name: true });
  }
}

export default new CategoryService();
