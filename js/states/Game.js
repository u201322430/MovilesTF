Game = function(game){

}

Game.prototype = {
	create:function(){
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;//escala a la pantalla que tengas
	    this.scale.pageAlignHorizontally = true;
	    this.scale.pageAlignVertically = true;

		this.levelData = JSON.parse(this.cache.getText("level"));
		console.log(this.levelData.platformData);
		this.platforms = this.game.add.group();
		this.levelData.platformData.forEach(this.createPlatform,this);
	},
	createPlatform:function(element){
		//primera forma
		//let platform = this.game.add.sprite(element.x,element.y,"platform");
		//this.platforms.add(platform);
		
		//segunda forma
		//this.platforms.create(element.x,element.y,"platform");

		//tercera forma
		let platform = new Phaser.Sprite(this,element.x,element.y,"platform");
		this.platforms.add(platform);
	}
}