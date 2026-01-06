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

    this.sprite.setScale(0.4);
    this.sprite.setDepth(9);
  }

  update(player: Phaser.Physics.Arcade.Sprite) {
    const dx = player.x - this.sprite.x;
    const dy = player.y - this.sprite.y;
    const len = Math.sqrt(dx * dx + dy * dy) || 1;

    this.sprite.setVelocity(
      (dx / len) * this.speed,
      (dy / len) * this.speed
    );
  }

  takeDamage(amount: number) {
    this.hp -= amount;

    // Hit flash
    this.scene.tweens.add({
      targets: this.sprite,
      alpha: 0.5,
      duration: 50,
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
