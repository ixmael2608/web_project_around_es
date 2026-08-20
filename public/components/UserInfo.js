export class UserInfo {
    constructor({ userNameSelector, userJobSelector, avatarSelector }) {
        this._userNameElement = document.querySelector(userNameSelector);
        this._userJobElement = document.querySelector(userJobSelector);
        this._avatarElement = document.querySelector(avatarSelector);
    }
    getUserInfo() {
        var _a, _b;
        return {
            name: (_a = this._userNameElement.textContent) !== null && _a !== void 0 ? _a : "",
            job: (_b = this._userJobElement.textContent) !== null && _b !== void 0 ? _b : "",
            avatar: this._avatarElement.src
        };
    }
    setUserInfo({ name, job, avatar }) {
        this._userNameElement.textContent = name;
        this._userJobElement.textContent = job;
        this._avatarElement.src = avatar;
    }
}
