import gsap, { Power0 } from "gsap";
import { Assets, Container, Sprite, Text, TextStyle } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH } from ".";
export default class GlobalLetter extends Container {
    constructor(game) {
        super();
        this.game = game;
        this.globalLetter = null;
        this.globalLetterText = null;
        this.CreateGlobalLetter();
        this.CreateGlobalLetterText();
    }
    CreateGlobalLetter() {
        //Set Background
        let globalLetter = Sprite.from("letterBox");
        globalLetter.tint = '#f07946';
        globalLetter.name = "globalLetter";
        globalLetter.anchor.set(.5);
        globalLetter.width = 50;
        globalLetter.scale.y = .25;
        globalLetter.x = GAME_WIDTH * 0.5;
        globalLetter.y = GAME_HEIGHT * 0.55;
        globalLetter.alpha = 0;
        this.game.addChild(globalLetter);
        this.globalLetter = globalLetter;
    }
    CreateGlobalLetterText() {
        //Set Text
        Assets.loadBundle('fonts').then((fonts) => {
            const globalLetterTextStyle = new TextStyle({
                fontFamily: fonts.font["family"],
                fontSize: 72,
                fill: 'white'
            });
            let globalLetterText = new Text("X", globalLetterTextStyle);
            globalLetterText.width = this.globalLetter.width * 4;
            globalLetterText.height = this.globalLetter.height * 4;
            globalLetterText.anchor.set(.5);
            this.globalLetter.addChild(globalLetterText);
            this.globalLetterText = globalLetterText;
        });
    }
    HideGlobalLetter(startPos) {
        this.globalLetter.alpha = 0;
        this.globalLetter.width = 50;
        this.globalLetter.x = startPos;
        this.globalLetterText.style.fontSize = 72;
    }
    ShowGlobalLetter() {
        this.globalLetter.alpha = 1;
        this.globalLetter.width = Math.sqrt(this.game.letterContainers.length) * 50;
        this.globalLetterText.text = this.game.text;
    }
    NotMatched() {
        let glbLetter = this.globalLetter;
        const startPos = glbLetter.x;
        let _this = this;
        if (this.game.letterContainers.length > 1) {
            const duration = .2;
            const distance = 3;
            const ease = Power0.easeNone;
            //Start feedback animation
            gsap.to(glbLetter, {
                x: glbLetter.x + distance,
                duration: duration / 2,
                ease: ease,
                onComplete: () => {
                    gsap.to(glbLetter, {
                        x: glbLetter.x - distance,
                        duration: duration / 2,
                        ease: ease,
                        onComplete: () => {
                            gsap.to(glbLetter, {
                                x: glbLetter.x + distance,
                                duration: duration / 2,
                                ease: ease,
                                onComplete: () => {
                                    _this.HideGlobalLetter(startPos);
                                    _this.game.gameManager.LetterChecked(startPos);
                                }
                            })
                        }
                    });
                }
            });
        }
        else {
            _this.HideGlobalLetter(startPos);
            _this.game.gameManager.LetterChecked(startPos);
        }
    }
}