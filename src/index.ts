import './css/main.css';
import {Game} from './ts/PaintApp';
addEventListener('load', () => {
    const game = new Game();
    game.start();
});