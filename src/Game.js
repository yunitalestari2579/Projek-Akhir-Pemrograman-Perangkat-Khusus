Item.Game = function(game) {
    // definisi variabel
    this.player = null;
    this._itemGroup = null;
    this._spawnItemTimer = 0;
    this._fontStyle = null;
    this.cursors = null;
    this.floor=null;
    // define Candy variables to reuse them in Candy.item functions
    Item._scoreText = null;
    Item._score = 0;
    //Candy._health = 0;
    //this.candy = null;
};
Item.Game.prototype = {
    create: function(game) {
        // start the physics engine
        this.physics.startSystem(Phaser.Physics.ARCADE);

        // set the global gravity
        this.physics.arcade.gravity.y = 200;

        // display images: background, floor and score
        this.add.sprite(0, 0, 'background');
        this.floor = this.add.sprite(-30, Item.GAME_HEIGHT - 78, 'floor');
        this.add.sprite(10, 5, 'score-bg');

		//line 29 - 30 gak ngaruh
        this.game.physics.arcade.enable(this.floor);
        this.floor.enableBody = true;
        this.floor.body.moves = false;//supaya lantai tampilannya stuck


        // add pause button
        this.add.button(Item.GAME_WIDTH - 96 - 10, 5, 'button-pause', this.managePause, this);
        // create the player
        this.player = this.add.sprite(5, 720, 'littleponny-idle');
        // add player animation
        //this.player.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 10, true);
        this.player.animations.add('left', [0, 1], 10, true);
		this.player.animations.add('right', [3, 4], 10, true);
        // play the animation
        //this.player.animations.play('idle');
        // set font style
        this._fontStyle = { font: "40px Arial", fill: "#FFCC00", stroke: "#333", strokeThickness: 5, align: "center" };

        // initialize the spawn timer
        this._spawnItemTimer = 0;

        // initialize the score text with 0
        Item._scoreText = this.add.text(120, 20, "0", this._fontStyle);

        // set health of the player
        Item._health = 10;

        // create new group for candy
        this._itemGroup = this.add.group();

        // spawn first candy
        Item.item.spawnItem(this);

        // mengaktifkan physics dan mode bisa digerakkan
        this.game.physics.arcade.enable([this.player]);
        // biar gak jatuh kepengaruh gravitasi
        this.player.body.allowGravity = false;
        // biar gak melebihi frame
        this.player.body.collideWorldBounds = true;

        //membuat kontrol karakter
        cursors = this.input.keyboard.createCursorKeys();
    },

    managePause: function() {
        // pause the game
        this.game.paused = true;
        // add proper informational text
        var pausedText = this.add.text(100, 250, "Game paused.\nTap anywhere to continue.", this._fontStyle);
        // set event listener for the user's click/tap the screen
        this.input.onDown.add(function() {
            // remove the pause text
            pausedText.destroy();
            // unpause the game
            this.game.paused = false;
        }, this);
    },

    update: function(game) {
        // update timer every frame
        this._spawnItemTimer += this.time.elapsed;
        // if spawn timer reach one second (1000 miliseconds)
        if (this._spawnItemTimer > 1000) {
            // reset it
            this._spawnItemTimer = 0;
            // and spawn new candy
            Item.item.spawnItem(this);
        }

        // loop through all candy on the screen
        this._itemGroup.forEach(function(item) {
            // to rotate them accordingly
            item.angle += item.rotateMe;
        });
        // if the health of the player drops to 0, the player dies = game over
        if (!Item._health) {
            // show the game over message
            this.add.sprite((Item.GAME_WIDTH - 594) / 2, (Item.GAME_HEIGHT - 271) / 2, 'game-over');
            // pause the game
            this.game.paused = true;
        }


        if (typeof this.player !== "undefined") {

            this.player.body.velocity.x = 0;

            if (cursors.left.isDown) {
                //bergerak ke kiri
                this.player.body.velocity.x = -500; //*- artinya berjalan ke arah kiri 500 menunjukkan kecepatannya
                this.player.animations.play('left');

            } else if (cursors.right.isDown) {
                //bergerak ke kanan
                this.player.body.velocity.x = 500; //berjalan ke arah kiri 500 menunjukkan kecepatannya
                this.player.animations.play('right');
            }else {
				//tidak bergerak
				this.player.animations.stop();
				this.player.frame = 2;//gambar ke 4 dari karakter yang menghadap ke depan
			}
        }

		game.physics.arcade.overlap(this.player, this._itemGroup, Item.item.collectItem, null, this);
		
    }

};

Item.item = {

    spawnItem: function(game) {

        // calculate drop position (from 0 to game width) on the x axis
        var dropPos = Math.floor(Math.random() * Item.GAME_WIDTH);
        // define the offset for every candy
        var dropOffset = [-27, -36, -36, -38, -48];
        // randomize candy type
        var itemType = Math.floor(Math.random() * 5);
        // create new candy
        this.item = game.add.sprite(dropPos, dropOffset[itemType], 'item');
        // add new animation frame
        this.item.animations.add('anim', [itemType], 10, true);
        // play the newly created animation
        this.item.animations.play('anim');
        // enable candy body for physic engine
        game.physics.enable(this.item, Phaser.Physics.ARCADE);

        this.item.enableBody = true;

        // be sure that the candy will fire an event when it goes out of the screen
        this.item.checkWorldBounds = true;
        // reset candy when it goes out of screen
        this.item.events.onOutOfBounds.add(this.removeItem, this);
        // set the anchor (for rotation, position etc) to the middle of the candy
        this.item.anchor.setTo(0.5, 0.5);
        // set the random rotation value
        this.item.rotateMe = (Math.random() * 4) - 2;
        // add candy to the group
        game._itemGroup.add(this.item);
    },

    collectItem: function(player, item) {
        // ngilangin candy kalo di tabrak
        item.kill();
        // add points to the score
        Item._score += 1;
        // update score text
        Item._scoreText.setText(Item._score);
    },

    removeItem: function(item) {
        // kill the candy
        item.kill();
        // decrease player's health
        Item._health -= 10;
    }
};
