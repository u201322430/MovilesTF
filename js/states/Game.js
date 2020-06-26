Game = function(game){}

Game.prototype = {
	init: function(level) {
		this.currentLevel = level || "firstLevel"
	},
	create:function(){
		this.loadLevel();
		this.createEnemies();
		// this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;//escala a la pantalla que tengas
	    // this.scale.pageAlignHorizontally = true;
	    // this.scale.pageAlignVertically = true;

		// /*this.levelData = JSON.parse(this.cache.getText("level"));
		// console.log(this.levelData.platformData);
		// this.platforms = this.game.add.group();
		// this.levelData.platformData.forEach(this.createPlatform,this);*/

		// 				//===== BACKGROUND =====
		// /*this.background = this.game.add.tileSprite(0,0,this.game.width,
		// 											this.game.height,'bakground');
		// this.background.autoScroll(-100,0);*/

		// this.gravity = 100;
		// this.position = {x:this.game.world.centerX, y:50}
		// this.jumpForce = -20;
		// this.physics.startSystem(Phaser.Physics.ARCADE);

		// this.player = new Player(this.game,this.position,this.gravity);
	},
	createPlatform:function(element){
		//primera forma
		//let platform = this.game.add.sprite(element.x,element.y,"platform");
		//this.platforms.add(platform);
		
		//segunda forma
		//this.platforms.create(element.x,element.y,"platform");

		//tercera forma
		//let platform = new Phaser.Sprite(this,element.x,element.y,"platform");
		//this.platforms.add(platform);
	},
	loadLevel: function() {
		this.map = this.game.add.tilemap(this.currentLevel);
		this.map.addTilesetImage("maptiles","map_tiles");
		this.backgroundLayer = this.map.createLayer("background");
		this.collisionLayer = this.map.createLayer("collision");
		this.collisionLayer.resizeWorld();
	},
	createEnemies: function() {
		this.enemies = this.game.add.group();
    let enemiesPos = this.findObjectsByType('enemy',this.map,"objects");
    enemiesPos.forEach(function(element){
		console.log('enemy')
      	let enemy = new Enemy(this.game, element.x, element.y, 'fish', element.velocity, this.map);
     	this.enemies.add(enemy);
    },this);
	},
	findObjectsByType: function(targetType,tilemap,layer) {
		let result = [];
		tilemap.objects[layer].forEach(function(element) {
		  if(element.properties.type == targetType) {
			element.y -= tilemap.tileHeight;
			result.push(element);
		  }
		}, this);
		return result;
	}
}