const windowHeight = 400;
const windowWidth = 700;
const speed = 4;

let greAnt, redAnt, bluAnt;

let redAnts = [];
let bluAnts = [];
let greAnts = [];
let allAnts = [];

let totalAnts = 180;
let numGreAnts = 0;
let numRedAnts = 0;
let numBluAnts = 0;

let buffer = 50;
let antCount;
let decisionTime = 10000;

function setup() {
	let myCanvas = createCanvas(windowWidth, windowHeight);
	myCanvas.parent('ant-farm');
	let input1 = createInput();
	let input2 = createInput();
	let input3 = createInput();

	antCount = createDiv();
	antCount.parent('color-count');
	showAntCount();

	input1.parent("input1");
	input2.parent("input2");
	input3.parent("input3");
	let intervalIndividualCount = setInterval(checkChangeJob, decisionTime);
	let simulate = createButton("simulate");
	simulate.parent('simul');
	simulate.mouseReleased(populate);
}

function populate() {
	this.numGreAnts = document.getElementById('input1').value;
	this.numRedAnts = document.getElementById('input2').value;
	this.numBluAnts = document.getElementById('input3').value;

	antCount.html("Gatherers:" + this.numGreAnts + " Soldiers:" +
		this.numRedAnts + " Builders:" + this.numBluAnts);

	buffer = document.getElementById("buffer-slider").value;
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

function draw() {
	background(51);
	for (const ant of allAnts) {
		let otherAnts = allAnts.slice();
		otherAnts.splice(allAnts.indexOf(ant), 1);
		ant.showBuffer();
		ant.show();
		ant.update();
		ant.countNearbyAnts(otherAnts);
	}
	this.numGreAnts = greAnts.length;
	this.numRedAnts = redAnts.length;
	this.numBluAnts = bluAnts.length;
	
	showAntCount();
}

function checkChangeJob() {
	for (const a of allAnts) {
		a.color = a.weightDataCollected(a);
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
}

function showAntCount() {
	antCount.html("Gatherers:" + this.numGreAnts + " Soldiers:" +
		this.numRedAnts + " Builders:" + this.numBluAnts);
}