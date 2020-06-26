Enemy = function(game, x, y , key, velocity, tilemap) {
    Phaser.Sprite.call(this, game, x, y, key)
    this.game = game
    this.tilemap = tilemap
    this.anchor.setTo(0.5);
    if(!velocity) {
        velocity = (40 + Math.random() * 20) * (Math.random() < 0.5 ? 1 : -1) * 4;
    }

    this.game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
    this.body.bounce.setTo(1,0)
    this.body.velocity.x = velocity
}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function() {
    let direction = 1;
    if(this.body.velocity.x>0){
        direction = 1;
        this.scale.setTo(1);
    }else{
        direction = -1;
        this.scale.setTo(-1,1);
    }

    // let nextX = this.x + direction * (Math.abs(this.width)/2 +1);
    // let nextY = this.bottom + 1;

    // if(!(this.x > 0 && this.x < this.game.world.width - this.width) ) {
    //     this.body.velocity.x *= -1;
    // }
}