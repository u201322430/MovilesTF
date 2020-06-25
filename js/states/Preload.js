Preload = function(game){}

Preload.prototype = {
	preload : function(){
		/*this.load.image("actionButton","assets/images/actionButton.png");
		this.load.spritesheet("fire_spritesheet",
			"assets/images/fire_spritesheet.png",20,21,2,1,1);*/
		this.load.image("aereosol","assets/images/aereosol.png");
		this.load.image("bg_bottom","assets/images/bg_bottom.png");
		this.load.image("bg_main","assets/images/bg_main.png");
		this.load.image("blue_dead_fish","assets/images/blue_dead_fish.png");
		this.load.image("broken_cup","assets/images/broken_cup.png");
		this.load.image("can","assets/images/can.png");
		this.load.image("character_dead","assets/images/character_dead.png");
		this.load.image("glass_bottle","assets/images/glass_bottle.png");
		this.load.image("green_dead_fish","assets/images/green_dead_fish.png");
		this.load.image("milk_jug","assets/images/milk_jug.png");
		this.load.image("orange_dead_fish","assets/images/orange_dead_fish.png");
		this.load.image("pizza_carton","assets/images/pizza_carton.png");
		this.load.image("plastic_bottle","assets/images/plastic_bottle.png");
		this.load.image("purple_dead_fish","assets/images/purple_dead_fish.png");
		this.load.image("red_dead_fish","assets/images/red_dead_fish.png");
		this.load.image("tileset","assets/images/tileset.png");

		this.load.spritesheet("player", "assets/images/character_spritesheet.png",50,87,11);
	},
	create:function(){
		this.state.start("Game");
	}
}