var gameState = {};

var hunter = new Array();
var hunterX = 50;
var ships;
var ships2;
var ships3;
var ships4;
var score = 0;
var scoreText;
var bullet;
var dude;
var fireRate = false;
var bulletKillDude;
var shot = new Array();
var enemy;
var dudeKill;


    var config = {
        type: Phaser.AUTO,
        width: 700,
        height: 600,
        scene: {
            preload: preload,
            create: create,
            update: update
        },
        physics: {
            default: 'arcade',
            arcade: {
              debug: true
            }
          }
    };

    var game = new Phaser.Game(config);
    

    function preload() {
        this.load.audio('test', '../assets/Explosion17.wav');
        this.load.audio('start', '../assets/startUpMusic.wav');
        
        this.load.spritesheet('dude', '../assets/dude.png', { frameWidth: 32, frameHeight: 48 });
        this.load.image('bomb', '../assets/bomb.png');
        this.load.image('space', '../assets/space2.png');
    }


    function create() {
        gameState.music = this.sound.add('test');
        this.add.image(300, 300, 'space');
//        this.sound.add('start').play();
        dudeKill = this.physics.add.group();

        dude = this.physics.add.sprite(300,550, 'dude');
        enemy = this.physics.add.sprite(300,250, 'dude');
        

        setInterval(function name() {
            dudeKill.create(enemy.x, enemy.y, 'bomb');
            dudeKill.setVelocityY(100);
            //this.physics.add.overlap(element, dude, killDude, null, this);


        }, 1000);

        
        dude.setCollideWorldBounds(true);

   
        
        bullet = this.physics.add.group();
        bulletKillDude = this.physics.add.group();
        

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
        

        var numX = 100;
        var numY = 100;
        /*
        for (let index2 = 0; index2 < 4; index2++) {

            for (let index = 0; index < 10; index++) {
                numX += 50;
                hunter.push(this.physics.add.sprite(numX,numY, 'dude'));   
            }
            numY += 50;
            numX = 100;

        }
        
        hunter.forEach(element => {
            element.anims.play('right');
           // element.setVelocityX(hunterX);
        });
        */

        
        setInterval(function(){ 
            if (fireRate == true) {
                fireRate = false;
            }else if (fireRate == false) {
                fireRate = true;
            }
            }, 200);


            
        dude.anims.play('turn');
  


        

        gameState.keys = this.input.keyboard.createCursorKeys();
        gameState.nyckel = this.input.keyboard.addKeys('P,H,A,S,E,R,SPACE');
        scoreText = this.add.text(16, 16, 'score: ' + score, { fontSize: '32px', fill: 'white' });             

      /*  
        setInterval(function(){ 
            //shooting the player from 5 random ships
            
            var num = 0;

            while (num < 10) {
                var random = Phaser.Math.Between(0, hunter.length);
                
                bulletKillDude.create(hunter[random].x, hunter[random].y, 'bomb');
                bulletKillDude.setVelocityY(100);
                
                num++;
            }


            }, 1000);

            */


    }

    function update() {


        if (gameState.keys.right.isDown) {

            dude.setVelocityX(200);
            dude.anims.play('right');

        }else if(gameState.keys.left.isDown){

            dude.setVelocityX(-200);
            dude.anims.play('left');



        }else{
            dude.setVelocityX(0);
            dude.anims.play('turn');


        }

        if (gameState.nyckel.SPACE.isDown) {
            if (fireRate == true) {
     
            bullet.create(dude.x, dude.y + -20, 'bomb');
            bullet.setVelocityY(-300);
     
            this.physics.add.overlap(bullet, enemy, killEnemy, null, this);
     
            console.log('hunter');
            fireRate = false;
            }
        }

        scoreText.setText('score: ' + score);
/*
        if (hunter[0].x > 200) {
            hunterX *= -1;

            hunter.forEach(element => {
                element.anims.play('left');
                element.setVelocityX(hunterX);
            });


            //shooting the player from 5 random ships
            for (let index = 0; index < 10; index++) {

                var random = Phaser.Math.Between(0, hunter.length);
                var shot = this.physics.add.image(hunter[random].x, hunter[random].y, 'bomb');
                shot.setVelocityY(150);
                this.physics.add.overlap(dude, shot, killhunter, null, this);
            }
            

        }else if (hunter[0].x < 50){
            hunterX *= -1;

            hunter.forEach(element => {
                element.anims.play('right');
                element.setVelocityX(hunterX);
            });
            
             //shooting the player from 5 random ships
             for (let index = 0; index < 10; index++) {

                var random = Phaser.Math.Between(0, hunter.length);
                var shot = this.physics.add.image(hunter[random].x, hunter[random].y, 'bomb');
                shot.setVelocityY(150);
                this.physics.add.overlap(dude, shot, killhunter, null, this);
            }
        }

*/

        
        
    }



    function killEnemy(bullet, enemy) {

        
        

        gameState.music.play();
        enemy.destroy();
        bullet.destroy();
        score++;
        this.physics.pause();
        this.scene.restart();

        console.log(hunter);
    }

    function killEnemy3(bullet, ships3) {
        gameState.music.play();
        ships3.destroy();
        bullet.destroy();
        score++;
    }

    function killEnemy4(bullet, ships4) {
        gameState.music.play();
        ships4.destroy();
        bullet.destroy();
        score++;
    }

    function killDude(dudeKill, dude) {
        dudeKill.destroy();
        dude.setTint(0xff0000); 

    }