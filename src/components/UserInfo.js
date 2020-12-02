export default class UserInfo {
    constructor(profileNameSelector,  profileJobSelector) {
        this._userName = document.querySelector(profileNameSelector);
        this._userJob = document.querySelector(profileJobSelector);
    }
    getUserInfo() {
        return {
            name: this._userName.textContent,
            job: this._userJob.textContent
        }
    }
    setUserInfo(data) {
        this._userName.textContent = data.name;
        this._userJob.textContent = data.job;
    }
}
