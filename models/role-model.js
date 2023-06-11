import { Schema, model } from 'mongoose';

const RoleSchema = new Schema({
  name: { type: String, unique: true, required: true },
  permissions: {
    createTeam: { type: Boolean },
    assignTeam: { type: Boolean },
    deleteTeam: { type: Boolean },
    createRole: { type: Boolean },
    assignRole: { type: Boolean },
    deleteRole: { type: Boolean },
    createUser: { type: Boolean },
    deleteUser: { type: Boolean },
    createCategory: { type: Boolean },
    assignCategory: { type: Boolean },
    deleteCategory: { type: Boolean },
    createCountry: { type: Boolean },
    assignCountry: { type: Boolean },
    deleteCountry: { type: Boolean },
    createProduct: { type: Boolean },
    deleteProduct: { type: Boolean },
  },
});

export default model('Role', RoleSchema);
