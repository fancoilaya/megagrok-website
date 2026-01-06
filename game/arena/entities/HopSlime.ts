import * as Phaser from "phaser";
import Enemy from "./Enemy";

export default class HopSlime extends Enemy {
  shootCooldown = 1200;
  lastShot = 0;
  preferredRange = 140;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    onDeath?: (points: number) => void
  ) {
    super(scene, x, y, onDeath);

    // === TIER 1 RANGED STATS ===
    this.maxHp = 20;
    this.hp = 20;
    this.defense = 0;
    this.speed = 90;
    this.contactDamage = 2;
    this.killPoints = 140;

    this.sprite.setTexture("hopslime");
    this.sprite.setScale(0.28);
    this.sprite.setOrigin(0.5, 0.6);
  }

  update(player: Phaser.Physics.Arcade.Sprite) {
    const now = this.scene.time.now;

    const dx = player.x - this.sprite.x;
    const dy = player.y - this.sprite.y;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;

    // === KEEP DISTANCE ===
    if (dist < this.preferredRange) {
      this.sprite.setVelocity(
        -(dx / dist) * this.speed,
        -(dy / dist) * this.speed
      );
    } else {
      this.sprite.setVelocity(0, 0);
    }

    // === SHOOT SLIME ===
    if (dist < 220 && now - this.lastShot > this.shootCooldown) {
      this.lastShot = now;
      this.shootSlime(player.x, player.y);
    }

    this.sprite.setDepth(this.sprite.y);
    this.hpBarBg.setPosition(this.sprite.x, this.sprite.y - 20);
    this.hpBar.setPosition(this.sprite.x, this.sprite.y - 20);
  }

  shootSlime(tx: number, ty: number) {
    const slime = this.scene.add.circle(
      this.sprite.x,
      this.sprite.y,
      6,
      0x66ff66,
      0.9
    );

    slime.setDepth(this.sprite.y + 5);

    const angle = Phaser.Math.Angle.Between(
      this.sprite.x,
      this.sprite.y,
      tx,
      ty
    );

    const speed = 260;

    this.scene.physics.add.existing(slime);
    const body = slime.body as Phaser.Physics.Arcade.Body;

    body.setVelocity(
      Math.cos(angle) * speed,
      Math.sin(angle) * speed
    );

    // === HIT PLAYER ===
    this.scene.physics.add.overlap(
      slime,
      this.scene.children.getByName("player") as any,
      () => {
        (this.scene as any).player?.takeDamage(6);
        slime.destroy();
      }
    );

    // Auto-destroy
    this.scene.time.delayedCall(2500, () => slime.destroy());
  }
}
