var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
  default: 'arcade',
  arcade: {
  gravity: { y: 300 },
  debug: false
  }
  },
  scene: {
  preload: preload,
  create: create,
  update: update
  }
  };
  
  var game = new Phaser.Game(config);
  
  function preload() {
  
  this.load.image('background', 'assets/bg1.png');
  this.load.image('catcher', 'assets/hoop.png');
  this.load.image('object', 'assets/ball.png');
  }
  
  function create() {
  this.add.image(400, 300, 'background');
  
  this.player = this.physics.add.sprite(100, 450, 'catcher');
  this.player.setCollideWorldBounds(true);
  this.player.setScale(0.5);
  
  this.object = this.physics.add.sprite(Phaser.Math.Between(100, 700), 0, 'object');
  this.object.setBounce(1);
  this.object.setCollideWorldBounds(true);
  this.object.setVelocity(Phaser.Math.Between(-200, 200), 20);
  this.object.setScale(0.5);
  
  this.physics.add.collider(this.player, this.object, winHandler, null, this);
  
  this.cursors = this.input.keyboard.createCursorKeys();
  
  this.winText = this.add.text(400, 300, '', { fontSize: '32px', fill: '#000' });
  this.winText.setOrigin(0.5);

  this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

  this.score = 0;

  this.winTextBox = this.add.graphics();
  this.winTextBox.fillStyle(0xffffff, 0.8);
  this.winTextBox.fillRect(200, 200, 400, 200);
  this.winTextBox.visible = false;

  this.winBoxText = this.add.text(400, 250, 'You win!\n\nScore: 0', {
  fontSize: '32px',
  fill: '#000',
  align: 'center'
  });
  this.winBoxText.setOrigin(0.5);
  this.winBoxText.visible = false;
  }
  
  function update() {
  if (this.cursors.left.isDown) {
  this.player.setVelocityX(-160);
  }
  else if (this.cursors.right.isDown) {
  this.player.setVelocityX(160);
  }
  else {
  this.player.setVelocityX(0);
  }
  
  if (this.cursors.up.isDown && this.player.body.touching.down) {
  this.player.setVelocityY(-330);
  }
  }
  
  function winHandler(player, object) {
  object.disableBody(true, true);

  this.score += 100;
  this.scoreText.setText('Score: ' + this.score);

  this.winText.setText('You win!');

  this.winTextBox.visible = true;
  this.winBoxText.setText('You win!\n\nScore: ' + this.score);
  this.winBoxText.visible = true;
  }