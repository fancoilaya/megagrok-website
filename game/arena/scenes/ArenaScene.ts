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
  gameOverContainer?: Phaser.GameObjects.Container;

  constructor() {
    super("ArenaScene");
  }

  /* ===============================
     RESET STATE ON RESTART
  =============================== */
  init(): void {
    this.wave = 1;
    this.points = 0;
    this.state = "spawning";
    this.gameOverContainer = undefined;
  }

  /* ===============================
     CREATE
  =============================== */
  create(): void {
    const { width, height } = this.scale;

    // Background
    this.add
      .image(width / 2, height / 2, "arena-floor")
      .setDisplaySize(width, height);

    this.physics.world.setBounds(0, 0, width, height);

    // Enemies
    this.enemies = new EnemyManager(this);

    // Player
    this.player = new Player(
      this,
      width / 2,
      height / 2,
      this.enemies
    );

    // HUD
    this.hud = new HUD(this);

    // Score hook
    this.enemies.onEnemyKilled = (pts: number) => {
      this.points += pts;
    };

    // Camera
    this.cameras.main.startFollow(
      this.player.sprite,
      true,
      0.08,
      0.08
    );

    // Start game
    this.startWave(this.wave);
  }

  /* ===============================
     UPDATE LOOP (CRASH SAFE)
  =============================== */
  update(_time: number, delta: number): void {
    // 🚨 HARD STOP AFTER DEATH
    if (this.state === "dead") {
      this.hud.update(
        this.player.hp,
        this.wave,
        this.points
      );
      return;
    }

    this.player.update(delta);

    if (this.state === "active") {
      this.enemies.update(this.player.sprite);

      // Wave finished
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

  /* ===============================
     WAVES
  =============================== */
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
     GAME OVER (STABLE)
  =============================== */
  onPlayerDeath() {
    if (this.state === "dead") return;
    this.state = "dead";

    this.enemies.clearAll();
    this.player.sprite.setVelocity(0, 0);

    const cx = this.scale.width / 2;
    const cy = this.scale.height / 2;

    const bg = this.add
      .rectangle(cx, cy, 420, 340, 0x000000, 0.9)
      .setStrokeStyle(2, 0x00ff88);

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
      .rectangle(cx, cy, 440, 380, 0x000000, 0.95)
      .setStrokeStyle(2, 0x00ff88);

    const title = this.add.text(cx, cy - 150, "SUBMIT SCORE", {
      fontSize: "28px",
      color: "#00ff88",
      fontFamily: "monospace",
      stroke: "#000000",
      strokeThickness: 3
    }).setOrigin(0.5);

const nameInput = this.add.dom(
  cx,
  cy - 70,
  "input",
  "width:260px;padding:6px;font-size:16px;background:#ffffff;color:#000000;border:2px solid #00ff88;"
) as Phaser.GameObjects.DOMElement;

(nameInput.node as HTMLInputElement).type = "text";
(nameInput.node as HTMLInputElement).placeholder = "Name";

const walletInput = this.add.dom(
  cx,
  cy - 20,
  "input",
  "width:260px;padding:6px;font-size:16px;background:#ffffff;color:#000000;border:2px solid #00ff88;"
) as Phaser.GameObjects.DOMElement;

(walletInput.node as HTMLInputElement).type = "text";
(walletInput.node as HTMLInputElement).placeholder = "Wallet Address";

nameInput.setScrollFactor(0);
walletInput.setScrollFactor(0);


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

        fetch("/api/leaderboard", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            wallet,
            score: this.points,
            wave: this.wave - 1
          })
        })
          .then(() => this.scene.restart())
          .catch(() => alert("Failed to submit score"));
      }
    );

    this.gameOverContainer = this.add.container(0, 0, [
      bg,
      title,
      confirmBtn
    ]);
    nameInput.setDepth(3000);
    walletInput.setDepth(3000);

    this.gameOverContainer.setDepth(2000);
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

  /* ===============================
     WAVE CONTENT
  =============================== */
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
