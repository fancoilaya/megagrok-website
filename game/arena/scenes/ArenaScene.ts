import * as Phaser from "phaser";
import Player from "../entities/Player";
import EnemyManager from "../systems/EnemyManager";
import HUD from "../ui/HUD";

export default class ArenaScene extends Phaser.Scene {
  player!: Player;
  enemies!: EnemyManager;
  hud!: HUD;

  // Run state (v1)
  wave = 1;
  points = 0;
  playerHp = 100;

  constructor() {
    super("ArenaScene");
  }

  create() {
    const { width, height } = this.scale;

    // === ARENA FLOOR ===
    this.add
      .image(width / 2, height / 2, "arena-floor")
      .setDisplaySize(width, height);

    this.physics.world.setBounds(0, 0, width, height);

    // === PLAYER ===
    this.player = new Player(this, width / 2, height / 2);

    // IMPORTANT: allow enemies to damage player safely
    this.player.sprite.setData("ref", this.player);

    // === ENEMIES ===
    this.enemies = new EnemyManager(this);

    // Wire points to enemy kills
    this.enemies.onEnemyKilled = (points: number) => {
      this.points += points;
    };

    // Temporary test spawns (will be replaced by wave system)
    this.enemies.spawnHopGoblin(200, 200);
    this.enemies.spawnHopGoblin(width - 200, 200);
    this.enemies.spawnHopGoblin(width / 2, height - 200);

    // === HUD ===
    this.hud = new HUD(this);

    // === CAMERA ===
    this.cameras.main.startFollow(this.player.sprite, true, 0.08, 0.08);
  }

  update(time: number, delta: number) {
    // Update game entities
    this.player.update(delta);
    this.enemies.update(this.player.sprite);

    // Sync player HP to HUD
    this.playerHp = this.player.hp;

    // Update HUD
    this.hud.update(this.playerHp, this.wave, this.points);
  }
}
