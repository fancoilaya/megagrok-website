import * as Phaser from "phaser";
import Player from "../entities/Player";
import EnemyManager from "../systems/EnemyManager";
import HUD from "../ui/HUD";

type ArenaState = "spawning" | "active" | "between" | "dead";

export default class ArenaScene extends Phaser.Scene {
  player!: Player;
  enemies!: EnemyManager;
  hud!: HUD;

  wave = 1;
  points = 0;
  state: ArenaState = "spawning";

  constructor() {
    super("ArenaScene");
  }

  init(): void {
    this.wave = 1;
    this.points = 0;
    this.state = "spawning";
  }

  create(): void {
    const { width, height } = this.scale;

    this.add
      .image(width / 2, height / 2, "arena-floor")
      .setDisplaySize(width, height);

    this.physics.world.setBounds(0, 0, width, height);

    this.enemies = new EnemyManager(this);

    this.player = new Player(
      this,
      width / 2,
      height / 2,
      this.enemies
    );

    this.hud = new HUD(this);

    this.enemies.onEnemyKilled = (pts: number) => {
      this.points += pts;
    };

    this.cameras.main.startFollow(
      this.player.sprite,
      true,
      0.08,
      0.08
    );

    this.startWave(this.wave);
  }

  update(_time: number, delta: number): void {
    if (this.state === "dead") return;

    this.player.update(delta);

    if (this.state === "active") {
      this.enemies.update(this.player.sprite);

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

  startWave(wave: number) {
    this.state = "spawning";
    this.showWaveText(`Wave ${wave}`);

    this.time.delayedCall(800, () => {
      if (this.state === "dead") return;
      this.spawnWave(wave);
      this.state = "active";
    });
  }

  onWaveComplete() {
    if (this.state !== "active") return;

    this.state = "between";
    this.showWaveText("Wave Complete!");

    this.time.delayedCall(1000, () => {
      if (this.state === "dead") return;
      this.wave++;
      this.startWave(this.wave);
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

  /* ===============================
     GAME OVER
  =============================== */
  onPlayerDeath() {
    if (this.state === "dead") return;
    this.state = "dead";

    this.enemies.clearAll();
    this.player.sprite.setVelocity(0, 0);

    const cx = this.scale.width / 2;
    const cy = this.scale.height / 2;

    const bg = this.add
      .rectangle(cx, cy, 420, 300, 0x000000, 0.9)
      .setStrokeStyle(2, 0x00ff88);

    const title = this.add.text(cx, cy - 110, "YOU DIED", {
      fontSize: "36px",
      color: "#ff4444",
      fontFamily: "monospace",
      stroke: "#000000",
      strokeThickness: 4
    }).setOrigin(0.5);

    const scoreText = this.add.text(
      cx,
      cy - 50,
      `Final Score: ${this.points}\nWave Reached: ${this.wave - 1}`,
      {
        fontSize: "18px",
        color: "#ffffff",
        fontFamily: "monospace",
        align: "center"
      }
    ).setOrigin(0.5);

    const submitBtn = this.makeButton(
      cx,
      cy + 40,
      "SUBMIT SCORE",
      () => {
        window.dispatchEvent(
          new CustomEvent("arena:submit-score", {
            detail: {
              score: this.points,
              wave: this.wave - 1
            }
          })
        );
      }
    );

    this.add.container(0, 0, [
      bg,
      title,
      scoreText,
      submitBtn
    ]).setDepth(2000);
  }

  makeButton(
    x: number,
    y: number,
    label: string,
    onClick: () => void
  ) {
    const bg = this.add
      .rectangle(x, y, 260, 40, 0x222222)
      .setStrokeStyle(2, 0xffffff)
      .setInteractive({ useHandCursor: true });

    const txt = this.add.text(x, y, label, {
      fontSize: "16px",
      color: "#ffffff",
      fontFamily: "monospace"
    }).setOrigin(0.5);

    bg.on("pointerdown", onClick);
    return this.add.container(0, 0, [bg, txt]);
  }

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
