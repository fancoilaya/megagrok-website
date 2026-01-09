import Phaser from "phaser";

const MAX_SPEED = 220;
const ACCELERATION = 1200;
const DRAG = 1600;

export default class Player extends Phaser.Physics.Arcade.Sprite {
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  speed: number;
  health: number;
  lastAttack: number;
  attackCooldown: number;
  facing: "up" | "down" | "left" | "right" = "down";

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "grok-player");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);

    this.cursors = scene.input.keyboard.createCursorKeys();
    this.speed = MAX_SPEED;
    this.health = 100;

    this.lastAttack = 0;
    this.attackCooldown = 400;
  }

  update(time: number) {
    const body = this.body as Phaser.Physics.Arcade.Body;

    let inputX = 0;
    let inputY = 0;

    if (this.cursors.left?.isDown) inputX -= 1;
    if (this.cursors.right?.isDown) inputX += 1;
    if (this.cursors.up?.isDown) inputY -= 1;
    if (this.cursors.down?.isDown) inputY += 1;

    // Normalize diagonal movement
    if (inputX !== 0 && inputY !== 0) {
      inputX *= Math.SQRT1_2;
      inputY *= Math.SQRT1_2;
    }

    const targetVX = inputX * MAX_SPEED;
    const targetVY = inputY * MAX_SPEED;

    const delta = this.scene.game.loop.delta / 1000;

    // Smooth acceleration toward target velocity
    body.velocity.x = Phaser.Math.Linear(
      body.velocity.x,
      targetVX,
      ACCELERATION * delta
    );

    body.velocity.y = Phaser.Math.Linear(
      body.velocity.y,
      targetVY,
      ACCELERATION * delta
    );

    // Apply drag when no input
    if (inputX === 0) {
      body.velocity.x = Phaser.Math.Linear(
        body.velocity.x,
        0,
        DRAG * delta
      );
    }

    if (inputY === 0) {
      body.velocity.y = Phaser.Math.Linear(
        body.velocity.y,
        0,
        DRAG * delta
      );
    }

    // Update facing direction
    if (Math.abs(body.velocity.x) > Math.abs(body.velocity.y)) {
      if (body.velocity.x > 10) this.facing = "right";
      else if (body.velocity.x < -10) this.facing = "left";
    } else {
      if (body.velocity.y > 10) this.facing = "down";
      else if (body.velocity.y < -10) this.facing = "up";
    }
  }

  takeDamage(amount: number) {
    this.health -= amount;

    this.scene.tweens.add({
      targets: this,
      alpha: 0.5,
      duration: 100,
      yoyo: true,
    });

    if (this.health <= 0) {
      this.emit("dead");
      this.destroy();
    }
  }

  canAttack(time: number): boolean {
    return time > this.lastAttack + this.attackCooldown;
  }

  registerAttack(time: number) {
    this.lastAttack = time;
  }
}
