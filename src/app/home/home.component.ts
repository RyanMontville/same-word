import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {Clipboard} from '@angular/cdk/clipboard';

@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  round: number = 1;
  lastWordOne: string | null = null;
  lastWordTwo: string | null = null;
  word: string | null = null;
  message: string = "";
  guess: string = "";
  newWord: string = "";
  incorrect: boolean = false;
  gameWon: boolean = false;
  urlString: string = "";
  showCopyButton: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clipboard: Clipboard
  ) {}

   ngOnInit() {
    let roundString = this.route.snapshot.queryParamMap.get('round');
    if (roundString) {
      if (typeof +roundString === 'number') {
        this.round = +roundString;
      } else {
        this.round = 1;
      }
    } else {
      this.round = 1;
    }
    let wordString = this.route.snapshot.queryParamMap.get('word');
    if (wordString) {
      this.word = this.convertToString(wordString);
    }
    let lastOne = this.route.snapshot.queryParamMap.get('lastOne');
    let lastTwo = this.route.snapshot.queryParamMap.get('lastTwo');
    if (lastOne && lastTwo) {
      let fixedo = lastOne.replace("-", " ");
      let fixedt = lastTwo?.replace("-", " ")
      this.lastWordOne = fixedo;
      this.lastWordTwo = fixedt;
      this.message = `Your friend didn't guess the same word as you. You now need to think of a word that links ${lastOne} and ${lastTwo}:`;
    }
    if (this.round == 1) {
      if (!this.word) {
        this.message = "Welcome to Say the same thing! Your goal is to say the same thing as your friend. You go first! Type in any word you can think of:";
      } else {
        this.message = "Your friend has sent a word. Now its your turn to type any word you can think of:";
      }
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

  onSubmit() {
    if (this.round === 1 && !this.word) {
      let encodedWord = this.convertTo64(this.newWord);
      this.urlString = `ryanmontville.com/same-word?round=1&word=${encodedWord}`;
      this.message = `Share this url with your friend to continue playing the game: ${this.urlString}`;
      this.showCopyButton = true;
    } else {
      if (this.newWord.toLocaleLowerCase() === this.word?.toLocaleLowerCase() && this.incorrect === false) {
        this.gameWon = true;
      } else if (this.incorrect === false) {
        this.incorrect = true;
        this.message = `Sorry, you didn't say the same thing as your friend. You now need to think of a word that links ${this.word} and ${this.newWord}`;
        this.guess = this.newWord;
        this.newWord = "";
        this.round += 1;
      } else {
        let encodedWord = this.convertTo64(this.newWord);
        let lo = this.word?.replace(" ", "-");
        let lt = this.guess.replace(" ", "-");
        this.urlString = `https://ryanmontville.com/same-word?round=${this.round}&lastOne=${lo}&lastTwo=${lt}&word=${encodedWord}`;
        this.message = `Share this url with your friend to continue playing the game: ${this.urlString}`;
        this.showCopyButton = true;
      }
    }
  }

  copyToClipboard() {
    var messageToCopy: string = `Say the Same Thing Round ${this.round}
  Its your turn!
  ${this.urlString}`;
    this.clipboard.copy(messageToCopy);
  }
}
