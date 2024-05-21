import gsap from "gsap";
import { Container, Sprite } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH, app } from ".";
import LevelData from "./leveldata";
import Picker from "./picker";
import GlobalLetter from "./globalletter";
import PlayButton from "./playbutton";
import WordHolder from "./wordholder";
import GameManager from "./gamemanager";
export default class Game extends Container {
  constructor() {
    super();
    //Setting variables
    this.gameManager = null;
    this.globalLetter = null;
    this.playButton = null;
    this.picker = null;
    this.boxContainer = null;
    this.currentLine = null;
    this.currentLetterText = null;
    this.letterCircle = null;
    this.prevLetterText = null;
    this.wordBoxes = [];
    this.letterContainers = [];
    this.letters = [];
    this.lines = [];
    this.gameFinished = false;
    this.drawing = false;
    this.feedBack = false;
    this.shuffling = false;
    this.text = "";
    //Starting game
    this.init();
  }

  init() {
    //Set Load Screen
    let sprite = Sprite.from("logo");
    sprite.anchor.set(0.5);
    sprite.scale.set(0.5);
    this.addChild(sprite);
    sprite.x = GAME_WIDTH * 0.5;
    sprite.y = GAME_HEIGHT * 0.5;

    //Load Screen Animation
    gsap.to(sprite, {
      pixi: {
        scale: 0.6,
      },
      duration: 1,
      repeat: 3,
      yoyo: true,
      ease: "sine.easeInOut",
      onComplete: () => {
        //Load Level
        sprite.destroy();
        this.LoadGame();
      },
    })
  }

  LoadGame() {
    //Setting game container settings
    this.sortableChildren = true;
    this.interactive = true;
    //Load Game
    this.CreateLevelData();
    this.LoadGameCanvas();
    this.LoadGameManager();
  }
  CreateLevelData() {
    const levelData = LevelData.getInstance();
    levelData.setLevelData("L,G,D,O", "0,0,GOLD,H|0,0,GOD,V|2,0,DOG,H|0,2,LOG,V");
  }

  LoadGameCanvas() {
    this.LoadBg();
    this.LoadPlayButton(.5, .95, 1, 1.1, this);
    this.LoadGlobalLetter();
    this.LoadLetters();
    this.DrawLetterBoxes();
  }

  LoadBg() {
    //Set Game Background
    let bg = Sprite.from("background");
    bg.anchor.set(0.5);
    bg.scale.set(0.5);
    this.addChild(bg);
    bg.x = GAME_WIDTH * 0.5;
    bg.y = GAME_HEIGHT * 0.5;
  }

  LoadPlayButton(w, h, s, ts, game) {
    this.playButton = new PlayButton(w, h, s, ts, game);
  }

  LoadGlobalLetter() {
    this.globalLetter = new GlobalLetter(this);
  }

  LoadLetters() {
    this.picker = new Picker(this);
  }

  DrawLetterBoxes() {
    this.boxContainer = new WordHolder(this);
  }

  LoadGameManager() {
    this.gameManager = new GameManager(this);
  }
}
