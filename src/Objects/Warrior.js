import 'phaser';
import Entity from './Entity';

export default class Warrior extends Entity {
  constructor(scene) {
    super(scene, 400, 590, 'warrior', 4, 1.5);
  }
}
