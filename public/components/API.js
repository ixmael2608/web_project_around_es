var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class Api {
    constructor(options) {
        this.baseUrl = options.baseUrl.replace(/\/$/, "");
        this.headers = options.headers;
    }
    request(path_1) {
        return __awaiter(this, arguments, void 0, function* (path, options = {}) {
            const response = yield fetch(`${this.baseUrl}${path}`, Object.assign(Object.assign({}, options), { headers: Object.assign(Object.assign({}, this.headers), options.headers) }));
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            return response.json();
        });
    }
    getUserInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request("/users/me");
        });
    }
    getInitialCards() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request("/cards/");
        });
    }
    editUserInfo(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request("/users/me", { method: "PATCH", body: JSON.stringify(data) });
        });
    }
    addCard(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request("/cards/", { method: "POST", body: JSON.stringify(data) });
        });
    }
    deleteCard(cardId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.request(`/cards/${cardId}`, { method: "DELETE" });
        });
    }
    changeLikeCardStatus(cardId, isLiked) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request(`/cards/${cardId}/likes`, { method: isLiked ? "PUT" : "DELETE" });
        });
    }
    updateAvatar(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request("/users/me/avatar", { method: "PATCH", body: JSON.stringify(data) });
        });
    }
}
