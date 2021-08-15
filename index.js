let player = {
    name: "Player One",
    chips: 10
}
let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")
let youLose = document.getElementById("you-lose")

getInfos()


function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10   // to change the queen king and jack values to 10
    } else if (randomNumber === 1) {
        return 11  // to change the value of Ace card to 11
    } else {
        return randomNumber
    }
}

function startGame() {
    if (player.chips > 0) {
        hasBlackJack = false 
        isAlive = true
        let firstCard = getRandomCard()
        let secondCard = getRandomCard()
        cards = [firstCard, secondCard]
        sum = firstCard + secondCard
        renderGame()
    }
}

function renderGame() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    
    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
        player.chips += 10
        console.log(player.chips)
        getInfos()
    } else {
        message = "You're out of the game!"
        isAlive = false
        player.chips -= 10
        getInfos()
        if (player.chips ===0) {
            youLose.textContent = "Sorry you lose, click try again to another chance"
        }
        
    }
    messageEl.textContent = message
}


function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()        
    }
}


function getInfos(){
    playerEl.textContent = player.name + ": $" + player.chips
}


function outOfChips(){
    if (player.chips ===0) {
        player.chips = 10
        getInfos()
        sumEl.textContent = "Sum: "
        cardsEl.textContent = "Cards: "
        youLose.textContent = null
    }
}
