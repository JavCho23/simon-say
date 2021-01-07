const colors = ["green", "red", "blue", "yellow"]
const levels = [
    {
        name: "Facil",
        pointsByRound: 1,
        pointsToPass: 3,
        difficulty: 3,
    },
    {
        name: "Medio",
        pointsByRound: 3,
        pointsToPass: 9,
        difficulty: 6,
    },
    {
        name: "Difícil",
        pointsByRound: 5,
        pointsToPass: 20,
        difficulty: 12,
    },
    {
        name: "¡CRIMINAL!",
        pointsByRound: 8,
        pointsToPass: 50,
        difficulty: 18,
    },
]

class SimonSay {
    constructor(showMessage, showRound, onError) {
        this.points = 0
        this.level = 0
        this.indexRound = 0
        this.rounds = 0
        this.round = null
        this.showMessage = showMessage
        this.showRound = showRound
        this.onError = onError
    }
    async run() {
        this.round = this.constructRound(colors, levels[this.level])
        console.log(this.round)
        await this.showRound(this.round)
    }
    constructRound(colors, level) {
        const round = []
        for (let index = 0; index < level.difficulty; index++) {
            round.push(this.getRamdonColor(colors))
        }
        return round
    }

    getRamdonColor(colors) {
        return colors[Math.floor(Math.random() * (colors.length - 0))]
    }
    async selectColor(color) {
        console.log(color)
        if (!this.round) throw new Error("Game is not started")
        if (this.round[this.indexRound] != color) {
            this.indexRound = 0
            await this.onError()
            this.showRound(this.round)
            return
        }
        await this.nextColor()
    }
    async nextColor() {
        this.indexRound++
        if (this.round.length == this.indexRound) await this.nextRound()
    }
    async nextRound() {
        this.showMessage("Siguiente round")
        this.points += levels[this.level].pointsByRound
        this.rounds++
        if (this.points > levels[this.level].pointsToPass) {
            this.level++
            this.showMessage("Siguiente nivel")
        }
        if (this.level.length >= this.level) this.endGame()
        this.round = this.constructRound(colors, levels[this.level])
        await this.showRound(this.round)
        this.indexRound = 0
    }
    endGame() {
        console.log("Juego terminado")
        this.showMessage("Juego terminado")
    }
}

const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds))
}
const simonsay = new SimonSay()
class HTMLSimonSay {
    constructor() {
        simonsay.showMessage = this.showMessage.bind(this)
        simonsay.showRound = this.showRound.bind(this)
        simonsay.onError = this.onError.bind(this)
        this.colors = {
            green: document.getElementById("green"),
            red: document.getElementById("red"),
            yellow: document.getElementById("yellow"),
            blue: document.getElementById("blue"),
        }
        simonsay.run()
        this.colors.green.addEventListener("click", this.selectColor)
        this.colors.red.addEventListener("click", this.selectColor)
        this.colors.yellow.addEventListener("click", this.selectColor)
        this.colors.blue.addEventListener("click", this.selectColor)
    }
    showMessage(message) {
        document.getElementById("message").innerHTML = message
    }
    async showRound(round) {
        for (const color of round) {
            await this.illuminateColor(color)
        }

        await this.offAllColors()
    }
    async illuminateColor(color) {
        await this.offAllColors()
        this.colors[color].style.opacity = 1
        await sleep(800)
    }
    async offAllColors() {
        for (const color in this.colors) {
            const element = this.colors[color]
            element.style.opacity = 0.3
        }
        await sleep(500)
    }
    async selectColor(event) {
        console.log(event.srcElement)
        await simonsay.selectColor(event.srcElement.id)
    }
    async onError() {
        for (let index = 0; index < 3; index++) {
            for (const color in this.colors) {
                const element = this.colors[color]
                element.style.opacity = 1
            }
            await sleep(500)
            await this.offAllColors()
        }
    }
}

const simon = new HTMLSimonSay()
