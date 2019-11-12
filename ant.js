class Ant {

    constructor(color, buff) {
        this.x =  floor(random(windowWidth));
        this.y = floor(random(windowHeight));
        this.xspeed = Math.random() * (Math.round(Math.random()) * 2 -1);
        this.yspeed = Math.random() * (Math.round(Math.random()) * 2 -1);
        this.color = color;
        this.size = 12;
        this.ferimoneBuffer = buff; // measured by the radius in pixels
        this.redAntCount = 0;
        this.blueAntCount = 0;
        this.greenAntCount = 0;
    }

    update() {
        if (this.x >= (width - this.size / 2) || this.x <= this.size / 2) {
            this.xspeed = -this.xspeed;
        }
        if (this.y >= (height - this.size / 2) || this.y <= this.size / 2) {
            this.yspeed = -this.yspeed;
        }
        this.x += this.xspeed;
        this.y += this.yspeed;
    }

    show() {
        switch(this.color) {
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
        ellipse(this.x, this.y, this.size, this.size-this.size / 1.8);
    }

    showBuffer() {
        noStroke();
        switch(this.color) {
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
        let f = parseInt(this.ferimoneBuffer);
        ellipse(this.x, this.y, f, f - f / 2);
    }

    // checks counts of ants seen by each ant and decides whether the ant should change jobs
    // or remain the same color
    checkChangeJob(ants) {
        for (const a of ants) {
            a.color = weighDataCollected(a);
        }
    }

    weightDataCollected(a, alg) {
        switch (alg) {
            case "basic":
                console.log("Moving from most popular color to least popular");
                return this.basicDecisionAlgorithm(a);
            case "threshold":
                console.log("Only change color when threshold reached");
                return this.thresholdAlgorithm(a);
            case "none":
                console.log("Random selection of color");
                return this.randomColorAlgorithm();
        }
    }

    // checks list of other ants to see if it overlaps any of their buffers
    // - if it does, check color of other ant and add some ammount to this.*antcount 
    //   for that color
    countNearbyAnts(ants) {
        for (const a of ants) {
            if (this.x + (this.size / 2) >= a.x - a.ferimoneBuffer / 2 && this.y >= a.y - a.ferimoneBuffer / 2 &&
                this.x <= a.ferimoneBuffer / 2 && this.y <= a.y + a.ferimoneBuffer / 2) {
                   switch(a.color) {
                       case "b":
                           this.blueAntCount += .1;
                           break;
                        case "g":
                            this.greenAntCount += .1;
                            break;
                        case "r":
                            this.redAntCount += .1;
                            break
                   } 
                }
        }
    }

    // if the ants color is the most seen by the ant it changes to the least seen color,
    // otherwise it stays the same color
    basicDecisionAlgorithm(a) {
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