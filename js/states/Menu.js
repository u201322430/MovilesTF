Menu = function(game){}

Menu.prototype = {
	init:function(){
		this.game.physics.startSystem(Phaser.Physics.P2JS);
		this.game.physics.p2.setBoundsToWorld(true, true, true, true, true);
		this.game.physics.p2.gravity.y = 1000;
		this.trashCollisionGroup = this.game.physics.p2.createCollisionGroup();		
	},
	create:function(){
		let background = this.add.sprite(0,0,"bg_main_menu");
		background.width = 896;

		let title = this.add.text(0,0,'Speed Reciclaje: Legends',{
			font : "66px Arial",
			fill : "#000000"
		});

		title.anchor.setTo(0.5);
		title.x = this.world.centerX;

		var tweenTitle = this.game.add.tween(title).to( { y: 250 }, 5000, "Linear", true);
		
		this.trashKeyList = ["aereosol","broken_cup","can","glass_bottle","milk_jug","pizza_carton","plastic_bottle"]

		createTrash = function(keyList){				
			console.log(keyList)		
			let trash = this.add.sprite(this.game.rnd.integerInRange(0, this.world.width),0,keyList[this.game.rnd.integerInRange(0, keyList.length-1)]);
			
			this.game.physics.p2.enable(trash);
			trash.body.collideWorldBounds = true;
			trash.anchor.setTo(0.5);
			trash.body.setCollisionGroup(this.trashCollisionGroup);
			trash.body.collides([this.trashCollisionGroup]);
		}

		this.game.time.events.repeat(Phaser.Timer.SECOND * 1, 40, createTrash, this, this.trashKeyList);
		
		this.playButton = this.game.add.sprite(0,0,"play_button");
		this.playButton.anchor.setTo(0.5);
		this.playButtonScale = 1.5;
		this.playButton.scale.setTo(this.playButtonScale);
		this.playButton.x = this.world.centerX;
		this.playButton.y = this.world.centerY;

		this.playButton.inputEnabled = true;
		this.playButton.events.onInputOver.add(this.buttonSelected,this);
		this.playButton.events.onInputOut.add(this.buttonReset,this);
		this.playButton.events.onInputDown.add(this.goGame,this);
	},
	update:function(){

	},
	goGame:function(){
		this.state.start("Game");
	},
	buttonSelected:function(){
		this.playButton.scale.setTo(this.playButtonScale*1.1)
	},
	buttonReset:function(){
		this.playButton.scale.setTo(this.playButtonScale)
	}
}