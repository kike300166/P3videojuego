var myGame = new Phaser.Game(800, 600, Phaser.AUTO, 'game-container');
myGame.state.add('game', GameState);
//myGame.state.add('gameover', gameoverState);
myGame.state.start('game');
