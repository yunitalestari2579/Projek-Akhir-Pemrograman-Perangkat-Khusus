Item.MainMenu = function(game){};
Item.MainMenu.prototype = {
	create: function(){
		// display images
		this.add.sprite(-40	, 0, 'background');//background home
		this.add.sprite(320, Item.GAME_HEIGHT-450, 'littleponny-cover');//sbg posisi monster, -130 sbg margin left, 514 margin bottom
		this.add.sprite((Item.GAME_WIDTH-550)/2, 90, 'title');//posisi judul, 395 margin right,60 margin top
		// add the button that will start the game
		this.add.button(Item.GAME_WIDTH-620-10, Item.GAME_HEIGHT-143-10, 'button-start', this.startGame, this, 1, 0, 2);//posisi menu start, 401 margin right 10 juga margin right jadi seperti 401+10, 143-10 adalah margin bottom, this 1,0,2 adalah urutan gambar sehingga seperti memiliki efek ganti warna pada menu start
	},
	startGame: function() {
		// start the Game state
		this.state.start('Game');
	}
};