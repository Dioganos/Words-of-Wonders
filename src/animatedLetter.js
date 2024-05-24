import gsap from "gsap";
import { Assets, Container, Text, TextStyle } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH, GAME_ASSETS } from ".";
export default class AnimatedLetter extends Container {
    constructor(char, index, shape, dir, game) {
        super();
        this.letter = null;
        this.LoadLetter(char, index, shape, dir, game);
    }

    LoadLetter(char, index, shape, dir, game) {
        const letterTextStyle = new TextStyle({
            fontFamily: GAME_ASSETS.fonts.font["family"],
            fontSize: 72,
            fill: 'white'
        });
        let letter = new Text(char, letterTextStyle);
        letter.name = "foundLetter";
        letter.scale.set(1);
        letter.position.x = GAME_WIDTH / 3 + (index * 50);
        letter.position.y = GAME_HEIGHT / 2;
        game.addChild(letter);
        this.letter = letter;
        this.AnimateLetter(index, shape, dir, game);
    }

    AnimateLetter(index, shape, dir, game) {
        let ltr = this.letter;
        let cBox = null;
        switch (shape) {
            case 'V': {
                cBox = game.wordBoxes[dir][index];
                gsap.to(ltr, {
                    x: cBox.getGlobalPosition().x + (cBox.width / 4),
                    y: cBox.getGlobalPosition().y,
                    duration: .5,
                    onComplete() {
                        cBox.tint = '#f07946';
                        cBox.addChild(ltr);
                        ltr.scale.set(3);
                        ltr.position.x = cBox.width / 2;
                        ltr.position.y = cBox.height / 8;
                        if (!game.gameFinished) game.gameManager.PrepareEndGame(game);
                    }
                });
            } break;
            case 'H': {
                cBox = game.wordBoxes[index][dir];
                gsap.to(ltr, {
                    x: cBox.getGlobalPosition().x + (cBox.width / 4),
                    y: cBox.getGlobalPosition().y,
                    duration: .5,
                    onComplete() {
                        cBox.tint = '#f07946';
                        cBox.addChild(ltr);
                        ltr.scale.set(3);
                        ltr.position.x = cBox.width / 2;
                        ltr.position.y = cBox.height / 8;
                        if (!game.gameFinished) game.gameManager.PrepareEndGame(game);
                    }
                });
            } break;
        }
    }
}