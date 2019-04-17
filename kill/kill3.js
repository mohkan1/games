var config = {
    type: Phaser.AUTO,
    width: 500,
    height: 700,
    backgroundColor: "#008080",
    physics: {
        default: 'arcade',
        arcade: {
          enableBody: true
        }
      },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

const gameState = {
    score: 0
};

var shots;
var bugs = {};
var fireRate = true;
var goal = 500;
var timer;  

function preload ()
{
    this.load.image('bug', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/physics/bug_3.png')
    this.load.image('platform', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/physics/platform.png')
    this.load.spritesheet('dude', '../assets/dude.png', { frameWidth: 32, frameHeight: 48 })
    this.load.image('shot', '../assets/bomb.png')
}

function create ()
{
    gameState.player = this.physics.add.sprite(225, 550, 'dude');
    gameState.player.setCollideWorldBounds(true);
    gameState.player.setVelocityY(100);
    
    const platform = this.physics.add.staticGroup();
    platform.create(160, 650, 'platform');
    platform.create(460, 650, 'platform');

     shots = this.physics.add.group();

    this.physics.add.collider(gameState.player, platform);

    gameState.cursors = this.input.keyboard.createCursorKeys();


    bugs = this.physics.add.group();

    function spreadBugs() {
        const valueX = Math.random() * 450;
        bugs.create(valueX, 10, 'bug');
        bugs.setVelocityY(100);
    }

    spreadBugs();

    this.physics.add.overlap(bugs, platform, (bug) => {
        bug.destroy();
        if (gameState.score >= 10) {
            gameState.score -= 20;
        }

    });


     timer = this.time.addEvent({
        delay: 10,
        callback: spreadBugs,
        callbackscope: this,
        loop: true
    });

    setInterval(function(){ 
        if (fireRate == true) {
            fireRate = false;
        }else if (fireRate == false) {
            fireRate = true;
        }
        }, 250);
    
    this.physics.add.overlap(bugs, gameState.player, (bug) => {
        this.physics.pause();
          timer.destroy();
          gameState.score = 0;
          this.add.text(70, 250, 'Click to start again', { fontSize: '30px', fill: 'white' })
          this.input.on('pointerup', () => {
              this.scene.restart();
          });
  
      });
  
    
      
    gameState.keys = this.input.keyboard.addKeys('P,H,A,S,E,R,SPACE');

    gameState.scoreText = this.add.text(195, 630, 'Score: 0', { fontSize: '15px', fill: '#000000' })


    
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


}



function update ()
{
    gameState.scoreText.setText(`Score: ${gameState.score}`)

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

   if(gameState.keys.SPACE.isDown){
       if (fireRate) {
        shots.create(gameState.player.x, gameState.player.y - 30, 'shot');
        shots.setVelocityY(-200);

        this.physics.add.overlap(bugs, shots, (bug, shot) => {
            bug.destroy();
            shot.destroy();
            gameState.score += 10;
        });
        
        fireRate = false;
       }
        
    }



    if (gameState.score == goal) {
        this.physics.pause();
        this.add.text(20, 250, 'Cong! go to the next level', { fontSize: '30px', fill: 'white' });
        timer.destroy();

    }
}