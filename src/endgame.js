import { Sprite, Texture, AnimatedSprite, Rectangle, Container } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH } from ".";
export default class EndGame extends Container {
    constructor(game) {
        super();
        this.game = game;
        this.LoadEndGame();
    }
    LoadEndGame() {
        //Set everything for endgame view
        this.game.playButton.install.destroy();
        let bg = Sprite.from("background");
        bg.anchor.set(0.5);
        bg.scale.set(0.5);
        bg.tint = 'gray';
        bg.alpha = .7;
        this.game.addChild(bg);
        bg.x = GAME_WIDTH * 0.5;
        bg.y = GAME_HEIGHT * 0.5;
        this.game.LoadPlayButton(.5, .85, 2, 2.2, this.game);
        this.game.playButton.install.tint = 'black';
        let gameLogo = Sprite.from("gameLogo");
        gameLogo.anchor.set(.5);
        gameLogo.scale.set(1.5);
        gameLogo.x = GAME_WIDTH * .5;
        gameLogo.y = GAME_HEIGHT * .25;
        this.game.addChild(gameLogo);
        this.CreateGlobe();

    }

    CreateGlobe() {
        let globeTexture = Texture.from("globe");
        let tileSize = 128;
        let columns = globeTexture.width / tileSize;
        let rows = globeTexture.height / tileSize;
        let textures = [];
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                let texture = new Texture(globeTexture.baseTexture, new Rectangle(j * tileSize, i * tileSize, tileSize, tileSize));
                textures.push(texture);
            }
        }
        let animatedSprite = new AnimatedSprite(textures);
        animatedSprite.animationSpeed = 0.1;
        animatedSprite.play();
        animatedSprite.anchor.set(.5);
        animatedSprite.x = GAME_WIDTH * .5;
        animatedSprite.y = GAME_HEIGHT * .575;
        animatedSprite.scale.set(2);
        this.game.addChild(animatedSprite);
    }
}