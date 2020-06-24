Game = function(game){}

Game.prototype = {
	init: function(level) {
		this.currentLevel = level || "firstLevel"
	},
	create:function(){
		this.loadLevel();
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;//escala a la pantalla que tengas
	    this.scale.pageAlignHorizontally = true;
	    this.scale.pageAlignVertically = true;

		/*this.levelData = JSON.parse(this.cache.getText("level"));
		console.log(this.levelData.platformData);
		this.platforms = this.game.add.group();
		this.levelData.platformData.forEach(this.createPlatform,this);*/

						//===== BACKGROUND =====
		/*this.background = this.game.add.tileSprite(0,0,this.game.width,
													this.game.height,'bakground');
		this.background.autoScroll(-100,0);*/

		this.gravity = 100;
		this.position = {x:this.game.world.centerX, y:50}
		this.jumpForce = -20;
		this.physics.startSystem(Phaser.Physics.ARCADE);

		this.player = new Player(this.game,this.position,this.gravity);
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
		this.map = this.game.add.tilemap(this.currentLevel)
		this.map.addTilesetImage("mapTileSheet","mapTileSheet")
		this.backgroundLayer = this.map.createLayer("fondo")
		this.collisionLayer = this.map.createLayer("plataformas")
	}
}