//gloabal variables
let moveCounter = 0;
let startDate = '';

function toggleModal(){
    //set modal contents
    document.getElementById("moveCount").innerHTML = moveCounter;
    document.getElementById("game-time").innerHTML =  formatTime(Date.now() - startDate,true) ;
    document.getElementById("startCount").innerHTML = document.getElementsByClassName("fa-star").length;

    //show check mark
    document.querySelector(".sa-success").classList.add("hide");
    setTimeout(function() {
        document.querySelector(".sa-success").classList.remove("hide");
    }, 10);
    
    // show modal  (bootstrap modal)
     $('#win-modal').modal('show');
}


function onCardClick(e){
    //get selected card
    const selectedCard = e.target;

    // do nothing if the card is open or visible
    if(selectedCard.classList.contains("open") || selectedCard.classList.contains("show") || selectedCard.classList.contains("match")) 
        return;
    
    //to prevent opening more that 2 cards at a time apply the condition:
    if(document.querySelectorAll(".open").length == 2) return;


    //show the selected card
    selectedCard.classList.add("open","show");
    const cardsToCheck = document.querySelectorAll(".open");

    if(cardsToCheck.length == 2){
        //if the cards math 
        if(cardsToCheck[0].lastElementChild.className == cardsToCheck[1].lastElementChild.className){
            cardsToCheck.forEach(function(card){
                card.classList.remove("open","show");
                card.classList.add("match");
            })
        } else { //if the cards don't match, give a few seconds then hide
            setTimeout(function(){
                cardsToCheck.forEach(function(card){
                    card.classList.remove("open","show");
                })
            },500);
        }

        //increase move count
        document.getElementById("moves").textContent = ++moveCounter;

        
        //manage stars, if move become more than 10 then 2 stars, if more than 20 then 1 stars
        if(moveCounter == 10) {
            document.getElementsByClassName("stars")[0].children[2].firstElementChild.classList.replace("fa-star","fa-star-o")
        }
        if(moveCounter == 20) {
            document.getElementsByClassName("stars")[0].children[1].firstElementChild.classList.replace("fa-star","fa-star-o")
        }

        //if the number of cards in the page equals cards with match class then the user completed the game
        if(document.getElementsByClassName("card").length == document.getElementsByClassName("match").length ){
            toggleModal();
        }
    }
}


//formate the time for the modal display
function formatTime(s,withText) {
    const ms = s % 1000;
    s = (s - ms) / 1000;
    const secs = s % 60;
    s = (s - secs) / 60;
    const mins = s % 60;
    const hrs = (s - mins) / 60;
    

    if(withText==true){
        const hours = (hrs !== 0)?  hrs+ " hours ": "";
        const minutes = (mins !== 0) ? mins + " minutes ":"";
        const seconds = (secs !== 0 ) ?  secs + " seconds": "";
        return hours + minutes + seconds;
    }
    return hrs +":"+mins+":"+secs;
    
}


function startNewGame(){
    //hide modal
    $('#win-modal').modal('hide');
    
    
    setInterval(function() {
        document.getElementById("timer").innerHTML = formatTime(Date.now() - startDate,false) ;
    }, 100);
    
    

    //reset move counter
    moveCounter = 0;
    document.getElementById("moves").textContent = 0;

    //reset timer
    startDate= Date.now();
    document.getElementById("game-time").innerHTML = 0;


    //reset stars
    document.querySelectorAll(".fa-star-o").forEach(function(star){
        star.classList.replace("fa-star-o","fa-star") 
    })


    //create the cards
    let cardIcons = ["pinterest","reddit","wordpress",
                     "youtube","twitter","instagram",
                     "tripadvisor","snapchat-ghost"];
    cardIcons = cardIcons.concat(cardIcons);
    cardIcons = shuffle(cardIcons);
    var cards = '';
    cardIcons.forEach(function(icon){
        cards += `<li class="card"><i class="fa fa-${icon}"></i></li>`;
    });
    document.getElementsByClassName("deck")[0].innerHTML = cards;

    //add click event to the cards
    document.querySelectorAll(".card").forEach(function(card){
        card.addEventListener("click", onCardClick);
    });

}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


startNewGame();

    