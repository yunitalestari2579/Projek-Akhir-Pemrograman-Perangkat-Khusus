var Item = {};
Item.Boot = function(game){};
Item.Boot.prototype = {
	preload: function(){
		// preload the loading indicator first before anything else
		this.load.image('preloaderBar', 'img/loading-bar.png');//menunjukkan masih load untuk masuk ke menu home
	},
	create: function(){
		// set scale options
		this.input.maxPointers = 1;
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;//agar besar sesuai layar, apabila tidak dipakai maka tampilan akan sangat besar tapi tetap berada ditengah
		this.scale.pageAlignHorizontally = true;//supaya berada di tengah, tidak rata kiri
		this.scale.pageAlignVertically = true;
		this.scale.setScreenSize(true);//supaya sesuai ukuran screen layar dan tidak mepet kiri
		// start the Preloader state
		this.state.start('Preloader');
	}
};