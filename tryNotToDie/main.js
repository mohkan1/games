
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
                gravity: { y : 100},
                debug : false
            }
        }
    };

    var game = new Phaser.Game(config);
    var player;
    var platforms;
    var score = 0;
    var scoreText;
    var state = true;
    var bombs;
    var touched = 0;
    var timeOut = true;

    function preload ()
    {
        this.load.spritesheet('dude', '../assets/dude.png', { frameWidth: 32, frameHeight: 48 });
        this.load.image('ground', '../assets/platform.png');
        this.load.image('bomb', '../assets/bomb.png');
        
    }

    function create ()
    {

        player = this.physics.add.sprite(300, 300, 'dude');

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

        player.anims.play('turn');

        player.setCollideWorldBounds(true);

        player.setVelocityX(160);
        player.anims.play('right');


        platforms = this.physics.add.staticGroup();

        platforms.create(400, 600, 'ground').setScale(2).refreshBody();
        platforms.create(400, -10, 'ground').setScale(2).refreshBody();


        this.physics.add.collider(player, platforms, kill, null, this);

        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: 'white' });             

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8}),
            frameRate: 10,
            repeat: -1 
        });



        bombs = this.physics.add.group();
        

        setInterval(function(){ 
            

            for (var i = 0; i < 3; i++)
            {   
            var valueY = Phaser.Math.Between(40, 560);
            bombs.create(10, valueY, 'bomb');
            
            var valueY = Phaser.Math.Between(40, 560);
            bombs.create(680, valueY, 'bomb');
            }
             }, 3000);
    
             this.physics.add.overlap(player, bombs, kill, null, this);

        setTimeout(function(){ 
            state = false;

            if (touched > 0) {
                scoreText.setText('Game Over');
            }else{
                scoreText.setText('Congratulations!');
            }

            timeOut = false;
        
        }, 60000);

        

       

    }

    function update ()
    {

        var cursors = this.input.keyboard.createCursorKeys();

        if (cursors.up.isDown) {
            player.setVelocityY(-160);
            
        }

        if (player.x > 680) {
            player.setVelocityX(-160);
            player.anims.play('left');
        }

        if (player.x < 20) {
            player.setVelocityX(160);
            player.anims.play('right');
        }

        if (state) {
            score++;
            scoreText.setText('score: ' + score + ' (one min)');
        }
    }



    function kill(player, platforms) {
        if (timeOut) {
            scoreText.setText('GAME OVER');
            touched++;
            player.setTint(0xff0000);
            scoreText.setTint(0xff0000);
            state = false;


        }
        

    }