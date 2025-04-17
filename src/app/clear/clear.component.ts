import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-clear',
  imports: [],
  templateUrl: './clear.component.html',
  styleUrl: './clear.component.css'
})
export class ClearComponent {
  message: string = "";
  constructor(private localStore: LocalStorageService) {}

  clearGameData() {
    this.localStore.clear();
    this.message = "Game data successfully delete from your device."
  }
}
