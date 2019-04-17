var config = {
    type: Phaser.AUTO,
    width: 500,
    height: 500,
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

const gameState = {};
var bugs;
var timer;

function preload ()
{

    this.load.image('bug', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/physics/bug_3.png')

    this.load.image('shot', 'https://mohkan1.github.io/games/assets/bomb.png')
    this.load.spritesheet('dude', 'https://mohkan1.github.io/games/assets/dude.png', { frameWidth: 32, frameHeight: 48 })

}

function create ()
{
    gameState.player = this.physics.add.sprite(225, 550, 'dude');
    gameState.player.setCollideWorldBounds(true);
    gameState.cursors = this.input.keyboard.createCursorKeys();

    
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
        frameRate: 10,
        repeat: -1,
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame : 4 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8}),
        frameRate: 10,
        repeat: -1 
    });

    function makeBugsBigger(bug) {
         
            bug.setScale(2);
            
    }

    
    bugs = this.physics.add.group();

    function spreadBugs() {
        const valueX = Math.random() * 450;
        var element = bugs.create(valueX, 10, 'bug');
        bugs.setVelocityY(100);
        makeBugsBigger(element);

    }

    spreadBugs();


}

function update ()
{
    if (gameState.cursors.right.isDown) {
        gameState.player.setVelocityX(200);
        gameState.player.anims.play('right');
    } else if(gameState.cursors.left.isDown){
        gameState.player.setVelocityX(-200);
        gameState.player.anims.play('left');

    }else{
        gameState.player.setVelocityX(0);
        gameState.player.anims.play('turn');

    }
}