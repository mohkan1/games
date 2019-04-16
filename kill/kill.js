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

function preload ()
{
    this.load.image('bug', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/physics/bug_3.png')
    this.load.image('platform', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/physics/platform.png')
    this.load.image('codey', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/physics/codey.png')
    this.load.image('shot', '../assets/bomb.png')



}

function create ()
{
    gameState.player = this.physics.add.sprite(225, 550, 'codey');
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
            gameState.score -= 10;
        }

    });


    const timer = this.time.addEvent({
        delay: 250,
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
          this.add.text(150, 250, 'Click to start again', { fontSize: '30px', fill: 'red' })
          this.input.on('pointerup', () => {
              this.scene.restart();
          });
  
      });
  
    
      
    gameState.keys = this.input.keyboard.addKeys('P,H,A,S,E,R,SPACE');

    gameState.scoreText = this.add.text(195, 630, 'Score: 0', { fontSize: '15px', fill: '#000000' })


    


}



function update ()
{
    gameState.scoreText.setText(`Score: ${gameState.score}`)

    if (gameState.cursors.right.isDown) {
        gameState.player.setVelocityX(200);
    } else if(gameState.cursors.left.isDown){
        gameState.player.setVelocityX(-200);

    }else{
        gameState.player.setVelocityX(0);
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
}