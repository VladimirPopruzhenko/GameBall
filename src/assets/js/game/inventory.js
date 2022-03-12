export default class Inventory {
    constructor(boxCalc, triangleLeftCalc, triangleRightCalc, boxI, trLI, trRI, titleI, ...tileTextNumArr) {
        this.boxCalc = boxCalc;
        this.triangleLeftCalc = triangleLeftCalc;
        this.triangleRightCalc = triangleRightCalc;

        this.chooseTile = {
            tile: '',
            tileNumber: 0,

            getTile() {
                return this.tile;
            },
            getTileNumber() {
                return this.tileNumber;
            },
            resetData() {
                this.tile = '';
                this.tileNumber = 0;
            }
        }

        this.boxI = boxI.setInteractive();
        this.triangleLeftI = trLI.setInteractive();
        this.triangleRightI = trRI.setInteractive(); 

        this.boxI.on('clicked', () => {
            this.chooseTile.tile = 'box';
            this.chooseTile.tileNumber = 6;
        });
        this.triangleLeftI.on('clicked', () => {
            this.chooseTile.tile = 'triangleLeft';
            this.chooseTile.tileNumber = 1;
        });
        this.triangleRightI.on('clicked', () => {
            this.chooseTile.tile = 'triangleRight';
            this.chooseTile.tileNumber = 5;
        });

        this.titleText = titleI;
        this.textCalcBox = tileTextNumArr[0].setText(this.boxCalc);
        this.textCalcTLeft = tileTextNumArr[1].setText(this.triangleLeftCalc);
        this.textCalcTRight = tileTextNumArr[2].setText(this.triangleRightCalc);   
    }            
    boxNumIsMoreNull() {
        return (this.boxCalc > 0) ? true : false;
    }
    triangleLeftNumIsMoreNull() {
        return (this.triangleLeftCalc > 0) ? true : false;
    }
    triangleRightNumIsMoreNull() {
        return (this.triangleRightCalc > 0) ? true : false;
    }

    boxDecrease() {
        if(this.boxCalc > 0) {
            this.boxCalc -= 1;
        }
    }
    triangleLeftDecrease() {
        if(this.triangleLeftCalc > 0) {
            this.triangleLeftCalc -= 1;
        }
    }
    triangleRightDecrease() {
        if(this.triangleRightCalc > 0) {
            this.triangleRightCalc -= 1;
        }
    }

    updateCalc() {
        this.textCalcBox.setText(this.boxCalc);
        this.textCalcTLeft.setText(this.triangleLeftCalc);
        this.textCalcTRight.setText(this.triangleRightCalc);
    }
}
