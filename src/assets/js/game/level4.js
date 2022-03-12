import {create as Create} from './createOfScene.js';
import {update as Update} from './updateOfScene.js';

export default class Level4 extends Phaser.Scene {
    constructor() {
        super({ key: 'Level4' });        
    }    

    init() {
        this.groupSensor = new Array();
        this.SPEED = 1.5;

        this.ballMoveToFinish = true;
        this.levelComplete = false;
        this.levelReload = false;
        this.startGame = false;

        this.moveRightDown = false;
        this.moveRight = false;
        this.moveLeftDown = false;
        this.moveLeft = false;
        this.isHole = false;

        this.resultMoveRightDown = null;
        this.resultMoveRight = null;
        this.resultMoveLeftDown = null;
        this.resultMoveLeft = null;

        this.sensorRightUpIntValue = 0;
        this.sensorRightIntValue = 0;
        this.sensorLeftIntValue = 0;
        this.sensorRightBottomIntValue = 0;
        this.sensorLeftBottomIntValue = 0;
        this.sensorBottomIntValue = 0;
        this.sensorCheckIsHole = 0;

        this.selectTilesFromInventory = null;
        
        this.inventory = null;
        this.platforms = null;
        this.ball = null;
        this.ballPositionX = 60;
        this.ballPositionY = 185;
        this.boxNum = 1; 
        this.tlNum = 2;
        this.trNum = 2; 
        this.createInventory = true;
        this.levelNext = 'Level5';
        this.mapName = 'level4Map';
    }
    
    preload() {
        this.load.image('tiles', './src/assets/tile_map.png');
        this.load.tilemapTiledJSON(this.mapName, './src/assets/tilemaps/level4.json');        
        
        this.load.image('box', './src/assets/box.jpg');
        this.load.image('triangleLeft', './src/assets/triangle_left.png')
        this.load.image('triangleRight', './src/assets/triangle_right.png')
        this.load.image('ball', './src/assets/ball.png');
    };

    create = Create;

    update = Update;
}