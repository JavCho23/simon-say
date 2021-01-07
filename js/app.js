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
    constructor(showMessage, showRound) {
        this.points = 0
        this.level = 0
        this.indexRound = 0
        this.round = null
        this.showMessage = showMessage
        this.showRound = showRound
    }
    run() {
        this.round = this.constructRound(colors, levels[this.level])
        this.showRound(this.round)
    }
    constructRound(colors, level) {
        const round = []
        for (let index = 0; index < level.difficulsty; index++) {
            round.push(this.ramdonColor(colors))
        }
        return round
    }

    getRamdonColor(colors) {
        return colors[Math.floor(Math.random() * (colors.length - 0))]
    }
    selectColor(color) {
        if (this.round) throw new Error("Game is not started")
        if (this.round[this.indexRound] != color) return null
        this.nextColor()
    }
    nextColor() {
        this.indexRound++
        if (this.round.length >= this.indexRound) this.nextRound()
    }
    nextRound() {
        this.showMessage("Siguiente round")
        this.points += levels[this.level].pointsByRound
        if (this.points > levels[this.level].pointsToPass) {
            this.level++
            this.showMessage("Siguiente nivel")
        }
        if (this.level.length >= this.level) this.endGame()
        this.round = this.constructRound(colors, levels[this.level])
        this.showRound(this.round)
        this.indexRound = 0
    }
    endGame() {
        console.log("Juego terminado")
        this.showMessage("Juego terminado")
    }
}


