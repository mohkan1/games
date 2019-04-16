var gameState = {};

var ships;
var ships2;
var ships3;
var ships4;
var score = 0;
var scoreText;
var bullet;

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
                debug : false
            }
        }
    };

    var game = new Phaser.Game(config);
    

    function preload() {
        this.load.audio('test', '../assets/Explosion17.wav');
        this.load.spritesheet('dude', '../assets/dude.png', { frameWidth: 32, frameHeight: 48 });
        this.load.image('bomb', '../assets/bomb.png');
        this.load.image('space', '../assets/space2.png');
    }


    function create() {
        gameState.music = this.sound.add('test');
        this.add.image(300, 300, 'space');

        gameState.dude = this.physics.add.sprite(300,550, 'dude');
        gameState.dude.setCollideWorldBounds(true);

                
        
        bullet = this.physics.add.group();

        ships = this.physics.add.group({
            key: 'dude',
            repeat: 6,
            setXY: { x : 20, y : 50, stepX: 70}
        });

       

        ships2 = this.physics.add.group({
            key: 'dude',
            repeat: 15,
            setXY: { x : 12, y : 150, stepX: 70}
        });

        ships3 = this.physics.add.group({
            key: 'dude',
            repeat: 15,
            setXY: { x : 12, y : 250, stepX: 70}
        });

        ships4 = this.physics.add.group({
            key: 'dude',
            repeat: 15,
            setXY: { x : 12, y : 350, stepX: 70}
        });

        var velX = 50;
        var velX2 = 50;
        var velX3 = 50;
        var velX4 = 50;

        setInterval(function(){ 
            velX *= -1;
            velX2 *= -1;
            velX3 *= -1;
            velX4 *= -1;

            
        ships.setVelocityX(velX);
        ships2.setVelocityX(velX2);
        ships3.setVelocityX(velX3);
        ships4.setVelocityX(velX4);


        }, 5000);

        ships.setVelocityX(velX);
        ships2.setVelocityX(velX2);
        ships3.setVelocityX(velX3);
        ships4.setVelocityX(velX4);

       

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
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

    
        gameState.dude.anims.play('turn');
        gameState.keys = this.input.keyboard.createCursorKeys();


        
        gameState.nyckel = this.input.keyboard.addKeys('P,H,A,S,E,R,SPACE');
        scoreText = this.add.text(16, 16, 'score: ' + score, { fontSize: '32px', fill: 'white' });             

    }

    function update() {
        if (gameState.keys.right.isDown) {

            gameState.dude.setVelocityX(200);

        }else if(gameState.keys.left.isDown){

            gameState.dude.setVelocityX(-200);


        }else{
            gameState.dude.setVelocityX(0);

        }

        if (gameState.nyckel.SPACE.isDown) {
            bullet.create(gameState.dude.x, gameState.dude.y + -20, 'bomb');
            bullet.setVelocityY(-300);
            this.physics.add.overlap(bullet, ships, killEnemy, null, this);
            this.physics.add.overlap(bullet, ships2, killEnemy2, null, this);
            this.physics.add.overlap(bullet, ships3, killEnemy3, null, this);
            this.physics.add.overlap(bullet, ships4, killEnemy4, null, this);    
            
            console.log('hunter');

        }

        scoreText.setText('score: ' + score);
        
    }


    function killEnemy(bullet, ships) {
        gameState.music.play();
        ships.destroy();
        bullet.destroy();
        score++;
    }

    function killEnemy2(bullet, ships2) {
        gameState.music.play();
        ships2.destroy();
        bullet.destroy();
        score++;
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