function sleepTask(turn) {

	function sleep(sleepTime) {

		setTimeout(() => {

			it.next()

		}, sleepTime)
	}


	function* main() {

		let lastTime = new Date().getTime()

		for (let i = 1; i < turn; i++) {

			let currTime = new Date().getTime()

			console.log(i, currTime - lastTime)

			lastTime = currTime

			yield sleep(i * 1000)
		}

	}


	var it = main()

	it.next()

}

sleepTask(5) // 开始！
