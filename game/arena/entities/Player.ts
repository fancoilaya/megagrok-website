import * as Phaser from "phaser";
import EnemyManager from "../systems/EnemyManager";

export default class Player {
  scene: Phaser.Scene;
  sprite: Phaser.Physics.Arcade.Sprite;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  keys: any;

  speed = 210;
  hp = 100;
  maxHp = 100;
  isDead = false;

  attackCooldown = 420;
  lastAttack = 0;

  // === NEW: movement feel tuning ===
  private velocityX = 0;
  private velocityY = 0;
  private readonly MAX_SPEED = 220;
  private readonly ACCELERATION = 1400;
  private readonly DRAG = 1800;

  // === NEW: facing direction (additive, not yet used) ===
  facing: "up" | "down" | "left" | "right" = "down";

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene;

    this.sprite = scene.physics.add.sprite(x, y, "grok-player");
    this.sprite.setCollideWorldBounds(true);

    this.cursors = scene.input.keyboard!.createCursorKeys();
    this.keys = scene.input.keyboard!.addKeys("W,A,S,D");
  }

  update(time: number, enemyManager: EnemyManager) {
    if (this.isDead) return;

    let inputX = 0;
    let inputY = 0;

    if (this.cursors.left.isDown || this.keys.A.isDown) inputX -= 1;
    if (this.cursors.right.isDown || this.keys.D.isDown) inputX += 1;
    if (this.cursors.up.isDown || this.keys.W.isDown) inputY -= 1;
    if (this.cursors.down.isDown || this.keys.S.isDown) inputY += 1;

    // === NEW: normalize diagonal input (no speed boost) ===
    if (inputX !== 0 && inputY !== 0) {
      inputX *= Math.SQRT1_2;
      inputY *= Math.SQRT1_2;
    }

    const delta = this.scene.game.loop.delta / 1000;

    const targetVX = inputX * this.MAX_SPEED;
    const targetVY = inputY * this.MAX_SPEED;

    // === NEW: smooth acceleration toward target velocity ===
    this.velocityX = Phaser.Math.Linear(
      this.velocityX,
      targetVX,
      this.ACCELERATION * delta
    );

    this.velocityY = Phaser.Math.Linear(
      this.velocityY,
      targetVY,
      this.ACCELERATION * delta
    );

    // === NEW: apply drag when no input ===
    if (inputX === 0) {
      this.velocityX = Phaser.Math.Linear(
        this.velocityX,
        0,
        this.DRAG * delta
      );
    }

    if (inputY === 0) {
      this.velocityY = Phaser.Math.Linear(
        this.velocityY,
        0,
        this.DRAG * delta
      );
    }

    // === ORIGINAL BEHAVIOR PRESERVED ===
    this.sprite.setVelocity(this.velocityX, this.velocityY);

    // === NEW: update facing direction (non-breaking) ===
    if (Math.abs(this.velocityX) > Math.abs(this.velocityY)) {
      if (this.velocityX > 10) this.facing = "right";
      else if (this.velocityX < -10) this.facing = "left";
    } else {
      if (this.velocityY > 10) this.facing = "down";
      else if (this.velocityY < -10) this.facing = "up";
    }

    // === ORIGINAL ATTACK LOGIC (UNTOUCHED) ===
    if (
      this.scene.input.activePointer.isDown &&
      time > this.lastAttack + this.attackCooldown
    ) {
      enemyManager.tryPlayerAttack(this.sprite.x, this.sprite.y);
      this.lastAttack = time;
    }
  }

  takeDamage(amount: number) {
    if (this.isDead) return;

    this.hp -= amount;

    this.scene.tweens.add({
      targets: this.sprite,
      alpha: 0.6,
      duration: 60,
      yoyo: true
    });

    // === DEATH (IMMEDIATE) ===
    if (this.hp <= 0) {
      this.isDead = true;
      (this.scene as any).onPlayerDeath?.();
    }
  }
}
