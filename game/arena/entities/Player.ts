import * as Phaser from "phaser";
import EnemyManager from "../systems/EnemyManager";

export default class Player {
  scene: Phaser.Scene;
  sprite: Phaser.Physics.Arcade.Sprite;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  keys: any;

  speed = 260;
  hp = 100;
  maxHp = 100;

  attackCooldown = 420;
  lastAttack = 0;
  attackRange = 58;

  enemyManager: EnemyManager;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    enemyManager: EnemyManager
  ) {
    this.scene = scene;
    this.enemyManager = enemyManager;

    this.sprite = scene.physics.add
      .sprite(x, y, "grok")
      .setCollideWorldBounds(true);

    (this.sprite.body as Phaser.Physics.Arcade.Body).setImmovable(true);

    this.sprite.setScale(0.38);
    this.sprite.setDepth(this.sprite.y);
    this.sprite.setData("ref", this);

    this.cursors = scene.input.keyboard.createCursorKeys();
    this.keys = scene.input.keyboard.addKeys("W,A,S,D,SPACE");
  }

  update(delta: number) {
    const body = this.sprite.body as Phaser.Physics.Arcade.Body;

    let vx = 0;
    let vy = 0;

    if (this.cursors.left.isDown || this.keys.A.isDown) vx = -1;
    if (this.cursors.right.isDown || this.keys.D.isDown) vx = 1;
    if (this.cursors.up.isDown || this.keys.W.isDown) vy = -1;
    if (this.cursors.down.isDown || this.keys.S.isDown) vy = 1;

    body.setVelocity(vx * this.speed, vy * this.speed);

    // === FACING (LEFT / RIGHT) ===
    if (vx !== 0) {
      this.sprite.setFlipX(vx < 0);
    }

    // Depth follows Y
    this.sprite.setDepth(this.sprite.y);

    // === ATTACK ===
    if (Phaser.Input.Keyboard.JustDown(this.keys.SPACE)) {
      this.performAttack();
    }
  }

  performAttack() {
    const now = this.scene.time.now;
    if (now - this.lastAttack < this.attackCooldown) return;
    this.lastAttack = now;

    // Determine attack direction
    let dirX = this.sprite.flipX ? -1 : 1;
    let dirY = 0;

    const attackX = this.sprite.x + dirX * 28;
    const attackY = this.sprite.y;

    // === ENERGY WAVE VISUAL ===
    const wave = this.scene.add.ellipse(
      attackX,
      attackY,
      34,
      18,
      0xff3b3b,
      0.45
    );

    wave.setDepth(this.sprite.y + 1);
    wave.rotation = dirX < 0 ? Math.PI : 0;

    this.scene.tweens.add({
      targets: wave,
      scaleX: 1.6,
      scaleY: 1.2,
      alpha: 0,
      duration: 120,
      onComplete: () => wave.destroy()
    });

    // === PUNCH FEEL (SPRITE SNAP) ===
    this.scene.tweens.add({
      targets: this.sprite,
      x: this.sprite.x + dirX * 6,
      duration: 60,
      yoyo: true
    });

    // === HIT DETECTION ===
    const enemy = this.enemyManager.getClosestEnemy(
      this.sprite.x,
      this.sprite.y,
      this.attackRange
    );

    if (enemy) {
      const dmg = Phaser.Math.Between(8, 14);
      enemy.takeDamage(dmg);

      // Damage number
      const dmgText = this.scene.add.text(
        enemy.sprite.x,
        enemy.sprite.y - 20,
        `-${dmg}`,
        {
          fontSize: "14px",
          color: "#ff4b4b",
          fontFamily: "monospace"
        }
      );

      dmgText.setDepth(enemy.sprite.y + 10);

      this.scene.tweens.add({
        targets: dmgText,
        y: dmgText.y - 18,
        alpha: 0,
        duration: 500,
        onComplete: () => dmgText.destroy()
      });
    }
  }

  takeDamage(amount: number) {
    this.hp = Math.max(0, this.hp - amount);

    // Hit flash
    this.scene.tweens.add({
      targets: this.sprite,
      alpha: 0.7,
      duration: 40,
      yoyo: true
    });
  }
}
