import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  word: string | null = null;
  gameStart: boolean = true;
  round: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

   ngOnInit() {
    let roundString = this.route.snapshot.queryParamMap.get('round');
    if (roundString) {
      if (typeof roundString === 'number') {
        this.round = roundString;
      } else {
        this.round = 1;
      }
    } else {
      this.round = 1;
    }
    let wordString = this.route.snapshot.queryParamMap.get('word');
    if (wordString) {
      this.word = this.convertToString(wordString);
      this.gameStart = false;
    } else {
      this.gameStart = true;
    }
    if (this.word) {
      this.convertToString(this.word);
      this.gameStart = false;
    } else {
      this.gameStart = true;
    }
  }

  convertTo64(word: string) {
    var encodedString = btoa(word);
    return encodedString;
  }
  convertToString(base64: string) {
    var decodedString = atob(base64);
    return decodedString;
  }
}
