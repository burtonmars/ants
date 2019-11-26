const windowHeight = 400;
const windowWidth = 700;
const speed = 4;

let greAnt, redAnt, bluAnt;
let clock, antCount, randomizeCheckbox, setAlgorithm, beetle,
	avgEq, libCount, consCount, politicalBiasIncluded, politicalBiasLevel,
	deathCounter;

let redAnts = [];
let bluAnts = [];
let greAnts = [];
let allAnts = [];

let totalAnts = 0;
let numGreAnts = 0;
let numRedAnts = 0;
let numBluAnts = 0;

let buffer = 50;
let decisionTime = 7000;
let counter1 = 0;
let counter2 = 0;
let counter3 = 0;
let avgSpread = 0;
let spreadIterations = 0;
let firstEqReached = false;
let timerStopped = false;
let avgDiff = 0;
let enemies = [];
let deathCount = 0;

function setup() {
	let myCanvas = createCanvas(windowWidth, windowHeight);
	myCanvas.parent('ant-farm');
	myCanvas.mousePressed(addEnemy);
	let input1 = createInput();
	let input2 = createInput();
	let input3 = createInput();

	antCount = createP();
	antCount.parent('color-count');
	showAntCount();

	input1.parent("input1");
	input2.parent("input2");
	input3.parent("input3");

	let intervalIndividualCount = setInterval(checkChangeJob, decisionTime);

	clock = createP();
	clock.parent("eq-timer");
	clock.html("Equilibrium: 0");

	avgSpread = createP();
	avgSpread.parent("avg-spread");
	avgSpread.html("Average Spread: 0");

	deathCounter = createP();
	deathCounter.parent("death-count");
	deathCounter.html("Deaths: 0");

	let simulate = createButton("simulate");
	simulate.parent('simul-button');
	simulate.mousePressed(setNumAntsFromInput);
	simulate.mouseReleased(populateColony);

}

function populateColony() {
	showAntCount();
	randomAlgorithm = document.getElementById("randomize-checkbox").checked;
	thresholdAlgorithm = document.getElementById("threshold-checkbox").checked;
	memoryAlgorithm = document.getElementById("memory-checkbox").checked;
	politicalBiasIncluded = document.getElementById("bias-checkbox").checked;
	politicalBiasLevel = document.getElementById("bias-slider").value;

	if (randomAlgorithm) {
		setAlgorithm = "none";
	} else if (thresholdAlgorithm) {
		setAlgorithm = "threshold";
	} else if (memoryAlgorithm) {
		setAlgorithm = "memory";
	} else {
		setAlgorithm = "basic";
	}
	buffer = document.getElementById("buffer-slider").value;
	timer = setInterval(timeFirstSelfOrganization, 1000);
	bias = document.getElementById("bias-slider").value;

	for (let i = 0; i < this.numGreAnts; i++) {
		greAnt = new Ant("g", buffer);
		greAnts.push(greAnt);
	}
	for (let i = 0; i < this.numRedAnts; i++) {
		redAnt = new Ant("r", buffer);
		redAnts.push(redAnt);
	}
	for (let i = 0; i < this.numBluAnts; i++) {
		bluAnt = new Ant("b", buffer);
		bluAnts.push(bluAnt);
	}

	allAnts = (greAnts.concat(redAnts)).concat(bluAnts);
	addBiasToAnts();
}

function setNumAntsFromInput() {
	this.numGreAnts = document.getElementById('input1').value;
	this.numRedAnts = document.getElementById('input2').value;
	this.numBluAnts = document.getElementById('input3').value;
	this.totalAnts = this.numGreAnts + this.numBluAnts + this.numRedAnts;
}

function timeFirstSelfOrganization() {
	clock.html("Equilibrium: " + counter1++);
}

function draw() {
	background(51);
	for (const ant of allAnts) {
		ant.otherAnts = allAnts.slice();
		ant.otherAnts.splice(allAnts.indexOf(ant), 1);
		ant.showBuffer();
		ant.show();
		ant.update();
		ant.countNearbyAnts(ant.otherAnts);
	}
	if (enemies.length > 0) {
		for (const e of enemies) {
			e.show();
			e.update();
			e.showBuffer();
		}
	}
	numGreAnts = greAnts.length;
	numRedAnts = redAnts.length;
	numBluAnts = bluAnts.length;

	this.numGreAnts = greAnts.length;
	this.numRedAnts = redAnts.length;
	this.numBluAnts = bluAnts.length;

	this.totalAnts = numGreAnts + numRedAnts + numBluAnts;

	if (this.colonyBalanced()) {
		clearInterval(timer);
		timerStopped = true;
	}
	showAntCount();
	showDeathCount();
}

function checkChangeJob() {
	for (const a of allAnts) {
		if (!a.attacking) {
			a.color = a.weightDataCollected(a, setAlgorithm);
		}
	}
	greAnts = [];
	redAnts = [];
	bluAnts = [];
	for (const a of allAnts) {
		switch (a.color) {
			case "g":
				greAnts.push(a);
				break;
			case "r":
				redAnts.push(a);
				break;
			case "b":
				bluAnts.push(a);
				break;
		}
	}
	calculateAvgSpread();
}

function calculateAvgSpread() {
	let mostPrevAntCount;
	let leastPrevAntCount;

	if (numGreAnts > numBluAnts) {
		if (numGreAnts > numRedAnts) {
			mostPrevAntCount = numGreAnts;
			if (numBluAnts < numRedAnts) {
				leastPrevAntCount = numBluAnts;
			} else {
				leastPrevAntCount = numRedAnts;
			}
		} else {
			mostPrevAntCount = numRedAnts;
			leastPrevAntCount = numBluAnts;
		}
	} else {
		if (numBluAnts > numRedAnts) {
			mostPrevAntCount = numBluAnts;
			if (numGreAnts < numRedAnts) {
				leastPrevAntCount = numGreAnts;
			} else {
				leastPrevAntCount = numRedAnts;
			}
		} else {
			mostPrevAntCount = numRedAnts;
			leastPrevAntCount = numGreAnts;
		}
	}
	if (timerStopped) {
		counter3++;
		counter2 += mostPrevAntCount - leastPrevAntCount;
		avgDiff = counter2 / counter3;
		if (spreadIterations < 11) {
			spreadIterations++;
			avgSpread.html("Average Spread: " + Math.round(avgDiff));
		}

	}

}

function showAntCount() {
	antCount.html("Gatherers:" + this.numGreAnts + " Soldiers:" +
		this.numRedAnts + " Builders:" + this.numBluAnts);
}

function showDeathCount() {
	deathCounter.html("Deaths: " + deathCount);
}

function colonyBalanced() {
	let oneThirdOfAnts = Math.floor(this.totalAnts / 3);
	let allowance;
	if (this.totalAnts > 150) {
		allowance = Math.round(this.totalAnts * .02);
	} else {
		allowance = Math.ceil(this.totalAnts * .01);
	}
	if (numGreAnts <= oneThirdOfAnts + allowance &&
		numGreAnts >= oneThirdOfAnts - allowance &&
		numBluAnts <= oneThirdOfAnts + allowance &&
		numBluAnts >= oneThirdOfAnts - allowance &&
		oneThirdOfAnts > 0) {
		return true;
	} else {
		return false;
	}
}

function addEnemy() {
	beetle = new Enemy(allAnts);
	enemies.push(beetle);
}

function addBiasToAnts() {
	if (politicalBiasLevel == 0) {
		for (const ant of allAnts) {
			ant.pBias = "lib";
		}
	} else if (politicalBiasLevel == 1) {
		for (const ant of allAnts) {
			if (allAnts.indexOf(ant) % 4 === 0) {
				ant.pBias = "lib";
			} else {
				ant.pBias = "cons";
			}
		}
	} else if (politicalBiasLevel == 2) {
		for (const ant of allAnts) {
			if (allAnts.indexOf(ant) % 2 === 0) {
				ant.pBias = "lib";
			} else {
				ant.pBias = "cons";
			}
		}
	} else if (politicalBiasLevel == 3) {
		for (const ant of allAnts) {
			if (allAnts.indexOf(ant) % 4 !== 0) {
				ant.pBias = "lib";
			} else {
				ant.pBias = "cons";
			}
		}
	} else {
		for (const ant of allAnts) {
			ant.pBias = "cons";
		}
	}
}