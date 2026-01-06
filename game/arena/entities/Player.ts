import * as Phaser from "phaser";
import Enemy from "./Enemy";

export default class Player {
  scene: Phaser.Scene;
  sprite: Phaser.Physics.Arcade.Sprite;

  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  keys: {
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
  };

  attackKey: Phaser.Input.Keyboard.Key;

  // === MOVEMENT ===
  speed = 320;

  // === ATTACK ===
  attackRange = 55;
  attackCooldown = 350;
  lastAttack = 0;
  attackMin = 10;
  attackMax = 18;

  // === HP / DAMAGE ===
  maxHp = 100;
  hp = 100;
  damageCooldown = 800;
  lastDamageTime = 0;

  shadow: Phaser.GameObjects.Ellipse;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene;

    // === SPRITE ===
    this.sprite = scene.physics.add
      .sprite(x, y, "grok")
      .setCollideWorldBounds(true);

    this.sprite.setScale(0.42);

    // === SHADOW ===
    this.shadow = scene.add.ellipse(
      x,
      y + 18,
      60,
      22,
      0x000000,
      0.35
    );

    // === INPUT ===
    this.cursors = scene.input.keyboard!.createCursorKeys();
    this.keys = scene.input.keyboard!.addKeys({
      W: Phaser.Input.Keyboard.KeyCodes.W,
      A: Phaser.Input.Keyboard.KeyCodes.A,
      S: Phaser.Input.Keyboard.KeyCodes.S,
      D: Phaser.Input.Keyboard.KeyCodes.D
    }) as any;

    this.attackKey = scene.input.keyboard!.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
  }

  update(_: number) {
    const body = this.sprite.body as Phaser.Physics.Arcade.Body;
    body.setVelocity(0);

    // === MOVEMENT ===
    if (this.cursors.left?.isDown || this.keys.A.isDown)
      body.setVelocityX(-this.speed);
    else if (this.cursors.right?.isDown || this.keys.D.isDown)
      body.setVelocityX(this.speed);

    if (this.cursors.up?.isDown || this.keys.W.isDown)
      body.setVelocityY(-this.speed);
    else if (this.cursors.down?.isDown || this.keys.S.isDown)
      body.setVelocityY(this.speed);

    body.velocity.normalize().scale(this.speed);

    // === ATTACK ===
    if (Phaser.Input.Keyboard.JustDown(this.attackKey)) {
      const now = this.scene.time.now;
      if (now - this.lastAttack > this.attackCooldown) {
        this.lastAttack = now;
        this.performAttack();
      }
    }

    // === DEPTH + SHADOW ===
    this.sprite.setDepth(this.sprite.y);
    this.shadow.setDepth(this.sprite.y - 1);
    this.shadow.x = this.sprite.x;
    this.shadow.y = this.sprite.y + 18;
  }

  performAttack() {
    const body = this.sprite.body as Phaser.Physics.Arcade.Body;

    // === ATTACK DIRECTION ===
    let dirX = 0;
    let dirY = 1;

    if (body.velocity.length() > 0) {
      dirX = Math.sign(body.velocity.x);
      dirY = Math.sign(body.velocity.y);
    }

    const strikeX = this.sprite.x + dirX * 28;
    const strikeY = this.sprite.y + dirY * 28;

    // === BODY LEAN (SELL PUNCH) ===
    this.scene.tweens.add({
      targets: this.sprite,
      angle: dirX !== 0 ? dirX * 8 : 0,
      duration: 40,
      yoyo: true
    });

    // === FIST / HIT FLASH ===
    const punch = this.scene.add.circle(
      strikeX,
      strikeY,
      6,
      0xffffff,
      0.9
    );
    punch.setDepth(2000);

    this.scene.tweens.add({
      targets: punch,
      scale: 2,
      alpha: 0,
      duration: 120,
      onComplete: () => punch.destroy()
    });

    // === HIT STOP (IMPACT) ===
    this.scene.time.timeScale = 0.9;
    this.scene.time.delayedCall(60, () => {
      this.scene.time.timeScale = 1;
    });

    // === DAMAGE LOGIC ===
    const manager = (this.scene as any).enemies;
    if (!manager) return;

    const enemy: Enemy | null = manager.getClosestEnemy(
      strikeX,
      strikeY,
      this.attackRange
    );

    if (enemy) {
      const rawDamage = Phaser.Math.Between(
        this.attackMin,
        this.attackMax
      );
      enemy.takeDamage(rawDamage, this.sprite.x, this.sprite.y);
    }
  }

  takeDamage(amount: number) {
    const now = this.scene.time.now;
    if (now - this.lastDamageTime < this.damageCooldown) return;

    this.lastDamageTime = now;
    this.hp -= amount;

    // Player hit feedback
    this.scene.tweens.add({
      targets: this.sprite,
      alpha: 0.5,
      duration: 80,
      yoyo: true
    });

    if (this.hp <= 0) {
      this.die();
    }
  }

  die() {
    this.sprite.setTint(0xff0000);
    this.sprite.setVelocity(0, 0);

    this.scene.time.delayedCall(500, () => {
      this.scene.scene.restart();
    });
  }
}
