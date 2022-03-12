
import Level1 from './level1.js';
import Level2 from './level2.js';
import Level3 from './level3.js';
import Level4 from './level4.js';
import Level5 from './level5.js';
import Level6 from './level6.js';
import Level7 from './level7.js';
import Level8 from './level8.js';
import Level9 from './level9.js';
import Level10 from './level10.js';

const config = {
    type: Phaser.AUTO,
    width: 640,
    height: 320,
    backgroundColor: "#000c1f",
    pixelArt: false,
    //
    scene: [ Level1, Level2, Level3, Level4, Level5, Level6, Level7, Level8, Level9, Level10 ],
    physics: {
        default: 'matter',
        matter: {
            debug: false,
            gravity: {
                y: 0.9  
            },
        }
    }
};

const game = new Phaser.Game(config);


