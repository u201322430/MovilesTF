YouWin = function(game){}

YouWin.prototype = {
	init: function(score) {
		this.score = score;
	},
	create:function(){
		this.background = this.game.add.tileSprite(0,0,this.game.width,
													this.game.height,"bg_main");

		let title = this.add.text(0,0,'YOU WIN',{
			font : "80px Arial",
			fill : "#fff200"
		});
		title.anchor.setTo(0.5);
		title.x = this.game.world.centerX;
		title.y = 200;	

		let score = this.add.text(0,0,'Your Score: ',{
			font : "66px Arial",
			fill : "#000000"
		});
		score.anchor.setTo(0.5);
		score.x = this.game.world.centerX;
		score.y = 350;
		score.text = "Your Score: " + this.score;

		this.playButton = this.game.add.sprite(0,0,"play_button");
		this.playButton.anchor.setTo(0.5);
		this.playButtonScale = 1.5;
		this.playButton.scale.setTo(this.playButtonScale);
		this.playButton.x = this.game.world.centerX;
		this.playButton.y = this.game.height/2;

		this.playButton.inputEnabled = true;
		this.playButton.events.onInputOver.add(this.buttonSelected,this);
		this.playButton.events.onInputOut.add(this.buttonReset,this);
		this.playButton.events.onInputDown.add(this.goGame,this);


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