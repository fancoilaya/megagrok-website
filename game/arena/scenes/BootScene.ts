import * as Phaser from "phaser";

export default class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  preload() {
    this.load.image("grok", "/arena/grok-player.png");
    this.load.image("arena-floor", "/arena/arena-bg.png");
  }

  create() {
    this.scene.start("ArenaScene");
  }
}
