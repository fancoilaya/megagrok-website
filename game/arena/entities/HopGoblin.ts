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

    // === VISUAL PLACEHOLDER (REPLACE WITH ART LATER) ===
    this.sprite.setScale(0.32);
    this.sprite.setTint(0x66ff66); // green goblin vibe
  }

  update(player: Phaser.Physics.Arcade.Sprite) {
    const now = this.scene.time.now;

    const dx = player.x - this.sprite.x;
    const dy = player.y - this.sprite.y;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;

    const stopDistance = 26;

    // === HOP BEHAVIOR ===
    if (dist > stopDistance) {
      if (now - this.lastHop > this.hopCooldown) {
        this.lastHop = now;

        const nx = dx / dist;
        const ny = dy / dist;

        // Hop impulse
        this.sprite.setVelocity(
          nx * this.speed * 1.4,
          ny * this.speed * 1.4
        );

        // Hop squash & stretch
        this.scene.tweens.add({
          targets: this.sprite,
          scaleX: 0.36,
          scaleY: 0.28,
          duration: 80,
          yoyo: true
        });
      }
    } else {
      this.sprite.setVelocity(0, 0);

      // Deal contact damage
      (player as any).getData?.("ref")?.takeDamage(this.contactDamage);
    }

    // === HP BAR & DEPTH ===
    this.hpBarBg.setPosition(this.sprite.x, this.sprite.y - 18);
    this.hpBar.setPosition(this.sprite.x, this.sprite.y - 18);

    this.sprite.setDepth(this.sprite.y);
    this.hpBarBg.setDepth(this.sprite.y + 1);
    this.hpBar.setDepth(this.sprite.y + 2);
  }
}
