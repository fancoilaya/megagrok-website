import * as Phaser from "phaser";
import Enemy from "./Enemy";

export default class Fudling extends Enemy {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    onDeath?: (points: number) => void
  ) {
    super(scene, x, y, onDeath);

    // === TIER 1 FAST RUSHER ===
    this.maxHp = 16;
    this.hp = 16;
    this.defense = 0;
    this.speed = 220;
    this.contactDamage = 4;
    this.killPoints = 110;

    this.sprite.setTexture("fudling");
    this.sprite.setScale(0.168);
    this.sprite.setOrigin(0.5, 0.6);
  }

  update(player: Phaser.Physics.Arcade.Sprite) {
    const dx = player.x - this.sprite.x;
    const dy = player.y - this.sprite.y;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;

    this.sprite.setVelocity(
      (dx / dist) * this.speed,
      (dy / dist) * this.speed
    );

    if (dist < 26) {
      (player as any).getData?.("ref")?.takeDamage(this.contactDamage);
    }

    this.sprite.setDepth(this.sprite.y);
    this.hpBarBg.setPosition(this.sprite.x, this.sprite.y - 20);
    this.hpBar.setPosition(this.sprite.x, this.sprite.y - 20);
  }
}
