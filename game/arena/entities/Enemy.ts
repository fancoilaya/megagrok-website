import * as Phaser from "phaser";

export default class Enemy {
  scene: Phaser.Scene;
  sprite: Phaser.Physics.Arcade.Sprite;

  maxHp = 30;
  hp = 30;
  speed = 120;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene;

    this.sprite = scene.physics.add
      .sprite(x, y, "enemy-basic")
      .setCollideWorldBounds(true);

    this.sprite.setScale(0.35);
    this.sprite.setDepth(this.sprite.y);
  }

  update(player: Phaser.Physics.Arcade.Sprite) {
    const dx = player.x - this.sprite.x;
    const dy = player.y - this.sprite.y;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;

    const stopDistance = 28;

    if (dist > stopDistance) {
      const nx = dx / dist;
      const ny = dy / dist;

      this.sprite.setVelocity(
        nx * this.speed,
        ny * this.speed
      );
    } else {
      this.sprite.setVelocity(0, 0);
    }

    // Y-depth sorting
    this.sprite.setDepth(this.sprite.y);
  }

  takeDamage(amount: number) {
    this.hp -= amount;

    // Hit feedback
    this.scene.tweens.add({
      targets: this.sprite,
      alpha: 0.6,
      duration: 60,
      yoyo: true
    });

    if (this.hp <= 0) {
      this.die();
    }
  }

  die() {
    this.sprite.destroy();
  }
}
