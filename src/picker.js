import gsap from "gsap";
import { Assets, Container, Sprite } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH, assets } from ".";
import LevelData from "./leveldata";
import Letter from "./letter";
export default class Picker extends Container {
    constructor(game) {
        super();
        this.circle = null;
        this.shuffle = null;
        this.CreateCircle(game);
        this.CreateLetters(game);
    }
    CreateCircle(game) {
        // Letter background circle
        let circle = Sprite.from("circle");
        circle.name = "letterCircle";
        circle.anchor.set(0.5);
        circle.scale.set(.04);
        game.letterCircle = circle;
        game.addChild(circle);
        circle.x = GAME_WIDTH * 0.5;
        circle.y = GAME_HEIGHT * 0.75;
        circle.alpha = .5;
        let circleH = circle.height;
        let circleW = circle.width;
        circle.height = 0;
        circle.width = 0;
        gsap.to(circle, { width: circleW, height: circleH, duration: 1, onComplete() { game.letters.forEach(letter => { letter.alpha = 1; }) } });
        this.circle = circle;
        this.CreateShuffle(game);

    }
    CreateShuffle(game) {
        // The shuffle icon at the middle
        let shuffle = Sprite.from("shuffle");
        shuffle.anchor.set(.5);
        shuffle.scale.set(2);
        this.circle.addChild(shuffle);
        shuffle.interactive = true;
        this.shuffle = shuffle;
        this.AssignShuffleEvents(game);
    }
    AssignShuffleEvents(game) {
        //Shuffle MouseDow Evet
        this.shuffle.on('mousedown', () => {
            if (!game.shuffling) {
                game.shuffling = true;
                let positions = [{ x: .5, y: .665 }, { x: .65, y: .75 }, { x: .355, y: .75 }, { x: .5, y: .835 }];
                positions.sort(() => Math.random() - .5);
                for (let i = 0; i < game.letters.length; i++) {
                    gsap.to(game.letters[i], {
                        x: GAME_WIDTH * positions[i].x,
                        y: GAME_HEIGHT * positions[i].y,
                        duration: 1,
                        onComplete() {
                            game.shuffling = false;
                        }
                    });
                }
            }
        });
    }
    CreateLetters(game) {
        // Letters
        const chars = LevelData.getInstance().chars;
        new Letter(.5, .665, chars.split(',')[0], assets.fonts.font, game);
        new Letter(.65, .75, chars.split(',')[1], assets.fonts.font, game);
        new Letter(.355, .75, chars.split(',')[2], assets.fonts.font, game);
        new Letter(.5, .835, chars.split(',')[3], assets.fonts.font, game);
    }
}