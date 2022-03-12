
import Inventory from './inventory.js';

export function create() {
    this.matter.world.setBounds();
    let map = this.make.tilemap({ key: this.mapName });
    let tileset = map.addTilesetImage('simple_tile', 'tiles');
    this.platforms = map.createLayer('Platforms', tileset);
    this.platforms.setCollisionByProperty({collide:true});
    map.setCollisionBetween(1, 50);            
    this.matter.world.convertTilemapLayer(this.platforms);

    if(this.createInventory) {
        this.inventory = new Inventory(
            this.boxNum, this.tlNum, this.trNum,  
            this.add.image(220, 60, 'box'), 
            this.add.image(300, 60, 'triangleLeft'),
            this.add.image(380, 60, 'triangleRight'),
            this.add.text(270, 10, 'Inventory:', { fontFamily: 'Arial' }),
            this.add.text(240, 80),
            this.add.text(320, 80),
            this.add.text(400, 80)
        );
    }
        
    let Bodies = Phaser.Physics.Matter.Matter.Bodies,
        circle = Bodies.circle(0, 0, 20);

    this.groupSensor.push(Bodies.rectangle(13, -10, 20, 5, { isSensor: true, label: 'sensorUpRight' }));
    this.groupSensor.push(Bodies.rectangle(20, 15, 20, 5, { isSensor: true, label: 'sensorRight' }));
    this.groupSensor.push(Bodies.rectangle(20, 7, 5, 5, { isSensor: true, label: 'sensorCheckIsHole' }));
    this.groupSensor.push(Bodies.rectangle(15, 40, 20, 5, { isSensor: true, label: 'sensorBottomRight' }));
    this.groupSensor.push(Bodies.circle(0, 22, 2, { isSensor: true, label: 'sensorBottom' }));
    this.groupSensor.push(Bodies.rectangle(-20, 7, 20, 18, { isSensor: true, label: 'sensorLeft' }));
    this.groupSensor.push(Bodies.rectangle(-20, 30, 20, 5, { isSensor: true, label: 'sensorBottomLeft' }));

    let compoundBody = Phaser.Physics.Matter.Matter.Body.create({
        parts: [ circle, ...this.groupSensor ],
        render: { sprite: { xOffset: .5, yOffset: .5 } },
        inertia: Infinity
    });
    this.ball = this.matter.add.image(0, 0, 'ball');
    this.ball.setExistingBody(compoundBody);
    this.ball.setPosition(this.ballPositionX, this.ballPositionY);
    this.ball.setInteractive();
    this.ball.on('clicked', () => { 
        if(!this.startGame) {
            this.startGame = true;
        } 
    }, this);
    
    this.input.on('gameobjectup', (pointer, gameObject) => {
        gameObject.emit('clicked', gameObject);
    }, this);        
        
    let moveToFinish = (event) => {
        this.moveLeftDown = false;
        this.moveLeft = false;
        let pairs = event.pairs;

        for(let i = 0; i < pairs.length; i++) {
            let bodyA = pairs[i].bodyA;
            let bodyB = pairs[i].bodyB;
            let sensor;
            if(bodyB.isSensor) {
                sensor = bodyB;
                let typeTile = bodyA.gameObject.tile.properties.typeTile;

                if(sensor.label === 'sensorBottom' && typeTile === 'box') {
                    this.sensorBottomIntValue = 3;
                } 
                if(sensor.label === 'sensorBottomRight' && typeTile === 'box') {
                    this.sensorRightBottomIntValue = 3;
                } 
                if(sensor.label === 'sensorBottomRight' && typeTile === 'triangleLeft') {
                    this.sensorRightIntValue = 1;
                }

                //moveRight
                if(sensor.label === 'sensorBottom' && typeTile === 'box') {
                    this.sensorBottomIntValue = 3;
                }
                if(sensor.label === 'sensorRight' && typeTile === 'triangleRight') {
                    this.sensorRightIntValue = 2;
                }
                if(sensor.label === 'sensorRight' && typeTile === 'triangleLeft') {
                    this.sensorRightIntValue = 1;
                }
                if(sensor.label === 'sensorBottomRight' && typeTile === 'box') {
                    this.sensorRightBottomIntValue = 3;
                } 
                if(sensor.label === 'sensorBottomRight' && typeTile === 'triangleRight') {
                    this.sensorRightBottomIntValue = 2;
                } 
                if(sensor.label === 'sensorBottomRight' && typeTile === 'triangleLeft') {
                    this.sensorRightBottomIntValue = 1;
                }

                //stopMove
                if(sensor.label === 'sensorBottom' && typeTile === 'box') {
                    this.sensorBottomIntValue = 3;
                }                        
                if(sensor.label === 'sensorUpRight' && typeTile === 'box') {
                    this.sensorRightUpIntValue = 3;
                } else if(sensor.label === 'sensorUpRight' && typeTile === 'triangleLeft') {
                    this.sensorRightUpIntValue = 1;
                }
                if(sensor.label === 'sensorRight' && typeTile === 'box') {
                    this.sensorRightIntValue = 3;
                }
                if(sensor.label === 'sensorBottomRight' && typeTile === 'box') {
                    this.sensorRightBottomIntValue = 3;
                } 
                if(sensor.label === 'sensorLeft' && typeTile === 'triangleLeft') {
                    this.sensorLeftIntValue = 1;                            
                } 
                if(this.sensorLeftIntValue === 1) {
                    if(sensor.label === 'sensorCheckIsHole' && typeTile === 'triangleRight') {
                        this.sensorCheckIsHole = true;                            
                    }
                }
                if(sensor.label === 'sensorRight' && typeTile === 'triangleRight') {
                    this.sensorRightIntValue = 2;
                }

                //levelComplete
                if(sensor.label === 'sensorUpRight' && typeTile === 'finishFlag') {
                    this.levelComplete = true;
                }

            } else if(bodyA.isSensor) {
                sensor = bodyA;
                let typeTile = bodyB.gameObject.tile.properties.typeTile;

                //moveRightDown
                if(sensor.label === 'sensorBottom' && typeTile === 'box') {
                    this.sensorBottomIntValue = 3;
                } 
                if(sensor.label === 'sensorBottomRight' && typeTile === 'box') {
                    this.sensorRightBottomIntValue = 3;
                } 
                if(sensor.label === 'sensorBottomRight' && typeTile === 'triangleLeft') {
                    this.sensorRightIntValue = 1;
                }

                //moveRight
                if(sensor.label === 'sensorBottom' && typeTile === 'box') {
                    this.sensorBottomIntValue = 3;
                }
                if(sensor.label === 'sensorRight' && typeTile === 'triangleRight') {
                    this.sensorRightIntValue = 2;
                }
                if(sensor.label === 'sensorRight' && typeTile === 'triangleLeft') {
                    this.sensorRightIntValue = 1;
                }
                if(sensor.label === 'sensorBottomRight' && typeTile === 'box') {
                    this.sensorRightBottomIntValue = 3;
                } 
                if(sensor.label === 'sensorBottomRight' && typeTile === 'triangleRight') {
                    this.sensorRightBottomIntValue = 2;
                } 
                if(sensor.label === 'sensorBottomRight' && typeTile === 'triangleLeft') {
                    this.sensorRightBottomIntValue = 1;
                } 

                //stopMove
                if(sensor.label === 'sensorBottom' && typeTile === 'box') {
                    this.sensorBottomIntValue = 3;
                }                        
                if(sensor.label === 'sensorUpRight' && typeTile === 'box') {
                    this.sensorRightUpIntValue = 3;
                } else if(sensor.label === 'sensorUpRight' && typeTile === 'triangleLeft') {
                    this.sensorRightUpIntValue = 1;
                }
                if(sensor.label === 'sensorRight' && typeTile === 'box') {
                    this.sensorRightIntValue = 3;
                }
                if(sensor.label === 'sensorBottomRight' && typeTile === 'box') {
                    this.sensorRightBottomIntValue = 3;
                } 
                if(sensor.label === 'sensorLeft' && typeTile === 'triangleLeft') {
                    this.sensorLeftIntValue = 1;
                    
                } 
                if(this.sensorLeftIntValue === 1) {
                    if(sensor.label === 'sensorCheckIsHole' && typeTile === 'triangleRight') {
                        this.sensorCheckIsHole = true;                            
                    }
                }
                if(sensor.label === 'sensorRight' && typeTile === 'triangleRight') {
                    this.sensorRightIntValue = 2;
                }

                //levelComplete
                if(sensor.label === 'sensorUpRight' && typeTile === 'finishFlag') {
                    this.levelComplete = true;
                }
            }        
        } 

        let resultMoveRightDown = this.sensorBottomIntValue + this.sensorRightBottomIntValue;
        let resultMoveRight = this.sensorBottomIntValue + this.sensorRightIntValue + this.sensorRightBottomIntValue;

        this.isHole = ((this.sensorLeftIntValue + this.sensorRightIntValue === 3) && this.sensorBottomIntValue === 0 && this.sensorCheckIsHole === true) ? true : false;

        let intChangeMoveDirection = this.sensorBottomIntValue + this.sensorRightIntValue + this.sensorRightBottomIntValue + this.sensorRightUpIntValue;                
        let intChangeMoveDirectionAllRight = this.sensorRightIntValue + this.sensorRightBottomIntValue + this.sensorRightUpIntValue;
        
        this.moveRightDown = (resultMoveRightDown === 6 || resultMoveRightDown === 4) ? true : false;

        if(resultMoveRight >= 2 || resultMoveRight <= 8) {
            if(this.moveRightDown === true) {
                this.moveRightDown = false;
                this.moveRight = true;
            }
            else {
                this.moveRightDown = false;
                this.moveRight = true;
            }
        }
        else {
            this.moveRightDown = true;
            this.moveRight = false;
        }

        if (intChangeMoveDirection === 0 || 
            intChangeMoveDirection === 7 || 
            intChangeMoveDirectionAllRight === 9 || 
            intChangeMoveDirection === 12 || 
            this.isHole === true) {

            this.ballMoveToFinish = false;
        }
        if(this.levelComplete) {
            this.scene.start(this.levelNext);
        }
    }

    let moveToStart = (event) => {
        this.moveRightDown = false;
        this.moveRight = false;
        let pairs = event.pairs;

        for(let i = 0; i < pairs.length; i++) {
            let bodyA = pairs[i].bodyA;
            let bodyB = pairs[i].bodyB;
            let sensor;

            if(bodyB.isSensor) {
                sensor = bodyB;
                let typeTile = bodyA.gameObject.tile.properties.typeTile       
                
                //moveLeftDown
                if(sensor.label === 'sensorBottom' && typeTile === 'box') {
                    this.sensorBottomIntValue = 3;
                } 
                if(sensor.label === 'sensorBottomLeft' && typeTile === 'box') {
                    this.sensorLeftBottomIntValue = 3;
                } 
                if(sensor.label === 'sensorBottomLeft' && typeTile === 'triangleRight') {
                    this.sensorLeftIntValue = 2;
                }

                //moveLeft
                if(sensor.label === 'sensorBottom' && typeTile === 'box') {
                    this.sensorBottomIntValue = 3;
                }
                if(sensor.label === 'sensorLeft' && typeTile === 'triangleLeft') {
                    this.sensorLeftIntValue = 1;
                }
                if(sensor.label === 'sensorBottomLeft' && typeTile === 'triangleLeft') {
                    this.sensorLeftBottomIntValue = 1;
                } 
                if(sensor.label === 'sensorBottomLeft' && typeTile === 'box') {
                    this.sensorLeftBottomIntValue = 3;
                } 

                //stopMove
                if(sensor.label === 'sensorBottom' && typeTile === 'box') {
                    this.sensorBottomIntValue = 3;
                }
                if(sensor.label === 'sensorLeft' && typeTile === 'box') {
                    this.sensorLeftIntValue = 3;
                }
                if(sensor.label === 'sensorBottomLeft' && typeTile === 'box') {
                    this.sensorLeftBottomIntValue = 3;
                }                         

                //levelReload
                if(sensor.label === 'sensorLeft' && typeTile === 'startFlag') {
                    this.levelReload = true;
                }
                
            } else if(bodyA.isSensor) {
                sensor = bodyA;
                let typeTile = bodyB.gameObject.tile.properties.typeTile       
                
                //moveLeftDown
                if(sensor.label === 'sensorBottom' && typeTile === 'box') {
                    this.sensorBottomIntValue = 3;
                } 
                if(sensor.label === 'sensorBottomLeft' && typeTile === 'box') {
                    this.sensorLeftBottomIntValue = 3;
                } 
                if(sensor.label === 'sensorBottomLeft' && typeTile === 'triangleRight') {
                    this.sensorLeftIntValue = 2;
                }

                //moveLeft
                if(sensor.label === 'sensorBottom' && typeTile === 'box') {
                    this.sensorBottomIntValue = 3;
                }
                if(sensor.label === 'sensorLeft' && typeTile === 'triangleLeft') {
                    this.sensorLeftIntValue = 1;
                }
                if(sensor.label === 'sensorBottomLeft' && typeTile === 'triangleLeft') {
                    this.sensorLeftBottomIntValue = 1;
                } 
                if(sensor.label === 'sensorBottomLeft' && typeTile === 'box') {
                    this.sensorLeftBottomIntValue = 3;
                } 

                //stopMove
                if(sensor.label === 'sensorBottom' && typeTile === 'box') {
                    this.sensorBottomIntValue = 3;
                }
                if(sensor.label === 'sensorLeft' && typeTile === 'box') {
                    this.sensorLeftIntValue = 3;
                }
                if(sensor.label === 'sensorBottomLeft' && typeTile === 'box') {
                    this.sensorLeftBottomIntValue = 3;
                }                         

                //levelReload
                if(sensor.label === 'sensorLeft' && typeTile === 'startFlag') {
                    this.levelReload = true;
                }                        
            }
        }

        let resultMoveLeftDown = this.sensorBottomIntValue + this.sensorLeftBottomIntValue;
        let resultMoveLeft = this.sensorBottomIntValue + this.sensorLeftIntValue + this.sensorLeftBottomIntValue;

        let intChangeMoveDirection = this.sensorBottomIntValue + this.sensorLeftIntValue + this.sensorLeftBottomIntValue;

        this.moveLeftDown = (resultMoveLeftDown === 4 || resultMoveLeftDown === 5) ? true : false;

        if (resultMoveLeft === 1 || resultMoveLeft === 2 || 
            resultMoveLeft === 3 || resultMoveLeft === 4 || 
            resultMoveLeft === 6 || resultMoveLeftDown === 6 || 
            resultMoveLeft === 7 || resultMoveLeft === 8) {
                
            if(this.moveLeftDown === true) {
                this.moveLeftDown = false;
                this.moveLeft = true;
            }
            else {
                this.moveLeftDown = false;
                this.moveLeft = true;
            }
        }
        else {
            this.moveLeftDown = true;
            this.moveLeft = false;
        }                

        if(this.levelReload) {
            this.matter.world.off('collisionactive', collisionactive);
            this.matter.world.off('collisionend', collisionend);
            this.scene.restart();
        }
    }

    let collisionactive = (event) => {
        if(this.startGame) {
            if(this.ballMoveToFinish) {
                moveToFinish(event)
            } else {
                moveToStart(event)
            }
        } else {
            if(this.inventory !== undefined && this.inventory !== null) {
                const tile = this.inventory.chooseTile.getTile();
                switch(tile){
                    case 'box': {
                        if(this.inventory.boxNumIsMoreNull()) {
                            this.selectTilesFromInventory = this.platforms.putTileAtWorldXY(this.inventory.chooseTile.getTileNumber(), 0, 0);        
                        }                    
                    } break;
                    case 'triangleLeft': {
                        if(this.inventory.triangleLeftNumIsMoreNull()) {
                            this.selectTilesFromInventory = this.platforms.putTileAtWorldXY(this.inventory.chooseTile.getTileNumber(), 0, 0);
                        }
                    } break;
                    case 'triangleRight': {
                        if(this.inventory.triangleRightNumIsMoreNull()) {
                            this.selectTilesFromInventory = this.platforms.putTileAtWorldXY(this.inventory.chooseTile.getTileNumber(), 0, 0);
                        }
                    } break;
                }
            }
        }
    }

    let collisionend = (event) => {
        let pairs = event.pairs;

        for(let i = 0; i < pairs.length; i++) {
            let bodyA = pairs[i].bodyA;
            let bodyB = pairs[i].bodyB;
            let sensor;

            if(bodyB.isSensor) {
                sensor = bodyB;
                let typeTile = (bodyA.gameObject !== undefined && bodyA.gameObject !== null && bodyA.gameObject.hasOwnProperty("tile")) ? bodyA.gameObject.tile.properties.typeTile : false;

                //stop
                if (sensor.label === 'sensorUpRight' && (typeTile === 'box' || typeTile === 'triangleLeft' || typeTile === 'triangleRight')) {
                    this.sensorRightUpIntValue = 0;
                } 
                else {
                    this.sensorRightUpIntValue = 0;
                }

                if (sensor.label === 'sensorBottom' && (typeTile === 'box' || typeTile === 'triangleLeft' || typeTile === 'triangleRight')) {
                    this.sensorBottomIntValue = 0;
                } 
                else {
                    this.sensorBottomIntValue = 0;
                }
                
                if (sensor.label === 'sensorBottomRight' && (typeTile === 'box' || typeTile === 'triangleLeft' || typeTile === 'triangleRight')) {
                    this.sensorRightBottomIntValue = 0;
                } 
                else {
                    this.sensorRightBottomIntValue = 0;
                }

                if (sensor.label === 'sensorRight' && (typeTile === 'box' || typeTile === 'triangleLeft' || typeTile === 'triangleRight')) {
                    this.sensorRightIntValue = 0;
                } 
                else {
                    this.sensorRightIntValue = 0;
                }

                if (sensor.label === 'sensorBottomLeft' && (typeTile === 'box' || typeTile === 'triangleLeft' || typeTile === 'triangleRight')) {
                    this.sensorLeftBottomIntValue = 0;
                } 
                else {
                    this.sensorLeftBottomIntValue = 0;
                }

                if (sensor.label === 'sensorLeft' && (typeTile === 'box' || typeTile === 'triangleLeft' || typeTile === 'triangleRight')) {
                    this.sensorLeftIntValue = 0;
                } 
                else {
                    this.sensorLeftIntValue = 0;
                }

                if(sensor.label === 'sensorCheckIsHole' && (typeTile === 'box' || typeTile === 'triangleLeft' || typeTile === 'triangleRight')) {
                    this.sensorCheckIsHole = false;                            
                }
                
                if(sensor.label === 'sensorLeft' && typeTile === 'startFlag') {
                    this.levelReload = false;
                }

                else {
                    this.sensorCheckIsHole = false;
                }
            } else if(bodyA.isSensor) {
                sensor = bodyA;
                let typeTile = (bodyB.gameObject !== undefined && bodyB.gameObject !== null && bodyB.gameObject.hasOwnProperty("tile")) ? bodyB.gameObject.tile.properties.typeTile : false;                        

                //stop
                if (sensor.label === 'sensorUpRight' && (typeTile === 'box' || typeTile === 'triangleLeft' || typeTile === 'triangleRight')) {
                    this.sensorRightUpIntValue = 0;
                } 
                else {
                    this.sensorRightUpIntValue = 0;
                }

                if (sensor.label === 'sensorBottom' && (typeTile === 'box' || typeTile === 'triangleLeft' || typeTile === 'triangleRight')) {
                    this.sensorBottomIntValue = 0;
                } 
                else {
                    this.sensorBottomIntValue = 0;
                }
                
                if (sensor.label === 'sensorBottomRight' && (typeTile === 'box' || typeTile === 'triangleLeft' || typeTile === 'triangleRight')) {
                    this.sensorRightBottomIntValue = 0;
                } 
                else {
                    this.sensorRightBottomIntValue = 0;
                }

                if (sensor.label === 'sensorRight' && (typeTile === 'box' || typeTile === 'triangleLeft' || typeTile === 'triangleRight')) {
                    this.sensorRightIntValue = 0;
                } 
                else {
                    this.sensorRightIntValue = 0;
                }

                if (sensor.label === 'sensorBottomLeft' && (typeTile === 'box' || typeTile === 'triangleLeft' || typeTile === 'triangleRight')) {
                    this.sensorLeftBottomIntValue = 0;
                } 
                else {
                    this.sensorLeftBottomIntValue = 0;
                }

                if (sensor.label === 'sensorLeft' && (typeTile === 'box' || typeTile === 'triangleLeft' || typeTile === 'triangleRight')) {
                    this.sensorLeftIntValue = 0;
                } 
                else {
                    this.sensorLeftIntValue = 0;
                }

                if(sensor.label === 'sensorLeft' && typeTile === 'startFlag') {
                    this.levelReload = false;
                }

                if(sensor.label === 'sensorCheckIsHole' && (typeTile === 'box' || typeTile === 'triangleLeft' || typeTile === 'triangleRight')) {
                    this.sensorCheckIsHole = false;                            
                }
                else {
                    this.sensorCheckIsHole = false;
                }
            }
        }            
        this.moveRightDown = false;
        this.moveRight = false;
        this.moveLeftDown = false;
        this.moveLeft = false;
        this.sensorCheckIsHole = false;
    }

    this.matter.world.on('collisionactive', collisionactive);

    this.matter.world.on('collisionend', collisionend);

    const cursors = this.input.keyboard.createCursorKeys();
    const controlConfig = {
        camera: this.cameras.main,
        left: cursors.left,
        right: cursors.right,
        up: cursors.up,
        down: cursors.down,
        speed: 0.5
    };

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
}