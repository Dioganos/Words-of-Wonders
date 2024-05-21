export default class LevelData {
    constructor() {
        if (!LevelData.instance) {
            this.chars = "";
            this.words = "";
            LevelData.instance = this;
        }
        return LevelData.instance;
    }

    static getInstance() {
        if (!LevelData.instance) {
            new LevelData();
        }
        return LevelData.instance;
    }

    setLevelData(chars, words) {
        this.chars = chars;
        this.words = words;
    }
}