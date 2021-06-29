Java.perform(function () {
	console.log("Starting uncrackable3...");
	var sys = Java.use("java.lang.System");
	sys.exit.implementation = function() { console.log("System.exit() function called!"); };
});

Interceptor.attach(Module.findExportByName("libc.so", "strstr"), {
	onEnter: function (args) {
		this.frida = Boolean(0);
		var haystack = Memory.readUtf8String(args[0]);
		var needle = Memory.readUtf8String(args[1]);
	if ( haystack.indexOf("frida") != -1) { this.frida = Boolean(1); }
	},

	onLeave: function (retval) {
		if (this.frida) { retval.replace(0);}
		return retval;
	}
});
