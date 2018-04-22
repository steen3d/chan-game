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

function preload(){
	this.load.setBaseURL('');
	this.load.spritesheet('chanman', 'assets/images/ChanMan.png',
		{frameWidth: 64, frameHeight: 64})
}

function create(){

	chan = this.physics.add.sprite(64, 64, 'chanman');
	chan.setCollideWorldBounds(true);

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

	if (cursors.left.isDown){
		chan.setVelocityX(-150);
		chan.setVelocityY(0);
		chan.anims.play('left', true);
	} else if (cursors.right.isDown){
		chan.setVelocityX(150);
		chan.setVelocityY(0);
		chan.anims.play('right', true);
	} else if (cursors.up.isDown){
		chan.setVelocityY(-150);
		chan.setVelocityX(0);
		chan.anims.play('up', true);
	} else if (cursors.down.isDown){
		chan.setVelocityY(150);
		chan.setVelocityX(0);
		chan.anims.play('down', true);
	} else {
		chan.setVelocityY(0);
		chan.setVelocityX(0);
		chan.anims.play('stop', true);
	}

}