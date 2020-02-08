Item.Preloader = function(game){
	// define width and height of the game
	Item.GAME_WIDTH = 640;//gambar didalam bingkai->lebar dalam
	Item.GAME_HEIGHT = 960;//gambar didalam bingkai->tinggi dalam
};
Item.Preloader.prototype = {
	preload: function(){
		// set background color and preload image
		this.stage.backgroundColor = '#B4D9E7';//backgoround sebelum masuk home
		this.preloadBar = this.add.sprite((Item.GAME_WIDTH-311)/2, (Item.GAME_HEIGHT-27)/2, 'preloaderBar');//tidak ngefek
		this.load.setPreloadSprite(this.preloadBar);
		// load images
		this.load.image('background', 'img/bg_cover.png');
		this.load.image('floor', 'img/floor.png');
		this.load.image('littleponny-cover', 'img/littleponny-cover.png');
		this.load.image('title', 'img/title.png');
		this.load.image('game-over', 'img/gameover.png');
		this.load.image('score-bg', 'img/score-bg.png');
		this.load.image('button-pause', 'img/button-pause.png');
		// load spritesheets
		this.load.spritesheet('item', 'img/icon.png', 132, 130);//agar permen bisa jatuh bervariasi
		this.load.spritesheet('littleponny-idle', 'img/littleponny-idle.png', 166.5, 170);//tampilan monster saat menunggu permen jatuh
		this.load.spritesheet('button-start', 'img/button-start.png', 401, 143);//margin bottom dan top dar menu start
	},
	create: function(){
		// start the MainMenu state
		this.state.start('MainMenu');
	}
};