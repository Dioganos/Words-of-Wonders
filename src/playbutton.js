import gsap from "gsap";
import { Assets, Text, Container, Sprite, TextStyle } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH } from ".";
export default class PlayButton extends Container {
    constructor(w, h, s, ts, game) {
        super();
        this.install = null;
        this.w = w;
        this.h = h;
        this.s = s;
        this.ts = ts;
        this.CreateButton(game);
    }
    CreateButton(game) {
        let install = Sprite.from("install");
        install.name = "installButton";
        install.anchor.set(0.5);
        install.scale.set(this.s);
        install.x = GAME_WIDTH * this.w;
        install.y = GAME_HEIGHT * this.h;
        game.addChild(install);
        this.install = install;
        this.CreateButtonText();
        this.SetButtonAnim();
    }
    CreateButtonText() {
        //Button Text
        Assets.loadBundle('fonts').then((fonts) => {
            let font = fonts.font;
            const installTextStyle = new TextStyle({
                fontFamily: font["family"],
                fontSize: 36,
                fill: 'white'
            });
            const installText = new Text("PLAY NOW!", installTextStyle);
            this.install.addChild(installText);
            installText.scale.set(.7);
            installText.anchor.set(.5);
        });
    }
    SetButtonAnim() {
        gsap.to(this.install, {
            pixi: {
                scale: this.ts,
            },
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: "sine.easeInOut"
        });
    }
}