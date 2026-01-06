import * as Phaser from "phaser";
import Player from "../entities/Player";
import EnemyManager from "../systems/EnemyManager";

export default class ArenaScene extends Phaser.Scene {
  player!: Player;
  enemies!: EnemyManager;

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

    // Enemies
    this.enemies = new EnemyManager(this);

    // Spawn test enemies
    this.enemies.spawn(200, 200);
    this.enemies.spawn(width - 200, 200);
    this.enemies.spawn(width / 2, height - 200);

    // Camera
    this.cameras.main.startFollow(this.player.sprite, true, 0.08, 0.08);
  }

  update(time: number, delta: number) {
    this.player.update(delta);
    this.enemies.update(this.player.sprite);
  }
}
