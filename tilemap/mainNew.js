
    var config = {
        type: Phaser.AUTO,
        width: 500,
        height: 500,
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };

    var game = new Phaser.Game(config);

    function preload ()
    {
        this.load.tilemapTiledJSON({
            key: 'map',
            url: '../assets/tilemap.png'
        });
    }

    function create ()
    {
        var map = this.make.tilemap({ key: 'map' });

    }

    function update ()
    {
    }