var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y : 300},
            debug : false
        }
    }
};

var game = new Phaser.Game(config);
    var platforms;
    var player;
    var score = 0;
    var scoreText;
    var explosion;
    var bombs;

    function preload ()
    {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
        this.load.audio('explosion', 'explosion.mp3');

    }

    function create ()
    {
         this.add.image(400, 300, 'sky');
    

         platforms = this.physics.add.staticGroup();

         platforms.create(400, 568, 'ground').setScale(2).refreshBody();
     
         platforms.create(600, 400, 'ground');
         platforms.create(50, 250, 'ground');
         platforms.create(750, 220, 'ground');

         player = this.physics.add.sprite(100, 450, 'dude');
         this.physics.add.collider(player, platforms);
        
         player.setBounce(0.2);
         player.setCollideWorldBounds(true);

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

         //droping the stars
         stars = this.physics.add.group({
             key: 'star',
             repeat: 11,
             setXY: { x : 12, y : 0, stepX: 70}
         });

         stars.children.iterate(function (child) {

            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        });

         this.physics.add.collider(stars, platforms);

         //bombs

         bombs = this.physics.add.group({
             key: 'bomb',
             repeat: 4,
             setXY: { x : 12, y : 0, stepX: 250}
         });

         bombs.children.iterate(function (child) {

            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        });

        this.physics.add.collider(bombs, platforms);

         //the score
         scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });             
         this.physics.add.overlap(player, stars, collectStar, null, this);
         this.physics.add.overlap(player, bombs, hurted, null, this);
        
        }
        
        function update ()
        {
            var cursors = this.input.keyboard.createCursorKeys();
            if (cursors.left.isDown)
            {
                player.setVelocityX(-160);

                player.anims.play('left', true);
            }else if (cursors.right.isDown){

                player.setVelocityX(160);
                player.anims.play('right', true);
            } else{
                player.setVelocityX(0);
                player.anims.play('turn');
            }

            if (cursors.up.isDown && player.body.touching.down) {
                player.setVelocityY(-330);
            }

            
            
        }

        function collectStar (player, star)
        {
            star.disableBody(true, true);
        
            score += 10;
            scoreText.setText('Score: ' + score);
        
            
        }

        function hurted(player, bombs) {
        
        }
              
              
        