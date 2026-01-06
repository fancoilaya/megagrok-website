import * as Phaser from "phaser";
import Player from "../entities/Player";
import EnemyManager from "../systems/EnemyManager";
import HUD from "../ui/HUD";

export default class ArenaScene extends Phaser.Scene {
  player!: Player;
  enemies!: EnemyManager;
  hud!: HUD;

  wave = 1;
  points = 0;
  playerHp = 100;

  constructor() {
    super("ArenaScene");
  }

  create() {
    const { width, height } = this.scale;

    this.add
      .image(width / 2, height / 2, "arena-floor")
      .setDisplaySize(width, height);

    this.physics.world.setBounds(0, 0, width, height);

    this.player = new Player(this, width / 2, height / 2);
    this.enemies = new EnemyManager(this);

    // Wire points to kills
    this.enemies.onEnemyKilled = (points: number) => {
      this.points += points;
    };

    this.enemies.spawn(200, 200);
    this.enemies.spawn(width - 200, 200);
    this.enemies.spawn(width / 2, height - 200);

    this.hud = new HUD(this);

    this.cameras.main.startFollow(this.player.sprite, true, 0.08, 0.08);
  }

  update(time: number, delta: number) {
    this.player.update(delta);
    this.enemies.update(this.player.sprite);

    this.hud.update(this.playerHp, this.wave, this.points);
  }
}
