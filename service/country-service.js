import CountryModel from '../models/country-model.js';
class CountryService {
  async findById(id) {
    return await CountryModel.findById(id);
  }

  async findByName(nameSoftware) {
    return await CountryModel.findOne({
      nameSoftware: new RegExp('^' + nameSoftware + '$', 'i'),
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

  async getAll() {
    return await CountryModel.find({});
  }

  async getList() {
    return await CountryModel.find({}, { _id: true, nameSoftware: true });
  }
}
export default new CountryService();
