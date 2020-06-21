Preload = function(game){}

Preload.prototype = {
	preload : function(){
		/*this.load.image("actionButton","assets/images/actionButton.png");
		this.load.spritesheet("fire_spritesheet",
			"assets/images/fire_spritesheet.png",20,21,2,1,1);*/

		this.load.spritesheet("player", "assets/images/character_spritesheet.png",50,87);
	},
	create:function(){
		this.state.start("Game");
	}
}