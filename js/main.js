window.onload = function(){
    let game =  new Phaser.Game(896,1423,Phaser.AUTO);
    game.state.add("Preload",Preload);
    game.state.add("Menu", Menu);
    game.state.add("Game",Game);
    game.state.add("GameOver", GameOver);
    game.state.add("YouWin", YouWin);
    game.state.start("Preload");
}