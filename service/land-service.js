/* eslint-disable */
import LandModel from '../models/land-model.js';
// import ApiError from '../exceptions/api-error.js';

class LandService {
  async getProductLends(product) {
    const lends = await LandModel.find({ product });
    return lends;
  }

  async getTeamsProductsLends(products) {
    //TODO тут добавить условие на дополнительное поле разрешающее просмотр
    const lends = await LandModel.find(
      { product: { $in: products }, status: 'push' },
      { product: true, country: true, teamName: true, privacy: true }
    );
    return lends;
  }
//TODO методы выше без рефакторинга
  async connectProduct(productID, landID) {
    await LandModel.updateOne({ _id: landID }, { connectedProduct: productID });
  }

  async disconnectProduct(id) {
    await LandModel.updateOne({ _id: id }, { connectedProduct: null });
  }
}

export default new LandService();
