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

  speed = 320;
  attackRange = 55;
  attackCooldown = 350;
  lastAttack = 0;

  // === PLAYER COMBAT STATS ===
  attackMin = 10;
  attackMax = 18;

  shadow: Phaser.GameObjects.Ellipse;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene;

    this.sprite = scene.physics.add
      .sprite(x, y, "grok")
      .setCollideWorldBounds(true);

    this.sprite.setScale(0.42);

    this.shadow = scene.add.ellipse(
      x,
      y + 18,
      60,
      22,
      0x000000,
      0.35
    );

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

    if (this.cursors.left?.isDown || this.keys.A.isDown)
      body.setVelocityX(-this.speed);
    else if (this.cursors.right?.isDown || this.keys.D.isDown)
      body.setVelocityX(this.speed);

    if (this.cursors.up?.isDown || this.keys.W.isDown)
      body.setVelocityY(-this.speed);
    else if (this.cursors.down?.isDown || this.keys.S.isDown)
      body.setVelocityY(this.speed);

    body.velocity.normalize().scale(this.speed);

    if (Phaser.Input.Keyboard.JustDown(this.attackKey)) {
      const now = this.scene.time.now;
      if (now - this.lastAttack > this.attackCooldown) {
        this.lastAttack = now;
        this.performAttack();
      }
    }

    this.sprite.setDepth(this.sprite.y);
    this.shadow.setDepth(this.sprite.y - 1);
    this.shadow.x = this.sprite.x;
    this.shadow.y = this.sprite.y + 18;
  }

  performAttack() {
    const body = this.sprite.body as Phaser.Physics.Arcade.Body;

    let dirX = 0;
    let dirY = 1;

    if (body.velocity.length() > 0) {
      dirX = Math.sign(body.velocity.x);
      dirY = Math.sign(body.velocity.y);
    }

    const strikeX = this.sprite.x + dirX * 26;
    const strikeY = this.sprite.y + dirY * 26;

    // Punch animation (no jump)
    this.scene.tweens.add({
      targets: this.sprite,
      scaleX: 0.48,
      scaleY: 0.38,
      duration: 50,
      yoyo: true
    });

    // Slash visual
    const slash = this.scene.add.rectangle(
      strikeX,
      strikeY,
      30,
      10,
      0xffffff,
      0.25
    );
    slash.setRotation(Math.atan2(dirY, dirX));
    slash.setDepth(1000);

    this.scene.tweens.add({
      targets: slash,
      alpha: 0,
      scaleX: 1.6,
      duration: 120,
      onComplete: () => slash.destroy()
    });

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
}
