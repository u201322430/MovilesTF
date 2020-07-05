Preload = function(game){}

Preload.prototype = {
	preload : function(){
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;

		this.load.image("aereosol", "assets/images/aereosol.png")
		this.load.image("bg_main_menu", "assets/images/bg_main_menu.png")
		this.load.image("bg_bottom", "assets/images/bg_bottom.png")
		this.load.image("bg_main", "assets/images/bg_main.png")
		this.load.image("broken_cup", "assets/images/broken_cup.png")
		this.load.image("can", "assets/images/can.png")

		this.load.spritesheet("player", "assets/images/character_spritesheet.png",50,87,11);

		this.load.image("glass_bottle", "assets/images/glass_bottle.png")
		this.load.image("milk_jug", "assets/images/milk_jug.png")
		this.load.image("pizza_carton", "assets/images/pizza_carton.png")
		this.load.image("plastic_bottle", "assets/images/plastic_bottle.png")
		this.load.image("play_button", "assets/images/play_button.png")
		
		this.load.spritesheet("player", "assets/images/character_spritesheet.png",50,87);
		
		this.load.image("mapTileSheet", "assets/images/fishTilesheet.png");

		this.load.image("fish", "assets/images/fish.png");
		this.load.image("dead_fish", "assets/images/dead_fish.png");
		this.load.tilemap("firstLevel", "assets/levels/level1.json", null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap("secondLevel", "assets/levels/level2.json", null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap("thirdLevel", "assets/levels/level3.json", null, Phaser.Tilemap.TILED_JSON);

		this.load.audio("soundtrack", ["assets/sounds/soundtrack.mp3"]);

	},
	create:function(){
		this.state.start("Menu");
	}
}