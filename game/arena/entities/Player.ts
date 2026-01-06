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

  speed = 360;
  attackRange = 55;
  attackCooldown = 350;
  lastAttack = 0;
  attackDamage = 15;

  shadow: Phaser.GameObjects.Ellipse;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene;

    this.sprite = scene.physics.add
      .sprite(x, y, "grok")
      .setCollideWorldBounds(true);

    this.sprite.body.setImmovable(true);

    this.sprite.setScale(0.35);
    this.sprite.setDepth(10);

    this.shadow = scene.add.ellipse(
      x,
      y + 18,
      60,
      22,
      0x000000,
      0.35
    );
    this.shadow.setDepth(5);

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

    this.shadow.x = this.sprite.x;
    this.shadow.y = this.sprite.y + 18;

    this.sprite.setDepth(this.sprite.y);
    this.shadow.setDepth(this.sprite.y - 1);
  }

  performAttack() {
    const body = this.sprite.body as Phaser.Physics.Arcade.Body;

    // === STRIKE DIRECTION ===
    let dirX = 0;
    let dirY = 1;

    if (body.velocity.length() > 0) {
      dirX = Math.sign(body.velocity.x);
      dirY = Math.sign(body.velocity.y);
    }

    const strikeX = this.sprite.x + dirX * 20;
    const strikeY = this.sprite.y + dirY * 20;

    // === VISUAL STRIKE FX ===
    const hitFx = this.scene.add.circle(
      strikeX,
      strikeY,
      22,
      0xffffff,
      0.3
    );
    hitFx.setDepth(20);

    this.scene.tweens.add({
      targets: hitFx,
      alpha: 0,
      scale: 1.4,
      duration: 120,
      onComplete: () => hitFx.destroy()
    });

    // === PLAYER LUNGE ===
    this.scene.tweens.add({
      targets: this.sprite,
      x: this.sprite.x + dirX * 10,
      y: this.sprite.y + dirY * 10,
      duration: 80,
      yoyo: true
    });

    // === FIND & DAMAGE ONE ENEMY ===
    const manager = (this.scene as any).enemies;
    if (!manager) return;

    const enemy: Enemy | null = manager.getClosestEnemy(
      strikeX,
      strikeY,
      this.attackRange
    );

    if (enemy) {
      enemy.takeDamage(this.attackDamage);
    }
  }
}
