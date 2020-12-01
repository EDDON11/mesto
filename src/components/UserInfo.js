export default class UserInfo {
    constructor({
        profileNameSelector,
        profileJobSelector
    }) {
        this._userName = (profileNameSelector);
        this._userJob = (profileJobSelector);
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
