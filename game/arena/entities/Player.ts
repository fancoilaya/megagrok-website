import * as Phaser from "phaser";

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

  speed = 260;
  attackCooldown = 350;
  lastAttack = 0;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene;

    // Player sprite
    this.sprite = scene.physics.add
      .sprite(x, y, "grok")
      .setCollideWorldBounds(true);

    // Arrow keys
    this.cursors = scene.input.keyboard!.createCursorKeys();

    // WASD keys
    this.keys = scene.input.keyboard!.addKeys({
      W: Phaser.Input.Keyboard.KeyCodes.W,
      A: Phaser.Input.Keyboard.KeyCodes.A,
      S: Phaser.Input.Keyboard.KeyCodes.S,
      D: Phaser.Input.Keyboard.KeyCodes.D
    }) as any;

    // Attack key
    this.attackKey = scene.input.keyboard!.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
  }

  update(_: number) {
    const body = this.sprite.body as Phaser.Physics.Arcade.Body;
    body.setVelocity(0);

    // Horizontal movement
    if (this.cursors.left?.isDown || this.keys.A.isDown) {
      body.setVelocityX(-this.speed);
    } else if (this.cursors.right?.isDown || this.keys.D.isDown) {
      body.setVelocityX(this.speed);
    }

    // Vertical movement
    if (this.cursors.up?.isDown || this.keys.W.isDown) {
      body.setVelocityY(-this.speed);
    } else if (this.cursors.down?.isDown || this.keys.S.isDown) {
      body.setVelocityY(this.speed);
    }

    // Normalize diagonal movement
    body.velocity.normalize().scale(this.speed);

    // Attack
    if (Phaser.Input.Keyboard.JustDown(this.attackKey)) {
      const now = this.scene.time.now;
      if (now - this.lastAttack > this.attackCooldown) {
        this.lastAttack = now;
        this.performAttack();
      }
    }
  }

  performAttack() {
    // Simple attack feedback (placeholder)
    this.scene.tweens.add({
      targets: this.sprite,
      scale: 1.1,
      duration: 80,
      yoyo: true
    });
  }
}
