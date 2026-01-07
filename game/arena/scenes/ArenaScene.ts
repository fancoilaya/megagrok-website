import * as Phaser from "phaser";
import Player from "../entities/Player";
import EnemyManager from "../systems/EnemyManager";
import HUD from "../ui/HUD";

type ArenaState = "spawning" | "active" | "between" | "dead";

export default class ArenaScene extends Phaser.Scene {
  player!: Player;
  enemies!: EnemyManager;
  hud!: HUD;

  wave: number = 1;
  points: number = 0;

  state: ArenaState = "spawning";
  countdownText?: Phaser.GameObjects.Text;

  // Game Over UI refs
  gameOverContainer?: Phaser.GameObjects.Container;

  constructor() {
    super("ArenaScene");
  }

  init(): void {
    this.wave = 1;
    this.points = 0;
    this.state = "spawning";
    this.gameOverContainer = undefined;
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

    // === SCORE CALLBACK ===
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
    // Player can always move (unless dead)
    this.player.update(delta);

    if (this.state === "active") {
      this.enemies.update(this.player.sprite);

      // Wave complete
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
    if (this.state !== "active") return;

    this.state = "between";
    this.showWaveText("Wave Complete!");

    this.time.delayedCall(1000, () => {
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

  // =========================
  // PLAYER DEATH + GAME OVER
  // =========================

  onPlayerDeath() {
    if (this.state === "dead") return;
    this.state = "dead";

    this.enemies.clearAll();
    this.player.sprite.setVelocity(0, 0);

    const cx = this.scale.width / 2;
    const cy = this.scale.height / 2;

    const bg = this.add
      .rectangle(cx, cy, 420, 340, 0x000000, 0.85)
      .setStrokeStyle(2, 0xff4444);

    const title = this.add.text(cx, cy - 130, "YOU DIED", {
      fontSize: "36px",
      color: "#ff4444",
      fontFamily: "monospace",
      stroke: "#000000",
      strokeThickness: 4
    }).setOrigin(0.5);

    const scoreText = this.add.text(
      cx,
      cy - 70,
      `Final Score: ${this.points}\nWave Reached: ${this.wave - 1}`,
      {
        fontSize: "18px",
        color: "#ffffff",
        fontFamily: "monospace",
        align: "center"
      }
    ).setOrigin(0.5);

    // Buttons
    const submitBtn = this.makeButton(
      cx,
      cy + 10,
      "SUBMIT SCORE",
      () => this.showSubmitForm(cx, cy)
    );

    const skipBtn = this.makeButton(
      cx,
      cy + 60,
      "SKIP & RESTART",
      () => this.scene.restart()
    );

    this.gameOverContainer = this.add.container(0, 0, [
      bg,
      title,
      scoreText,
      submitBtn,
      skipBtn
    ]);

    this.gameOverContainer.setDepth(2000);
  }

  showSubmitForm(cx: number, cy: number) {
    this.gameOverContainer?.destroy();

    const bg = this.add
      .rectangle(cx, cy, 440, 380, 0x000000, 0.9)
      .setStrokeStyle(2, 0x44ff44);

    const title = this.add.text(cx, cy - 150, "SUBMIT SCORE", {
      fontSize: "28px",
      color: "#44ff44",
      fontFamily: "monospace",
      stroke: "#000000",
      strokeThickness: 3
    }).setOrigin(0.5);

    // DOM inputs
    const nameInput = this.add.dom(cx, cy - 70, "input", {
      type: "text",
      placeholder: "Name",
      style: "width:260px;padding:6px;font-size:16px;"
    });

    const walletInput = this.add.dom(cx, cy - 20, "input", {
      type: "text",
      placeholder: "Wallet Address",
      style: "width:260px;padding:6px;font-size:16px;"
    });

    const confirmBtn = this.makeButton(
      cx,
      cy + 60,
      "CONFIRM SUBMIT",
      () => {
        const name = (nameInput.node as HTMLInputElement).value.trim();
        const wallet = (walletInput.node as HTMLInputElement).value.trim();

        if (!name || !wallet) {
          alert("Name and wallet required");
          return;
        }

        // 🔒 STEP 1 ONLY — MOCK SUBMIT
        console.log("SUBMIT SCORE", {
          name,
          wallet,
          score: this.points,
          wave: this.wave - 1
        });

        this.scene.restart();
      }
    );

    this.gameOverContainer = this.add.container(0, 0, [
      bg,
      title,
      nameInput,
      walletInput,
      confirmBtn
    ]);

    this.gameOverContainer.setDepth(2000);
  }

  makeButton(
    x: number,
    y: number,
    label: string,
    onClick: () => void
  ) {
    const btnBg = this.add
      .rectangle(x, y, 260, 40, 0x222222)
      .setStrokeStyle(2, 0xffffff)
      .setInteractive({ useHandCursor: true });

    const btnText = this.add.text(x, y, label, {
      fontSize: "16px",
      color: "#ffffff",
      fontFamily: "monospace"
    }).setOrigin(0.5);

    btnBg.on("pointerdown", onClick);

    return this.add.container(0, 0, [btnBg, btnText]);
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
