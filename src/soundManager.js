import {Howl, Howler} from "howler";

const sounds = {
  bullet: new Howl({src: ["gun.wav"]})
};

const soundManager = callback => soundToPlay => {
  const sound = sounds[soundToPlay];
  console.assert(sound != null, `Unknown sound: ${name}`);
  sound.on("end", () => callback(soundToPlay));
  sound.play();
};

export default soundManager;
