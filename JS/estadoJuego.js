var teclado;
var sentido = 0;
var contadorGolpes1 = 0;
var contadorGolpes2 = 0;

var barraX = 100;
var barraY = 100;

var barraX1 = 100;
var barraY1 = 100;

var stateText;
var GameState = {
	preload : function(){
		var me = this;
		teclado = me.game.input.keyboard.createCursorKeys();
		me.load.image('mapa', 'Assets/Mapa.png');
		me.load.atlasJSONHash('raiden', 'Assets/Raiden.png', 'Assets/Raiden.json');
		me.load.atlasJSONHash('sonya', 'Assets/Sonya.png', 'Assets/Sonya.json');
		me.game.load.audio('patada', ['Sonidos/patada.mp3','Sonidos/patada.ogg']);
		me.game.load.audio('puno', ['Sonidos/puño.mp3','Sonidos/puno.ogg']);
		me.game.load.audio('tema', ['Sonidos/tema.mp3','Sonidos/tema.ogg']);
	},

	create : function(){
		var me = this;
		me.game.world.setBounds(0, 0, 1365, 768);
		me.game.forceSingleUpdate = true;

		//MAPA
		me.game.add.image(0, 0, 'mapa');

		//TEXTO
		stateText = me.game.add.text(me.game.world.centerX,me.game.world.centerY,' ', { font: '84px Arial', fill: '#ffffff' });
		stateText.anchor.setTo(0.5, 0.5);
		stateText.visible = false;

		//CONFIGURACION JUGADOR 1
		me.player1 = me.game.add.sprite(150, 600, 'raiden');
		me.player1.scale.setTo(1,1);
		//SECUENCIA CUANDO NO SE MUEVE
		me.player1.animations.add('inicio1', [47, 48, 49, 50, 51, 52, 53, 54, 55, 56], 8, true);
    	//SECUENCIA DE CAMINAR
    	me.player1.animations.add('caminar1', [0, 1, 2, 3, 4, 5, 6, 7, 8], 8, true);
    	//SECUENCIA CAMINAR ATRAS
    	me.player1.animations.add('caminarAtras1', [8, 7, 6, 5, 4, 3, 2, 1, 0], 8, true);
    	//SECUENCIA SALTOS
    	me.player1.animations.add('saltar1', [9, 10, 11], 8, true);
    	//SECUENCIA PARA AGACHARSE
    	me.player1.animations.add('agachar1', [12, 13, 14], 15, true);
    	//SECUENCIA PUÑOS
    	me.player1.animations.add('puños1', [15, 16, 17, 18, 19, 20, 21, 22, 23], 15, true);
    	//SECUENCIA PATADAS
    	me.player1.animations.add('patadas1', [24, 25, 26, 27, 28], 15, true);
    	//SECUENCIA CUBRIRSE
    	me.player1.animations.add('cubrirse1', [29, 30, 31], 15, true);
    	//SECUENCIA CUANDO LO GOLPEAN
    	me.player1.animations.add('golpe1', [40, 41, 42, 43, 44], 15, true);
    	//SECUENCIA CUANDO LO GOLPEAN CON PATADAS
    	me.player1.animations.add('golpePatada1', [45, 46], 15, true);
    	//SECUENCIA PARA CAER
    	me.player1.animations.add('caer1', [34, 35, 36, 37, 38, 39], 15, true);

    	me.player1.anchor.set(0.5);
		me.game.physics.enable(me.player1, Phaser.Physics.ARCADE);
		me.player1.body.collideWorldBounds = true;

		//CONFIGURACION JUGADOR 2
		me.player2 = me.game.add.sprite(300, 600, 'sonya');
		me.player2.scale.setTo(-1,1);
		//SECUENCIA CUANDO NO SE MUEVE
		me.player2.animations.add('inicio2', [01, 02, 03, 04, 05, 06], 8, true);
    	//SECUENCIA DE CAMINAR
    	me.player2.animations.add('caminar2', [17, 18, 19, 20, 21, 22, 23, 24, 25], 8, true);
    	//SECUENCIA CAMINAR ATRAS
    	me.player2.animations.add('caminarAtras2', [25, 24, 23, 22, 21, 20, 19, 18, 17], 8, true);
    	//SECUENCIA SALTOS
    	me.player2.animations.add('saltar2', [28, 29, 30], 8, true);
    	//SECUENCIA PARA AGACHARSE
    	me.player2.animations.add('agachar2', [26, 27], 10, true);
    	//SECUENCIA PUÑOS
    	me.player2.animations.add('puños2', [31, 32, 33, 34, 35, 36], 15, true);
    	//SECUENCIA PATADAS
    	me.player2.animations.add('patadas2', [37, 38, 39, 40, 41, 42, 43], 15, true);
    	//SECUENCIA CUBRIRSE
    	me.player2.animations.add('cubrirse2', [44, 45, 46], 15, true);
    	//SECUENCIA CUANDO LO GOLPEAN
    	me.player2.animations.add('golpe2', [47, 48, 49], 15, true);
    	//SECUENCIA CUANDO LO GOLPEAN CON PATADAS
    	me.player2.animations.add('golpePatada2', [50, 51, 52, 53, 54, 55], 15, true);
    	//SECUENCIA PARA CAER
    	me.player2.animations.add('caer2', [56, 57, 58, 59], 15, true);

		me.player2.anchor.set(0.5);
		me.game.physics.enable(me.player2, Phaser.Physics.ARCADE);
		me.player2.body.collideWorldBounds = true;

		//CAMARA SIGUE AL JUGADOR 1
		me.camara =me.game.camera.follow(me.player1, Phaser.Camera.FOLLOW_PLATFORMER);

		//SONIDOS
		me.musica = me.game.add.audio('patada');
		me.musicaPuno = me.game.add.audio('puno');
		me.musicaTema = me.game.add.audio('tema');
		me.musicaTema.play();



		//BOTONES DE JUEGO
		me.keyA = me.game.input.keyboard.addKey(Phaser.Keyboard.A);
		me.keyD = me.game.input.keyboard.addKey(Phaser.Keyboard.D);
		me.keyW = me.game.input.keyboard.addKey(Phaser.Keyboard.W);
		me.keyS = me.game.input.keyboard.addKey(Phaser.Keyboard.S);
		me.keyJ = me.game.input.keyboard.addKey(Phaser.Keyboard.J);
		me.keyK = me.game.input.keyboard.addKey(Phaser.Keyboard.K);
		me.keyL = me.game.input.keyboard.addKey(Phaser.Keyboard.L);
		me.key4 = me.game.input.keyboard.addKey(Phaser.Keyboard.B);
		me.key5 = me.game.input.keyboard.addKey(Phaser.Keyboard.N);
		me.key6 = me.game.input.keyboard.addKey(Phaser.Keyboard.M);

		//Barras de vida y salud
    	me.myHealthBar = new HealthBar(me.game, {x: barraX, y: barraY});
    	//me.myHealthBar.setPercent(80);
    	me.myHealthBar.setPosition(150, 100);
    	me.myHealthBar.setFixedToCamera(true);

    	me.myHealthBar1 = new HealthBar(me.game, {x: barraX1, y:barraY1});
    	//me.myHealthBar1.setPercent(10);
    	me.myHealthBar1.setPosition(650, 100);
    	me.myHealthBar1.setFixedToCamera(true);

    	//Etiquetas
    	me.t = me.game.add.text(80, 40, "Jugador 1", { font: "32px ARIAL", fill: "#ffffff", align: "center" });
    	me.t.fixedToCamera = true;

    	me.t1 = me.game.add.text(600, 40, "Jugador 2", { font: "32px ARIAL", fill: "#ffffff", align: "center" });
    	me.t1.fixedToCamera = true;

	},

	update : function(){
		var me = this;

		me.player2.body.velocity.x = 0;
		me.player2.body.velocity.y = 0;
		me.player1.body.velocity.x = 0;
		me.player1.body.velocity.y = 0;

		//VALIDA EL SENTIDO DE LOS SPRITES
		if(me.player1.x-me.player2.x < 0){
			sentido = 0;
		}else {
			sentido = 1;
		}
		if(sentido == 0){
			me.player1.scale.setTo(1,1);
			me.player2.scale.setTo(-1,1);
		} else {
			me.player1.scale.setTo(-1,1);
			me.player2.scale.setTo(1,1);
		}

		//JUGADOR 2
		//MOVER IZQUIERDA
		if(teclado.left.isDown) {
			me.player2.body.velocity.x -= 240;
			me.player2.animations.play('caminarAtras2');
		}
		//MOVER DERECHA
		else if(teclado.right.isDown) {
			me.player2.body.velocity.x +=240;
			me.player2.animations.play('caminar2');
		}
		//SALTAR
		else if(teclado.up.isDown && me.player2.y == 600){
			me.player2.animations.play('saltar2');
			me.player2.body.velocity.y -= 500;

		}
		//AGACHARSE
		else if(teclado.down.isDown){
			me.player2.animations.play('agachar2');
		}
		//DAR PUÑOS
		else if(me.key4.isDown){
			me.player2.animations.play('puños2');
			me.musicaPuno.play();
			if((me.player1.body.x-me.player2.body.x > -75 && me.player1.body.x-me.player2.body.x < 0) && !me.keyL.isDown){
				me.player1.animations.play('golpe1');
				contadorGolpes1++;
				barraX -= 1;
      			if(barraX <= 0) {barraX = 0;
      			me.myHealthBar.setPercent(barraX);
						me.player1.destroy();
						alert("Sonya ganó");
						me.game.state.restart();
					}
			}
			if((me.player1.body.x-me.player2.body.x > 0 && me.player1.body.x-me.player2.body.x < 65) && !me.keyL.isDown){
				me.player1.animations.play('golpe1');
				contadorGolpes1++;
			}
		}
		//DAR PATA
		else if(me.key5.isDown){
			me.player2.animations.play('patadas2');
			me.musica.play();
			if((me.player1.body.x-me.player2.body.x > -75 && me.player1.body.x-me.player2.body.x < 0) && !me.key6.isDown){

				me.player1.animations.play('golpePatada1');
				contadorGolpes1++;
				barraX -= 1;
				if(barraX <= 0) {barraX = 0;
				me.myHealthBar.setPercent(barraX);
				me.player1.destroy();
				alert("Sonya ganó");
				me.game.state.restart();
			}
			}
			if((me.player1.body.x-me.player2.body.x > 0 && me.player1.body.x-me.player2.body.x < 65) && !me.key6.isDown){
				me.player1.animations.play('golpePatada1');
				contadorGolpes1++;
			}
		}
		//CUBRIRSE
		else if(me.key6.isDown){
			me.player2.animations.play('cubrirse2');
		}
		//QUIETO
		else {
			me.player2.animations.play('inicio2');
		}

		//JUGADOR 1
		//MOVER IZQUIERDA
		if(me.keyA.isDown) {
			me.player1.body.velocity.x -= 240;
			me.player1.animations.play('caminarAtras1');
		}
		//MOVER DERECHA
		else if(me.keyD.isDown){
			me.player1.body.velocity.x += 240;
			me.player1.animations.play('caminar1');
		}
		//SALTAR
		else if(me.keyW.isDown && me.player1.y == 600){
			me.player1.animations.play('saltar1');
			me.player1.body.velocity.y -= 500;

		}
		//AGACHARSE
		else if(me.keyS.isDown){
			me.player1.animations.play('agachar1');
		}
		//DAR PUÑOS
		else if(me.keyJ.isDown){
			me.player1.animations.play('puños1');
			me.musicaPuno.play();
			if((me.player1.body.x-me.player2.body.x > -75 && me.player1.body.x-me.player2.body.x < 0) && !me.key6.isDown){
				barraX1 -= 1;
				if(barraX1 <= 0) {barraX1 = 0;
				me.myHealthBar1.setPercent(barraX1);
				me.player2.destroy();
				alert("Rayden ganó");
				me.game.state.restart();
			}

				if(contadorGolpes2 == 50) {
					me.player2.animations.play('caer2');
					contadorGolpes2 = 0;
				} else {
					me.player2.animations.play('golpe2');
					contadorGolpes2++;
				}
			}
			if((me.player1.body.x-me.player2.body.x > 0 && me.player1.body.x-me.player2.body.x < 65) && !me.key6.isDown){
      			barraX1 -= 1;
						if(barraX1 <= 0) {barraX1 = 0;
						me.myHealthBar1.setPercent(barraX1);
						me.player2.destroy();
						alert("Rayden ganó");
						me.game.state.restart();
					}
				if(contadorGolpes2 == 50) {
					me.player2.animations.play('caer2')
					contadorGolpes2 = 0;
				} else {
					me.player2.animations.play('golpe2');
					contadorGolpes2++;
				}
			}
		}
		//DAR PATA
		else if(me.keyK.isDown){
			me.player1.animations.play('patadas1');
			me.musica.play();
			if((me.player1.body.x-me.player2.body.x > -75 && me.player1.body.x-me.player2.body.x < 0) && !me.key6.isDown){
				barraX1 -= 1;
				if(barraX1 <= 0) {barraX1 = 0;
				me.myHealthBar1.setPercent(barraX1);
				me.player2.destroy();
				alert("Rayden ganó");
				me.game.state.restart();
			}
				if(contadorGolpes2 == 50) {
					me.player2.animations.play('caer2');
					contadorGolpes2 = 0;
				} else {
					me.player2.animations.play('golpePatada2');
					contadorGolpes2+=2;
				}
			}
			if((me.player1.body.x-me.player2.body.x > 0 && me.player1.body.x-me.player2.body.x < 65) && !me.key6.isDown){
				barraX1 -= 1;
				if(barraX1 <= 0) {barraX1 = 0;
				me.myHealthBar1.setPercent(barraX1);
				me.player2.destroy();
				alert("Rayden ganó");
				me.game.state.restart();
			}

				if(contadorGolpes2 == 50) {
								alert("ll");
					me.player2.animations.play('caer2');
					contadorGolpes2 = 0;
				} else {
					me.player2.animations.play('golpePatada2');
					contadorGolpes2+=2;
				}
			}
		}
		//CUBRIRSE
		else if(me.keyL.isDown){
			me.player1.animations.play('cubrirse1');
		}
		//QUIETO
		else {
			me.player1.animations.play('inicio1');
		}


}
}
