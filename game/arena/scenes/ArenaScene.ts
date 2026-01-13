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

  /* ===============================
     RESET
  =============================== */
  init(): void {
    this.wave = 1;
    this.points = 0;
    this.state = "spawning";
  }

  /* ===============================
     CREATE
  =============================== */
  create(): void {
    // 🔑 SINGLE source of truth
    const width = this.scale.gameSize.width;
    const height = this.scale.gameSize.height;

    this.input.keyboard?.clearCaptures();

    // Camera & physics bounds
    this.cameras.main.setBounds(0, 0, width, height);
    this.physics.world.setBounds(0, 0, width, height);

    // Releases WASD back to the browser
    this.input.keyboard?.clearCaptures();

    // Background
    this.add
      .image(width / 2, height / 2, "arena-floor")
      .setDisplaySize(width, height);

    // Systems
    this.enemies = new EnemyManager(this);

    // Player
    this.player = new Player(
      this,
      width / 2,
      height / 2,
      this.enemies
    );

    // HUD (screen-space)
    this.hud = new HUD(this);
    console.log("HUD CREATED");

    // Score hook
    this.enemies.onEnemyKilled = (pts: number) => {
      this.points += pts;
    };

    // Camera follow
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
     UPDATE (HUD SAFE)
  =============================== */
  update(_time: number, delta: number): void {
    // 🔑 HUD must always update
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

    const { width, height } = this.scale;

    // === NEW LOGIC (SAFE): determine if next wave is a boss ===
    const nextWave = this.wave + 1;
    const bossIncoming = nextWave % 5 === 0;

    const countdown = this.add.text(
      width / 2,
      height / 2,
      "",
      {
        fontSize: bossIncoming ? "56px" : "48px",
        fontFamily: "monospace",
        color: bossIncoming ? "#ff2222" : "#ffffff",
        stroke: "#000000",
        strokeThickness: 6
      }
    )
      .setOrigin(0.5)
      .setDepth(1000)
      .setScrollFactor(0);

    // === CHANGED: steps depend on boss wave ===
    const steps = bossIncoming
      ? ["BOSS", "INCOMING"]
      : ["3", "2", "1"];

    let index = 0;

    this.time.addEvent({
      delay: 800,
      repeat: steps.length - 1,
      callback: () => {
        if (this.state === "dead") {
          countdown.destroy();
          return;
        }

        countdown.setText(steps[index]);
        countdown.setScale(1.4);
        countdown.setAlpha(1);

        this.tweens.add({
          targets: countdown,
          scale: 1,
          alpha: 0.85,
          duration: 250
        });

        index++;

        if (index === steps.length) {
          countdown.destroy();
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

  /* ===============================
     GAME OVER
  =============================== */
  onPlayerDeath() {
    if (this.state === "dead") return;

    this.state = "dead";

    this.player.disableInput();
    this.player.destroyKeys();

    // Stop gameplay safely
    this.enemies.clearAll();
    this.player.sprite.setVelocity(0, 0);

    // 🔑 Disable Phaser keyboard so DOM inputs work
    if (this.input.keyboard) {
      this.input.keyboard.enabled = false;
    }

    // Emit run result to React
    window.dispatchEvent(
      new CustomEvent("arena:submit-score", {
        detail: {
          score: this.points,
          wave: this.wave - 1
        }
      })
    );
  }

  /* ===============================
     BUTTON
  =============================== */
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

    const txt = this.add
      .text(x, y, label, {
        fontSize: "16px",
        color: "#ffffff",
        fontFamily: "monospace"
      })
      .setOrigin(0.5);

    bg.on("pointerdown", onClick);
    return this.add.container(0, 0, [bg, txt]);
  }

  /* ===============================
     ENEMIES
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

        case 4:
        // Croakling intro (fast swarm)
        this.enemies.spawnCroakling(200, 200);
        this.enemies.spawnCroakling(w - 200, 200);
        this.enemies.spawnCroakling(w / 2, h - 200);
        this.enemies.spawnCroakling(w / 2, 200);
        this.enemies.spawnHopGoblin(w / 2, h / 2);
        this.enemies.spawnHopGoblin(200, h - 200);
        break;

      case 5:
        // BOSS WAVE 1 — RugRat boss + adds
        const boss5 = new RugRat(this, w / 2, h / 2);
        boss5.maxHp *= 3;
        boss5.hp = boss5.maxHp;
        boss5.sprite.setScale(1.5);
        this.enemies.enemies.push(boss5);

        this.enemies.spawnHopGoblin(200, 200);
        this.enemies.spawnHopGoblin(w - 200, 200);
        break;

      case 6:
        // Post-boss escalation
        this.enemies.spawnHopSlime(200, 180);
        this.enemies.spawnHopSlime(w - 200, 180);
        this.enemies.spawnCroakling(200, h - 200);
        this.enemies.spawnCroakling(w - 200, h - 200);
        this.enemies.spawnCroakling(w / 2, h / 2);
        this.enemies.spawnFudling(w / 2, 180);
        this.enemies.spawnFudling(w / 2, h - 180);
        break;

      case 7:
        // Mixed threat
        this.enemies.spawnRugRat(200, 200);
        this.enemies.spawnRugRat(w - 200, 200);
        this.enemies.spawnHopGoblin(w / 2, 180);
        this.enemies.spawnHopGoblin(w / 2, h - 180);
        this.enemies.spawnCroakling(200, h - 200);
        this.enemies.spawnCroakling(w - 200, h - 200);
        break;

      case 8:
        // Ranged + swarm chaos
        this.enemies.spawnHopSlime(200, 180);
        this.enemies.spawnHopSlime(w - 200, 180);
        this.enemies.spawnHopSlime(w / 2, h - 180);

        this.enemies.spawnCroakling(200, h / 2);
        this.enemies.spawnCroakling(w - 200, h / 2);
        this.enemies.spawnCroakling(w / 2, h / 2);
        this.enemies.spawnCroakling(w / 2, 200);

        this.enemies.spawnFudling(200, 200);
        this.enemies.spawnFudling(w - 200, 200);
        break;

      case 9:
        // Pre-boss pressure
        this.enemies.spawnRugRat(200, 200);
        this.enemies.spawnRugRat(w - 200, 200);

        this.enemies.spawnHopSlime(w / 2, 180);
        this.enemies.spawnHopSlime(w / 2, h - 180);

        this.enemies.spawnHopGoblin(200, h - 200);
        this.enemies.spawnHopGoblin(w - 200, h - 200);
        break;

      case 10:
        // BIG BOSS WAVE
        const boss10 = new RugRat(this, w / 2, h / 2);
        boss10.maxHp *= 5;
        boss10.hp = boss10.maxHp;
        boss10.sprite.setScale(1.9);
        this.enemies.enemies.push(boss10);

        this.enemies.spawnHopSlime(200, 180);
        this.enemies.spawnHopSlime(w - 200, 180);

        this.enemies.spawnCroakling(200, h - 200);
        this.enemies.spawnCroakling(w - 200, h - 200);
        this.enemies.spawnCroakling(w / 2, h - 180);
        break;

      default:
        this.spawnWave(3);
        break;
    }
  }
}
