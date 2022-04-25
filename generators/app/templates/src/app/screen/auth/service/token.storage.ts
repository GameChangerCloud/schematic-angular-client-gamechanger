import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';

@Injectable()
export class TokenStorage {
  constructor() {}

  /**
   * Save token in local storage if found
   */
  saveToken(token: string) {
    if (!token) return;
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  /**
   * Get user token from local storage
   */
  getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  /**
   * Remove user token from local storage
   */
  signOut(): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.clear();
  }
}
