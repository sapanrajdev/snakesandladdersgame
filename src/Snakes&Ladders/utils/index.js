import one from '../images/one.png';
import two from '../images/two.png';
import three from '../images/three.png';
import four from '../images/four.png';
import five from '../images/five.png';
import six from '../images/six.png';

const getDice = number => {
  switch (number) {
    case 1:
      return one;
    case 2:
      return two;
    case 3:
      return three;
    case 4:
      return four;
    case 5:
      return five;
    case 6:
      return six;
    default:
      return null;
  }
}

const convertInObject = element => {
  const { top, right, bottom, left, width, height, x, y } = element.getBoundingClientRect()
  return { top, right, bottom, left, width, height, x, y }
};


const isItemInArray = (array, item) => {
  for (var i = 0; i < array.length; i++) {
    if (array[i][0] === item) {
      return [true, array[i][1]];
    }
  }
  return [false];
};

export const utils = {
  getDice,
  convertInObject,
  isItemInArray,
};
