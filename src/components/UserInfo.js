export default class UserInfo {
    constructor(profileNameSelector, profileJobSelector, avatarSelector) {
        this._userName = document.querySelector(profileNameSelector);
        this._userJob = document.querySelector(profileJobSelector);
        this._userAvatar = document.querySelector(avatarSelector)
    }
    getUserInfo() {
        return {
            name: this._userName.textContent,
            about: this._userJob.textContent,
        }
    }
    setUserInfo(data) {
        if (data)
        {
        this._userName.textContent = data.name;
        this._userJob.textContent = data.about;
        this._userAvatar.src = data.avatar
        }
       
    }
  
}