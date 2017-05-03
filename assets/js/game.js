var game = {

	muted: false,
	saberFX: null,
	saber2FX: null,
	intruderalertFX: null,
	SaberOnFX: null,
	loadyourweaponFX: null,
	finalvictoryFX: null,


	// Toggle music on/off
	musicToggle() {
		document.getElementById('theme').muted = !this.muted;
		this.muted = !this.muted;
	}

}

game.saberFX = new Audio('assets/audio/saber-battle1.mp3');
game.saber2FX = new Audio('assets/audio/saber-battle2.mp3');
game.SaberOnFX = new Audio('assets/audio/lightsaber.mp3');
game.intruderalertFX = new Audio('assets/audio/intruderalert.mp3');
game.loadyourweaponFX = new Audio('assets/audio/loadyourweapon.mp3');
game.finalvictoryFX = new Audio('assets/audio/victorycelebration.mp3');


$(document).ready(function() {
	console.log( "ready!" );

	var charID;
	var characterID;
	var playerone = false;
	var playertwo = false;
	var playeroneIsDead = false;
	var playertwoIsDead = false;
	var allCharacter = [];
	var fightCharacter = [];
	var attackPower;
	var player1HP;
	var player2HP;
	var wincounter = [];


	reset();

	$('#picklukeskywalker').on("click", function(evt) {

		charID = evt.target.id;

		console.log( "luke clicked!!" );
		console.log(evt);

		if (!playerone || !playertwo){
			$('#picklukeskywalker').css({"visibility":"hidden"});
		}

		if(!playerone){
			$('#lukeskywalkerleft').css({"visibility":"visible"});
			game.SaberOnFX.play();
			player1HP = 120;
		}
		else if (!playertwo){
			removeDeadBody();
			progress(100, $('#player2HPBar'), 100);
			$('#lukeskywalkerright').css({"visibility":"visible"});
			game.SaberOnFX.play();
			playertwo = true;
			player2HP = 120;
		}

		playerone = true;
		checkplayer(charID);

	}); // End of pick luke sky walker character

	$('#pickdroidyellow').on("click", function(evt) {

		charID = evt.target.id;	

		console.log( "yellow clicked!!" );
		console.log(evt);

		if (!playerone || !playertwo){
			$('#pickdroidyellow').css({"visibility":"hidden"});
		}

		if(!playerone){
			player1HP = 100;
			$('#droidyellowleft').css({"visibility":"visible"});
			game.intruderalertFX.play();
		}
		else if (!playertwo){
			removeDeadBody();
			progress(100, $('#player2HPBar'), 100);
			$('#droidyellowright').css({"visibility":"visible"});
			game.intruderalertFX.play();
			playertwo = true;
			player2HP = 100;
		}

		playerone = true;
		checkplayer(charID);

	}); // End of pick droid yellow character

	$('#pickdroidbrown').on("click", function(evt) {

		charID = evt.target.id;	

		console.log("brown clicked 1!!");
		console.log(evt);


		if (!playerone || !playertwo){
			$('#pickdroidbrown').css({"visibility":"hidden"});
		}

		if(!playerone){
			$('#droidbrownleft').css({"visibility":"visible"});
			game.intruderalertFX.play();
			player1HP = 150;
		}	
		else if (!playertwo){
			removeDeadBody();
			progress(100, $('#player2HPBar'), 100);
			game.intruderalertFX.play();
			$('#droidbrownright').css({"visibility":"visible"});
			playertwo = true;
			player2HP = 150;
		}

		playerone = true;
		checkplayer(charID);

	}); // End of pick droid brown character

	$('#pickstormtrooper').on("click", function(evt) {

		charID = evt.target.id;	

		console.log(charID);
		console.log("trooper clicked!!");

		if (!playerone || !playertwo){
			$('#pickstormtrooper').css({"visibility":"hidden"});
		}

		if(!playerone){
			$('#stormtrooperleft').css({"visibility":"visible"});
			game.loadyourweaponFX.play();
			player1HP = 180;
		}
		else if (!playertwo){
			removeDeadBody();
			$('#stormtrooperright').css({"visibility":"visible"});
			game.loadyourweaponFX.play();
			playertwo = true;
			player2HP = 180;
		}

		playerone = true;
		checkplayer(charID);

	}); // End of pick droid yellow character



	
	// Key press handler
	document.onkeyup = function(event){
		event = event || window.event;

		var key = event.keyCode;

	 	// Check if letter key
	 	if (key === 32){
	 		// If space is pressed
	 		$(this).focus();

	 		$('#lukeskywalkerleft').css({"visibility":"hidden"});
	 		$('#droidyellowleft').css({"visibility":"hidden"});
	 		$('#droidbrownleft').css({"visibility":"hidden"});
	 		$('#stormtrooperleft').css({"visibility":"hidden"}); 
	 		$('#lukeskywalkerright').css({"visibility":"hidden"});
	 		$('#droidyellowright').css({"visibility":"hidden"});
	 		$('#droidbrownright').css({"visibility":"hidden"});
	 		$('#stormtrooperright').css({"visibility":"hidden"});

	 		console.log("In my fight array i have lehgth:" +fightCharacter.length+" and character id"+fightCharacter[0]+" 2 chacter id"+ fightCharacter[1]);


	 		if(fightCharacter.length>0 && !playertwoIsDead){

	 			if (fightCharacter[0].id==="picklukeskywalker"){
	 				$("#lukeskywalkerattacksleft").css({"visibility":"visible"});
	 				$("#lukeskywalkerattacksleft").animate({ left: "+60px" }, "normal");
	 				$("#lukeskywalkerattacksleft").animate({ left: "+1px" }, "normal");
	 			}
	 			if(fightCharacter.length==2){
	 				if (fightCharacter[1].id==="picklukeskywalker"){
	 					$("#lukeskywalkerattacksright").css({"visibility":"visible"});
	 					$("#lukeskywalkerattacksright").animate({ left: "-60px" }, "normal");
	 					$("#lukeskywalkerattacksright").animate({ left: "-1px" }, "normal");
	 				}
	 			}

	 			if (fightCharacter[0].id==="pickdroidyellow"){			
	 				$("#droidyellowattacksleft").css({"visibility":"visible"});
	 				$("#droidyellowattacksleft").animate({ left: "+60px" }, "normal");
	 				$("#droidyellowattacksleft").animate({ left: "+1px" }, "normal");
	 			}

	 			if(fightCharacter.length==2){
	 				if (fightCharacter[1].id==="pickdroidyellow"){			
	 					$("#droidyellowattacksright").css({"visibility":"visible"});
	 					$("#droidyellowattacksright").animate({ left: "-60px" }, "normal");
	 					$("#droidyellowattacksright").animate({ left: "-1px" }, "normal");
	 				}
	 			}

	 			if (fightCharacter[0].id==="pickdroidbrown"){			
	 				$("#droidbrownattacksleft").css({"visibility":"visible"});
	 				$("#droidbrownattacksleft").animate({ left: "+60px" }, "normal");
	 				$("#droidbrownattacksleft").animate({ left: "+1px" }, "normal");
	 			}

	 			if(fightCharacter.length==2){
	 				if (fightCharacter[1].id==="pickdroidbrown"){			
	 					$("#droidbrownattacksright").css({"visibility":"visible"});
	 					$("#droidbrownattacksright").animate({ left: "-60px" }, "normal");
	 					$("#droidbrownattacksright").animate({ left: "0px" }, "normal");
	 				}
	 			}

	 			if (fightCharacter[0].id==="pickstormtrooper"){			
	 				$("#stormtrooperattacksleft").css({"visibility":"visible"});
	 				$("#stormtrooperattacksleft").animate({ left: "+60px" }, "normal");
	 				$("#stormtrooperattacksleft").animate({ left: "+1px" }, "normal");
	 			}

	 			if(fightCharacter.length==2){
	 				if (fightCharacter[1].id==="pickstormtrooper"){			
	 					$("#stormtrooperattacksright").css({"visibility":"visible"});
	 					$("#stormtrooperattacksright").animate({ left: "-60px" }, "normal");
	 					$("#stormtrooperattacksright").animate({ left: "0px" }, "normal");
	 				}
	 			}


	 			if(fightCharacter.length==2){

					// When user click on attack, attacker HP -- defender counter Attack power
					fightCharacter[0].healthPoints -= fightCharacter[1].counterAttackPower;
					$("#player1HP").text(fightCharacter[0].healthPoints);

					console.log("original HP:"+player1HP);
					console.log("updated HP:"+fightCharacter[0].healthPoints);
					// What is the percentage of your player 1 health NOW?
					// 100/120

					percentage = Math.floor(fightCharacter[0].healthPoints/player1HP*100);

					console.log("what is your percentage: "+ percentage);

					progress(percentage, $('#player1HPBar'), player1HP);

					if(fightCharacter[0].healthPoints>0){

						game.saberFX.play();
						// When user click on attack, defender HP -- Attack Power
						fightCharacter[1].healthPoints -= fightCharacter[0].attackPower;	
						$("#player2HP").text(fightCharacter[1].healthPoints);

						percentage2 = Math.floor(fightCharacter[1].healthPoints/player2HP*100);
						progress(percentage2, $('#player2HPBar'), player2HP);
					}

					fightCharacter[0].attackPower+=fightCharacter[0].attackPower;

					if(fightCharacter[1].healthPoints<=0){
						console.log("Pick another character");
						$("#"+fightCharacter[1].charClassright).css({"visibility":"hidden"});
						playertwo = false;
						playertwoIsDead = true;
						$("#player2HP").text("0");
						
						deadAnimation("1",fightCharacter[1].id);

						wincounter.push(fightCharacter[1].id);
						// Remove defeated character from fight character object array
						fightCharacter.splice(1,1);

						if(wincounter.length<3){
							$("#pickstatus").text("Pick Another Character");
						}else{
							$("#pickstatus").text("You WIN !!!");
							
							if (fightCharacter[0].id==="picklukeskywalker"){
								$("#lukeskywalkerattacksleft").css({"visibility":"hidden"});
								$("#lukeskywalkervictoryleft").css({"visibility":"visible"});
							}
							game.musicToggle();
							game.finalvictoryFX.play();
						}

						console.log("number of wins: " + wincounter.length);

					}	

					console.log("inside keyup, is player two dead or alive?"+playertwoIsDead);

					if(fightCharacter[0].healthPoints<=0){
						$("#player1HP").text("");
						playeroneIsDead = true;
						console.log("You are DEAD!");
						$("#pickstatus").text("You LOST! Game Over!");
						deadAnimation("0",fightCharacter[0].id);
						$("#"+fightCharacter[0].charClassleft).css({"visibility":"hidden"});
					}

					// update();

				}

		 	}	// game.update();
		 } else {}
	} // End of key press



	function removeDeadBody()
	{

		$('#lukeskywalkerdeadright').css({"visibility":"hidden"});
		$('#droidyellowdeadright').css({"visibility":"hidden"});
		$('#droidbrowndeadright').css({"visibility":"hidden"});
		$('#stormtrooperdeadright').css({"visibility":"hidden"});
	}	

	function deadAnimation(index,charID){

		if(index==="0"){
			if(charID==="picklukeskywalker"){
				$('#lukeskywalkerdeadleft').css({"visibility":"visible"});
			}

			if(charID==="pickdroidyellow"){
				$('#droidyellowdeadleft').css({"visibility":"visible"});
			}	

			if(charID==="pickdroidbrown"){
				$('#droidbrowndeadleft').css({"visibility":"visible"});
			}	
			if(charID==="pickstormtrooper"){
				$('#stormtrooperdeadleft').css({"visibility":"visible"});
			}	
		}

		if(index==="1"){

			console.log("dead player two"+ charID);
			if(charID==="picklukeskywalker"){
				$('#lukeskywalkerdeadright').css({"visibility":"visible"});
			}

			if(charID==="pickdroidyellow"){
				$('#droidyellowdeadright').css({"visibility":"visible"});
			}	

			if(charID==="pickdroidbrown"){
				$('#droidbrowndeadright').css({"visibility":"visible"});
			}	
			if(charID==="pickstormtrooper"){
				$('#stormtrooperdeadright').css({"visibility":"visible"});
			}		
		}

	}	

	function checkplayer(charID){

		for(var i=0; i<allCharacter.length;i++){
			if(allCharacter[i].id === charID && fightCharacter.length <2){
				fightCharacter.push(allCharacter[i]);	
			}
		}
		if(fightCharacter.length===1){
			$("#player1HP").text(fightCharacter[0].healthPoints);
			$("#pickstatus").text("Pick Another Character");
		}
		
		if(fightCharacter.length===2){
			playertwoIsDead = false;
			$("#player2HP").text(fightCharacter[1].healthPoints);
			$("#pickstatus").text("Fight!!");
			
		}
	} 

	function playerHPFight(player1, player2){

	}

	function reset(){

		charID="";
		playerone = false;
		playertwo = false;

		progress(100, $('#player2HPBar'), 100);
		progress(100, $('#player1HPBar'), 100);


		$('#picklukeskywalker').css({"visibility":"show"});
		$('#pickdroidyellow').css({"visibility":"show"});
		$('#pickdroidbrown').css({"visibility":"show"});
		$('#pickstormtrooper').css({"visibility":"show"});

		allCharacter = [
		{"id": "picklukeskywalker", "name":"Luke Sky Walker", "healthPoints":120, "attackPower":8, "counterAttackPower":20, "charClassright":"lukeskywalkerattacksright", "charClassleft":"lukeskywalkerattacksleft"},
		{"id": "pickdroidyellow","name":"Yellow Droid", "healthPoints":100, "attackPower":20, "counterAttackPower":5, "charClassright":"droidyellowattacksright", "charClassleft":"droidyellowattacksleft"},
		{"id": "pickdroidbrown","name":"Brown Droid", "healthPoints":150, "attackPower":20, "counterAttackPower":20, "charClassright":"droidbrownattacksright", "charClassleft":"droidbrownattacksleft"},
		{"id": "pickstormtrooper","name":"Storm Trooper", "healthPoints":180, "attackPower":20, "counterAttackPower":25, "charClassright":"stormtrooperattacksright", "charClassleft":"stormtrooperattacksleft"}
		];	
	}
	
	function progress(percent, $element, totalHP) {
		var progressBarWidth = percent * $element.width() / totalHP;
		$element.find('div').animate({ width: progressBarWidth }, 500);
	}    


}); // End of document ready
