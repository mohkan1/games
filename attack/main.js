
    var config = {
        type: Phaser.AUTO,
        width: 600,
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
    var player;
    var bomb;
    var score = 0;
    var scoreText;
    var touched = 0;
    var state = true;

    function preload ()
    {
        this.load.image('bomb', '../assets/bomb.png');
        this.load.spritesheet('dude', '../assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    }

    function create ()
    {   
        player = this.physics.add.sprite(300, 300, 'dude');
        player.setCollideWorldBounds(true);

        bomb = this.physics.add.group();

        
        for (var i = 0; i < 20; i++)
        {   
            var valueY = Phaser.Math.Between(0, 600);
            var oneBomb = bomb.create(10, valueY, 'bomb');
            
            var valueX = Phaser.Math.Between(0, 200);
            oneBomb.body.velocity.x = valueX;            

        }

        setInterval(function(){ 

        for (var i = 0; i < 20; i++)
        {   
            var valueY = Phaser.Math.Between(0, 600);
            var oneBomb = bomb.create(10, valueY, 'bomb');
            
            var valueX = Phaser.Math.Between(0, 200);
            oneBomb.body.velocity.x = valueX;            

        }

         }, 5000);


         setTimeout(function(){ 
            state = false;

            if (touched > 0) {
                scoreText.setText('Game Over');
            }else{
                scoreText.setText('Congratulations!');
            }
            
        }, 60000);



        this.physics.add.overlap(player, bomb, killed, null, this);


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

        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: 'white' });             

    }

    function update ()
    {   

        var cursors = this.input.keyboard.createCursorKeys();
        if (cursors.left.isDown)
        {   
            player.setVelocityX(-160);
            player.anims.play('left', true);    
            
            if (cursors.up.isDown) {
                player.setVelocityY(-160);
            player.anims.play('left', true);
            }

            if (cursors.down.isDown) {
            player.setVelocityY(160);
            player.anims.play('left', true);
            }
           
        }else if (cursors.right.isDown){

            player.setVelocityX(160);
            player.anims.play('right', true);

            if (cursors.up.isDown) {
                player.setVelocityY(-160);
            player.anims.play('right', true);
            }

            if (cursors.down.isDown) {
            player.setVelocityY(160);
            player.anims.play('right', true);
            }

        }else if (cursors.down.isDown){
            player.setVelocityY(160);
            player.anims.play('turn', true);

        }else if(cursors.up.isDown){
            player.setVelocityY(-160);
            player.anims.play('turn', true);

        } else{
            player.setVelocityX(0);
            player.setVelocityY(0);
            player.anims.play('turn');
        }

            
            if (state) {
            score++;
            scoreText.setText('Score: ' + score + ' points (One min)');
            }else{
                scoreText.setText('Game Over');
                
            }
    }


    function killed(player, bomb) {
        player.setTint(0xff0000);
        touched++;
        state = false;

    }