# Say the Same Thing
A game where two players try to say the same thing. If you say "exercise" and the other player says "spin", you then have to think of a word that links those 2 words, maybe "treadmill". If your friend also says "treadmill", you both win! If you friend say "bike", then you know have to think of a word that links "treadmill" and "bike". The game keeps going until you both say the same thing. I was inspired to make this web app after seeing an old video by OK GO about their version of this game that they released as an app. Sadly, that app is no longer availible.

The web app I created run on Angular and and is hosted on GitHub pages, so I couldn't use a database to keep track of the rounds and sync the game between 2 devices. My solution was to uses url query parameters to pass the round information such as round number, the last 2 words, and the word the other player has entered. The app uses local storage to store the words from the previous round. Each game generates a game code based on the date and some random letters so that you can play games with multiple people on the same device and properly keep track of the words for each game. I also learned how to use Angular animations to make the app look nicer.

You can play the game now by clicking [here](https://ryanmontville.com/same-word/).

## Screenshots
<div>
<img src="https://raw.githubusercontent.com/RyanMontville/same-word/refs/heads/main/screenshots/wrong.png" alt="Entering in a word" title="Entering in a word" style="width: 31%; display: inline-block;"/>
<img src="https://raw.githubusercontent.com/RyanMontville/same-word/refs/heads/main/screenshots/share.png" alt="share screen" title="share screen" style="width: 31%; display: inline-block;"/>
<img src="https://raw.githubusercontent.com/RyanMontville/same-word/refs/heads/main/screenshots/correct.png" alt="Game finished screen" title="Game finished screen" style="width: 31%; display: inline-block;"/>
</div>