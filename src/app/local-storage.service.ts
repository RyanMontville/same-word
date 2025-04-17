import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() {}

  setItem(key: string, value: string): void {
    let json: string = JSON.stringify(value);
    localStorage.setItem(key, json);
  }

  getItem(key: string): string | null {
    let json  = localStorage.getItem(key);
    if (json) {
      return JSON.parse(json);
    }
    return null;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}