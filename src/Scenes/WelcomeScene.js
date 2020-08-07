import 'phaser';

export default class WelcomeScene extends Phaser.Scene {
  constructor() {
    super('Welcome');
  }

  saveName(name) {
    console.log(name);
    
  }

  create() {
    this.add.text(300, 70, 'Welcome!', { fontSize: 50, fill: '#fff' });
    this.add.text(230, 190, `Let's get started... `, { fontSize: 30, fill: '#fff' });
    
    const div = document.createElement('div');
    div.setAttribute('id', 'div');
    div.innerHTML = "<input type='search' id='input' placeholder='Your name...' aria-label='Search' required/></br><button type='submit' id = 'button'> Submit Name</button>";

    this.add.dom(350, 250, div);

    const input = document.getElementById('input');

    document.getElementById('button').onclick = () => {
      if (input.value !== '') {
        this.saveName(input.value);
        
        this.scene.start('Title');
      } else {
        this.add.text(250, 320, 'Name can not be blank', { fontSize: 20, fill: '#fff' });
      }
    };
  }
}
