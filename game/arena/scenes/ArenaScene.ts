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

    this.player = new Player(this, width / 2, height / 2);
    this.enemies = new EnemyManager(this, this.player);
    this.hud = new HUD(this);

    this.startWave();
  }

  startWave() {
    this.state = "spawning";
    this.enemies.spawnWave(this.wave);
    this.state = "active";
  }

  onPlayerDeath() {
    if (this.state === "dead") return;
    this.state = "dead";

    const { width, height } = this.scale;
    const cx = width / 2;
    const cy = height / 2;

    this.showGameOver(cx, cy);
  }

  /* ===============================
     GAME OVER (STABLE)
  =============================== */
  showGameOver(cx: number, cy: number) {
    this.gameOverContainer?.destroy();

    const bg = this.add
      .rectangle(cx, cy, 420, 320, 0x000000, 0.9)
      .setStrokeStyle(2, 0xff4444);

    const title = this.add.text(cx, cy - 110, "GAME OVER", {
      fontSize: "32px",
      color: "#ff4444",
      fontFamily: "monospace",
      stroke: "#000000",
      strokeThickness: 4
    }).setOrigin(0.5);

    const scoreText = this.add.text(
      cx,
      cy - 40,
      `SCORE: ${this.points}`,
      {
        fontSize: "22px",
        color: "#ffffff",
        fontFamily: "monospace"
      }
    ).setOrigin(0.5);

    const submitBtn = this.makeButton(
      cx,
      cy + 40,
      "SUBMIT SCORE",
      () => this.showSubmitForm(cx, cy)
    );

    this.gameOverContainer = this.add.container(0, 0, [
      bg,
      title,
      scoreText,
      submitBtn
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

    // ===============================
    // PATCH: FORCE DOM VISIBILITY
    // ===============================
    nameInput.setDepth(3000);
    walletInput.setDepth(3000);

    nameInput.setScrollFactor(0);
    walletInput.setScrollFactor(0);

    this.children.bringToTop(nameInput);
    this.children.bringToTop(walletInput);
    // ===============================

    const confirmBtn = this.makeButton(
      cx,
      cy + 60,
      "CONFIRM SUBMIT",
      () => {
        const name = (nameInput.node as HTMLInputElement).value.trim();
        const wallet = (walletInput.node as HTMLInputElement).value.trim();

        if (!name || !wallet) {
          alert("Please fill in both fields.");
          return;
        }

        console.log("SUBMIT:", { name, wallet, score: this.points });
      }
    );

    this.gameOverContainer = this.add.container(0, 0, [
      bg,
      title,
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
}
