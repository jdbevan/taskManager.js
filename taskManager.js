var io = require("socket.io").listen(8181),
	os = require("os");

var TaskManager = function() {
	this.osType = os.type();
	this.hostname = os.hostname();
	this.platform = os.platform();
	this.osArch = os.arch();
	this.osRelease = os.release();
	this.uptime = os.uptime();
	this.totalMem = os.totalmem();
	
	this.timer;
	console.log(this.osType + ", " + this.platform + ", " +
				this.osArch + ", " + this.hostname + ", " +
				this.osRelease + ", " + Math.floor(this.uptime/60));
}
TaskManager.prototype.poll = function(self) {
	var data = { freeMem: os.freemem(),
				 totalMem: self.totalMem,
				 cpus: os.cpus() };
	//console.log(data);
	self.data = data;
}
TaskManager.prototype.get = function() {
	return this.data;
}
TaskManager.prototype.start = function(interval) {
	if (!interval) interval = 1000;
	if (interval < 500) interval = 500;
	
	this.timer = setInterval(this.poll, interval, this);
}

var tm = new TaskManager();
tm.start();

io.sockets.on('connection', function(socket) {
	
	var timer = setInterval(function() {
		// Send
		socket.volatile.emit("taskmanager", tm.get());
	}, 1000);
	
	socket.on('disconnect', function() {
		clearInterval(timer);
	});
});