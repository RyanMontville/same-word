import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Clipboard } from '@angular/cdk/clipboard';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { fadeInUpAnimation } from '../animation.service';

@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule],
  animations: [
    trigger('cardAnimation', [
      state('in', style({ opacity: 1, transform: 'translateX(0)' })),
      state('out', style({ opacity: 0, transform: 'translateX(100%)' })),
      transition('void => in', [ // Animate in from the left
        style({ opacity: 0, transform: 'translateX(-100%)' }),
        animate('300ms ease-in')
      ]),
      transition('in => out', [
        animate('300ms ease-out')
      ]),
      transition('void => *', animate('0ms')),
    ]),
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  round: number = 1;
  lastWordOne: string | null = null;
  lastWordTwo: string | null = null;
  theirWord: string | null = null;
  yourWord: string = "";
  message: string = "";
  newWord: string = "";

  urlString: string = "";

  showPromptCard: boolean = true;
  showIncorrectCard: boolean = false;
  showShareCard: boolean = false;
  showCorrectCard: boolean = false;
  promptCardState: string = 'in';
  incorrectCardState: string = 'out';
  shareCardState: string = 'out';
  correctCardState: string = 'out';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clipboard: Clipboard
  ) { }

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
      this.theirWord = this.convertToString(wordString);
    }
    let lastOne = this.route.snapshot.queryParamMap.get('lastOne');
    let lastTwo = this.route.snapshot.queryParamMap.get('lastTwo');
    if (lastOne && lastTwo) {
      let fixedo = lastOne.replace("-", " ");
      let fixedt = lastTwo?.replace("-", " ");
      this.lastWordOne = fixedo;
      this.lastWordTwo = fixedt;
      this.message = `<p>Your friend didn't guess the same word as you.</p><p>Find a word(s) to connect <strong>${fixedo}</strong> and <strong>${fixedt}</strong>:</p>`;
    }
    if (this.round == 1) {
      if (!this.theirWord) {
        this.message = "<p>You go first! Type in any word you can think of:</p>";
      } else {
        this.message = "<p>Your friend has sent a word.</p><p>Now its your turn to type any word you can think of:</p>";
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

  onSubmit(action: number) {
    if (action === 1) {
      if (this.round === 1 && !this.theirWord) {
        let encodedWord = this.convertTo64(this.yourWord);
        this.urlString = `https://ryanmontville.com/same-word?round=1&word=${encodedWord}`;
        this.promptCardState = 'out';
        setTimeout(() => {
          this.showPromptCard = false;
          this.showShareCard = true;
          this.shareCardState = 'in';
        }, 300);
      } else {
        if (this.yourWord.toLowerCase() === this.theirWord?.toLocaleLowerCase()) {
          this.promptCardState = 'out';
          setTimeout(() => {
            this.showPromptCard = false;
            this.showCorrectCard = true;
            this.correctCardState = 'in';
          }, 300);
        } else {
          this.promptCardState = 'out';
          setTimeout(() => {
            this.showPromptCard = false;
            this.showIncorrectCard = true;
            this.incorrectCardState = 'in';
          }, 300);
        }
      }
    }
    if (action === 2) {
      this.round += 1;
      this.incorrectCardState = 'out';
      let encodedWord = this.convertTo64(this.newWord);
      let lo = this.theirWord?.replace(" ", "-");
      let lt = this.yourWord.replace(" ", "-");
      this.urlString = `https://ryanmontville.com/same-word?round=${this.round}&lastOne=${lo}&lastTwo=${lt}&word=${encodedWord}`;
          setTimeout(() => {
            this.showIncorrectCard = false;
            this.showShareCard = true;
            this.shareCardState = 'in';
          }, 300);
    }
  }

  copyToClipboard(action: number) {
    var messageToCopy: string = "";
    if (action == 1) {
      messageToCopy= `🗣️Say the Same Thing Round ${this.round}\nIts your turn!\n🔗: ${this.urlString}`;
    } else {
      messageToCopy = `🗣️Say the Same Thing\nCongratulations! you both managed to say ${this.yourWord} after ${this.round} rounds!`
    }
    this.clipboard.copy(messageToCopy);
  }
  

  playAgain() {
    this.round = 1;
    this.lastWordOne = null;
    this.lastWordTwo = null;
    this.theirWord = null;
    this.yourWord= "";
    this.newWord = "";
    this.message = "<p>You go first! Type in any word you can think of:</p>";
    this.correctCardState = 'out';
    setTimeout(() => {
      this.showCorrectCard = false;
      this.showPromptCard = true;
      this.promptCardState = 'in';
    }, 300);
    this.router.navigate(['/']);
  }
}

