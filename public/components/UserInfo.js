export class UserInfo {
    constructor({ userNameSelector, userJobSelector }) {
        this._userNameElement = document.querySelector(userNameSelector);
        this._userJobElement = document.querySelector(userJobSelector);
    }
    getUserInfo() {
        var _a, _b;
        return {
            name: (_a = this._userNameElement.textContent) !== null && _a !== void 0 ? _a : "",
            job: (_b = this._userJobElement.textContent) !== null && _b !== void 0 ? _b : ""
        };
    }
    setUserInfo({ name, job }) {
        this._userNameElement.textContent = name;
        this._userJobElement.textContent = job;
    }
}
