import Phaser from "phaser";
import Player from "../entities/Player";
import EnemyManager from "../systems/EnemyManager";
import HUD from "../ui/HUD";

type ArenaState = "spawning" | "active" | "between-waves" | "dead";

export default class ArenaScene extends Phaser.Scene {
  player!: Player;
  enemies!: EnemyManager;
  hud!: HUD;

  wave: number = 1;
  points: number = 0;
  state: ArenaState = "spawning";

  elapsedTime: number = 0;
  betweenWaveTimer?: Phaser.Time.TimerEvent;

  gameOverDOM?: Phaser.GameObjects.DOMElement;

  constructor() {
    super("ArenaScene");
  }

  /* ======================================================
     INIT — RESET STATE ON RESTART (CRITICAL)
  ====================================================== */
  init(): void {
    this.wave = 1;
    this.points = 0;
    this.elapsedTime = 0;
    this.state = "spawning";
    this.gameOverDOM = undefined;
  }

  /* ======================================================
     CREATE
  ====================================================== */
  create(): void {
    const { width, height } = this.scale;

    // Player
    this.player = new Player(this, width / 2, height / 2);
    this.player.sprite.setData("ref", this);

    // Enemies
    this.enemies = new EnemyManager(this);

    // HUD
    this.hud = new HUD(this);

    // Camera
    this.cameras.main.startFollow(this.player.sprite, true, 0.08, 0.08);

    // Start first wave
    this.startWave();
  }

  /* ======================================================
     UPDATE
  ====================================================== */
  update(time: number, delta: number): void {
    if (this.state === "dead") {
      this.hud.update(
        this.player.hp,
        this.wave,
        this.points,
        this.elapsedTime
      );
      return;
    }

    this.elapsedTime += delta;

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
      this.points,
      this.elapsedTime
    );
  }

  /* ======================================================
     WAVES
  ====================================================== */
  startWave(): void {
    this.state = "active";
    this.enemies.spawnWave(this.wave);
  }

  onWaveComplete(): void {
    if (this.state !== "active") return;

    this.state = "between-waves";
    this.wave += 1;

    this.betweenWaveTimer = this.time.delayedCall(2500, () => {
      this.startWave();
    });
  }

  /* ======================================================
     SCORING
  ====================================================== */
  addPoints(amount: number): void {
    this.points += amount;
  }

  /* ======================================================
     PLAYER DAMAGE / DEATH
  ====================================================== */
  onPlayerHit(damage: number): void {
    if (this.state === "dead") return;

    this.player.takeDamage(damage);

    if (this.player.hp <= 0) {
      this.onPlayerDeath();
    }
  }

  onPlayerDeath(): void {
    if (this.state === "dead") return;

    this.state = "dead";
    this.enemies.clearAll();
    this.showGameOverUI();
  }

  /* ======================================================
     GAME OVER / SUBMIT SCORE UI
  ====================================================== */
  showGameOverUI(): void {
    const html = `
      <div class="arena-overlay">
        <form id="submit-form">
          <h2>SUBMIT SCORE</h2>

          <input
            type="text"
            name="name"
            placeholder="Player name"
            maxlength="16"
            required
          />

          <input
            type="text"
            name="wallet"
            placeholder="Wallet address (optional)"
          />

          <button type="submit">CONFIRM SUBMIT</button>
          <button type="button" class="skip">SKIP</button>
        </form>
      </div>
    `;

    this.gameOverDOM = this.add
      .dom(this.cameras.main.centerX, this.cameras.main.centerY)
      .createFromHTML(html);

    // Submit
    this.gameOverDOM.addListener("submit");
    this.gameOverDOM.on("submit", (event: any) => {
      event.preventDefault();

      const form = event.target as HTMLFormElement;
      const name = (form.elements.namedItem("name") as HTMLInputElement).value;
      const wallet = (form.elements.namedItem("wallet") as HTMLInputElement).value;

      this.submitScore(name, wallet);
      this.gameOverDOM?.destroy();
      this.scene.restart();
    });

    // Skip
    this.gameOverDOM.addListener("click");
    this.gameOverDOM.on("click", (event: any) => {
      if ((event.target as HTMLElement).classList.contains("skip")) {
        this.gameOverDOM?.destroy();
        this.scene.restart();
      }
    });
  }

  /* ======================================================
     SCORE SUBMISSION (NEXT STEP)
  ====================================================== */
  submitScore(name: string, wallet: string): void {
    console.log("SUBMIT SCORE", {
      name,
      wallet,
      score: this.points,
      wave: this.wave - 1,
      time: Math.floor(this.elapsedTime / 1000)
    });

    // NEXT:
    // POST to /api/leaderboard
  }
}
