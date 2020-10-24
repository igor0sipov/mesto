export default class UserInfo {
  constructor(name, bio) {
    this._name = name;
    this._bio = bio;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      bio: this._bio.textContent,
    }
  }

  setUserInfo(newName, newBio) {
    this._name.textContent = newName;
    this._bio.textContent = newBio;
  }
}
