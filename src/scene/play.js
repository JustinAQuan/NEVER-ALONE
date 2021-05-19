class play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // LOADS MAIN MONITOR
        this.load.image('homescreen', './assets/Desktop_bg.png');
        this.load.image('monitor_border', './assets/Monitor.png');
        this.load.image('ie', './assets/Internet_explorer.png');
        this.load.image('recycle_bin', './assets/Recycle_bin.png');
        this.load.image('inbox', './assets/Inbox.png');
        this.load.image('my_pc', './assets/My_computer.png');


        // LOADS ROOM
        this.load.image('room', './assets/room.png');


        // LOADS OUTSIDE
        this.load.image('test', './assets/test.png');


        // LOADS PATH1_1
        this.load.image('webpage', './assets/reallygoodwebpage.png');
        this.load.image('link1_1_1', './assets/linkex.png');


        // LOADS AUDIO
        this.load.audio('click', './assets/click.wav');
        this.load.audio('double_click', './assets/double_click.wav');
        this.load.audio('weird', './assets/weird.wav');
        this.load.audio('startup', './assets/startup.wav');
    }

    create() {
        let scene = this;

        //////////////////////////////
        //   INITIAL SCENE SETUP    //
        //////////////////////////////

        // creates outside whenever we want
        // this.outside = this.add.tileSprite().setOrigin(0,0);

        this.sound.play('startup', {volume: 0.5});

        // creates room
        this.room = this.add.sprite(-game.config.width / 5, -game.config.height / 20, 'room').setOrigin(0, 0);

        this.computer = this.add.container();

        // create monitor
        this.monitor_border = this.add.sprite(0, 0, 'monitor_border').setOrigin(0, 0);
        this.homescreen = this.add.sprite(monitorBorderX, monitorBorderY, 'homescreen').setOrigin(0, 0);

        // monitor icons
        this.myPC = new clickable(this, monitorBorderX + 10, monitorBorderY + 20, 'my_pc', "icon").setOrigin(0, 0);
        this.inbox = new clickable(this, monitorBorderX + 15, monitorBorderY * 2 + 40, 'inbox', "icon").setOrigin(0, 0);
        this.ie = new clickable(this, monitorBorderX + 15, monitorBorderY * 4 + 20, 'ie', "icon").setOrigin(0, 0);
        this.rb = new clickable(this, monitorBorderX + 15, monitorBorderY * 6 + 20, 'recycle_bin', "icon").setOrigin(0, 0);

        this.computer.add([this.monitor_border, this.homescreen, this.ie, this.rb, this.inbox, this.myPC]);


        //////////////////////////////
        //   WEBPAGE CONTAINERS     //
        //////////////////////////////

        // path 1
        this.path1_1 = this.add.container();
        this.path1_2 = this.add.container();
        this.path1_3 = this.add.container();

        // path 2
        this.path2_1 = this.add.container();
        this.path2_2 = this.add.container();
        this.path2_3 = this.add.container();

        // paht 3
        this.path3_1 = this.add.container();
        this.path3_2 = this.add.container();
        this.path3_3 = this.add.container();

        // path 1_1 template
        this.webpage1_1 = this.add.rectangle(300, 200, 300, 300);
        this.link1_1_1 = new clickable(this, 350, 250, 'link1_1_1');

        this.path1_1.add([this.webpage1_1, this.link1_1_1]);

        this.computer.add([this.path1_1]);





        // //prototype looking around and hearing sounds
        // this.time.delayedCall(3000, () => {
        //     // add instruction text
        //     this.instructions = this.add.text(
        //         game.config.width / 2,
        //         game.config.height - monitorBorderY * 4,
        //         "Press Space to look around the room", { fontSize: "30px", color: 0xffffff }
        //     ).setOrigin(0.5, 0);

        //     // play sound
        //     this.sound.play('weird');

        //     // add something to window
        //     this.beegyoshi = this.add.sprite(500, 0, 'test').setOrigin(0, 0);
        //     this.beegyoshi.setDepth(-1);
        // }, null, this);


        //////////////////////////////
        //      MAIN CONTROLS       //
        //////////////////////////////

        // camera follows player's mouse
        this.cameras.main.startFollow(this.input, false, 0.01, 0.01);

        // initializing spacebar as a keyboard input
        this.spaceKey = this.input.keyboard.addKey('SPACE');
        this.escape = this.input.keyboard.addKey('ESC');

        // pause game when player presses esc
        this.escape.on('down', function(){
            scene.scene.pause();
            scene.scene.launch("pause");
        });
    }

    update() {
        if (this.spaceKey.isDown) { // able to look around the room when pressing space
            this.cameras.main.setBounds(-game.config.width / 5, // x: -160
                -game.config.height / 20, // y: -30
                game.config.width * 1.5, // width: 1200 (therefore, can scroll right until 1040 pixels)
                game.config.height * 1.1); // height: 660 (therefore, can scroll down until 630 pixels)

            this.computer.setY(180);
            this.computer.setScale(.75);

            if (this.instructions) {
                this.instructions.destroy();
            }
        } else { // can only see screen monitor when not pressing space
            this.cameras.main.setBounds(
                0, // x: 0
                0, // y: 0
                game.config.width, // width: 800
                game.config.height); // height: 600

            this.computer.setY(0);
            this.computer.setScale(1);
        }
    }
}