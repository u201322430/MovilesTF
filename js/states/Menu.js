Menu = function(game){}

Menu.prototype = {
	create:function(){
		let background = this.add.sprite(0,0,"background");
		let title = this.add.text(0,0,'GAAAAAAAA',{
			font : "40px Arial",
			fill : "#FFFFFF"
		});

		title.anchor.setTo(0.5);
		title.x = this.world.centerX;
		title.y = this.world.centerY;
		console.log("create "+this);
		title.inputEnabled = true;
		title.events.onInputDown.add(this.goGame,this);
	},
	goGame:function(){
		console.log("goGame "+this);
		this.state.start("Game");
	}
}