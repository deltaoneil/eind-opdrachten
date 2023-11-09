let rollsLeft = 3; 

let p1Turn = true;
let currentPlayer = "player1";

let round = 0;

let debugMode = false; 

let reeks3 = false;
let reeks2 = false;

let threeOfAKind = false;
let fourOfAKind = false;
let fullHouse = false;
let smallStraight = false;
let largeStraight = false;
let chance = false;
let yahtzee = false;

let scoreAcesP1 = 0;
let scoreTwosP1 = 0;
let scoreThreesP1 = 0;
let scoreFoursP1 = 0;
let scoreFivesP1 = 0;
let scoreSixesP1 = 0;
let scoreSubtotalP1 = 0;
let scoreBonusP1 = 0;
let scoreTotalTopP1 = 0;

let scoreTkindP1 = 0;
let scoreFkindP1 = 0;
let scoreFouseP1 = 0;
let scoreSmallP1 = 0;
let scoreLargeP1 = 0;
let scoreChanceP1 = 0;
let scoreYahtzeeP1 = 0;
let scoreTotalBottomP1 = 0;

let scoreAcesP2 = 0;
let scoreTwosP2 = 0;
let scoreThreesP2 = 0;
let scoreFoursP2 = 0;
let scoreFivesP2 = 0;
let scoreSixesP2 = 0;
let scoreSubtotalP2 = 0;
let scoreBonusP2 = 0;
let scoreTotalTopP2 = 0;

let scoreTkindP2 = 0;
let scoreFkindP2 = 0;
let scoreFouseP2 = 0;
let scoreSmallP2 = 0;
let scoreLargeP2 = 0;
let scoreChanceP2 = 0;
let scoreYahtzeeP2 = 0;
let scoreTotalBottomP2 = 0;

let scoreGrandTotalP1 = 0;
let scoreGrandTotalP2 = 0;

let dice = []; 
let diceHold = [];

let sc1 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let sc2 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];

let scoreSingles = [0,0,0,0,0,0,0];
let scoresnoak = [0,0,0,0,0,0,0];

let lockTopP1 = 0;
let lockBottomP1 = 0;
let lockTopP2 = 0;
let lockBottomP2 = 0;

let winnaar = "";

function getNaam(p) {
	let naam = prompt("Wat is je naam?", "Naam");

    	if (naam === "" || naam === null) return;
     if (p===1) {
       	naam1.innerHTML = naam;
		name1.innerHTML = "player 1 = " + naam;
    	}else{
        	naam2.innerHTML = naam;
		name2.innerHTML = "player 2 = " + naam;
    	}
}



function roll(){
	/* reset dice */
	if(rollsLeft === 3){
		for (i = 1; i < 6; i++){
			diceHold[i] = 0;
		}
	}

	for(w = 1; w <=6; w++){
		scoresnoak[w] = 0;
		scoreSingles[w] = 0;
	}

 	reeks3 = false;
 	reeks2 = false;
	
	threeOfAKind = false;
	fourOfAKind = false;
	fullHouse = false;
	smallStraight = false;
	largeStraight = false;
	chance = false;
	yahtzee = false;

	if(rollsLeft > 0){
		for (i = 1; i <= 5; i++){
			if(diceHold[i] === 0){
				dice[i] = Math.floor(Math.random() * 6) + 1;
				document.getElementById("die" + i).setAttribute("src", "Dice-" + dice[i] + ".png");
			}
		}

		rollsLeft--;
		rolls.innerHTML = rollsLeft;
	}

	else console.log("rollsLeft=" + rollsLeft);
	//console.log(dice);

	checkSingles();
	checkNumOfAKind();
	checkFullhouse();
	checkSmallStraight();
	checkLargeStraight();
	checkYahtzee();

	if(debugMode){
		rollsLeft = 1;
	}

	calculatePoints();
	calculateGrandTotalP1();

	if(round === 26){
		endGame();
	}
}


function lockDie(die){
	did =  "die" + die;
	if(diceHold[die]){
		/* unHold */
		document.getElementById(did).setAttribute("style", "width: 85px; height: 85px;");
		diceHold[die] = 0;
	}else{
		/* hold */
		document.getElementById(did).setAttribute("style", "width: 70px; height: 70px;");
		diceHold[die] = 1;
	}
}

function resetDice(){
	for (i = 1; i <= 5; i++){
		diceHold[i] = 0;
		document.getElementById("die" + i).setAttribute("style", "width: 85px; height: 85px;");
		document.getElementById("die" + i).setAttribute("src", "Dice-7.png");
	}

	scoreSingles = [0,0,0,0,0,0,0];
	scoresnoak = [0,0,0,0,0,0,0];
	scoreFouse = 0;
	scoreSmall = 0;
	scoreLarge = 0;
	scoreYahtzee = 0;
	
	acesP1.innerHTML = 0;
	twosP1.innerHTML = 0;
	threesP1.innerHTML = 0;
	foursP1.innerHTML = 0;
	fivesP1.innerHTML = 0;
	sixesP1.innerHTML = 0;
	tkindP1.innerHTML = 0;
	fkindP1.innerHTML = 0;
	fouseP1.innerHTML = 0;
	smallP1.innerHTML = 0;
	largeP1.innerHTML = 0;
	chanceP1.innerHTML = 0;
	yahtzeeP1.innerHTML = 0;

	acesP2.innerHTML = 0;
	twosP2.innerHTML = 0;
	threesP2.innerHTML = 0;
	foursP2.innerHTML = 0;
	fivesP2.innerHTML = 0;
	sixesP2.innerHTML = 0;
	tkindP2.innerHTML = 0;
	fkindP2.innerHTML = 0;
	fouseP2.innerHTML = 0;
	smallP2.innerHTML = 0;
	largeP2.innerHTML = 0;
	chanceP2.innerHTML = 0;
	yahtzeeP2.innerHTML = 0;
}

<!-- checken voor singles en combinaties --!>

function checkSingles(){
	for(w = 1; w <=6; w++){
		for (i = 1; i <= 5; i++){
			if(dice[i] === w){
				scoreSingles[w] = scoreSingles[w] + w;
			}
		}
	}	
	//console.log("scoreSingles = " + scoreSingles[1] + " " + scoreSingles[2]+ " " + scoreSingles[3]+ " " + scoreSingles[4]+ " " + scoreSingles[5]+ " " + scoreSingles[6]);
}	
function checkNumOfAKind(){ 
	for(w = 1; w <=6; w++){
		scoresnoak[w] = 0;
	}
    	for(w = 1; w <=6; w++){
		for (d = 1; d <= 5; d++){
			if(dice[d] === w){
				scoresnoak[w]++;
			}
		}
	}
	for(w = 1; w <=6; w++){
		if(scoresnoak[w] === 3){
			threeOfAKind = true;
			console.log("THREE OF A KINDDDDD");
		}
		if(scoresnoak[w] === 4){
			fourOfAKind = true;
			console.log("FOUR OF A KINNDDDD");
		}
	}
	console.log("scoresnoak : " + scoresnoak);	
}
	
function checkFullhouse(){
	//console.log("checkFullHouse : " + scoresnoak);
	for(w = 1; w <= 6; w++){
		if(scoresnoak[w] === 2) reeks2 = true;
		if(scoresnoak[w] === 3) reeks3 = true;
	}
	if(reeks2 === true && reeks3 === true){
		fullHouse = true;
		console.log("fullhouse :)))");
	}
}
function checkSmallStraight(){
	//console.log("checkSmallStraight : " + scoresnoak);
	if(scoresnoak[1] > 0 && scoresnoak[2] > 0 && scoresnoak[3] > 0 && scoresnoak[4] > 0) smallStraight = true;
	if(scoresnoak[2] > 0 && scoresnoak[3] > 0 && scoresnoak[4] > 0 && scoresnoak[5] > 0) smallStraight = true;
	if(scoresnoak[3] > 0 && scoresnoak[4] > 0 && scoresnoak[5] > 0 && scoresnoak[6] > 0) smallStraight = true;

	if(smallStraight === true)console.log("small straight found!");
}
function checkLargeStraight(){
	//console.log("checkLargeStraight : " + scoresnoak);
	if(scoresnoak[1] > 0 && scoresnoak[2] > 0 && scoresnoak[3] > 0 && scoresnoak[4] > 0 && scoresnoak[5] > 0) largeStraight = true;
	if(scoresnoak[2] > 0 && scoresnoak[3] > 0 && scoresnoak[4] > 0 && scoresnoak[5] > 0 && scoresnoak[6] > 0) largeStraight = true;
	
	if(largeStraight === true)console.log("large straight found!");
}
function checkYahtzee(){
	for(i = 1; i <= 6; i++) {
		if(dice[1] === i && dice[2] === i && dice[3] === i && dice[4] === i && dice[5] === i){
          	console.log("yahtzee!");
			yahtzee = true;
		}
   	}
}










<!-- scores op correcte plek zetten --!>

function calculatePointsP1(dice){
	let score = 0;
	for (let i = 1; i < 6; i++){
		score = score + dice[i];
	}
	
	acesP1.innerHTML = scoreSingles[1];
	twosP1.innerHTML = scoreSingles[2];
	threesP1.innerHTML = scoreSingles[3];
	foursP1.innerHTML = scoreSingles[4];
	fivesP1.innerHTML = scoreSingles[5];
	sixesP1.innerHTML = scoreSingles[6];
	
	if(threeOfAKind){
		tkindP1.innerHTML = score;
	}
	if(fourOfAKind){
		fkindP1.innerHTML = score;
	}
	if(fullHouse){
		scoreFouse = 25;
		fouseP1.innerHTML = scoreFouse;
	}
	if(smallStraight){
		scoreSmall = 30;
		smallP1.innerHTML = scoreSmall;
	}
	if(largeStraight){
		scoreLarge = 40;
		largeP1.innerHTML = scoreLarge;
	}

	chanceP1.innerHTML = score;
		
	if(yahtzee){
		scoreYahtzee = 50;
		yahtzeeP1.innerHTML = scoreYahtzee;
	}
	//console.log("De totale score van player 1 deze rol = "+ score);
}
function lockScoreP1(i){
	let score = 0;
	for (let i = 1; i < 6; i++){
		score = score + dice[i];
	}

	//console.log("je hebt gekozen voor : " + sc); 

	if(i === 1){
		sc1[1] = scoreSingles[1];
		scoreAcesP1 = sc1[1];
	}
	acesP1Locked.innerHTML = sc1[1];
	if(i === 2){
		sc1[2] = scoreSingles[2];
		scoreTwosP1 = sc1[2];
	}
	twosP1Locked.innerHTML = sc1[2];
	if(i === 3){
		sc1[3] = scoreSingles[3];
		scoreThreesP1 = sc1[3];
	}
	threesP1Locked.innerHTML = sc1[3];
	if(i === 4){
		sc1[4] = scoreSingles[4];
		scoreFoursP1 = sc1[4];
	}
	foursP1Locked.innerHTML = sc1[4];
	if(i === 5){
		sc1[5] = scoreSingles[5];
		scoreFivesP1 = sc1[5];
	}
	fivesP1Locked.innerHTML = sc1[5];
	if(i === 6){
		sc1[6] = scoreSingles[6];
		scoreSixesP1 = sc1[6];
	}
	sixesP1Locked.innerHTML = sc1[6];
	if(i === 7){
		if(threeOfAKind){
			sc1[7] = score;
		}else{ 
			sc1[7] = 0;
		}
		scoreTkindP1 = sc1[7];
	}
	tkindP1Locked.innerHTML = sc1[7];
	if(i === 8){
		if(fourOfAKind){
			sc1[8] = score; 
		}else{
			sc1[8] = 0;
		}
		scoreFkindP1 = sc1[8];
	}
	fkindP1Locked.innerHTML = sc1[8];
	if(i === 9){
		scoreFouse = 25;
		if(fullHouse){
			sc1[9] = scoreFouse;
		}else{
			sc1[9] = 0;
		}
		scoreFouseP1 = sc1[9];
	}
	fouseP1Locked.innerHTML = sc1[9];
	if(i === 10){
		scoreSmall = 30;
		if(smallStraight){
			sc1[10] = scoreSmall;
		}else{ 
			sc1[10] = 0;
		}
		scoreSmallP1 = sc1[10];
	}
	smallP1Locked.innerHTML = sc1[10];
	if(i === 11){
		scoreLarge = 40;
		if(largeStraight){
			sc1[11] = scoreLarge;
		}else{
			sc1[11] = 0;
		}
		scoreLargeP1 = sc1[11];
	}
	largeP1Locked.innerHTML = sc1[11];
	if(i === 12){
		sc1[12] = score;
		scoreChanceP1 = sc1[12];
	}
	chanceP1Locked.innerHTML = sc1[12];
	if(i === 13){
		scoreYahtzee = 50;
		if(yahtzee){
			sc1[13] = scoreYahtzee;
		}else{
			sc1[13] = 0;
		}
		scoreYahtzeeP1 = sc1[13];
	}
	yahtzeeP1Locked.innerHTML = sc1[13];
	
	if(i < 7){
		lockTopP1++;
	}else{
		lockBottomP1++;
	}

	console.log("lockTopP1 = " + lockTopP1 + " en lockBottomP1 = " + lockBottomP1);
	endTurn();
}			

function calculatePointsP2(dice){
	let score = 0;
	for (let i = 1; i < 6; i++){
		score = score + dice[i];
	}
	
	acesP2.innerHTML = scoreSingles[1];
	twosP2.innerHTML = scoreSingles[2];
	threesP2.innerHTML = scoreSingles[3];
	foursP2.innerHTML = scoreSingles[4];
	fivesP2.innerHTML = scoreSingles[5];
	sixesP2.innerHTML = scoreSingles[6];
	
	if(threeOfAKind){
		tkindP2.innerHTML = score;
	}
	if(fourOfAKind){
		fkindP2.innerHTML = score;
	}
	if(fullHouse){
		scoreFouse = 25;
		fouseP2.innerHTML = scoreFouse;
	}
	if(smallStraight){
		scoreSmall = 30;
		smallP2.innerHTML = scoreSmall;
	}
	if(largeStraight){
		scoreLarge = 40;
		largeP2.innerHTML = scoreLarge;
	}

	chanceP2.innerHTML = score;
		
	if(yahtzee){
		scoreYahtzee = 50;
		yahtzeeP2.innerHTML = scoreYahtzee;
	}
	//console.log("De totale score van player 2 deze rol = "+ score);
}
function lockScoreP2(i){
	let score = 0;
	for (let i = 1; i < 6; i++){
		score = score + dice[i];
	}

	//console.log("je hebt gekozen voor : " + sc); 

	if(i === 1){
		sc2[1] = scoreSingles[1];
		scoreAcesP2 = sc2[1];
	}
	acesP2Locked.innerHTML = sc2[1];
	if(i === 2){
		sc2[2] = scoreSingles[2];
		scoreTwosP2 = sc2[2];
	}
	twosP2Locked.innerHTML = sc2[2];
	if(i === 3){
		sc2[3] = scoreSingles[3];
		scoreThreesP2 = sc2[3];
	}
	threesP2Locked.innerHTML = sc2[3];
	if(i === 4){
		sc2[4] = scoreSingles[4];
		scoreFoursP2 = sc2[4];
	}
	foursP2Locked.innerHTML = sc2[4];
	if(i === 5){
		sc2[5] = scoreSingles[5];
		scoreFivesP2 = sc2[5];
	}
	fivesP2Locked.innerHTML = sc2[5];
	if(i === 6){
		sc2[6] = scoreSingles[6];
		scoreSixesP2 = sc2[6];
	}
	sixesP2Locked.innerHTML = sc2[6];
	if(i === 7){
		if(threeOfAKind){
			sc2[7] = score;
		}else{ 
			sc2[7] = 0;
		}
		scoreTkindP2 = sc2[7];
	}
	tkindP2Locked.innerHTML = sc2[7];
	if(i === 8){
		if(fourOfAKind){
			sc2[8] = score; 
		}else{
			sc2[8] = 0;
		}
		scoreFkindP2 = sc2[8];
	}
	fkindP2Locked.innerHTML = sc2[8];
	if(i === 9){
		scoreFouse = 25;
		if(fullHouse){
			sc2[9] = scoreFouse;
		}else{
			sc2[9] = 0;
		}
		scoreFouseP2 = sc2[9];
	}
	fouseP2Locked.innerHTML = sc2[9];
	if(i === 10){
		scoreSmall = 30;
		if(smallStraight){
			sc2[10] = scoreSmall;
		}else{ 
			sc2[10] = 0;
		}
		scoreSmallP2 = sc2[10];
	}
	smallP2Locked.innerHTML = sc2[10];
	if(i === 11){
		scoreLarge = 40;
		if(largeStraight){
			sc2[11] = scoreLarge;
		}else{
			sc2[11] = 0;
		}
		scoreLargeP2 = sc2[11];
	}
	largeP2Locked.innerHTML = sc2[11];
	if(i === 12){
		sc2[12] = score;
		scoreChanceP2 = sc2[12];
	}
	chanceP2Locked.innerHTML = sc2[12];
	if(i === 13){
		scoreYahtzee = 50;
		if(yahtzee){
			sc2[13] = scoreYahtzee;
		}else{
			sc2[13] = 0;
		}
		scoreYahtzeeP2 = sc2[13];
	}
	yahtzeeP2Locked.innerHTML = sc2[13];
	
	if(i < 7){
		lockTopP2++;
	}else{
		lockBottomP2++;
	}

	console.log("lockTopP2 = " + lockTopP2 + " en lockBottomP2 = " + lockBottomP2);
	endTurn();
}
	



function calculateGrandTotalP1(){
	
	if(lockTopP1 === 6){
		scoreSubtotalP1 = scoreAcesP1 + scoreTwosP1 + scoreThreesP1 + scoreFoursP1 + scoreFivesP1 + scoreSixesP1;
		//console.log("werkt");
		subtotalP1Locked.innerHTML = scoreSubtotalP1; 
		if(scoreSubtotalP1 > 63){
			scoreBonusP1 = 35;
			bonusP1Locked.innerHTML = scoreBonusP1;
		}
		scoreTotalTopP1 = scoreSubtotalP1 + scoreBonusP1;
		totalTopP1Locked.innerHTML = scoreTotalTopP1;
	}
	
	if(lockBottomP1 === 7){
		scoreTotalBottomP1 = scoreTkindP1 + scoreFkindP1 + scoreFouseP1 + scoreSmallP1 + scoreLargeP1 + scoreChanceP1 + scoreYahtzeeP1;
		
		totalBottomP1Locked.innerHTML = scoreTotalBottomP1;
	}

	if(lockTopP1 === 6 && lockBottomP1 === 7){
		scoreGrandTotalP1 = scoreTotalTopP1 + scoreTotalBottomP1;
		grandP1Locked.innerHTML  = scoreGrandTotalP1;
	}
	console.log("lockBottomP1 = " + lockBottomP1 + " score = " + scoreTotalBottomP1);
}

function calculateGrandTotalP2(){
	
	if(lockTopP2 === 6){
		scoreSubtotalP2 = scoreAcesP2 + scoreTwosP2 + scoreThreesP2 + scoreFoursP2 + scoreFivesP2 + scoreSixesP2;
		//console.log("werkt");
		subtotalP2Locked.innerHTML = scoreSubtotalP2; 
		if(scoreSubtotalP2 > 63){
			scoreBonusP2 = 35;
			bonusP2Locked.innerHTML = scoreBonusP2;
		}
		scoreTotalTopP2 = scoreSubtotalP2 + scoreBonusP2;
		totalTopP2Locked.innerHTML = scoreTotalTopP2;
	}
	
	if(lockBottomP2 === 7){
		scoreTotalBottomP2 = scoreTkindP2 + scoreFkindP2 + scoreFouseP2 + scoreSmallP2 + scoreLargeP2 + scoreChanceP2 + scoreYahtzeeP2;
		
		totalBottomP2Locked.innerHTML = scoreTotalBottomP2;
	}

	if(lockTopP2 === 6 && lockBottomP2 === 7){
		scoreGrandTotalP2 = scoreTotalTopP2 + scoreTotalBottomP2;
		grandP2Locked.innerHTML  = scoreGrandTotalP2;
	}
	console.log("lockBottomP2 = " + lockBottomP2 + " score = " + scoreTotalBottomP2);
}





<!-- wisselen van beurt --!>

function calculatePoints(){
	if(currentPlayer === "player1"){		
		calculatePointsP1(dice);
	}else{		
		calculatePointsP2(dice);
	}

}

function endTurn(){
	if(currentPlayer === "player1"){
		currentPlayer = "player2";
	}else{
		currentPlayer = "player1";
	}
	rollsLeft = 3;
	turn.innerHTML = currentPlayer;
	resetDice();
	round++;
}


<!-- einde game wil je opnieuw? --!>

function endGame(){
	if(scoreGrandTotalP1 > scoreGrandTotalP2){
		winnaar = "Player 1.";
	}else if(scoreGrandTotalP2 > scoreGrandTotalP1){
		winnaar = "Player 2.";
	}else{
		winnaar = "Geen winnaar, gelijk spel."
	}
	
    	const response = confirm("De game is uitgespeeld. de winnaar is " + winnaar + " Wil je opnieuw spelen?");
	
	if(response === true){
		location.reload();
	}
	
}