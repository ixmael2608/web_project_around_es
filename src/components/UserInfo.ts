interface UserInfoSelectors {
  userNameSelector: string;
  userJobSelector: string;
}

interface UserData {
  name: string;
  job: string;
}

export class UserInfo {
  private _userNameElement: HTMLElement;
  private _userJobElement: HTMLElement;

  constructor({ userNameSelector, userJobSelector }: UserInfoSelectors) {
    this._userNameElement = document.querySelector(userNameSelector) as HTMLElement;
    this._userJobElement = document.querySelector(userJobSelector) as HTMLElement;
  }

  getUserInfo(): UserData {
    return {
      name: this._userNameElement.textContent ?? "",
      job: this._userJobElement.textContent ?? ""
    }
  }

  setUserInfo({ name, job }: UserData): void {
    this._userNameElement.textContent = name;
    this._userJobElement.textContent = job;
  }
}
