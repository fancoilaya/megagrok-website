import * as Phaser from "phaser";
import EnemyManager from "../systems/EnemyManager";

export default class Player {
  scene: Phaser.Scene;
  sprite: Phaser.Physics.Arcade.Sprite;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  keys: any;

  speed = 260;
  hp = 100;
  maxHp = 100;

  attackCooldown = 420;
  lastAttack = 0;
  attackRange = 120; // generous but fair

  enemyManager: EnemyManager;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    enemyManager: EnemyManager
  ) {
    this.scene = scene;
    this.enemyManager = enemyManager;

    this.sprite = scene.physics.add
      .sprite(x, y, "grok")
      .setCollideWorldBounds(true);

    this.sprite.setScale(0.38);
    this.sprite.setData("ref", this);

    const keyboard =
      scene.input.keyboard as Phaser.Input.Keyboard.KeyboardPlugin;

    this.cursors = keyboard.createCursorKeys();
    this.keys = keyboard.addKeys("W,A,S,D,SPACE");
  }

  update(_delta: number) {
    const body = this.sprite.body as Phaser.Physics.Arcade.Body;

    let vx = 0;
    let vy = 0;

    if (this.cursors.left?.isDown || this.keys.A?.isDown) vx = -1;
    if (this.cursors.right?.isDown || this.keys.D?.isDown) vx = 1;
    if (this.cursors.up?.isDown || this.keys.W?.isDown) vy = -1;
    if (this.cursors.down?.isDown || this.keys.S?.isDown) vy = 1;

    body.setVelocity(vx * this.speed, vy * this.speed);

    if (vx !== 0) {
      this.sprite.setFlipX(vx < 0);
    }

    this.sprite.setDepth(this.sprite.y);

    if (Phaser.Input.Keyboard.JustDown(this.keys.SPACE)) {
      this.performAttack();
    }
  }

  performAttack() {
    const now = this.scene.time.now;
    if (now - this.lastAttack < this.attackCooldown) return;
    this.lastAttack = now;

    // === LOCK ON CLOSEST ENEMY ===
    const enemy = this.enemyManager.getClosestEnemy(
      this.sprite.x,
      this.sprite.y,
      this.attackRange
    );

    if (!enemy) return;

    const ex = enemy.sprite.x;
    const ey = enemy.sprite.y;

    // === FACE TARGET ===
    this.sprite.setFlipX(ex < this.sprite.x);

    // === FORCE STRIKE VISUAL (LINE) ===
    const gfx = this.scene.add.graphics();
    gfx.setDepth(Math.max(this.sprite.y, ey) + 5);

    // Glow layer
    gfx.lineStyle(6, 0xff8888, 0.35);
    gfx.beginPath();
    gfx.moveTo(this.sprite.x, this.sprite.y);
    gfx.lineTo(ex, ey);
    gfx.strokePath();

    // Core strike
    gfx.lineStyle(3, 0xff2222, 1);
    gfx.beginPath();
    gfx.moveTo(this.sprite.x, this.sprite.y);
    gfx.lineTo(ex, ey);
    gfx.strokePath();

    this.scene.tweens.add({
      targets: gfx,
      alpha: 0,
      duration: 120,
      onComplete: () => gfx.destroy()
    });

    // === HIT STOP ===
    this.scene.time.timeScale = 0.92;
    this.scene.time.delayedCall(40, () => {
      this.scene.time.timeScale = 1;
    });

    // === DAMAGE (SINGLE TARGET) ===
    const dmg = Phaser.Math.Between(12, 18);
    enemy.takeDamage(dmg, this.sprite.x, this.sprite.y);

    // Damage number
    const dmgText = this.scene.add.text(
      ex,
      ey - 20,
      `-${dmg}`,
      {
        fontSize: "15px",
        fontFamily: "monospace",
        color: "#ff2222",
        stroke: "#000000",
        strokeThickness: 2
      }
    );

    dmgText.setDepth(ey + 10);

    this.scene.tweens.add({
      targets: dmgText,
      y: dmgText.y - 24,
      alpha: 0,
      duration: 520,
      onComplete: () => dmgText.destroy()
    });
  }

  takeDamage(amount: number) {
    this.hp = Math.max(0, this.hp - amount);

    this.scene.tweens.add({
      targets: this.sprite,
      alpha: 0.6,
      duration: 60,
      yoyo: true
    });
  }
}
