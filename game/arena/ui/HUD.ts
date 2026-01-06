import * as Phaser from "phaser";

export default class HUD {
  scene: Phaser.Scene;

  hpText: Phaser.GameObjects.Text;
  waveText: Phaser.GameObjects.Text;
  pointsText: Phaser.GameObjects.Text;
  timerText: Phaser.GameObjects.Text;

  startTime = 0;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;

    const style: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: "monospace",
      fontSize: "14px",
      color: "#ffffff",
      stroke: "#000000",
      strokeThickness: 2
    };

    this.hpText = scene.add.text(16, 12, "HP: 100", style).setScrollFactor(0);
    this.waveText = scene.add.text(150, 12, "Wave: 1", style).setScrollFactor(0);
    this.pointsText = scene.add.text(260, 12, "Points: 0", style).setScrollFactor(0);
    this.timerText = scene.add.text(400, 12, "Time: 00:00", style).setScrollFactor(0);

    this.hpText.setDepth(10000);
    this.waveText.setDepth(10000);
    this.pointsText.setDepth(10000);
    this.timerText.setDepth(10000);

    this.startTime = scene.time.now;
  }

  update(currentHp: number, wave: number, points: number) {
    this.hpText.setText(`HP: ${currentHp}`);
    this.waveText.setText(`Wave: ${wave}`);
    this.pointsText.setText(`Points: ${points}`);

    const elapsed = Math.floor((this.scene.time.now - this.startTime) / 1000);
    const minutes = Math.floor(elapsed / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (elapsed % 60).toString().padStart(2, "0");

    this.timerText.setText(`Time: ${minutes}:${seconds}`);
  }

  resetTimer() {
    this.startTime = this.scene.time.now;
  }
}
