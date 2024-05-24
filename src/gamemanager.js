import gsap from "gsap";
import LevelData from "./leveldata";
import AnimatedLetter from "./animatedLetter";
import EndGame from "./endgame";
export default class GameManager {
    constructor(game) {
        this.game = game;
        this.words = LevelData.getInstance().words;
    }
    //Checks that the selected letters form a valid word
    CheckValid() {
        this.game.feedBack = true;
        if (this.words.includes(this.words.split('|').find((text) => { return text.split(',')[2] == this.game.text; }))) {
            //if the word is valid then checks the exact positions of letters in box container, sets game to default position, hides global letter.
            this.CheckExactPos(this.game.text);
            this.LetterChecked();
            this.game.globalLetter.HideGlobalLetter(this.game.globalLetter.globalLetter.x);
        }
        else {
            //if the row is not valid then calls NotMatched method from globalLetter.
            this.game.globalLetter.NotMatched();
        }
    }

    LetterChecked() {
        // Set everything to default
        this.game.drawing = false;
        this.game.feedBack = false;
        this.game.text = "";
        this.game.letterContainers.forEach(letter => {
            letter.texture = null;
            letter.getChildByName("letterText").style.fill = '#f07946';
        });
        this.game.letterContainers = [];
        this.game.lines.forEach(line => {
            line.destroy();
        });
        this.game.lines = [];
        this.game.currentLine = null;
    }

    CheckExactPos(globalWord) {
        let concatWords = [];
        //Prepare leveldata words for comparsion 
        this.words.split('|').forEach(word => {
            //Get desired values
            let values = word.split(',');
            let row = values[0];
            let column = values[1];
            let length = values[2].length;
            let shape = values[3];
            //Compare written word and leveldata
            if (globalWord == values[2]) {
                //Remove word from leveldata and do checked tasks
                word = "";

                //Setting horizontal
                if (shape == 'H') {
                    for (let a = 0; a < length; a++) {
                        this.AnimateLetters(values[2][a], a, shape, row, this.game);
                    }
                }
                //Setting vertical
                else if (shape == 'V') {
                    for (let b = 0; b < length; b++) {
                        this.AnimateLetters(values[2][b], b, shape, column, this.game);
                    }
                }
            }
            //Push remaining words of leveldata
            if (word != "") concatWords.push(word);
        })
        //Prepare leveldata for future checks
        this.words = concatWords.join('|');
    }
    PrepareEndGame(_this) {
        //If there is no other words to find, then slowly hide everything and start endgame.
        if (this.words == "") {
            this.game.gameFinished = true;
            this.game.playButton.install.alpha = 0;
            this.game.boxContainer.HideBoxes();
            this.game.letters.forEach(letter => {
                gsap.to(letter, {
                    width: 0,
                    height: 0,
                    x: letter.x - (0 - letter.width) / 2,
                    y: letter.y - (0 - letter.height) / 2,
                    duration: .5
                });
            });
            gsap.to(this.game.letterCircle, {
                width: 0,
                height: 0,
                x: this.game.letterCircle - (0 - this.game.letterCircle) / 2,
                y: this.game.letterCircle - (0 - this.game.letterCircle) / 2,
                duration: .5,
                onComplete() {
                    _this.gameManager.StartEndGame();
                }
            });
        }
    }

    AnimateLetters(char, index, shape, dir, _this) {
        //Create animated letters.
        new AnimatedLetter(char, index, shape, dir, _this);
    }

    StartEndGame() {
        new EndGame(this.game);
    }
}