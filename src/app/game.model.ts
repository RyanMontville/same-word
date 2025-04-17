export class Game {
    constructor(
        public gameID: string,
        public rounds: Round[]

    ) {}
}

export class Round {
    constructor(
        public round: number,
        words: string[]
    ) {}
}