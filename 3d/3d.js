var config = {
    type: Phaser.AUTO,
    width: 600,
    height: 300,
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

const gameState = {
    score: 0
};
var bugs;
var bugsLeft;
var bugsRight;
var timer;
var bonusTimer;
var bonus;
var bonusLeft;
var bonuRight;



function preload ()
{
    this.load.image('bug', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/physics/bug_3.png')
    this.load.image('sky', '../assets/road.png')
    this.load.image('star', 'https://mohkan1.github.io/games/assets/star.png')
    this.load.image('shot', 'https://mohkan1.github.io/games/assets/bomb.png')
    this.load.spritesheet('dude', 'https://mohkan1.github.io/games/assets/dude.png', { frameWidth: 32, frameHeight: 48 })
    this.load.image('heart', '../assets/heart.jpg');

 
}

function create ()
{
    this.add.image(300,100, 'sky').setScale(2);
    gameState.player = this.physics.add.sprite(225, 270, 'dude');
    gameState.player.setCollideWorldBounds(true);
    gameState.cursors = this.input.keyboard.createCursorKeys();

    this.add.image(300, 20, 'heart');
    

    
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
        var number = 0.5;
        setInterval(function(){ 
            bug.setScale(number);
            number += 0.01;
         }, 20);
    
        
    }

    function makeBonusBigger(bonusElement) {
        var number = 0.5;
        setInterval(function(){ 
            bonusElement.setScale(number);
            number += 0.01;
         }, 20);
    }


    bugs = this.physics.add.group();
    bugsLeft = this.physics.add.group();
    bugsRight = this.physics.add.group();

    bonus = this.physics.add.group();
    bonuRight = this.physics.add.group();
    bonusLeft = this.physics.add.group();



    function spreadBugs() {
        const valueX = Math.random() * 450;
        var randomGate = parseInt(Math.random() * 4);
        
        switch (randomGate) {
          

            case 1:

            var element = bugsLeft.create(270, 120, 'bug').setScale(0.5);
            bugsLeft.setVelocityY(100);
            bugsLeft.setVelocityX(-80);
            makeBugsBigger(element);
            
                break; 
                
            case 2:
                var element = bugs.create(300, 120, 'bug').setScale(0.5);
                bugs.setVelocityY(100);
                makeBugsBigger(element);

                break;

            case 3:

            var element = bugsRight.create(330, 120, 'bug').setScale(0.5);
            bugsRight.setVelocityY(100);
            bugsRight.setVelocityX(80);
            makeBugsBigger(element);
            
                break;
        
            default:
                break;
        }

        

    }

    spreadBugs();


    timer = this.time.addEvent({
        delay: 500,
        callback: spreadBugs,
        callbackscope: this,
        loop: true
    });


    function spreadBonus() {

        const valueX = Math.random() * 450;
        var randomGate = parseInt(Math.random() * 4);
        
        switch (randomGate) {
          

            case 1:

            var element = bonusLeft.create(270, 120, 'star').setScale(0.5);
            bonusLeft.setVelocityY(100);
            bonusLeft.setVelocityX(-80);
            makeBonusBigger(element);

            
                break; 
                
            case 2:
                var element = bonus.create(300, 120, 'star').setScale(0.5);
                bonus.setVelocityY(100);
                makeBonusBigger(element);


                break;

            case 3:

            var element = bonuRight.create(330, 120, 'star').setScale(0.5);
            bonuRight.setVelocityY(100);
            bonuRight.setVelocityX(80);
            makeBonusBigger(element);

            
                break;
        
            default:
                break;
        }
        
    }

    bonusTimer = this.time.addEvent({
        delay: 700,
        callback: spreadBonus,
        callbackscope: this,
        loop: true
    });

    gameState.scoreText = this.add.text(20, 20, 'Score: ' + gameState.score + '/500', { fontSize: '16px', fill: 'black' });
    
    this.physics.add.overlap(bugs, gameState.player, (bug, player) => {
            gameState.score -= 10;   
            player.destroy();

      });

      this.physics.add.overlap(bugsRight, gameState.player, (bug, player) => {
        gameState.score -= 10;   
        player.destroy();

      });

  this.physics.add.overlap(bugsLeft, gameState.player, (bug, player) => {
    gameState.score -= 10;   
    player.destroy();

    });

    this.physics.add.overlap(bonus, gameState.player, (player, bonus) => {
        gameState.score += 10;   
        bonus.destroy();
    
        });


    this.physics.add.overlap(bonuRight, gameState.player, (player, bonus) => {
        gameState.score += 10;   
        bonus.destroy();
    
        });



        this.physics.add.overlap(bonusLeft, gameState.player, (player, bonus) => {
            gameState.score += 10;   
            bonus.destroy();
        
            });






   




}

function update ()
{
    gameState.scoreText.setText(`Score: ${gameState.score}/500`)


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
