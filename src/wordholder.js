import gsap from "gsap";
import { Container, Sprite } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH } from ".";
import LevelData from "./leveldata";
export default class WordHolder extends Container {
    constructor(game) {
        super();
        //Setting parameters
        this.gridWidth = 4;
        this.gridHeight = 3;
        this.boxSize = 75;
        this.boxes = [];
        //Creating Container and Boxes
        this.CreateContainerAndBoxes(game);
    }
    CreateContainerAndBoxes(game) {
        let gridContainer = new Sprite();
        gridContainer.name = "boxContainer";
        game.boxContainer = gridContainer;
        gridContainer.anchor.set(.5);
        gridContainer.x = GAME_WIDTH * 0.09;
        gridContainer.y = GAME_HEIGHT * 0.05;
        gridContainer.scale.set(1.25);
        game.addChild(gridContainer);
        for (let i = 0; i < this.gridWidth; i++) {
            game.wordBoxes[i] = [];
            for (let j = 0; j < this.gridHeight; j++) {
                const box = Sprite.from("letterBox");
                box.width = 0
                box.height = 0;
                box.x = i * (this.boxSize + 5);
                box.y = j * (this.boxSize + 5);
                box.alpha = 0;
                gsap.to(box, { width: this.boxSize, height: this.boxSize, duration: 1 });
                game.wordBoxes[i][j] = box;
                this.boxes.push(box);
                gridContainer.addChild(box);
            }
        }
        this.AdjustBoxes(game);
    }
    AdjustBoxes(game) {

        //Checking level data and adjusting boxes
        LevelData.getInstance().words.split('|').forEach(word => {
            let values = word.split(',');
            let row = values[0];
            let column = values[1];
            let length = values[2].length;
            let shape = values[3];
            //Setting horizontal
            if (shape == 'H') {
                for (let a = 0; a < length; a++) {
                    game.wordBoxes[a][row].alpha = 1;
                }
            }
            //Setting vertical
            else if (shape == 'V') {
                for (let b = 0; b < length; b++) {
                    game.wordBoxes[column][b].alpha = 1;
                }
            }
        })
    }
    HideBoxes() {
        this.boxes.forEach(ch => {
            gsap.to(ch, {
                width: 0,
                height: 0,
                x: ch.x - (0 - ch.width) / 2,
                y: ch.y - (0 - ch.height) / 2,
                duration: .5
            });
        });
    }
}