import * as Phaser from "phaser";

export default class Player {
  scene: Phaser.Scene;
  sprite: Phaser.Physics.Arcade.Sprite;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  attackKey: Phaser.Input.Keyboard.Key;

  speed = 260;
  attackCooldown = 350;
  lastAttack = 0;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene;

    this.sprite = scene.physics.add
      .sprite(x, y, "grok")
      .setCollideWorldBounds(true);

    this.cursors = scene.input.keyboard!.createCursorKeys();
    this.attackKey = scene.input.keyboard!.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
  }

  update(_: number) {
    const body = this.sprite.body as Phaser.Physics.Arcade.Body;
    body.setVelocity(0);

    // Movement
    if (this.cursors.left?.isDown) body.setVelocityX(-this.speed);
    if (this.cursors.right?.isDown) body.setVelocityX(this.speed);
    if (this.cursors.up?.isDown) body.setVelocityY(-this.speed);
    if (this.cursors.down?.isDown) body.setVelocityY(this.speed);

    body.velocity.normalize().scale(this.speed);

    // Attack (placeholder)
    if (Phaser.Input.Keyboard.JustDown(this.attackKey)) {
      const now = this.scene.time.now;
      if (now - this.lastAttack > this.attackCooldown) {
        this.lastAttack = now;
        this.performAttack();
      }
    }
  }

  performAttack() {
    // Placeholder attack feedback
    this.scene.tweens.add({
      targets: this.sprite,
      scale: 1.1,
      duration: 80,
      yoyo: true
    });
  }
}
