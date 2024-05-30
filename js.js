class Parallax {
	constructor(obj) {
		this.cloud = document.querySelectorAll(obj.clouds)
		this.background = document.querySelector(obj.background)
		this.boat = document.querySelector(obj.boat)
		window.addEventListener('scroll', () => this.moveElements())
	}

	moveElements() {
		this.cloud.forEach(clouds => {
			let speed = clouds.getAttribute('data-speed')
			clouds.style.transform = `translateX(${scrollY * speed}px) translateY(${
				scrollY * speed
			}px)`
		})
		this.background.style.objectPosition = `0 ${scrollY / 10}%`
		this.boat.style.transform = `translateX(${scrollY * 0.7}px) translateY(${
			scrollY / 8
		}px)`
	}
}

const parallax = new Parallax({
	clouds: '.header__cloud',
	background: '.header__fan',
	boat: '.headr__boat',
})

// animate text
class Text {
	constructor(title) {
		this.text = document.querySelector(title)
		this.fullText = this.text.innerHTML
		this.text.innerHTML = ''
		this.str()
		this.strRemove()
	}

	str(x = 0) {
		this.text.innerHTML += this.fullText[x]
		x++
		if (x < this.fullText.length) {
			setTimeout(() => {
				this.str(x)
			}, 300)
		}
	}

	strRemove(x) {
		x = this.fullText.length
		setTimeout(() => {
			this.deleteStr(x)
		}, 5000)
	}

	deleteStr(x) {
		x--
		this.text.innerHTML = this.fullText.slice(0, x)
		if (x > 0) {
			setTimeout(() => {
				this.deleteStr(x)
			}, 300)
		} else {
			// window.location.reload();
		}
	}
}

const text = new Text('.header__title')

// scroll
class Scroll {
	constructor(el) {
		this.section = document.querySelector(el)

		window.addEventListener('scroll', () => this.fadeRight(this.section))
	}

	fadeRight(section) {
		const fadeRight = section.querySelectorAll('.scroll__card')
		fadeRight.forEach(card => {
			const speed = card.getAttribute('data-speed')
			card.style.transition = speed + 'ms'

			if (scrollY >= section.offsetTop - section.offsetHeight * 1) {
				card.classList.add('active')
			} else {
				card.classList.remove('active')
			}
		})
	}
}

const scroll = new Scroll('.about')

class ParallaxMove {
	constructor(el) {
		this.moveSection = document.querySelector(el)
		this.moveEl = this.moveSection.querySelectorAll('.parallax__ball')
		this.moveSection.addEventListener('mousemove', e => this.moveItem(e))
	}
	moveItem(e) {
		this.moveEl.forEach(item => {
			const speed = item.getAttribute('data-speed')
			const x = (window.innerWidth - e.pageX * speed) / 450
			const y = (window.innerWidth - e.pageY * speed) / 450
			item.style.transform = `translate(${x}px, ${y}px)`
		})
	}
}

const parallaxMove = new ParallaxMove('.parallax')

// timer
class Timer {
	constructor(obj) {
		this.timerNums = document.querySelectorAll(obj.timerNums)
		this.timerSection = document.querySelector(obj.timerSection)
		this.state = true //переключать
		window.addEventListener('scroll', () => this.scrollTimer())
	}
	scrollTimer() {
		if (this.state) {
			if (
				scrollY >=
				this.timerSection.offsetTop - this.timerSection.offsetHeight * 1
			) {
				this.timerSet()
				this.state = false
			}
		}
	}
	timerSet() {
		this.timerNums.forEach(nums => {
			const count = nums.getAttribute('data-num')

			function timer(k = 0) {
				nums.innerHTML = k
				k++
				if (k <= count) {
					setTimeout(() => {
						timer(k)
					}, 5)
				}
			}
			timer()
		})
	}
}

const timer = new Timer({
	timerNums: '.timer__num',
	timerSection: '.timer',
})

class Bubble {
	constructor(el) {
		this.bobble = document.querySelectorAll(el)
		this.bobble.forEach(bubble => {
			bubble.addEventListener('mousemove', e => this.bubbleShow(e, bubble))
		})
	}
	bubbleShow(e, item) {
		// console.log(e.pageX) горизонталь (весь экран)
		// console.log(e.pageY)  вертикаль (весь экран)
		// console.log(item.offsetLeft)
		// console.log(item.offsetTop)
		const x = e.pageX - item.offsetLeft
		const y = e.pageY - item.offsetTop

		const span = item.querySelector('span')
		span.style.left = `${x}px`
		span.style.top = `${y}px`
	}
}

const bubble = new Bubble('.timer__btn')

class Rotate3D {
	constructor(el) {
		this.card = document.querySelectorAll(el)
		this.card.forEach(cards => {
			cards.addEventListener('mousemove', e => this.rotate(e, cards))
			cards.addEventListener('mouseout', e => this.rotateNone(cards))
		})
	}
	rotate(e, item) {
		const cardItem = item.querySelector('.card__item-el')
		const halfHeight = cardItem.offsetHeight / 2
		cardItem.style.transform = `rotateX(${
			(halfHeight - e.offsetY) / 7
		}deg) rotateY(${-(halfHeight - e.offsetX) / 7}deg)`
	}
	rotateNone(item) {
		const cardItem = item.querySelector('.card__item-el')
		cardItem.style.transform = 'rotate(0)'
	}
}

const rotate3d = new Rotate3D('.card__item')
