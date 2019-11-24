class Ant {

    constructor(color, buff) {
        this.x = floor(random(windowWidth));
        this.y = floor(random(windowHeight));
        this.xspeed = Math.random() * (Math.round(Math.random()) * 2 - 1);
        this.yspeed = Math.random() * (Math.round(Math.random()) * 2 - 1);
        this.color = color;
        this.size = 12;
        this.ferimoneBuffer = buff;
        this.fBuffInt = parseInt(this.ferimoneBuffer);
        this.redAntCount = 0;
        this.blueAntCount = 0;
        this.greenAntCount = 0;
        this.otherAnts = [];
        this.pBias = "";
        this.currentEnemy;
        this.attacking = false;
    }

    update() {
        if (this.attacking) {
            this.x += random(-1, 1);
            this.y += random(-1, 1);
        } else {
            if (this.x >= (width - this.size / 2) || this.x <= this.size / 2) {
                this.xspeed = -this.xspeed;
            }
            if (this.y >= (height - this.size / 2) || this.y <= this.size / 2) {
                this.yspeed = -this.yspeed;
            }
            this.x += this.xspeed + random(-1, 1);
            this.y += this.yspeed + random(-1, 1);
        }
        if (!enemies.includes(this.currentEnemy)) {
            this.attacking = false;
        }
    }

    show() {
        switch (this.color) {
            case "g":
                fill(color(0, 255, 0));
                break;
            case "b":
                fill(color(0, 0, 255));
                break;
            case "r":
                fill(color(255, 0, 0));
                break;
        }
        ellipse(this.x, this.y, this.size, this.size - this.size / 1.8);
    }

    showBuffer() {
        noStroke();
        switch (this.color) {
            case "g":
                fill(color(0, 255, 0, 8));
                break;
            case "b":
                fill(color(0, 0, 255, 18));
                break;
            case "r":
                fill(color(255, 0, 0, 9));
                break;
        }
        ellipse(this.x, this.y, this.fBuffInt, this.fBuffInt - this.fBuffInt / 2);
    }

    alert(enemy) {
        if (this.chooseWhetherToAttack()) {
            this.currentEnemy = enemy;
            this.attacking = true;
            this.color = "r";
            if (this.decideIfDie()) {
                allAnts.splice(allAnts.indexOf(this), 1);
                deathCount++;
            }
            return true;
        } else {
            if (this.decideIfDie()) {
                allAnts.splice(allAnts.indexOf(this), 1);
                deathCount++;
            }
            return false;
        }
    }

    chooseWhetherToAttack() {
        if (politicalBiasIncluded) {
            if (this.pBias === "lib") {
                return true;
            } else {
                let flipCoin = floor(random() * 2 + 1);
                if (flipCoin == 2) {
                    return true;
                } else {
                    return false;
                }
            }
        } else return true;
    }

    decideIfDie() {
        let flipCoin = floor(random() * 11 + 1);
        if (flipCoin < 3) {
            return true;
        } else {
            return false;
        }
    }

    weightDataCollected(a, alg) {
        switch (alg) {
            case "basic":
                console.log("Only checking ferimones detected at time of change");
                return this.basicDecisionAlgorithm(a);
            case "threshold":
                if (politicalBiasIncluded) {
                    console.log("change color on threshold based on political bias")
                } else {
                    console.log("Only change if threshold passed - no politcal bias");
                }
                return this.thresholdAlgorithm(a);
            case "none":
                console.log("Random selection of color");
                return this.randomColorAlgorithm();
            case "memory":
                console.log("Mem algorithm being used: Moving from most popular color to least popular");
                return this.memoryDecisionAlgorithm(a);
        }
    }

    // checks list of other ants to see if it overlaps any of their buffers
    // - if it does, check color of other ant and add some ammount to this.*antcount 
    //   for that color
    countNearbyAnts() {
        for (const a of this.otherAnts) {
            if (((this.x >= a.x - a.fBuffInt / 2) &&
                    (this.x <= a.x + a.fBuffInt / 2)) &&
                ((this.y >= a.y - (a.fBuffInt - a.fBuffInt / 2) / 2) &&
                    (this.y <= a.y + (a.fBuffInt - a.fBuffInt / 2) / 2))) {
                switch (a.color) {
                    case "b":
                        this.blueAntCount += .1;
                        break;
                    case "g":
                        this.greenAntCount += .1;
                        break;
                    case "r":
                        this.redAntCount += .1;
                        break;
                }
            }
        }
    }

    // checks what ferimones are currently being detected and changes to the one that is least
    // common
    basicDecisionAlgorithm(a) {
        let thisAnt = a;
        for (const a of this.otherAnts) {
            if (((this.x >= a.x - a.fBuffInt / 2) &&
                    (this.x <= a.x + a.fBuffInt / 2)) &&
                ((this.y >= a.y - (a.fBuffInt - a.fBuffInt / 2) / 2) &&
                    (this.y <= a.y + (a.fBuffInt - a.fBuffInt / 2) / 2))) {
                switch (a.color) {
                    case "b":
                        this.blueAntCount += .1;
                        break;
                    case "g":
                        this.greenAntCount += .1;
                        break;
                    case "r":
                        this.redAntCount += .1;
                        break;
                }
            }
        }
        return this.memoryDecisionAlgorithm(thisAnt);
    }

    // if the ants color is the most seen by the ant it changes to the least seen color,
    // otherwise it stays the same color
    memoryDecisionAlgorithm(a) {
        if (this.blueAntCount < this.redAntCount) {
            if (this.blueAntCount < this.greenAntCount) {
                return "b";
            } else {
                return "g";
            }
        }
        if (this.redAntCount < this.greenAntCount) {
            return "r";
        } else {
            return "g";
        }
    }

    // same as basic algorithm with added threshold: only change if ants own color is the most 
    // seen by that ant AND the other colors seen are less by a certain margin
    thresholdAlgorithm(a) {
        let totalAntsSeen = this.redAntCount + this.greenAntCount + this.blueAntCount;
        let threshold = totalAntsSeen * .02;
        if (politicalBiasIncluded) {
            if (this.pBias === "lib") {
                threshold = 0;
            } else {
                threshold = totalAntsSeen * .05
            }
        }
        let c = this.color;
        switch (c) {
            case "b":
                return this.thresholdBlueChangeCheck(threshold);
            case "r":
                return this.thresholdRedChangeCheck(threshold);
            case "g":
                return this.thresholdGreenChangeCheck(threshold);
        }
    }

    thresholdBlueChangeCheck(threshold) {
        if (this.redAntCount > this.blueAntCount || this.greenAntCount > this.blueAntCount) {
            return "b";
        } else {
            // get here if current color is "b" and its the most seen color
            // check if the difference between nbr seen this color and nbr seen each other color is
            // greater than threshold, if yes, change to that color, if no stay "b"
            if (this.blueAntCount - this.redAntCount > threshold ||
                this.blueAntCount - this.greenAntCount > threshold) {
                return this.redAntCount < this.greenAntCount ? "r" : "g";
            } else {
                return "b";
            }
        }
    }

    thresholdRedChangeCheck(threshold) {
        if (this.blueAntCount > this.redAntCount || this.greenAntCount > this.redAntCount) {
            return "r";
        } else {
            // get here if current color is "r" and its the most seen color
            // check if the difference between nbr seen this color and nbr seen each other color is
            // greater than threshold, if yes, change to that color, if no stay "r"
            if (this.redAntCount - this.blueAntCount > threshold ||
                this.redAntCount - this.greenAntCount > threshold) {
                return this.blueAntCount < this.greenAntCount ? "b" : "g";
            } else {
                return "r";
            }
        }
    }

    thresholdGreenChangeCheck(threshold) {
        if (this.blueAntCount > this.greenAntCount || this.redAntCount > this.greenAntCount) {
            return "g";
        } else {
            // get here if current color is "b" and its the most seen color
            // check if the difference between nbr seen this color and nbr seen each other color is
            // greater than threshold, if yes, change to that color, if no stay "b"
            if (this.greenAntCount - this.redAntCount > threshold ||
                this.greenAntCount - this.blueAntCount > threshold) {
                return this.redAntCount < this.blueAntCount ? "r" : "b";
            } else {
                return "g";
            }
        }
    }

    // ant does not take into account what other ants it has seen, just randomly
    // selects one of the three colors
    randomColorAlgorithm() {
        let randomColor = Math.floor((Math.random() * 3) + 1);
        switch (randomColor) {
            case 1:
                return "b";
            case 2:
                return "g";
            case 3:
                return "r";
        }
    }
}