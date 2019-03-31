import "./main.css";
import {Elm} from "./Main.elm";
import soundManager from "./soundManager";
import registerServiceWorker from "./registerServiceWorker";

const app = Elm.Main.init({
  node: document.getElementById("root")
});

app.ports.sounds.subscribe(soundManager(app.ports.soundComplete.send));

registerServiceWorker();
