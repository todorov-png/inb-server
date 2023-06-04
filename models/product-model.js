import { Schema, model } from 'mongoose';

const ProductSchema = new Schema({
  nameSoftware: { type: String, unique: true, required: true },
  nameCRM: { type: String, required: true },
  price: { type: Number, required: true, default: 0 },
  country: { type: Schema.Types.ObjectId, ref: 'Country' },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  lands: [{ type: Schema.Types.ObjectId, ref: 'Land' }],
  ageGroup: { form: { type: String }, to: { type: String } },
});

export default model('Product', ProductSchema);
