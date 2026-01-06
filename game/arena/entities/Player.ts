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

  attackCooldown = 460;
  lastAttack = 0;
  attackRange = 90; // slightly extended

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

    // === FIND TARGET FIRST ===
    const target = this.enemyManager.getClosestEnemy(
      this.sprite.x,
      this.sprite.y,
      this.attackRange
    );

    // Default forward direction
    let angle = this.sprite.flipX ? Math.PI : 0;

    if (target) {
      angle = Phaser.Math.Angle.Between(
        this.sprite.x,
        this.sprite.y,
        target.sprite.x,
        target.sprite.y
      );
    }

    // === WIND-UP ===
    this.scene.tweens.add({
      targets: this.sprite,
      angle: Phaser.Math.RadToDeg(angle) * 0.03,
      duration: 80,
      yoyo: true
    });

    // === FORCE ARC (LAYERED, BRIGHT) ===
    const arc = this.scene.add.graphics();
    arc.setDepth(this.sprite.y + 5);

    // Glow layer
    arc.fillStyle(0xff8888, 0.35);
    arc.beginPath();
    arc.moveTo(this.sprite.x, this.sprite.y);
    arc.arc(
      this.sprite.x,
      this.sprite.y,
      86,
      angle - Phaser.Math.DegToRad(40),
      angle + Phaser.Math.DegToRad(40)
    );
    arc.closePath();
    arc.fillPath();

    // Core strike layer
    arc.fillStyle(0xff3333, 0.85);
    arc.beginPath();
    arc.moveTo(this.sprite.x, this.sprite.y);
    arc.arc(
      this.sprite.x,
      this.sprite.y,
      72,
      angle - Phaser.Math.DegToRad(28),
      angle + Phaser.Math.DegToRad(28)
    );
    arc.closePath();
    arc.fillPath();

    // Animate arc
    this.scene.tweens.add({
      targets: arc,
      scale: 1.12,
      alpha: 0,
      duration: 140,
      onComplete: () => arc.destroy()
    });

    // === HIT STOP ===
    this.scene.time.timeScale = 0.9;
    this.scene.time.delayedCall(45, () => {
      this.scene.time.timeScale = 1;
    });

    // === DAMAGE ===
    if (target) {
      const dmg = Phaser.Math.Between(10, 16);
      target.takeDamage(dmg, this.sprite.x, this.sprite.y);

      // Damage number
      const dmgText = this.scene.add.text(
        target.sprite.x,
        target.sprite.y - 20,
        `-${dmg}`,
        {
          fontSize: "15px",
          fontFamily: "monospace",
          color: "#ff2222",
          stroke: "#000000",
          strokeThickness: 2
        }
      );

      dmgText.setDepth(target.sprite.y + 10);

      this.scene.tweens.add({
        targets: dmgText,
        y: dmgText.y - 22,
        alpha: 0,
        duration: 520,
        onComplete: () => dmgText.destroy()
      });
    }
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
