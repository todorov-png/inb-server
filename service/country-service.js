import CountryModel from '../models/country-model.js';
class CountryService {
  async findById(id) {
    return await CountryModel.findById(id);
  }

  async findByName(name) {
    return await CountryModel.findOne({
      name: new RegExp('^' + name + '$', 'i'),
    });
  }

  async create(data) {
    return await CountryModel.create(data);
  }

  async update(id, data) {
    await CountryModel.updateOne({ _id: id }, data);
  }

  async delete(id) {
    await CountryModel.deleteOne({ _id: id });
  }

  async getList() {
    return await CountryModel.find({}, { _id: true, name: true });
  }

  async get(id) {
    return await CountryModel.findOne({ _id: id });
  }
}
export default new CountryService();
