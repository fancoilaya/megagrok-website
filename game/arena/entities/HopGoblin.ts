import * as Phaser from "phaser";
import Enemy from "./Enemy";

export default class HopGoblin extends Enemy {
  hopCooldown = 900;
  lastHop = 0;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    onDeath?: (points: number) => void
  ) {
    super(scene, x, y, onDeath);

    // === TIER 1 STATS ===
    this.maxHp = 24;
    this.hp = 24;
    this.defense = 0;
    this.speed = 190;
    this.contactDamage = 5;
    this.killPoints = 120;

    // === USE REAL ART ===
    this.sprite.setTexture("hopgoblin");
    this.sprite.setScale(0.22);
    this.sprite.setOrigin(0.5, 0.65); // feet weighted

    // Idle wiggle (life!)
    scene.tweens.add({
      targets: this.sprite,
      angle: { from: -2, to: 2 },
      duration: 800,
      yoyo: true,
      repeat: -1
    });
  }

  update(player: Phaser.Physics.Arcade.Sprite) {
    const now = this.scene.time.now;

    const dx = player.x - this.sprite.x;
    const dy = player.y - this.sprite.y;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;

    const stopDistance = 26;

    if (dist > stopDistance) {
      if (now - this.lastHop > this.hopCooldown) {
        this.lastHop = now;

        const nx = dx / dist;
        const ny = dy / dist;

        // === HOP IMPULSE ===
        this.sprite.setVelocity(
          nx * this.speed * 1.4,
          ny * this.speed * 1.4
        );

        // === HOP ANIMATION ===
        this.scene.tweens.add({
          targets: this.sprite,
          scaleX: 0.26,
          scaleY: 0.18,
          duration: 80,
          yoyo: true
        });
      }
    } else {
      this.sprite.setVelocity(0, 0);

      // Contact damage
      (player as any).getData?.("ref")?.takeDamage(this.contactDamage);
    }

    // === HP BAR & DEPTH ===
    this.hpBarBg.setPosition(this.sprite.x, this.sprite.y - 22);
    this.hpBar.setPosition(this.sprite.x, this.sprite.y - 22);

    this.sprite.setDepth(this.sprite.y);
    this.hpBarBg.setDepth(this.sprite.y + 1);
    this.hpBar.setDepth(this.sprite.y + 2);
  }
}
