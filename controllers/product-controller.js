import productService from '../service/product-service.js';
import ApiError from '../exceptions/api-error.js';

class ProductController {
  async create(req, res, next) {
    try {
      const { name, country } = req.body;
      const isProduct = await productService.findByNameAndCountry(name, country);
      if (isProduct) {
        throw ApiError.BadRequerest(req.t('CONTROLLER.PRODUCT.HAS_ALREADY'));
      }
      const data = await productService.create(req.body);
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const { name, country, _id } = req.body;
      let product = await productService.findById(_id);
      if (!product) {
        throw ApiError.BadRequerest(req.t('CONTROLLER.PRODUCT.NOT_FOUND'));
      }
      const isProduct = await productService.findByNameAndCountry(name, country);
      if (isProduct && isProduct._id.toString() !== product._id.toString()) {
        throw ApiError.BadRequerest(req.t('CONTROLLER.PRODUCT.HAS_ALREADY'));
      }
      await productService.update(_id, req.body);
      return res.end();
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const { product } = req.body;
      const isProduct = await productService.findById(product);
      if (!isProduct) {
        throw ApiError.BadRequerest(req.t('CONTROLLER.PRODUCT.NOT_FOUND'));
      }
      await productService.delete(product);
      return res.end();
    } catch (e) {
      next(e);
    }
  }

  async getList(req, res, next) {
    try {
      const data = await productService.getList();
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async getAll(req, res, next) {
    try {
      const data = await productService.getAll();
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async get(req, res, next) {
    try {
      const { _id } = req.body;
      const data = await productService.get(_id);
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async getFull(req, res, next) {
    try {
      const { _id } = req.body;
      const data = await productService.getFull(_id);
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
}

export default new ProductController();
