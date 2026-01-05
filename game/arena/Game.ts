import Phaser from "phaser";
import BootScene from "./scenes/BootScene";
import ArenaScene from "./scenes/ArenaScene";

let game: Phaser.Game | null = null;

export function startArenaGame() {
  if (game) return;

  game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: "arena-game",
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: "#060414",
    physics: {
      default: "arcade",
      arcade: {
        debug: false
      }
    },
    scale: {
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [BootScene, ArenaScene]
  });
}
