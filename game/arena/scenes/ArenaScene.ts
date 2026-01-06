import * as Phaser from "phaser";
import Player from "../entities/Player";
import EnemyManager from "../systems/EnemyManager";
import HUD from "../ui/HUD";

type ArenaState = "spawning" | "active" | "between";

export default class ArenaScene extends Phaser.Scene {
  player!: Player;
  enemies!: EnemyManager;
  hud!: HUD;

  wave: number = 1;
  points: number = 0;

  state: ArenaState = "spawning";
  countdown: number = 0;
  countdownText?: Phaser.GameObjects.Text;

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

    // === HUD ===
    this.hud = new HUD(this);

    // === SCORE CALLBACK ONLY ===
    this.enemies.onEnemyKilled = (pts: number) => {
      this.points += pts;
    };

    // === CAMERA ===
    this.cameras.main.startFollow(
      this.player.sprite,
      true,
      0.08,
      0.08
    );

    // === START FIRST WAVE ===
    this.startWave(this.wave);
  }

  update(_time: number, delta: number): void {
    if (this.state === "active") {
      this.player.update(delta);
      this.enemies.update(this.player.sprite);

      // ✅ WAVE COMPLETE CHECK (SAFE PLACE)
      if (this.enemies.enemies.length === 0) {
        this.onWaveComplete();
      }
    }

    this.hud.update(
      this.player.hp,
      this.wave,
      this.points
    );
  }

  // =========================
  // WAVE CONTROL
  // =========================

  startWave(wave: number) {
    this.state = "spawning";

    this.showWaveText(`Wave ${wave}`);

    this.time.delayedCall(800, () => {
      this.spawnWave(wave);
      this.state = "active";
    });
  }

  onWaveComplete() {
    if (this.state !== "active") return; // prevent double trigger

    this.state = "between";

    this.showWaveText("Wave Complete!");

    this.time.delayedCall(1000, () => {
      this.startCountdown(3);
    });
  }

  startCountdown(seconds: number) {
    this.countdown = seconds;

    if (this.countdownText) {
      this.countdownText.destroy();
    }

    this.countdownText = this.add
      .text(
        this.scale.width / 2,
        this.scale.height / 2,
        `Next Wave in ${this.countdown}`,
        {
          fontSize: "28px",
          color: "#ffffff",
          fontFamily: "monospace",
          stroke: "#000000",
          strokeThickness: 4
        }
      )
      .setOrigin(0.5)
      .setDepth(1000)
      .setScrollFactor(0);

    const timer = this.time.addEvent({
      delay: 1000,
      repeat: seconds - 1,
      callback: () => {
        this.countdown--;
        this.countdownText?.setText(
          `Next Wave in ${this.countdown}`
        );

        if (this.countdown <= 0) {
          timer.remove(false);
          this.countdownText?.destroy();
          this.countdownText = undefined;

          this.wave++;
          this.startWave(this.wave);
        }
      }
    });
  }

  showWaveText(text: string) {
    const msg = this.add
      .text(
        this.scale.width / 2,
        this.scale.height / 2 - 60,
        text,
        {
          fontSize: "36px",
          color: "#ff4444",
          fontFamily: "monospace",
          stroke: "#000000",
          strokeThickness: 5
        }
      )
      .setOrigin(0.5)
      .setDepth(1000)
      .setScrollFactor(0);

    this.tweens.add({
      targets: msg,
      alpha: 0,
      duration: 900,
      delay: 600,
      onComplete: () => msg.destroy()
    });
  }

  // =========================
  // WAVE COMPOSITION
  // =========================

  spawnWave(wave: number) {
    const w = this.scale.width;
    const h = this.scale.height;

    switch (wave) {
      case 1:
        this.enemies.spawnHopGoblin(200, 200);
        this.enemies.spawnHopGoblin(w - 200, 200);
        this.enemies.spawnHopGoblin(w / 2, h - 200);
        break;

      case 2:
        this.enemies.spawnHopGoblin(200, 200);
        this.enemies.spawnHopGoblin(w - 200, 200);
        this.enemies.spawnFudling(w / 2, h - 180);
        this.enemies.spawnFudling(w / 2, 180);
        break;

      case 3:
        this.enemies.spawnHopGoblin(180, 180);
        this.enemies.spawnHopGoblin(w - 180, 180);
        this.enemies.spawnHopSlime(w / 2, h - 180);
        this.enemies.spawnHopSlime(w / 2, 180);
        this.enemies.spawnFudling(w / 2, h / 2);
        break;

      default:
        this.spawnWave(3);
        break;
    }
  }
}
