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

let buffer = 5;
let antCount;

function setup() {
	let myCanvas = createCanvas(windowWidth, windowHeight);
	myCanvas.parent('ant-farm');
	let input1 = createInput();
	let input2 = createInput();
	let input3 = createInput();
	
	antCount = createDiv();
	input1.parent("input1");
	input2.parent("input2");
	input3.parent("input3");
	let interval = setInterval(updateNumberAnts, 6000);
	let simulate = createButton("simulate");
	simulate.parent('simul');
	simulate.mouseReleased(populate);
}

function populate() {
	this.numGreAnts = document.getElementById('input1').value;
	this.numRedAnts = document.getElementById('input2').value;
	this.numBluAnts = document.getElementById('input3').value;

	antCount.parent('color-count');
	antCount.html("Green Ants:" + this.numGreAnts + " Red Ants:" +
		this.numRedAnts + " Blue Ants:" + this.numBluAnts);

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
		otherAnts.splice(allAnts[allAnts.indexOf(ant)], 1);
		ant.update();
		ant.show();
		ant.countNearbyAnts(otherAnts);
	}
	this.numGreAnts = greAnts.length;
	this.numRedAnts = redAnts.length;
	this.numBluAnts = bluAnts.length;
}

function updateNumberAnts() {
	antCount.html("Green Ants:" + this.numGreAnts + " Red Ants:" +
		this.numRedAnts + " Blue Ants:" + this.numBluAnts);
}