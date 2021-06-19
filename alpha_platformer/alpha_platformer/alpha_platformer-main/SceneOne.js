var player;
var banane;
var statue;
var serpent;
var tortue;
var petiteBanane;
var keys;
var gamepad;
var paddle;
var padConnected;
var pad;
var texteStatue;
var mountainsBack;
var coffre;
var texteApparu;
var peutTirer = true;
var jaguar;
var startmusic = true;

class SceneOne extends Phaser.Scene{
    constructor(){
        super("sceneOne");
        this.pad = null;
    }
    init(data){
    }
    preload(){
        this.load.image('player', 'assets/images/player_placeholdere.png');
        this.load.image('parallax_1', 'assets/images/mountains_back.png');
        this.load.image('parallax_2', 'assets/images/mountains_mid1.png');
        this.load.image('parallax_3', 'assets/images/mountains_mid2.png');
        this.load.image('coffre', 'assets/images/coffre.png');
        this.load.image('banane', 'assets/images/banane.png');
        this.load.image('statue', 'assets/images/statue.png');
        this.load.image('serpent', 'assets/images/serpent.png');
        this.load.image('tortue', 'assets/images/tortue.png');
        this.load.audio('jaguar', 'assets/audios/jaguar.mp3');
        
           }
    create(){
        jaguar = this.sound.add ('jaguar',{loop: true});
        mountainsBack = this.add.image(640, 360, 'parallax_1').setScrollFactor(0.1);
        mountainsBack = this.add.image(640, 360, 'parallax_2').setScrollFactor(0.5);
        mountainsBack = this.add.image(640, 360, 'parallax_3').setScrollFactor(0.8);
        texteStatue = this.add.text(420, 200, 'Oinya ascadiquia', { font: '48px Arial', fill:"#009" }).setVisible(false);
        //---------SETTIMEOUT-------------//
        // setTimeout(function(){ce qui se passe}, temps);
        //-------------------------------//
        banane = this.physics.add.group()
        statue = this.add.image(600, 616, 'statue').setScale(0.50);
        
        serpent = this.physics.add.sprite(1300, 550, 'serpent').setScale(0.25);
        tortue = this.physics.add.sprite(1800, 550, 'tortue').setScale(0.35);
        player = this.physics.add.sprite(100, 500, 'player').setScale(0.35);
        coffre = this.physics.add.sprite(300, 500,  'coffre').setScale(0.10);
        this.physics.add.overlap(player,coffre,recupCoffre,null,this)                       
        
        function recupCoffre(player,coffre){
            coffre.destroy();
            texteApparu = this.add.text(10, 200, 'Médusa savait comment transformer un homme en pierre.', { font: '20px Ancient Geek', fill:"#090" });
            setTimeout (function(){
                texteApparu.destroy()
            },1500);
        }
        ///this.physics.add.overlap(player,serpent,tuejoueur,null,this)
            
        ///function tuejoueur(player,serpent){
        ///    serpent.destroy();
        ///}
        
        this.physics.add.overlap(serpent,banane,bananetue,null,this)
        function bananetue(serpent,banane){
            serpent.destroy();
            banane.destroy();
        }    
         
        //clavier
        keys = this.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            up : Phaser.Input.Keyboard.KeyCodes.UP,
            down: Phaser.Input.Keyboard.KeyCodes.DOWN,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE,
            shift: Phaser.Input.Keyboard.KeyCodes.SHIFT,
            escape : Phaser.Input.Keyboard.KeyCodes.ESC
        });
        
        //manette
        if (this.input.gamepad.total === 0){
            this.input.gamepad.once('connected', function (pad, button, index) {
                paddle = pad;
                padConnected = true;
            }); 
        }
        else {
            paddle = this.input.gamepad.pad1;
        }
        this.cameras.main.startFollow(player);
        
     }
    
    update(){
        if (keys.right.isDown){ 
            player.setVelocityX(500);
        
        }
        else if (keys.left.isDown){
            player.setVelocityX(-200);
            
        }
        else if (keys.right.isUp && keys.left.isUp){
            player.setVelocity(0);
        }
        if (player.x>=400 && player.x<=600){
            texteStatue.setVisible(true)
        }
           
        else{
            texteStatue.setVisible(false);
        }
        if (keys.space.isDown){
            tirer();
        }
        if (serpent.x < player.x && serpent.x <= 1000 ){
            serpent.setVelocityX(100);
        }
        else if (serpent.x > player.x && serpent.x >= 1200){
            serpent.setVelocityX(-100);
        }
            
            
        if (tortue.x <= 1500 ){
            tortue.setVelocityX(100);
        }
        else if (tortue.x >= 1900){
            tortue.setVelocityX(-100);
        }
        if (startmusic){
            jaguar.play();
            startmusic=false;
        }
        
        
    }
}
function tirer (){
    if (peutTirer == true){
    
    petiteBanane = banane.create(player.x,player.y,'banane').setScale(0.10);
    petiteBanane.setVelocityX(600);
    petiteBanane.setVelocityY(-100);
    petiteBanane.setAccelerationY(-600);
    setTimeout(function(){petiteBanane.setAccelerationY(600)}, 300); 
    peutTirer = false;
    setTimeout(function(){peutTirer = true}, 3800);
    setTimeout(function(){petiteBanane.destroy()}, 3799);
    
    }
}
//---------SETTIMEOUT-------------//
// setTimeout(function(){ce qui se passe}, temps);
//-------------------------------//