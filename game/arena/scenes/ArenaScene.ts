import * as Phaser from "phaser";
import Player from "../entities/Player";
import EnemyManager from "../systems/EnemyManager";
import HUD from "../ui/HUD";

export default class ArenaScene extends Phaser.Scene {
  player!: Player;
  enemies!: EnemyManager;
  hud!: HUD;

  wave: number = 1;
  points: number = 0;

  constructor() {
    super("ArenaScene");
  }

  create(): void {
    const { width, height } = this.scale;

    // === BACKGROUND ===
    this.add
      .image(width / 2, height / 2, "arena-floor")
      .setDisplaySize(width, height);

    this.physics.world.setBounds(0, 0, width, height);

    // === ENEMIES ===
    this.enemies = new EnemyManager(this);

    // === PLAYER ===
    this.player = new Player(
      this,
      width / 2,
      height / 2,
      this.enemies
    );

    // Allow enemies to damage player
    this.player.sprite.setData("ref", this.player);

    // === SCORE HOOK ===
    this.enemies.onEnemyKilled = (pts: number) => {
      this.points += pts;
    };

    // === TEMP WAVE SPAWN ===
    this.enemies.spawnHopGoblin(200, 200);
    this.enemies.spawnHopGoblin(width - 200, 200);
    this.enemies.spawnHopGoblin(width / 2, height - 200);

    // === HUD ===
    this.hud = new HUD(this);

    // === CAMERA ===
    this.cameras.main.startFollow(
      this.player.sprite,
      true,
      0.08,
      0.08
    );
  }

  update(_time: number, delta: number): void {
    this.player.update(delta);
    this.enemies.update(this.player.sprite);

    this.hud.update(
      this.player.hp,
      this.wave,
      this.points
    );
  }
}
