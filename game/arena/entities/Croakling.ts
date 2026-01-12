import * as Phaser from "phaser";

export default class Croakling extends Phaser.Physics.Arcade.Sprite {
  maxHp = 12;
  hp = 12;
  damage = 4;
  speed = 140;

  onDeath?: () => void;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "croakling");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);
  }

  update(player: Phaser.Physics.Arcade.Sprite) {
    if (!player.active) return;

    const angle = Phaser.Math.Angle.Between(
      this.x,
      this.y,
      player.x,
      player.y
    );

    this.scene.physics.velocityFromRotation(
      angle,
      this.speed,
      (this.body as Phaser.Physics.Arcade.Body).velocity
    );
  }

  takeDamage(amount: number) {
    this.hp -= amount;

    if (this.hp <= 0) {
      this.onDeath?.();
      this.destroy();
    }
  }
}
