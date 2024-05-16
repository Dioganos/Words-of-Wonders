let instance = null;
export default class LevelData {
    constructor() {
        this.chars = "";
        this.words = "";
        if (!instance) { instance = this; }
        return instance;
    }
}