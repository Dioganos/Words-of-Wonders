import { Assets, Container, Sprite, Text, TextStyle, Graphics } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH, assets } from ".";
export default class Letter extends Container {
    constructor(posx, posy, char, font, game) {
        super();
        this.letter = null;
        this.letterText = null;
        this.posx = posx;
        this.posy = posy;
        this.char = char;
        this.font = font;
        this.game = game;
        this.CreateLetter();
        this.CreateLetterText();
    }

    CreateLetter() {
        //Set Letter
        let letter = new Sprite();
        letter.zIndex = 5;
        letter.anchor.set(0.5);
        letter.scale.set(.015);
        letter.alpha = 0;
        letter.x = GAME_WIDTH * this.posx;
        letter.y = GAME_HEIGHT * this.posy;
        this.game.letters.push(letter);
        this.letter = letter;
        this.game.addChild(letter);
    }
    CreateLetterText() {
        //Set Text
        const letterTextStyle = new TextStyle({
            fontFamily: this.font["family"],
            fontSize: 72,
            fill: '#f07946'
        });
        const letterText = new Text(this.char, letterTextStyle);
        letterText.name = "letterText";
        letterText.scale.set(75);
        letterText.anchor.set(.5);
        letterText.interactive = true;
        this.letter.addChild(letterText);
        this.letterText = letterText;
        this.AssignLetterEvents();
    }
    AssignLetterEvents() {
        //OnMouseDown Event

        this.letterText.on('mousedown', () => {
            if (!this.game.drawing && !this.game.shuffling) {
                this.game.drawing = true;
                //Load Game & Change Text Color & Show Feedback Letter
                this.letter.texture = assets.game["circle"];
                this.letter.tint = '#f07946';
                this.letterText.style.fill = 'white';
                this.InsertLetter(this.char, this.letter);
                let line = new Graphics();
                line.zIndex = 1;
                line.position.set(this.letter.position.x, this.letter.position.y);
                this.game.addChild(line);
                this.game.currentLine = line;
                this.game.currentLetterText = this.letter;
                this.game.prevLetterText = this.letter;
                this.game.lines.push(line);
            }
        });

        //OnPointerEnter Event
        this.letterText.on('pointerenter', () => {
            if (this.game.drawing && !this.game.feedBack && !this.game.letterContainers.includes(this.letter) && this.game.letterContainers.length > 0) {
                //Load Game & Change Text Color & Update Feedback Letter
                this.letter.texture = assets.game["circle"];
                this.letter.tint = '#f07946';
                this.letterText.style.fill = 'white';
                this.InsertLetter(this.char, this.letter);
                this.game.prevLetterText = this.game.currentLetterText;
                this.game.currentLetterText = this.letter;
                let line = new Graphics();
                line.zIndex = 1;
                line.position.set(this.letter.position.x, this.letter.position.y);
                this.game.addChild(line);
                const currentLine = this.game.currentLine;
                currentLine.clear();
                currentLine.lineStyle(20, '#f07946');
                currentLine.moveTo(0, 0);
                currentLine.lineTo(this.game.currentLetterText.position.x - this.game.prevLetterText.position.x, this.game.currentLetterText.position.y - this.game.prevLetterText.position.y);
                this.game.currentLine = line;
                this.game.lines.push(line);

            }
        })
        this.game.on('pointermove', (e) => {
            if (this.game.drawing && !this.game.feedBack && this.game.currentLine && this.game.letterContainers.length < 4) {
                const currentLine = this.game.currentLine;
                currentLine.clear();
                currentLine.lineStyle(20, '#f07946');
                currentLine.moveTo(0, 0);
                currentLine.lineTo(e.data.global.x - currentLine.x, e.data.global.y - currentLine.y);
            }
        })
        //OnMouseUp Event
        this.game.on('mouseup', () => {
            if (this.game.drawing && this.game.letterContainers.includes(this.letter)) {
                this.game.gameManager.CheckValid();
            }
        });
    }

    InsertLetter(char, letterT) {
        this.game.text += char;
        this.game.letterContainers.push(letterT);
        this.game.globalLetter.ShowGlobalLetter();
    }
}