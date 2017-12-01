var Game = {};

Game.run = function (context) {
	this.ctx = context;
	this._previousElapsed = 0;

	var p = this.load();
	Promise.all(p).then(function (loaded) {
		this.init();
		window.requestAnimationFrame(this.tick);
	}.bind(this));
};

Game.tick = function (elapsed) {
	window.requestAnimationFrame(this.tick);
	var delta = (elapsed - this._previousElapsed) / 1000.0;
	delta = Math.min(delta, 0.25);
	this._previousElapsed = elapsed;
	this.update(delta);
	this.render();
}.bind(Game);

Game.load = function () {
	return [ ];
};

Game.init = function () {
	this.number = document.getElementById('data-number');
	this.rateDisplay = document.getElementById('data-rate');
	this.costDisplay = document.getElementById('data-cost');
	this.start = Date.now();
	this.rate = 0.001;
	this.base = 0;
	this.cost = 10;

	var that = this;

	this.button = document.getElementById('buy');
	this.button.onclick = function() {
		that.click();
	}
};

Game.update = function (delta) {
	this.current = (Date.now() - this.start) * this.rate + this.base;
	if (this.cost <= this.current) {
		this.button.disabled = false;
	} else {
		this.button.disabled = true;
	}
};

Game.render = function () {
	this.number.innerHTML = (this.current/100).toFixed(2);
	this.rateDisplay.innerHTML = this.rate.toFixed(4);
	this.costDisplay.innerHTML = this.cost.toFixed(2);
}; 

Game.click = function() {
	if (this.current >= this.cost) {
		this.base = this.current - this.cost;
		this.start = Date.now();
		this.current = 0;
		this.rate = this.rate * 1.2;
		this.cost = this.cost * 1.2;
	}
};

window.onload = function () {
	var context = "blah";
	Game.run(context);
};
