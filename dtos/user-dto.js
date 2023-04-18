class UserDto {
  username;
  email;
  id;
  isActivated;
  role;
  team;

  constructor(model) {
    this.username = model.username;
    this.email = model.email;
    this.id = model._id;
    this.isActivated = model.isActivated;
    this.role = model.role || null;
    this.team = model.team || null;
  }
}

export default UserDto;
