interface UserInfoSelectors {
  userNameSelector: string;
  userJobSelector: string;
  avatarSelector: string;
}

export interface UserData {
  name: string;
  job: string;
  avatar: string;
}

export class UserInfo {
  private _userNameElement: HTMLElement;
  private _userJobElement: HTMLElement;
  private _avatarElement: HTMLImageElement;

  constructor({ userNameSelector, userJobSelector, avatarSelector }: UserInfoSelectors) {
    this._userNameElement = document.querySelector(userNameSelector) as HTMLElement;
    this._userJobElement = document.querySelector(userJobSelector) as HTMLElement;
    this._avatarElement = document.querySelector(avatarSelector) as HTMLImageElement;
  }

  getUserInfo(): UserData {
    return {
      name: this._userNameElement.textContent ?? "",
      job: this._userJobElement.textContent ?? "",
      avatar: this._avatarElement.src
    }
  }

  setUserInfo({ name, job, avatar }: UserData): void {
    this._userNameElement.textContent = name;
    this._userJobElement.textContent = job;
    this._avatarElement.src = avatar;
  }
}
