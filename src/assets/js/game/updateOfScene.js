

export function update() {        
    if(this.selectTilesFromInventory !== null && this.selectTilesFromInventory !== undefined) {
        const worldPoint = this.input.activePointer.positionToCamera(
            this.cameras.main
        );

        const pointerTileXY = this.platforms.worldToTileXY(worldPoint.x, worldPoint.y);
        const snappedWorldPoint = this.platforms.tileToWorldXY(
            pointerTileXY.x,
            pointerTileXY.y
        );

        this.selectTilesFromInventory.pixelX = snappedWorldPoint.x;
        this.selectTilesFromInventory.pixelY = snappedWorldPoint.y;
        
        if (this.input.manager.activePointer.isDown) {
            const tile = this.platforms.putTileAtWorldXY(
                this.inventory.chooseTile.getTileNumber(),
                worldPoint.x,
                worldPoint.y
            );
            tile.setCollision(true);
            tile.properties.typeTile = this.inventory.chooseTile.getTile();
            this.matter.world.convertTilemapLayer(this.platforms);
            this.selectTilesFromInventory = null;
            if(this.inventory !== undefined && this.inventory !== null) {
                switch(this.inventory.chooseTile.getTile()) {
                    case 'box': {                        
                        this.inventory.boxDecrease();
                    } break;
                    case 'triangleLeft': {
                        this.inventory.triangleLeftDecrease();
                    } break;
                    case 'triangleRight': {
                        this.inventory.triangleRightDecrease();
                    } break;
                }
                this.inventory.updateCalc();
                this.inventory.chooseTile.resetData();               
            }
            
        }
    }

    if(this.ball !== null && this.ball !== undefined) {
        if(!this.levelComplete) {
            if(this.moveRightDown) {
                this.ball.setVelocity(this.SPEED, this.SPEED);
            } else if (this.moveRight) {            
                this.ball.setVelocityX(this.SPEED);                
            } 
            if(this.moveLeftDown) {
                this.ball.setVelocity(-this.SPEED, this.SPEED);
            } else if (this.moveLeft) {            
                this.ball.setVelocityX(-this.SPEED);
            } 
        } else {
            this.ball.setVelocity(0, 0);
        }
    }
    
}