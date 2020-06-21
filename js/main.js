window.onload = function(){
    let game =  new Phaser.Game(800,1423,Phaser.AUTO);
    game.state.add("Preload",Preload);
    game.state.add("Game",Game);
    game.state.start("Preload");

}