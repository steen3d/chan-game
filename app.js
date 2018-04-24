console.log("The app is running");

var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	antialias: false,
	physics: {
		default: 'arcade',
		arcade: {
			// gravity: {y:200}
		}
	},
	scene: {
		preload: preload,
		create: create,
		update: update
	}
};

var game = new Phaser.Game(config);
var walking = false;
var tileSize = 64;
var walkingPosition = 0;
var walkingStartPosition = 0;
var walkingEndPosition = 0;
var walkingDir = "";

function preload(){
	this.load.setBaseURL('');
	this.load.spritesheet('chanman', 'assets/images/ChanMan.png',
		{frameWidth: 64, frameHeight: 64})
}

function create(){

	chan = this.physics.add.sprite(64, 64, 'chanman');
	chan.setCollideWorldBounds(true);
	chan.x = 400;

	this.anims.create({
		key: 'left',
		frames: [{key: 'chanman', frame: 9}, {key: 'chanman', frame: 10}, {key: 'chanman', frame: 11},  {key: 'chanman', frame: 10}],
		frameRate: 5,
		repeat: -1
	});

	this.anims.create({
		key: 'right',
		frames: [{key: 'chanman', frame: 0}, {key: 'chanman', frame: 1}, {key: 'chanman', frame: 2},  {key: 'chanman', frame: 1}],
		frameRate: 5,
		repeat: -1
	});

	this.anims.create({
		key: 'down',
		frames: [{key: 'chanman', frame: 6}, {key: 'chanman', frame: 7}, {key: 'chanman', frame: 8},  {key: 'chanman', frame: 7}],
		frameRate: 5,
		repeat: -1
	});

	this.anims.create({
		key: 'up',
		frames: [{key: 'chanman', frame: 3}, {key: 'chanman', frame: 4}, {key: 'chanman', frame: 5},  {key: 'chanman', frame: 4}],
		frameRate: 5,
		repeat: -1
	});

	this.anims.create({
		key: 'stop',
		frames: [{key: 'chanman', frame: 7}],
		frameRate: 5
	});

	cursors = this.input.keyboard.createCursorKeys();

}

function update(){


	if (walking){

		// If character is walking check if position is > walk distance

		if (walkingDir === "x"){
			console.log("Walking X")
			walking = calcIfWalking(walkingStartPosition, chan.x, tileSize);
		}else if (walkingDir === "y"){
			console.log("Walking Y")
			walking = calcIfWalking(walkingStartPosition, chan.y, tileSize);
		}

	}else{
		// Check input
		if (cursors.left.isDown){

			walking = true;
			walkingDir = "x";
			walkingPosition = chan.x;
			walkingStartPosition = chan.x;

			chan.setVelocityX(-150);
			chan.anims.play('left', true);

		} else if (cursors.right.isDown){

			walking = true;
			walkingDir = "x";
			walkingPosition = chan.x;
			walkingStartPosition = chan.x;

			chan.setVelocityX(150);
			chan.anims.play('right', true);

		} else if (cursors.up.isDown){

			walking = true;
			walkingDir = "y";
			walkingPosition = chan.y;
			walkingStartPosition = chan.y;

			chan.setVelocityY(-150);
			chan.anims.play('up', true);

		} else if (cursors.down.isDown){

			walking = true;
			walkingDir = "y";
			walkingPosition = chan.y;
			walkingStartPosition = chan.y;

			chan.setVelocityY(150);
			chan.anims.play('down', true);

		} else {

			if (walking == false){
				chan.setVelocityY(0);
				chan.setVelocityX(0);
				chan.anims.play('stop', true);
			}

		}

	}

}

function calcIfWalking(startPos, currentPos, maxDist){
	if (Math.abs(startPos - currentPos) < maxDist){
		return true;
	}else{
		return false;
	}
}