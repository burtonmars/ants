const windowHeight = 400;
const windowWidth = 700;
const speed = 4;

let greAnt, redAnt, bluAnt;
let clock, antCount, randomizeCheckbox, setAlgorithm;

let redAnts = [];
let bluAnts = [];
let greAnts = [];
let allAnts = [];

let totalAnts = 0;
let numGreAnts = 0;
let numRedAnts = 0;
let numBluAnts = 0;

let buffer = 50;
let decisionTime = 10000;
let counter1 = 0;
let counter2 = 0;
let counter3 = 0;
let avgSpread = 0;
let firstEqReached = false;
let timerStopped = false;
let spreadIterations = 10;
let avgDiff = 0;

function setup() {
	let myCanvas = createCanvas(windowWidth, windowHeight);
	myCanvas.parent('ant-farm');
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
	clock.parent("eq1-timer");
	clock.html("Equilibrium: 0");

	avgSpread = createP();
	avgSpread.parent("avg-spread");
	avgSpread.html("Average Spread: 0");

	let simulate = createButton("simulate");
	simulate.parent('simul');
	simulate.mousePressed(setNumAntsFromInput);
	simulate.mouseReleased(populateColony);
}

function populateColony() {
	showAntCount();
	randomAlgorithm = document.getElementById("randomize-checkbox").checked;
	thresholdAlgorithm = document.getElementById("threshold-checkbox").checked;
	memoryAlgorithm = document.getElementById("memory-checkbox").checked;

	if (randomAlgorithm) {
		console.log("no algorithm being used");
		setAlgorithm = "none";
	} else if (thresholdAlgorithm) {
		console.log("threshold being used");
		setAlgorithm = "threshold";
	} else if (memoryAlgorithm) {
	
		console.log("memoryAlgorithm being used");
		setAlgorithm = "memory";
	} else {
		console.log("basic algorithm being used");
		setAlgorithm = "basic";
	}
	buffer = document.getElementById("buffer-slider").value;
	timer = setInterval(timeFirstSelfOrganization, 1000);
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

function averageEqulibriumCounter() {
	avgSpread.html("Average Spread: " + Math.round(avgDiff));
}

function draw() {
	background(51);
	let otherAnts = allAnts.slice();
	for (const ant of allAnts) {
		otherAnts.splice(allAnts.indexOf(ant), 1);
		ant.showBuffer();
		ant.show();
		ant.update();
		ant.countNearbyAnts(otherAnts);
		otherAnts.push(ant);
		ant.setOtherAnts(allAnts);
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
		avgEq = setInterval(averageEqulibriumCounter, 10000);
	}
	showAntCount();
}

function checkChangeJob() {
	for (const a of allAnts) {
		a.color = a.weightDataCollected(a, setAlgorithm);
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

	console.log(mostPrevAntCount);
	console.log(leastPrevAntCount);
	console.log(avgDiff)
	if (timerStopped) {
		counter3++;
		counter2 += mostPrevAntCount - leastPrevAntCount;
		avgDiff = counter2 / counter3;
	}
}

function showAntCount() {
	antCount.html("Gatherers:" + this.numGreAnts + " Soldiers:" +
		this.numRedAnts + " Builders:" + this.numBluAnts);
}

function colonyBalanced() {
	let oneThirdOfAnts = Math.round(this.totalAnts / 3);
	let allowance;
	if (allAnts > 119) {
		allowance = Math.ceil(allAnts * .05);
	} else if (allAnts > 44) {
		allowance = Math.ceil(allAnts * .04);
	} else {
		allowance = 1;
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