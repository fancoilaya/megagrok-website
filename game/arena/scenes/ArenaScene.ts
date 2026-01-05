import Phaser from "phaser";
import Player from "../entities/Player";

export default class ArenaScene extends Phaser.Scene {
  player!: Player;

  constructor() {
    super("ArenaScene");
  }

  create() {
    const { width, height } = this.scale;

    // Arena floor
    this.add
      .image(width / 2, height / 2, "arena-floor")
      .setDisplaySize(width, height);

    // World bounds
    this.physics.world.setBounds(0, 0, width, height);

    // Player
    this.player = new Player(this, width / 2, height / 2);

    // Camera
    this.cameras.main.startFollow(this.player.sprite, true, 0.08, 0.08);
    this.cameras.main.setBounds(0, 0, width, height);
  }

  update(_, delta: number) {
    this.player.update(delta);
  }
}
