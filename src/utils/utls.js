import avatar1 from '../../assets/images/avatars/01.jpg';
import avatar2 from '../../assets/images/avatars/02.jpg';
import avatar3 from '../../assets/images/avatars/03.jpg';
import avatar4 from '../../assets/images/avatars/04.jpg';
import avatar5 from '../../assets/images/avatars/05.jpg';
import avatar6 from '../../assets/images/avatars/06.jpg';
import avatar7 from '../../assets/images/avatars/07.jpg';
import avatar8 from '../../assets/images/avatars/08.jpg';

export const defaultBoard = [
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
];

export const avatarList = [
  {id: 1, source: avatar1},
  {id: 2, source: avatar2},
  {id: 3, source: avatar3},
  {id: 4, source: avatar4},
  {id: 5, source: avatar5},
  {id: 6, source: avatar6},
  {id: 7, source: avatar7},
  {id: 8, source: avatar8},
];

export const defaultGame = {
  board: defaultBoard,
  gameOver: {gameover: false, guessedWord: false},
  currentAttempt: {attempt: 0, letter: 0},
};

export const praises = [
  'Spectacular!',
  'Fantastic!',
  'Impressive!',
  'Extraordinary!',
  'Bravo!',
  'Splendid!',
  'Exceptional!',
  'Exemplary!',
  'Astounding!',
  'Admirable!',
  'Top-notch!',
  
];
