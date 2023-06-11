import ProductModel from '../models/product-model.js';
import { ObjectId } from 'mongodb'

class ProductService {
  async findById(id) {
    return await ProductModel.findById(id);
  }

  async findByName(nameSoftware) {
    return await ProductModel.findOne({
      nameSoftware: new RegExp('^' + nameSoftware + '$', 'i'),
    });
  }

  async findByNameCRMAndCountry(nameCRM, country) {
    return await ProductModel.findOne({
      nameCRM: new RegExp('^' + nameCRM + '$', 'i'),
      country: new ObjectId(country),
    });
  }

  async create(data) {
    return await ProductModel.create(data);
  }

  async update(id, data) {
    await ProductModel.updateOne({ _id: id }, data);
  }

  async delete(id) {
    await ProductModel.deleteOne({ _id: id });
  }

  async getList() {
    const products = await ProductModel.find(
      {},
      { _id: true, nameSoftware: true, country: true }
    ).populate('country', 'nameSoftware');

    return products.map((item) => {
      return { _id: item._id, name: `${item.nameSoftware}[${item.country}]` };
    });
  }

  async getAll() {
    return await ProductModel.find({}, {})
      .populate('country', 'nameSoftware')
      .populate('category', 'nameRU');
  }

  async get(id) {
    return await ProductModel.findOne({ _id: id });
  }

  async getFull(id) {
    return await ProductModel.findOne({ _id: id })
      .populate('country')
      .populate('category')
      .populate('lands');
  }

  async clearCountry(_id) {
    await ProductModel.updateMany({ country: _id }, { country: null });
  }

  async clearCategory(_id) {
    await ProductModel.updateMany({ category: _id }, { category: null });
  }

  async pushLand(productID, landID) {
    await ProductModel.updateOne({ _id: productID }, { $push: { lands: landID } });
  }

  async popLand(productID, landID) {
    await ProductModel.updateOne({ _id: productID }, { $pop: { lands: landID } });
  }
}
export default new ProductService();
