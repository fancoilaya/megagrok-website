import * as Phaser from "phaser";

export default class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  preload() {
    this.load.image("grok", "/arena/grok-player.png");
    this.load.image("arena-floor", "/arena/arena-bg.png");
    this.load.image("enemy-basic", "/arena/enemy-placeholder.png");
    this.load.image("hopgoblin", "/game/enemies/hopgoblin.png");
    this.load.image("hopslime", "/game/enemies/hopslime.png");
    this.load.image("fudling", "/game/enemies/fudling.png");

  }

  create() {
    this.scene.start("ArenaScene");
  }
}
