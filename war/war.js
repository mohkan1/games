var config = {
    type: Phaser.AUTO,
    width: 600,
    height: 700,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug : false
        }
    }
};

var game = new Phaser.Game(config);
var player;
var enemy;

function preload ()
{
    this.load.spritesheet('dude', '../assets/dude.png', { frameWidth: 32, frameHeight: 48 });

}

function create ()
{

    player = this.physics.add.sprite(100, 650, 'dude');
    enemy = this.physics.add.sprite(100, 30, 'dude');

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame : 4 }],
        frameRate: 20
    });

    player.anims.play('turn', true);
    enemy.anims.play('turn');
    enemy.angle = 180;

}

function update ()
{
    var cursor = this.input.keyboard.createCursorKeys();

    if (cursor.right.isDown) {
        player.setVelocityX(200);
        
    }else if(cursor.left.isDown){
        player.setVelocityX(-200);
    }else{
        player.setVelocityX(0);

    }

}