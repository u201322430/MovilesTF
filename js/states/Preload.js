Preload = function(game){}

Preload.prototype = {
	preload : function(){
		/*this.load.image("actionButton","assets/images/actionButton.png");
		this.load.spritesheet("fire_spritesheet",
			"assets/images/fire_spritesheet.png",20,21,2,1,1);*/

		this.load.spritesheet("player", "assets/images/character_spritesheet.png",50,87);
		// this.laod.image("dead_fish", "assets/images/fish.png", 128,128);
		// this.laod.image("sand_wall", "assets/images/sand.png", 128,128);
		// this.laod.image("sand", "assets/images/sand", 128,128);
		console.log('load level here')
		this.load.image("mapTileSheet", "assets/images/mapTileSheet.png");
		this.load.image("map_tiles", "assets/images/fishTilesheet.png");
		this.load.image("fish", "assets/images/fish.png");
		this.load.tilemap("firstLevel", "assets/levels/level1.json", null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap("secondLevel", "assets/levels/secondLevel.json", null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap("thirdLevel", "assets/levels/thirdLevel.json", null, Phaser.Tilemap.TILED_JSON);
	},
	create:function(){
		this.state.start("Game");
	}
}