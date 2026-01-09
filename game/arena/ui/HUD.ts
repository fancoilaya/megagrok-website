import * as Phaser from "phaser";

export default class HUD {
  private scene: Phaser.Scene;

  private hpText: Phaser.GameObjects.Text;
  private waveText: Phaser.GameObjects.Text;
  private scoreText: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;

    // HP
    this.hpText = scene.add
      .text(16, 96, "HP: 0", {
        fontFamily: "monospace",
        fontSize: "16px",
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 3,
      })
      .setScrollFactor(0)
      .setDepth(10000);

    // Wave
    this.waveText = scene.add
      .text(16, 116, "Wave: 1", {
        fontFamily: "monospace",
        fontSize: "16px",
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 3,
      })
      .setScrollFactor(0)
      .setDepth(10000);

    // Score
    this.scoreText = scene.add
      .text(16, 136, "Score: 0", {
        fontFamily: "monospace",
        fontSize: "16px",
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 3,
      })
      .setScrollFactor(0)
      .setDepth(10000);
  }

  update(hp: number, wave: number, score: number) {
    this.hpText.setText(`HP: ${Math.max(0, hp)}`);
    this.waveText.setText(`Wave: ${wave}`);
    this.scoreText.setText(`Score: ${score}`);
  }

  destroy() {
    this.hpText.destroy();
    this.waveText.destroy();
    this.scoreText.destroy();
  }
}
