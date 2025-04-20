import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs';

interface Round {
  id: number;
  gameCode: string;
  round: number;
  words: string[];
}

@Injectable({
  providedIn: 'root'
})
export class IndexedDBServiceService {

  constructor() { }
}
