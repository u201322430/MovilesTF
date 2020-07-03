Enemy = function (game, x, y, key, velocity, tilemap) {
    Phaser.Sprite.call(this, game, x, y, key)
    this.game = game
    this.tilemap = tilemap
    this.anchor.setTo(0.5);
    if (!velocity) {
        velocity = (40 + Math.random() * 20) * (Math.random() < 0.5 ? 1 : -1) * 4;
    }
    this.game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
    this.body.bounce.setTo(1, 0)
    this.body.velocity.x = velocity
    this.isDead = false;
}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function () {
    if (!this.isDead) {
        let direction = 1;
        if (this.body.velocity.x > 0) {
            direction = 1;
            this.scale.setTo(1);
        } else {
            direction = -1;
            this.scale.setTo(-1, 1);
        }
    }
}

Enemy.prototype.die = function () {
    this.isDead = true;
    this.scale.y = -1;
    this.loadTexture('dead_fish');
    this.body.velocity.x = 0;
    let tween = this.game.add.tween(this).to({ y: this.y - 150}, 5000, "Linear", true);
    this.game.time.events.add(Phaser.Timer.SECOND * 3, function(){
        let tween = this.game.add.tween(this).to({ alpha: 0}, 2000, "Linear", true);
        this.kill();
    }, this);
}