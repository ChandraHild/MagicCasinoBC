//changes:
//if a player writes !start during player selection they get registered as if they wrote !play
//reward available message only shows up only when the player hits 7 wins, not each time they have 7 wins
//fixed reward taking 4 orgasms instead of 3
//added link to git for Bugs/suggestions



i ServerSocket.on("ChatRoomMessage", function (data) { ChatRoomMessageAdd(data); });

if (typeof ChatRoomMessageAdditionDict === 'undefined') {
  ChatRoomMessageAdditionDict = {}
}

function ChatRoomMessageAdd(data) {

	// Make sure the message is valid (needs a Sender and Content)
	if ((data != null) && (typeof data === "object") && (data.Content != null) && (typeof data.Content === "string") && (data.Content != "") && (data.Sender != null) && (typeof data.Sender === "number")) {

		// Make sure the sender is in the room
		var SenderCharacter = null;
		for (var C = 0; C < ChatRoomCharacter.length; C++)
			if (ChatRoomCharacter[C].MemberNumber == data.Sender) {
				SenderCharacter = ChatRoomCharacter[C]
				break;
			}

		// If we found the sender
		if (SenderCharacter != null) {

			// Replace < and > characters to prevent HTML injections
			var msg = data.Content;
			while (msg.indexOf("<") > -1) msg = msg.replace("<", "&lt;");
			while (msg.indexOf(">") > -1) msg = msg.replace(">", "&gt;");


      // This part is to append code react to certain message
      for (var key in ChatRoomMessageAdditionDict) {
        ChatRoomMessageAdditionDict[key](SenderCharacter, msg, data)
      }
    }
  }
}

// -----------------------------------------------------------------------------------------------

ChatRoomMessageAdditionDict["Ungarble"] = function(SenderCharacter, msg, data) {ChatRoomMessageUngarble(SenderCharacter, msg, data)}

function ChatRoomMessageUngarble(SenderCharacter, msg, data) {
  // This part is to display a chat message that shows the ungarbled message when someone is gagged.
  if (data.Type != null) {
    if ((data.Type == "Chat")) { // && (SenderCharacter.MemberNumber != Player.MemberNumber)) {

      var GagEffect = 0;
      GagEffect += SpeechGetGagLevel(SenderCharacter, "ItemMouth");
      GagEffect += SpeechGetGagLevel(SenderCharacter, "ItemMouth2");
      GagEffect += SpeechGetGagLevel(SenderCharacter, "ItemMouth3");
      GagEffect += SpeechGetGagLevel(SenderCharacter, "ItemHead");
      GagEffect += SpeechGetGagLevel(SenderCharacter, "ItemMouth");
      GagEffect += SpeechGetGagLevel(SenderCharacter, "ItemDevices");

      if (GagEffect>0) {
        msg = '<span class="ChatMessageName" style="color:' + (SenderCharacter.LabelColor || 'gray') + ';">' + SenderCharacter.Name + ':</span> ' + msg  //<span style="font-size: 0.5em;"> (gagged) ' + msg + '</span>'

        // Adds the message and scrolls down unless the user has scrolled up
        var enterLeave = "";

  // END OF CUSTOM CODE --------------------------------------------

        var div = document.createElement("div");
        div.setAttribute('class', 'ChatMessage ChatMessage' + data.Type + enterLeave);
        div.setAttribute('data-enterleave','smaller')
        //div.setAttribute('data-time', ChatRoomCurrentTime());
        //div.setAttribute('data-sender', data.Sender);
        div.setAttribute('style', 'padding-left: 0.8em; font-size: 0.6em; background-color:' + ChatRoomGetTransparentColor(SenderCharacter.LabelColor) + ';');
        div.innerHTML = msg;

        var Refocus = document.activeElement.id == "InputChat";
        var ShouldScrollDown = ElementIsScrolledToEnd("TextAreaChatLog");
        if (document.getElementById("TextAreaChatLog") != null) {
          document.getElementById("TextAreaChatLog").appendChild(div);
          if (ShouldScrollDown) ElementScrollToEnd("TextAreaChatLog");
          if (Refocus) ElementFocus("InputChat");
        }
      }
    }
  }
}

// -----------------------------------------------------------------------------------------------

class personMagicData {
  name = ''
  role = ''
	//rules = [] only present in prototypes
	points = 0
  totalPointsGained = 0
	lockCode = Math.floor(Math.random() * 9000+1000).toString()
	beingPunished = false
	strike = 0
	orgasmResisted = 0
	vulvaIntensity = 1
	buttIntensity = 1
  lastActivity = Date.now()
  allowedOrgasmNum = 0
}
if (personMagicData.prototype.rules == null) {
  personMagicData.prototype.rules = []
}

if (typeof customerList === 'undefined') {
	customerList = {}
  customerList[Player.MemberNumber] = new personMagicData()
  customerList[Player.MemberNumber].role = "Bot"
  customerList[Player.MemberNumber].rules = []
}

// -----------------------------------------------------------------------------------------------

function freeAll() {
	for (var R = 0; R < ChatRoomCharacter.length; R++) {
		removeRestrains(R)
		reapplyClothing(ChatRoomCharacter[R])
		ChatRoomCharacterUpdate(ChatRoomCharacter[R])
	}
	ServerSend("ChatRoomChat", { Content: "*Everyone has been freed.", Type: "Emote"} );
}

function removeRestrains(target){
	InventoryRemove(ChatRoomCharacter[target],"ItemVulva")
	InventoryRemove(ChatRoomCharacter[target],"ItemButt")
	InventoryRemove(ChatRoomCharacter[target],"ItemArms")
	InventoryRemove(ChatRoomCharacter[target],"ItemHands")
	InventoryRemove(ChatRoomCharacter[target],"ItemNeck")
	InventoryRemove(ChatRoomCharacter[target],"ItemMouth")
	InventoryRemove(ChatRoomCharacter[target],"ItemMouth2")
	InventoryRemove(ChatRoomCharacter[target],"ItemMouth3")
	InventoryRemove(ChatRoomCharacter[target],"ItemTorso")
	InventoryRemove(ChatRoomCharacter[target],"ItemLegs")
	InventoryRemove(ChatRoomCharacter[target],"ItemFeet")
	InventoryRemove(ChatRoomCharacter[target],"ItemBoots")
	InventoryRemove(ChatRoomCharacter[target],"ItemNipplesPiercings")
	InventoryRemove(ChatRoomCharacter[target],"ItemPelvis")
	InventoryRemove(ChatRoomCharacter[target],"ItemHead")
	InventoryRemove(ChatRoomCharacter[target],"ItemDevices")
}

function removeClothes(target, removeUnderwear = true){
	InventoryRemove(ChatRoomCharacter[target],"Cloth")
	InventoryRemove(ChatRoomCharacter[target],"ClothLower")
	InventoryRemove(ChatRoomCharacter[target],"ClothAccessory")
	InventoryRemove(ChatRoomCharacter[target],"Suit")
	InventoryRemove(ChatRoomCharacter[target],"SuitLower")
	InventoryRemove(ChatRoomCharacter[target],"Gloves")
	InventoryRemove(ChatRoomCharacter[target],"Shoes")
	InventoryRemove(ChatRoomCharacter[target],"Hat")
	if (removeUnderwear) {
		InventoryRemove(ChatRoomCharacter[target],"Socks")
		InventoryRemove(ChatRoomCharacter[target],"Bra")
		InventoryRemove(ChatRoomCharacter[target],"Panties")
	}
}

function dollify(targetMemberNumber, mustKneel=false, mustStand = false) {
	dressLike(targetMemberNumber,dress="doll")
	for (var R = 0; R < ChatRoomCharacter.length; R++) {
		if (ChatRoomCharacter[R].MemberNumber == targetMemberNumber) {

			// Pose
			if (mustKneel) {CharacterSetActivePose(ChatRoomCharacter[R],"Kneel")}
			if (mustStand) {CharacterSetActivePose(ChatRoomCharacter[R],null)}
			//InventoryWear(ChatRoomCharacter[R], "OneBarPrison","ItemDevices",hairColor)

			// Update Restrain to server
			ChatRoomCharacterUpdate(ChatRoomCharacter[R])

		}
	}
}

function dressLike(targetMemberNumber, dress = "doll", dressColor = "default", removeUnderwear = true, update = true) {
	for (var R = 0; R < ChatRoomCharacter.length; R++) {
		if (ChatRoomCharacter[R].MemberNumber == targetMemberNumber) {

			// remove all previous restrains
			// removeRestrains(R)
			memorizeClothing(ChatRoomCharacter[R])
			removeClothes(R, removeUnderwear)

			// Get the hair color
			if (dressColor == "hair" || dress == "doll" || dress == "talkingDoll") {
				for (var ii = 0; ii < ChatRoomCharacter[R].Appearance.length; ii++) {
					if (ChatRoomCharacter[R].Appearance[ii].Asset.Group.Name == 'HairBack') {
						dressColor = ChatRoomCharacter[R].Appearance[ii].Color
						break;
					}
				}
			} else if (!dressColor.startsWith("#")) {
				dressColor = "default"
			}

			if (dress == "doll" || dress == "talkingDoll") {


				// remove all previous restrains
				removeRestrains(R)

				// Restrain
				//InventoryWear(ChatRoomCharacter[R], "LatexSkirt2","BodyLower",dressColor) //ass
				//InventoryWear(ChatRoomCharacter[R], "Catsuit","Suit",baseBlack)
				//InventoryWear(ChatRoomCharacter[R], "Catsuit","SuitLower",baseBlack)
				//InventoryWear(ChatRoomCharacter[R], "LatexSkirt2","BodyLower",dressColor) // nipple
				InventoryWear(ChatRoomCharacter[R], "LatexSocks1","Socks",dressColor)
				InventoryWear(ChatRoomCharacter[R], "LatexCorset1","Bra",dressColor)
				InventoryWear(ChatRoomCharacter[R], "ThighHighLatexHeels","ItemBoots",dressColor)
				//InventoryWear(ChatRoomCharacter[R], "Catsuit","Gloves",dressColor)
				InventoryWear(ChatRoomCharacter[R], "BoxTieArmbinder","ItemArms",dressColor,100)
				//InventoryWear(ChatRoomCharacter[R], "LatexSkirt2","BodyLower",dressColor) //ItemHands
        if (dress != "talkingDoll") {
  				InventoryWear(ChatRoomCharacter[R], "ClothStuffing","ItemMouth",dressColor)
  				InventoryWear(ChatRoomCharacter[R], "HarnessPanelGag","ItemMouth2",dressColor)
  				InventoryWear(ChatRoomCharacter[R], "LatexPostureCollar","ItemMouth3",dressColor)
        }
				InventoryWear(ChatRoomCharacter[R], "LatexBlindfold","ItemHead",dressColor)
				InventoryWear(ChatRoomCharacter[R], "LatexSkirt1","ClothLower",dressColor)

				InventoryWear(ChatRoomCharacter[R], "SpreaderMetal","ItemFeet",dressColor)
				//InventoryWear(ChatRoomCharacter[R], "LeatherLegCuffs","ItemFeet",dressColor)


			} else if (dress == "maid") {
				InventoryWear(ChatRoomCharacter[R], "Socks5","Socks","#d2d2d2")
				InventoryWear(ChatRoomCharacter[R], "Shoes4","Shoes")
				InventoryWear(ChatRoomCharacter[R], "MaidOutfit1","Cloth")
				InventoryWear(ChatRoomCharacter[R], "FrillyApron","ClothAccessory")
				InventoryWear(ChatRoomCharacter[R], "MaidHairband1","Hat")
				InventoryWear(ChatRoomCharacter[R], "MaidCollar","ItemNeck")


			} else if (dress == "cow") {
        //InventoryWear(ChatRoomCharacter[R], "CowPrintedBra","Bra")
        InventoryWear(ChatRoomCharacter[R], "CowPrintedPanties","Panties")
				InventoryWear(ChatRoomCharacter[R], "Horns2","HairAccessory1","#FFFFFF")
				InventoryWear(ChatRoomCharacter[R], "LeatherArmbinder","ItemArms","default", 50)
				InventoryWear(ChatRoomCharacter[R], "PonyBoots","Shoes")
				InventoryWear(ChatRoomCharacter[R], "CowPrintedSocks","Socks")
				InventoryWear(ChatRoomCharacter[R], "CowPrintedGloves","Gloves")
				InventoryWear(ChatRoomCharacter[R], "Cowtail","ItemButt")
				InventoryWear(ChatRoomCharacter[R], "LeatherStrapHarness","ItemTorso")
				//InventoryGet(ChatRoomCharacter[R], "ItemArms").Property = {Type: "Strap", Difficulty: 3}

			} else if (dress == "pony") {
				InventoryWear(ChatRoomCharacter[R], "HorsetailPlug","ItemButt",dressColor) //HorsetailPlug1
				InventoryWear(ChatRoomCharacter[R], "LeatherArmbinder","ItemArms",dressColor,50)
				InventoryWear(ChatRoomCharacter[R], "HarnessPonyBits","ItemMouth",dressColor)
				InventoryWear(ChatRoomCharacter[R], "PonyBoots","Shoes",dressColor)
				InventoryWear(ChatRoomCharacter[R], "LeatherHarness","ItemTorso",dressColor)

			} else if (dress == "cat"|| dress == "kitty") {
				InventoryWear(ChatRoomCharacter[R], "TailButtPlug","ItemButt",dressColor)
				InventoryWear(ChatRoomCharacter[R], "BitchSuit","ItemArms",dressColor)
				InventoryWear(ChatRoomCharacter[R], "KittyGag","ItemMouth2",dressColor)
				//InventoryWear(ChatRoomCharacter[R], "ClothStuffing","ItemMouth")
				InventoryWear(ChatRoomCharacter[R], "LeatherChoker","ItemNeck")
				InventoryWear(ChatRoomCharacter[R], "CollarBell","ItemNeckAccessories")
				//InventoryWear(ChatRoomCharacter[R], "HarnessBallGag","ItemMouth",dressColor)
				InventoryWear(ChatRoomCharacter[R], "Ears2","HairAccessory1",dressColor)

			} else if (dress == "puppy" || dress == "dog") {
				InventoryWear(ChatRoomCharacter[R], "WolfTailStrap3","TailStraps",dressColor) //PuppyTailStrap1 PuppyTailStrap WolfTailStrap3
				InventoryWear(ChatRoomCharacter[R], "BitchSuit","ItemArms",dressColor)
				//InventoryWear(ChatRoomCharacter[R], "KittyGag","ItemMouth2",dressColor)
				//InventoryWear(ChatRoomCharacter[R], "DogMuzzleExposed","ItemMouth",dressColor)
				//InventoryWear(ChatRoomCharacter[R], "XLBoneGag","ItemMouth",dressColor)
				InventoryWear(ChatRoomCharacter[R], "LeatherChoker","ItemNeck",dressColor)
				//InventoryWear(ChatRoomCharacter[R], "CollarBell","ItemNeckAccessories")
				//InventoryWear(ChatRoomCharacter[R], "HarnessBallGag","ItemMouth",dressColor)
				InventoryWear(ChatRoomCharacter[R], "PuppyEars1","HairAccessory1",dressColor)

			} else if (dress == "trainer") {
        InventoryWear(ChatRoomCharacter[R], "Jeans1", "ClothLower", "#bbbbbb");
        InventoryWear(ChatRoomCharacter[R], "Boots1", "Shoes", "#3d0200");
        InventoryWear(ChatRoomCharacter[R], "Gloves1", "Gloves", "#cccccc");
        InventoryWear(ChatRoomCharacter[R], "TShirt1", "Cloth", "#aa8080");
        InventoryWear(ChatRoomCharacter[R], "Beret1", "Hat", "#202020");

			} else if (dress == "mistress") {
        InventoryWear(ChatRoomCharacter[R], "MistressBoots", "Shoes", dressColor);
        InventoryWear(ChatRoomCharacter[R], "MistressGloves", "Gloves", dressColor);
        InventoryWear(ChatRoomCharacter[R], "MistressTop", "Cloth", dressColor);
        InventoryWear(ChatRoomCharacter[R], "MistressBottom", "ClothLower", dressColor);
			}

			// Update Restrain to server
			if (update) { ChatRoomCharacterUpdate(ChatRoomCharacter[R]) }

		}
	}
}


function OnlineReputationGet(target,RepType) {
	for (var R = 0; R < target.Reputation.length; R++) {
		if (target.Reputation[R].Type == RepType)
		// ServerSend("ChatRoomChat", { Content: "*rep " + parseInt(target.Reputation[R].Value), Type: "Chat"} );
		return parseInt(target.Reputation[R].Value);
	}
	// ServerSend("ChatRoomChat", { Content: "*rep 0", Type: "Chat"} );
	return 0;
}


function free(targetMemberNumber, update = true, reapplyCloth = true) {
	//punishList.splice( punishList.indexOf(targetMemberNumber), 1 );
	for (var R = 0; R < ChatRoomCharacter.length; R++) {
		if (ChatRoomCharacter[R].MemberNumber == targetMemberNumber) {
			removeRestrains(R)
			if (reapplyCloth) {reapplyClothing(ChatRoomCharacter[R])}
			if (update) { ChatRoomCharacterUpdate(ChatRoomCharacter[R]) }
			//ServerSend("ChatRoomChat", { Content: "*" + ChatRoomCharacter[R].Name + ", your punishment is over. From now on, try to behave like a good girl.", Type: "Emote", Target: ChatRoomCharacter[R].MemberNumber} );
		}
	}
}


function dollifyAll(excludeMemberNumber = -1) {
	for (jj = 0; jj < ChatRoomCharacter.length; jj++) {
		if (ChatRoomCharacter[jj].MemberNumber != Player.MemberNumber && ChatRoomCharacter[jj].MemberNumber != excludeMemberNumber) {
			dollify(ChatRoomCharacter[jj].MemberNumber)
		}
	}
}

function isExposed(C, ignoreItemArray = []) {
  if (InventoryAllow(C, ["AccessBreast", "AccessVulva"]) && !customInventoryGroupIsBlocked(C, "ItemBreast") && !customInventoryGroupIsBlocked(C, "ItemNipples") && !customInventoryGroupIsBlocked(C, "ItemVulva", ignoreItemArray)) {
    return true
  }
  return false
}


function customInventoryGroupIsBlocked(C, GroupName, ignoreItemArray = []) {

	// Items can block each other (hoods blocks gags, belts blocks eggs, etc.)
	for (var E = 0; E < C.Appearance.length; E++) {
    if (ignoreItemArray.includes(C.Appearance[E].Asset.Name)) continue;
		if (!C.Appearance[E].Asset.Group.Clothing && (C.Appearance[E].Asset.Block != null) && (C.Appearance[E].Asset.Block.includes(GroupName))) return true;
		if (!C.Appearance[E].Asset.Group.Clothing && (C.Appearance[E].Property != null) && (C.Appearance[E].Property.Block != null) && (C.Appearance[E].Property.Block.indexOf(GroupName) >= 0)) return true;
	}

	// Nothing is preventing the group from being used
	return false;

}

//-------------------------------------------------------------------------------------------------------------------------
clothMemoryList = {}

function memorizeClothing(char) {
	clothMemoryList[char.MemberNumber] = char.Appearance.slice(0)
}


function reapplyClothing(char, update=true) {
	if (char.MemberNumber in clothMemoryList) {
		char.Appearance = clothMemoryList[char.MemberNumber].slice(0)
		if (update) {
			CharacterRefresh(char);
			ChatRoomCharacterUpdate(char)
		}
		delete clothMemoryList[char.MemberNumber]
	}
}

function getCharByName(name) {
	for (var i = 0; i < ChatRoomCharacter.length; i++) {
		if (ChatRoomCharacter[i].Name == name) {
			return ChatRoomCharacter[i]
		}
	}
	return false
}





// System - ATTENTION: subs will be chained upon entering and must play to leave.
// -----------------------------------------------------------------------------

winTarget = 12
requestDict = {}
domWinReward = 7

// new line in chat - BEGIN
nl = `
`
// new line in chat - END

Player.Description = `THE PLAYER: a player (can be a sub or dom) takes a sub (another player) as their stack and play using their clothes and restraints as chips.
THE SUB STACK: A sub that represent the amount chips available to the player. Each time they lose a chip the sub loses clothes or get restraints.

DOM: can only be a player, not a sub stack. Has no actual penalty.
SUB: as you can see subs are chained upon entering and the only way to leave is to get 5 wins. You can play either as a stack for someone else or as a player. In case you are a player you lose 2 chips for every win and also winning is harder. You must get a ` + (winTarget+1) + ` instead of a ` + winTarget + `.

HOW TO GET A SUB STACK: To get sub be your stack of chips you must find a willing sub and whisper me the command : !stack <name_of_the_sub> (without <>). The sub will need to accept. You can't be your own stack.

GAME EXPLANATION: To start a game round whisper !start. When the game starts the dealer will ask who wants to play. If you accept you will bet one chip. Then a card is shown (value from 1 to 10). After that you can decide to bet 1 chip or fold. Then if someone is still playing a second card is draw. If the sum is ` + winTarget + ` or higher the player wins, otherwise they lose.

THE CHIP: The chip are actually sub clothes and restraints. Each time you lose/spend a chip your sub will lose a piece of clothing or get a restraint. There are 4 clothes and 4 restraints.

AFTER 5 WINS (SUB): You will receive the code of your locks and can leave (well someone still has to take the lock off). The number of your wins returns to 0 and now you can play like if you are a dom: you can get a stack and continue playing!
AFTER ` + domWinReward + ` WINS (DOM): You get a special reward. You will have to play to discover what it is.

------------------------------------------------

COMMANDS: all commands must be whispered to myself.

!leave - You will be restrained with a mistress timer padklock (5 mins) and kicked out of the room.
!point - use this to check how many wins you have, how many chips and who is your domme/sub.

!start - [Dommes ONLY] start a new round
!play - [Dommes ONLY] when a new round starts you can play by using this command. You need to have a stack.
!no - [Dommes ONLY] you can use this command to say that you are not playing a round. This may help speed up the first phase.
!bet - [Dommes ONLY] after the first card is shown you can bet with this command
!fold - [Dommes ONLY] after the first card is shown you can fold with this command
!stack <name_of_the_sub> - [Dommes ONLY] use this to take a sub as your stack (dommes only)
!accept - [Subs ONLY] to accept a domme
!refuse - [Subs ONLY] to refuse a domme
` // end of description
ServerSend("AccountUpdate", { Description: Player.Description });
ChatRoomCharacterUpdate(Player)

if (typeof timeoutHandle === 'undefined') {
  var timeoutHandle
}

resetGame()


if (personMagicData.prototype.winNum == null) {
  personMagicData.prototype.winNum = 0
}

if (personMagicData.prototype.chips == null) {
  personMagicData.prototype.chips = 10
}

if (personMagicData.prototype.linkedTo == null) {
  personMagicData.prototype.linkedTo = 0
}

if (personMagicData.prototype.isPlayer == null) {
  personMagicData.prototype.isPlayer = false
}


ChatRoomMessageAdditionDict["EnterLeave"] = function(SenderCharacter, msg, data) {ChatRoomMessageEnterLeave(SenderCharacter, msg, data)}
ChatRoomMessageAdditionDict["Casino"] = function(SenderCharacter, msg, data) {ChatRoomMessageCasino(SenderCharacter, msg, data)}

function ChatRoomMessageEnterLeave(SenderCharacter, msg, data) {
  if ((data.Type == "Action") && (msg.startsWith("ServerEnter"))) {
    timeoutHandle = setTimeout(enterLeaveEvent,1*1000,SenderCharacter,msg)
  } else if ((msg.startsWith("ServerLeave")) || (msg.startsWith("ServerDisconnect")) || (msg.startsWith("ServerBan")) || (msg.startsWith("ServerKick"))) {
    if (SenderCharacter.MemberNumber in customerList && customerList[SenderCharacter.MemberNumber].linkedTo != 0) {
      customerList[customerList[SenderCharacter.MemberNumber].linkedTo].linkedTo = 0
      customerList[customerList[SenderCharacter.MemberNumber].linkedTo].isPlayer = false
      ServerSend("ChatRoomChat", { Content: "*" + SenderCharacter.Name + " left. You are not coupled together anymore.", Type: "Emote", Target: customerList[SenderCharacter.MemberNumber].linkedTo} );
      if (SenderCharacter.MemberNumber in game.playerDict) {delete game.playerDict[SenderCharacter.MemberNumber]}
      if (customerList[SenderCharacter.MemberNumber].linkedTo in game.playerDict) {delete game.playerDict[customerList[SenderCharacter.MemberNumber].linkedTo]}
    }
    if (game.rewardTarget == SenderCharacter.MemberNumber) {
      resetGame()
      ServerSend("ChatRoomChat", { Content: "*" + customerList[SenderCharacter.MemberNumber].name + " left the room, the game will restart normally.", Type: "Emote"} );
    }
  }
}

function firstCard() {
  if (Object.keys(game.playerDict).length == 0) {
    ServerSend("ChatRoomChat", { Content: "None wants to play at the moment.", Type: "Chat"} );
    resetGame()
  } else {
    game.status = "bet"
    ServerSend("ChatRoomChat", { Content: "Each one of you will draw a card: ", Type: "Chat"} );
    mess = `*--------------------`
    for (var key in game.playerDict) {
      game.cardDict[key] = Math.floor(Math.random() * 10 + 1)
      mess = mess + nl + customerList[key].name + `: ` + game.cardDict[key]
    }
    mess = mess + nl + `--------------------`
    ServerSend("ChatRoomChat", { Content: mess, Type: "Emote"} );
    ServerSend("ChatRoomChat", { Content: "What are you going to do? [!bet or !fold]", Type: "Chat"} );
    timeoutHandle = setTimeout(secondCard, 30*1000)
  }
}

function secondCard() {
  game.status = "end"
  continuePlay = false
  for (var key in game.playerDict) {
    if (game.playerDict[key]>0) {
      continuePlay = true
      break
    }
  }

  if (continuePlay) {
    game.secondCard = Math.floor(Math.random() * 10 + 1)
    ServerSend("ChatRoomChat", { Content: "And the second card is: " + game.secondCard, Type: "Chat"} );
  } else {
    ServerSend("ChatRoomChat", { Content: "Everyone folded.", Type: "Chat"} );
  }


  mess = `*--------------------`
  for (var key in game.playerDict) {
    if (game.playerDict[key]==1) {
      if ((game.cardDict[key] + game.secondCard) >= (winTarget + (customerList[key].role == "sub" ? 1 : 0))) {
        if (customerList[key].role == "sub") {stackPay(key, 2); customerList[key].chips -= 2} // a sub player loses two chips for every win.
		customerList[key].winNum += 1
		if(customerList[key].winNum == domWinReward){
		customerList[key].winNum = -1
		}
        customerList[customerList[key].linkedTo].winNum += 1
        mess = mess + nl + customerList[key].name + ` & ` + customerList[customerList[key].linkedTo].name + `: ` + (game.cardDict[key] + game.secondCard) + ` (WIN)`
      } else {
        stackPay(customerList[key].linkedTo, 2)
        customerList[customerList[key].linkedTo].chips -= 2
        mess = mess + nl + customerList[key].name + ` & ` + customerList[customerList[key].linkedTo].name + `: ` + (game.cardDict[key] + game.secondCard) + ` (LOSE) - Lost 2 chips`
      }
    } else {
      stackPay(customerList[key].linkedTo, 1)
      customerList[customerList[key].linkedTo].chips -= 1
      mess = mess + nl + customerList[key].name + ` & ` + customerList[customerList[key].linkedTo].name + `: ` + game.cardDict[key] + ` (FOLDED) - Lost 1 chip`
    }
  }
  mess = mess + nl + `--------------------`
  ServerSend("ChatRoomChat", { Content: mess, Type: "Emote"} );

  timeoutHandle = setTimeout(checkWinners, 10*1000)

}

function checkWinners() {

  for (var D = 0; D < ChatRoomCharacter.length; D++) {

    if (!(ChatRoomCharacter[D].MemberNumber in customerList)) { continue }

    if (customerList[ChatRoomCharacter[D].MemberNumber].role == "sub") {
      if (customerList[ChatRoomCharacter[D].MemberNumber].chips <= 0) {
        ServerSend("ChatRoomChat", { Content: ChatRoomCharacter[D].Name + ", seems that you have nothing else to give. You lost everything and now you will be locked here forever.", Type: "Chat"} );
        if (customerList[customerList[ChatRoomCharacter[D].MemberNumber].linkedTo].isPlayer) {
          ServerSend("ChatRoomChat", { Content: customerList[customerList[ChatRoomCharacter[D].MemberNumber].linkedTo].name + ", you didn't play very well but don't worry, just find another stack and try again!", Type: "Chat"} );
        } else {
          ServerSend("ChatRoomChat", { Content: customerList[customerList[ChatRoomCharacter[D].MemberNumber].linkedTo].name + ", the dumb slut that was playing with you demonstrated to be a complete failure. You have to find someone else to play with.", Type: "Chat"} );
        }
        customerList[customerList[ChatRoomCharacter[D].MemberNumber].linkedTo].linkedTo = 0
        customerList[customerList[ChatRoomCharacter[D].MemberNumber].linkedTo].isPlayer = false
        customerList[ChatRoomCharacter[D].MemberNumber].linkedTo = 0
        customerList[ChatRoomCharacter[D].MemberNumber].isPlayer = false
        customerList[ChatRoomCharacter[D].MemberNumber].role = "loser"
      } else if (customerList[ChatRoomCharacter[D].MemberNumber].winNum == 5) {
        ServerSend("ChatRoomChat", { Content: "Congratulations " + ChatRoomCharacter[D].Name + "! You got 5 wins. You have earned your freedom. You can leave or you can continue playing as if you were a domme.", Type: "Chat"} );
        ServerSend("ChatRoomChat", { Content: "(Private) Your lock code is: " + customerList[ChatRoomCharacter[D].MemberNumber].lockCode , Type: "Chat", Target: ChatRoomCharacter[D].MemberNumber});
        if (customerList[customerList[ChatRoomCharacter[D].MemberNumber].linkedTo].isPlayer) {
          ServerSend("ChatRoomChat", { Content: customerList[customerList[ChatRoomCharacter[D].MemberNumber].linkedTo].name + ", you played well! Actually, too well. You have to find another stack now. *SMILE*", Type: "Chat"} );
        } else {
          ServerSend("ChatRoomChat", { Content: customerList[customerList[ChatRoomCharacter[D].MemberNumber].linkedTo].name + ", your... ehmm... mistress earned her freedom. You have to find someone else to play with.", Type: "Chat"} );
        }
        customerList[customerList[ChatRoomCharacter[D].MemberNumber].linkedTo].linkedTo = 0
        customerList[customerList[ChatRoomCharacter[D].MemberNumber].linkedTo].isPlayer = false
        customerList[ChatRoomCharacter[D].MemberNumber].linkedTo = 0
        customerList[ChatRoomCharacter[D].MemberNumber].isPlayer = false
        customerList[ChatRoomCharacter[D].MemberNumber].role = "dom"
        customerList[ChatRoomCharacter[D].MemberNumber].winNum = 0
      }
    } else {
      if (customerList[ChatRoomCharacter[D].MemberNumber].winNum == -1) {
        ServerSend("ChatRoomChat", { Content: "Congratulations " + ChatRoomCharacter[D].Name + "! You got " + domWinReward + " wins. You have earned the rights to a special reward! When you want to get your reward just use the command !reward.", Type: "Chat"} );
      }
    }

  }

  timeoutHandle = setTimeout(resetGame, 60*1000)

}


function ChatRoomMessageCasino(SenderCharacter, msg, data) {
  if (data.Type != null && SenderCharacter.MemberNumber != Player.MemberNumber) {

    if ((data.Type == "Chat") || (data.Type == "Whisper")) {
      if (msg.includes("!point")) {

        mess = `*--------------------` +
        nl + `YOU` +
        nl + `Chips: ` + customerList[SenderCharacter.MemberNumber].chips +
        nl + `Wins: ` + customerList[SenderCharacter.MemberNumber].winNum +
        nl + `--------------------`

        if (customerList[SenderCharacter.MemberNumber].linkedTo) {

          if (customerList[SenderCharacter.MemberNumber].isPlayer) {
            player = SenderCharacter.Name
            stack = (customerList[SenderCharacter.MemberNumber].linkedTo ? customerList[customerList[SenderCharacter.MemberNumber].linkedTo].name : "None")
            chips = (customerList[SenderCharacter.MemberNumber].linkedTo ? customerList[customerList[SenderCharacter.MemberNumber].linkedTo].chips : "None")
          } else {
            stack = SenderCharacter.Name
            player = (customerList[SenderCharacter.MemberNumber].linkedTo ? customerList[customerList[SenderCharacter.MemberNumber].linkedTo].name : "None")
            chips = customerList[SenderCharacter.MemberNumber].chips
          }

          mess = mess + nl + `PLAYING DUO `
          nl + `Player: ` + player +
          nl + `Stack: ` + stack +
          nl + `Stack chips: ` + chips +
          nl + `--------------------`

        }

        ServerSend("ChatRoomChat", { Content: mess, Type: "Emote", Target: SenderCharacter.MemberNumber} );
      } else if (msg.toLowerCase().includes("!stack")) {
        if (customerList[SenderCharacter.MemberNumber].linkedTo == 0) {
          var nameFound = false
          for (var D = 0; D < ChatRoomCharacter.length; D++) {
            if (msg.toLowerCase().endsWith(ChatRoomCharacter[D].Name.toLowerCase()) && customerList[ChatRoomCharacter[D].MemberNumber].role == "sub" && customerList[ChatRoomCharacter[D].MemberNumber].linkedTo == 0 && !(ChatRoomCharacter[D].MemberNumber in requestDict) && ChatRoomCharacter[D].MemberNumber != SenderCharacter.MemberNumber) {
              console.log(SenderCharacter.Name + " wants to link with " + ChatRoomCharacter[D].Name)
              //send request
              nameFound = true
              requestDict[ChatRoomCharacter[D].MemberNumber] = SenderCharacter.MemberNumber
              ServerSend("ChatRoomChat", { Content: "*Request sent, waiting for answer.", Type: "Emote", Target: SenderCharacter.MemberNumber});
              ServerSend("ChatRoomChat", { Content: "*" + SenderCharacter.Name + " wants to use you as her submissive stack. Do you accept? [whisper to " + Player.Name + " !accept or !refuse. After 30s it will be considered a refuse.]", Type: "Emote", Target: ChatRoomCharacter[D].MemberNumber});
              setTimeout(function(stackMemberNumber) {if (ChatRoomCharacter[D].MemberNumber in requestDict) {ServerSend("ChatRoomChat", { Content: "*" + ChatRoomCharacter[D].Name + " did not answer.", Type: "Emote", Target: SenderCharacter.MemberNumber}), delete requestDict[ChatRoomCharacter[D].MemberNumber]}} , 30*1000, ChatRoomCharacter[D].MemberNumber)
              break
            }
          }
          if (!nameFound) ServerSend("ChatRoomChat", { Content: "*You have to choose someone. !stack <name>.", Type: "Emote", Target: SenderCharacter.MemberNumber} );
        } else {
          ServerSend("ChatRoomChat", { Content: "*You are already coupled with someone. Use the command !point for more info.", Type: "Emote", Target: SenderCharacter.MemberNumber} );
        }
      } else if (msg.toLowerCase().includes("!accept")) {
        if (SenderCharacter.MemberNumber in requestDict) {
          customerList[SenderCharacter.MemberNumber].linkedTo = requestDict[SenderCharacter.MemberNumber]
          customerList[requestDict[SenderCharacter.MemberNumber]].linkedTo = SenderCharacter.MemberNumber
          customerList[customerList[SenderCharacter.MemberNumber].linkedTo].isPlayer = true
          ServerSend("ChatRoomChat", { Content: "*" + SenderCharacter.Name + " will play with " + customerList[requestDict[SenderCharacter.MemberNumber]].name, Type: "Emote"});
          delete requestDict[SenderCharacter.MemberNumber]
        }
      } else if (msg.toLowerCase().includes("!refuse")) {
        ServerSend("ChatRoomChat", { Content: "*" + SenderCharacter.Name + " refuses to be your stack.", Type: "Emote", Target:requestDict[SenderCharacter.MemberNumber]});
        delete requestDict[SenderCharacter.MemberNumber]
      } else if (msg.toLowerCase().includes("!start") && game.status == "reward") {
          ServerSend("ChatRoomChat", { Content: "We are taking a pause while we deliver an amazing reward to " + customerList[game.rewardTarget].name +". Let's give her a lot of orgasms, she earned them!", Type: "Chat", Target: SenderCharacter.MemberNumber});
      } else if (msg.toLowerCase().includes("!start") && customerList[SenderCharacter.MemberNumber].isPlayer) {
        if (game.status == "off") {
          CharacterSetActivePose(Player, null, true);
          ServerSend("ChatRoomCharacterPoseUpdate", { Pose: Player.ActivePose });
          game.status = "playerSelection"
          ServerSend("ChatRoomChat", { Content: "A new round is starting. Who is gonna play? [to play this round whisper: !play] ", Type: "Chat"});
          timeoutHandle = setTimeout(firstCard, 30*1000)
        } else if (game.status == "end") {
          ServerSend("ChatRoomChat", { Content: "A game recently ended. Let's wait a moment before starting another one. In the mean time have fun with your slav- ehm... stack. (I will kneel when a new game can start)", Type: "Chat", Target: SenderCharacter.MemberNumber});
        } else {
			if(customerList[SenderCharacter.MemberNumber].isPlayer && game.status == "playerSelection")
			{
				game.playerDict[SenderCharacter.MemberNumber] = 0
				ServerSend("ChatRoomChat", { Content: SenderCharacter.Name + " is going to play.", Type: "Chat"});
			}else{
			ServerSend("ChatRoomChat", { Content: "A game is currently in progress.", Type: "Chat", Target: SenderCharacter.MemberNumber});
			}
        }
      } else if (msg.toLowerCase().includes("!play") && customerList[SenderCharacter.MemberNumber].isPlayer) {
        if (game.status == "playerSelection") {
          game.playerDict[SenderCharacter.MemberNumber] = 0
          ServerSend("ChatRoomChat", { Content: SenderCharacter.Name + " is going to play.", Type: "Chat"});
        } else {
          ServerSend("ChatRoomChat", { Content: "*To start a new round use the command !start.", Type: "Emote", Target: SenderCharacter.MemberNumber});
        }
      } else if (msg.toLowerCase().includes("!bet") && SenderCharacter.MemberNumber in game.playerDict && game.playerDict[SenderCharacter.MemberNumber] == 0 ) {
        game.playerDict[SenderCharacter.MemberNumber] = 1
        ServerSend("ChatRoomChat", { Content: "*" + SenderCharacter.Name + " bets.", Type: "Emote"});
      } else if (msg.toLowerCase().includes("!reward")) {
        if (customerList[SenderCharacter.MemberNumber].winNum >= domWinReward){
          if (game.status == "off" || game.status == "end") {
            console.log("REWARD: " + SenderCharacter.Name)
            clearTimeout(timeoutHandle)
            game.status = "reward"
            game.rewardTarget = SenderCharacter.MemberNumber
            customerList[SenderCharacter.MemberNumber].winNum = 0
            ServerSend("ChatRoomChat", { Content: "Hihi. " +customerList[SenderCharacter.MemberNumber].name + " reached " + domWinReward + " wins and now is asking for her deserved reward. It's not something that happens very often. Let's take a pause so that everyone can enjoy it.", Type: "Chat"});
            timeoutHandle = setTimeout(rewardPhase1,10*1000)
          } else {
            ServerSend("ChatRoomChat", { Content: "*A game is in progress wait for it to end.", Type: "Emote", Target: SenderCharacter.MemberNumber});
          }
        } else {
          ServerSend("ChatRoomChat", { Content: "*You don't have enough wins. You need " + domWinReward + " wins to use this command.", Type: "Emote", Target: SenderCharacter.MemberNumber});
        }

      } else if (msg.toLowerCase().includes("!fold") && SenderCharacter.MemberNumber in game.playerDict && game.playerDict[SenderCharacter.MemberNumber] == 0) {
        game.playerDict[SenderCharacter.MemberNumber] = -1
        ServerSend("ChatRoomChat", { Content: "*" + SenderCharacter.Name + " folds.", Type: "Emote"});
      } else if ((msg.toLowerCase().includes("!start") || msg.toLowerCase().includes("!play") || msg.toLowerCase().includes("!bet")) && customerList[SenderCharacter.MemberNumber].role == "dom" && customerList[SenderCharacter.MemberNumber].linkedTo == 0) {
        ServerSend("ChatRoomChat", { Content: "*You don't have a stack of chips. First get one! READ MY BIO!", Type: "Emote", Target: SenderCharacter.MemberNumber});
      } else if ((msg.toLowerCase().includes("!start") || msg.toLowerCase().includes("!play") || msg.toLowerCase().includes("!bet")) && customerList[SenderCharacter.MemberNumber].role == "sub") {
        if (customerList[SenderCharacter.MemberNumber].linkedTo == 0) {
          ServerSend("ChatRoomChat", { Content: "*You either need to find a stack of chips or become one. READ " + Player.Name + " BIO!", Type: "Emote", Target: SenderCharacter.MemberNumber});
        } else {
          ServerSend("ChatRoomChat", { Content: "*You are just a submissive stack, you can't play!", Type: "Emote", Target: SenderCharacter.MemberNumber});
        }
      } else if (msg.toLowerCase().includes("!leave")) {
        // remove all locks, dildo, chastitybelt and kick
        free(SenderCharacter.MemberNumber, update = false)
        InventoryWear(SenderCharacter, "ArmbinderJacket","ItemArms",[ "#bbbbbb", "#000000", "#bbbbbb" ],50)
        InventoryLock(SenderCharacter, InventoryGet(SenderCharacter, "ItemArms"), { Asset: AssetGet("Female3DCG", "ItemMisc", "MistressTimerPadlock")})
        InventoryGet(SenderCharacter, "ItemArms").Property.RemoveItem = true
        //InventoryRemove(SenderCharacter,"ItemPelvis")
        //InventoryRemove(SenderCharacter,"ItemVulva")
        //InventoryRemove(SenderCharacter,"ItemButt")
        ChatRoomCharacterUpdate(SenderCharacter)
        ChatRoomAdminChatAction("Kick", SenderCharacter.MemberNumber.toString())
      }
    } else if ((data.Type == "Activity")) {
      if (msg.includes("Orgasm") && game.rewardTarget == SenderCharacter.MemberNumber) {
        if (game.rewardOrgasmNum == 0) {
          ServerSend("ChatRoomChat", { Content: "Good work, she had her first orgasm! But let's continue she deserves more!", Type: "Chat"});
        } else if (game.rewardOrgasmNum == 1) {
          ServerSend("ChatRoomChat", { Content: "Another one! Hihi. One more girls.", Type: "Chat"});
        } else if (game.rewardOrgasmNum == 2) {
          ServerSend("ChatRoomChat", { Content: "That was a nice one. I hope you enjoyed your reward.", Type: "Chat"});
          ServerSend("ChatRoomChat", { Content: "You can now be freed. Your lock code is " + customerList[SenderCharacter.MemberNumber].lockCode + "." , Type: "Chat"});
          resetGame()
        }
        game.rewardOrgasmNum = game.rewardOrgasmNum + 1
      }
    }	else if ((data.Type == "Emote")) {
      //
    }
    if ((data.Type == "Chat")) {
      if (msg.includes("!point") || msg.includes("!stack") || msg.includes("!accept") || msg.includes("!refuse") || msg.includes("!start") || msg.includes("!play") || msg.includes("!bet") || msg.includes("!fold")) {
        ServerSend("ChatRoomChat", { Content: "*[Please use whispers.]", Type: "Emote", Target: SenderCharacter.MemberNumber});
      }
    }
  }
}


function enterLeaveEvent(sender,msg) {
  if (sender.IsRestrained() || CharacterIsInUnderwear(sender) || sender.IsShackled() || sender.IsBlind() || !sender.CanTalk() || sender.IsEnclose() || sender.IsMounted() || sender.IsDeaf()) {
    ServerSend("ChatRoomChat", { Content: "*[To play here you have to be UNRESTRAINED and fully DRESSED (check your panties too). You will be kicked in 10 seconds. You can change and comeback if you want.]", Type: "Emote", Target: sender.MemberNumber} );
    setTimeout(function(sender) {ChatRoomAdminChatAction("Kick", sender.MemberNumber.toString())}, 10*1000, sender)
  } else if (sender.ItemPermission>2) {
    ServerSend("ChatRoomChat", { Content: "*[To play here you have to lower your PERMISSION. You will be kicked in 10 seconds. You can change and comeback if you want.]", Type: "Emote", Target: sender.MemberNumber} );
    setTimeout(function(sender) {ChatRoomAdminChatAction("Kick", sender.MemberNumber.toString())}, 10*1000, sender)
  } else if (InventoryIsPermissionBlocked(sender, "CollarChainLong","ItemNeckRestraints") || InventoryIsPermissionBlocked(sender, "LeatherChoker","ItemNeck")) {
    ServerSend("ChatRoomChat", { Content: "*[To play here you have to give PERMISSION to use the COLLAR CHAIN LONG and the LEATHER CHOCKER. You will be kicked in 10 seconds. You can change and comeback if you want.]", Type: "Emote", Target: sender.MemberNumber} );
    setTimeout(function(sender) {ChatRoomAdminChatAction("Kick", sender.MemberNumber.toString())}, 10*1000, sender)
  } else if (InventoryIsPermissionBlocked(sender, "ArmbinderJacket","ItemArms") || InventoryIsPermissionBlocked(sender, "BallGag","ItemMouth") || InventoryIsPermissionBlocked(sender, "LeatherBlindfold","ItemHead") || InventoryIsPermissionBlocked(sender, "LegBinder","ItemLegs")) {
    ServerSend("ChatRoomChat", { Content: "*[To play here you have to give PERMISSION to use the ARMBINDER JACKET, the BALL GAG, the LEATHER BLINDFOLD and the LEG BINDER. You will be kicked in 10 seconds. You can change and comeback if you want.]", Type: "Emote", Target: sender.MemberNumber} );
    setTimeout(function(sender) {ChatRoomAdminChatAction("Kick", sender.MemberNumber.toString())}, 10*1000, sender)
  //} else if (sender.ArousalSettings != null && sender.ArousalSettings.Active != "Hybrid" && sender.ArousalSettings.Active != "Automatic") {
  //  ServerSend("ChatRoomChat", { Content: "*[To play here you have to set the preference for sexual the activities to hybrid or automatic (locked). You will be kicked in 10 seconds. You can change and comeback if you want.]", Type: "Emote", Target: sender.MemberNumber} );
  //  setTimeout(function(sender) {ChatRoomAdminChatAction("Kick", sender.MemberNumber.toString())}, 10*1000, sender)
  } else {
    newCustomer(sender)
    ServerSend("ChatRoomChat", { Content: "*[RULES: Check " + Player.Name + " BIO to see all the rules and commands. Have fun.]", Type: "Emote", Target: sender.MemberNumber} );
    ServerSend("ChatRoomChat", { Content: "*[You can leave with the command !leave. But you will receive a small punishment for doing so (mistress lock timer = 5 min)]", Type: "Emote", Target: sender.MemberNumber} );
    customerList[sender.MemberNumber].linkedTo = 0
    customerList[sender.MemberNumber].isPlayer = false
    if (customerList[sender.MemberNumber].role == "sub") {
      InventoryWear(sender, "LeatherChoker","ItemNeck", ["Default", "#000000"],50)
      InventoryLock(sender, InventoryGet(sender, "ItemNeck"), { Asset: AssetGet("Female3DCG", "ItemMisc", "CombinationPadlock")})
      InventoryGet(sender, "ItemNeck").Property.CombinationNumber = customerList[sender.MemberNumber].lockCode
      InventoryWear(sender, "CollarChainLong","ItemNeckRestraints","Default",50)
      InventoryLock(sender, InventoryGet(sender, "ItemNeckRestraints"), { Asset: AssetGet("Female3DCG", "ItemMisc", "CombinationPadlock")})
      InventoryGet(sender, "ItemNeckRestraints").Property.CombinationNumber = customerList[sender.MemberNumber].lockCode
      ChatRoomCharacterUpdate(sender)
    }
	}
  //console.log(sender.Name + "ENTERED")
}


function stackPay(targetMemberNumber, chipsLost) {
  for (var D = 0; D < ChatRoomCharacter.length; D++) {
    if (ChatRoomCharacter[D].MemberNumber == targetMemberNumber) {
      for (count = customerList[targetMemberNumber].chips-1; count >= customerList[targetMemberNumber].chips-chipsLost; count--) {
        if (count == 8) {
          InventoryRemove(ChatRoomCharacter[D],"Cloth")
        } else if (count == 7) {
          InventoryRemove(ChatRoomCharacter[D],"ClothLower")
        } else if (count == 6) {
          InventoryRemove(ChatRoomCharacter[D],"Bra")
        } else if (count == 5) {
          InventoryRemove(ChatRoomCharacter[D],"Panties")
        } else if (count == 4) {
          InventoryWear(ChatRoomCharacter[D], "ArmbinderJacket","ItemArms",[ "#bbbbbb", "#000000", "#bbbbbb" ],50)
          InventoryLock(ChatRoomCharacter[D], InventoryGet(ChatRoomCharacter[D], "ItemArms"), { Asset: AssetGet("Female3DCG", "ItemMisc", "CombinationPadlock")})
          InventoryGet(ChatRoomCharacter[D], "ItemArms").Property.CombinationNumber = customerList[ChatRoomCharacter[D].MemberNumber].lockCode
        } else if (count == 3) {
          InventoryWear(ChatRoomCharacter[D], "LegBinder","ItemLegs",[ "#bbbbbb", "#000000"],50)
          InventoryLock(ChatRoomCharacter[D], InventoryGet(ChatRoomCharacter[D], "ItemLegs"), { Asset: AssetGet("Female3DCG", "ItemMisc", "CombinationPadlock")})
          InventoryGet(ChatRoomCharacter[D], "ItemLegs").Property.CombinationNumber = customerList[ChatRoomCharacter[D].MemberNumber].lockCode
        } else if (count == 2) {
          InventoryWear(ChatRoomCharacter[D], "LeatherBlindfold","ItemHead", "#000000",50)
          InventoryLock(ChatRoomCharacter[D], InventoryGet(ChatRoomCharacter[D], "ItemHead"), { Asset: AssetGet("Female3DCG", "ItemMisc", "CombinationPadlock")})
          InventoryGet(ChatRoomCharacter[D], "ItemHead").Property.CombinationNumber = customerList[ChatRoomCharacter[D].MemberNumber].lockCode
        } else if (count == 1) {
          InventoryWear(ChatRoomCharacter[D], "BallGag","ItemMouth","Default",50)
          InventoryLock(ChatRoomCharacter[D], InventoryGet(ChatRoomCharacter[D], "ItemMouth"), { Asset: AssetGet("Female3DCG", "ItemMisc", "CombinationPadlock")})
          InventoryGet(ChatRoomCharacter[D], "ItemMouth").Property.CombinationNumber = customerList[ChatRoomCharacter[D].MemberNumber].lockCode
        }
      }
      ChatRoomCharacterUpdate(ChatRoomCharacter[D])
    }
  }
}

function newCustomer(sender) {
	customerList[sender.MemberNumber] = new personMagicData()
  customerList[sender.MemberNumber].name = sender.Name
	if (OnlineReputationGet(sender,"Dominant")<=0) {
		ServerSend("ChatRoomChat", { Content: sender.Name + ", I am delighted that you decided to enter this casino. You have been chained and if you want to leave here you will have to earn your freedom.", Type: "Chat", Target:sender.MemberNumber} );
		customerList[sender.MemberNumber].role ='sub'
	} else {
		ServerSend("ChatRoomChat", { Content: "Greetings " +sender.Name + ", welcome to my casino. You can relax and play if you want.", Type: "Chat", Target:sender.MemberNumber} );
		customerList[sender.MemberNumber].role ='dom'
	}
}

function resetGame() {
  clearTimeout(timeoutHandle)
  game = {
    status: "off", //possible status playerSelection, bet, end, off, reward
    playerDict: {},
    cardDict: {},
    secondCard: 0,
    win: false,
    rewardTarget: 0,
    rewardOrgasmNum: 0
  }
  CharacterSetActivePose(Player, "Kneel", true);
  ServerSend("ChatRoomCharacterPoseUpdate", { Pose: Player.ActivePose });
}

function checkRoomForCustomer() {
  for (var D = 0; D < ChatRoomCharacter.length; D++) {
    if (!(ChatRoomCharacter[D].MemberNumber in customerList)) {
      newCustomer(ChatRoomCharacter[D])
      console.log("Added " + ChatRoomCharacter[D].Name + " as customer.")
    }
  }
}

function rewardPhase1() {
  ServerSend("ChatRoomChat", { Content: customerList[game.rewardTarget].name + ", I am sure you will love the mysterius reward you earned.", Type: "Chat"} );
  ServerSend("ChatRoomChat", { Content: "But before I can give it to you, you should wear something more approriate for the winner.", Type: "Chat"} );
  ServerSend("ChatRoomChat", { Content: "*The clothes are immediately stripped from " + customerList[game.rewardTarget].name + " and a leg binder blocks her from running away.", Type: "Emote"} );
  for (var D = 0; D < ChatRoomCharacter.length; D++) {
    if (ChatRoomCharacter[D].MemberNumber == game.rewardTarget) {
      InventoryRemove(ChatRoomCharacter[D],"Cloth")
      InventoryRemove(ChatRoomCharacter[D],"ClothLower")
      InventoryRemove(ChatRoomCharacter[D],"Bra")
      InventoryRemove(ChatRoomCharacter[D],"Panties")
      InventoryWear(ChatRoomCharacter[D], "LegBinder","ItemLegs",[ "#C3CB3F", "#000000"],50)
      InventoryLock(ChatRoomCharacter[D], InventoryGet(ChatRoomCharacter[D], "ItemLegs"), { Asset: AssetGet("Female3DCG", "ItemMisc", "CombinationPadlock")})
      InventoryGet(ChatRoomCharacter[D], "ItemLegs").Property.CombinationNumber = customerList[ChatRoomCharacter[D].MemberNumber].lockCode
      ChatRoomCharacterUpdate(ChatRoomCharacter[D])
    }
  }
  timeoutHandle = setTimeout(rewardPhase2,30*1000)
}

function rewardPhase2() {
  ServerSend("ChatRoomChat", { Content: "I hope you don't mind if I use the same attire we usually use for the loser. Don't worry to show everyone that you are a winner I am going to dress you in gold!", Type: "Chat"} );
  for (var D = 0; D < ChatRoomCharacter.length; D++) {
    if (ChatRoomCharacter[D].MemberNumber == game.rewardTarget) {
      InventoryWear(ChatRoomCharacter[D], "ArmbinderJacket","ItemArms",[ "#C3CB3F", "#000000", "#C3CB3F" ],50)
      InventoryLock(ChatRoomCharacter[D], InventoryGet(ChatRoomCharacter[D], "ItemArms"), { Asset: AssetGet("Female3DCG", "ItemMisc", "CombinationPadlock")})
      InventoryGet(ChatRoomCharacter[D], "ItemArms").Property.CombinationNumber = customerList[ChatRoomCharacter[D].MemberNumber].lockCode
      InventoryWear(ChatRoomCharacter[D], "LeatherBlindfold","ItemHead", "#000000",50)
      InventoryLock(ChatRoomCharacter[D], InventoryGet(ChatRoomCharacter[D], "ItemHead"), { Asset: AssetGet("Female3DCG", "ItemMisc", "CombinationPadlock")})
      InventoryGet(ChatRoomCharacter[D], "ItemHead").Property.CombinationNumber = customerList[ChatRoomCharacter[D].MemberNumber].lockCode
      ChatRoomCharacterUpdate(ChatRoomCharacter[D])
    }
  }
  timeoutHandle = setTimeout(rewardPhase3,30*1000)
}

function rewardPhase3() {
  ServerSend("ChatRoomChat", { Content: "You are really cute dear " + customerList[game.rewardTarget].name, Type: "Chat"} );
  ServerSend("ChatRoomChat", { Content: "And finally, now that you are ready, you can receive your deserved reward!", Type: "Chat"} );
  for (var D = 0; D < ChatRoomCharacter.length; D++) {
    if (ChatRoomCharacter[D].MemberNumber == game.rewardTarget) {
      InventoryWear(ChatRoomCharacter[D], "VibratingDildo","ItemVulva","Default")
  		InventoryGet(ChatRoomCharacter[D],"ItemVulva").Property = {Mode: "Maximum", Intensity: 3, Effect: ["Egged", "Vibrating"] }
      ChatRoomCharacterUpdate(ChatRoomCharacter[D])
    }
  }
  timeoutHandle = setTimeout(rewardPhase4,30*1000)
}

function rewardPhase4() {
  ServerSend("ChatRoomChat", { Content: "Girls, let's work together to give our lovely " + customerList[game.rewardTarget].name + " a lot of orgasm!", Type: "Chat"} );
  ServerSend("ChatRoomChat", { Content: "I am sure that if you work all together you can give her pleasure that she would have not hoped for!", Type: "Chat"} );
  ServerSend("ChatRoomChat", { Content: "*[Give " + customerList[game.rewardTarget].name + " 3 orgasms]", Type: "Emote"} );
}
