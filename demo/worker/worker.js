var a = 1;
for (var i = 0; i < 1000000; i++) {
	a++;
}
postMessage(a);