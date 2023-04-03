//arrayRandElement(allField)
// document.querySelector('message-area').innerHTML = 'Вы потопили 1-палубный';
let alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
let allField = []; // все игровое поле. будет состоять из 100 строк от "00" до "99" включительно
let allField2 = [];
let shipsArray = []; // массив всех кораблей
let sunkShips = [];
let simpleNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let emptySpacesAroundShip = [];
let emptySpacesAroundShip2 = [];
let varOfIdOfOneShot;
let objOfSunkOneFloor = {
  0: '',
  1: '',
  2: '',
  3: '',
  check() {
    let i = 0;
    for (let key in this) {
      if (this[key] != '' && key != 'check') {
        i++;
      }
    }
    return i;
  }
}
let objOfSunkTwoFloor = {
  0: [],
  1: [],
  2: []
}
let objOfSunkThreeFloor = {
  0: [],
  1: []
}
let objOfSunkFourFloor = {
  0: []
}
let objOfOneFloor = {
  0: '',
  1: '',
  2: '',
  3: ''
}
let objOfTwoFloor = {
  0: [],
  1: [],
  2: []
}
let objOfThreeFloor = {
  0: [],
  1: []
}
let objOfFourFloor = {
  0: []
}

function getMessageArea() {
  document.querySelector('.message-area').innerHTML = 'Игра началась...';
}
//  объект, содержащий особенные массивы. дело в том, что когда мы резервируем 
// определенную клетку поля под корабль. то нам надо удалить все другие клетки вокр
// уг нее, чтобы она ни дай бог не соприкасалась с другими кораблями. но удалять ну
// жно определенные клетки и эти клетки разные, в зависимости от того, в каком имен
// но месте находится зарезервированная нами клетка для корабля. именно поэтому нуж
// ны эти массивы. они включают в себя набор клеток. и для каждой группы этих клето
// к количество удаляемых вокруг них клеток будет разниться

let sidesOfField = {
  upperArray: ["01", "02", "03", "04", "05", "06", "07", "08"],
  rightArray: ["19", "29", "39", "49", "59", "69", "79", "89"],
  downArray: ["91", "92", "93", "94", "95", "96", "97", "98"],
  leftArray: ["10", "20", "30", "40", "50", "60", "70", "80"],
  lUpCorner: ["00"],
  rUpCorner: ["09"],
  lDownCorner: ["90"],
  rDownCorner: ["99"]
};
function setGrayDot(e) {
  e.preventDefault();
  let a = this.id;
  this.childNodes.forEach((item) => {
    // не всегда у элемента div может быть первым узел img, поэтому здесь производится проверка на то, есть ли такой узел
    if (item.nodeName = 'IMG') {
      let check = false;
      sunkShips.forEach((item) => {
        if (item == a) {
          check = true;
        }
      });
      if (check == true) {
      }
      else {
        item.classList.toggle('gray-dot');
      }
    }
  })
}
function changeImg(e) {
  console.log(objOfOneFloor,
    objOfTwoFloor, objOfThreeFloor, objOfFourFloor);
  this.childNodes.forEach((item) => {
    let a = item.parentElement.id;
    // не всегда у элемента div может быть первым узел img, поэтому здесь производится проверка на то, есть ли такой узел
    if (item.nodeName == 'IMG') {
      let b = false;
      shipsArray.forEach((item) => {
        if (item == a) {
          b = true;
        }
      })
      if (b == true) {
        if (checkMassiv(shipsArray, a)) {
          for (let key in objOfOneFloor) {
            if (objOfOneFloor[key] == a && objOfSunkOneFloor[key] != a) {
              objOfSunkOneFloor[key] = objOfOneFloor[key];
              document.querySelector('.message-area').innerHTML = 'Потоплен 1-палубный';
              document.querySelector('.number-of-1sunk-ships').innerHTML = objOfSunkOneFloor.check();
              setTimeout(getMessageArea, 4000);
            }
          }
          item.src = '/image/ship3.png';
          hits = hits + 1;
          sunkShips.push(a);
        }
      }
      else {
        item.src = '/image/miss2.png';
      }
    }
  })
}
function setHandler() {
  let a;
  console.log(allField2)
  allField2.forEach((item) => {
    a = document.getElementById(item);
    a.addEventListener('click', changeImg);
    a.addEventListener('contextmenu', setGrayDot);
  })
}

// объект с методами. есть только 4 способа продолжить однопалубный и вот они:
// либо удаляем 1, 10 либо прибавляем 1, 10
let secondFloorOfTwo = {
  a: function (x) {
    return operationFuncs.min1(x);
  },
  b: function (x) {
    return operationFuncs.min10(x);
  },
  c: function (x) {
    return operationFuncs.plus1(x);
  },
  d: function (x) {
    return operationFuncs.plus10(x);
  }
};

let hits = 0;

let object1 = {
  twoFloorVar: false,
  twoFloorArr: {
    a: [],
    b: [],
    c: []
  },
  threeFloorVar: false,
  threeFloorArr: {
    a: [],
    b: []
  }
};

// функции, чтобы сделать что-то одно с полученным числом: +1, +9, +10, +11, либо -1, 
// -9, -10, -11. также в этом объекте содержатся функции, для особенных мест игрового 
// поля. эти функции будут удалять все числа на одну клетку вокруг полученного от польз
// ователя попадания, делается это для того, чтобы корабли не соприкасались. 

let operationFuncs = {

  min11: function (x) {
    x = +x;
    x = x - 11;
    return x;
  },
  min10: function (x) {
    x = +x;
    x = x - 10;
    return x;
  },
  min9: function (x) {
    x = +x;
    x = x - 9;
    return x;
  },
  min1: function (x) {
    x = +x;
    x = x - 1;
    return x;
  },
  plus1: function (x) {
    x = +x;
    x = x + 1;
    return x;
  },
  plus9: function (x) {
    x = +x;
    x = x + 9;
    return x;
  },
  plus10: function (x) {
    x = +x;
    x = x + 10;
    return x;
  },
  plus11: function (x) {
    x = +x;
    x = x + 11;
    return x;
  },
  if00: function (arr, x) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == x) {
        checkMassiv1(arr, operationFuncs.plus1(x));
        checkMassiv1(arr, operationFuncs.plus10(x));
        checkMassiv1(arr, operationFuncs.plus11(x));
        break;
      }
    }
  },
  if09: function (arr, x) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == x) {
        checkMassiv1(arr, operationFuncs.min1(x));
        checkMassiv1(arr, operationFuncs.plus9(x));
        checkMassiv1(arr, operationFuncs.plus10(x));
        break;
      }
    }
  },
  if90: function (arr, x) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == x) {
        checkMassiv1(arr, operationFuncs.min10(x));
        checkMassiv1(arr, operationFuncs.min9(x));
        checkMassiv1(arr, operationFuncs.plus1(x));
        break;
      }
    }
  },
  if99: function (arr, x) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == x) {
        checkMassiv1(arr, operationFuncs.min11(x));
        checkMassiv1(arr, operationFuncs.min10(x));
        checkMassiv1(arr, operationFuncs.min1(x));
        break;
      }
    }
  },
  ifUpper: function (arr, x) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == x) {
        checkMassiv1(arr, operationFuncs.min1(x));
        checkMassiv1(arr, operationFuncs.plus1(x));
        checkMassiv1(arr, operationFuncs.plus9(x));
        checkMassiv1(arr, operationFuncs.plus10(x));
        checkMassiv1(arr, operationFuncs.plus11(x));
        break;
      }
    }
  },
  ifRight: function (arr, x) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == x) {
        checkMassiv1(arr, operationFuncs.min1(x));
        checkMassiv1(arr, operationFuncs.min10(x));
        checkMassiv1(arr, operationFuncs.min11(x));
        checkMassiv1(arr, operationFuncs.plus9(x));
        checkMassiv1(arr, operationFuncs.plus10(x));
        break;
      }
    }
  },
  ifDown: function (arr, x) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == x) {
        checkMassiv1(arr, operationFuncs.min11(x));
        checkMassiv1(arr, operationFuncs.min10(x));
        checkMassiv1(arr, operationFuncs.min9(x));
        checkMassiv1(arr, operationFuncs.min1(x));
        checkMassiv1(arr, operationFuncs.plus1(x));
        break;
      }
    }
  },
  ifLeft: function (arr, x) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == x) {
        checkMassiv1(arr, operationFuncs.min10(x));
        checkMassiv1(arr, operationFuncs.min9(x));
        checkMassiv1(arr, operationFuncs.plus1(x));
        checkMassiv1(arr, operationFuncs.plus10(x));
        checkMassiv1(arr, operationFuncs.plus11(x));
        break;
      }
    }
  },
  ifAnother: function (arr, x) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == x) {
        checkMassiv1(arr, operationFuncs.min1(x));
        checkMassiv1(arr, operationFuncs.min10(x));
        checkMassiv1(arr, operationFuncs.min9(x));
        checkMassiv1(arr, operationFuncs.min11(x));
        checkMassiv1(arr, operationFuncs.plus1(x));
        checkMassiv1(arr, operationFuncs.plus9(x));
        checkMassiv1(arr, operationFuncs.plus10(x));
        checkMassiv1(arr, operationFuncs.plus11(x));
        break;
      }
    }
  }
};

function init() {
  createAllField(allField); // создаются строки от "00" до "09"
  createAllField1(allField); // создаются остальные числа в виде строк от "10" до "99"
  allField.forEach((item) => allField2.push(item));
  document.getElementById("fireButton").onclick = handleFireButton; // получается кнопка на которую жмет пользователь 
  // после ввода координат выстрела, и на нее вешается 
  // событие клика, которое вызывает функцию handleFireButton
  document.getElementById("guessInput").onkeydown = handleKeyPress; // получается поле ввода, куда пользователь вводит 
  // координаты выстрела и на него вешается функция handleKeyPress
  for (let i = 0; shipsArray.length < 4; i++) {
    // цикл работает пока массив однопалубников не сформирован до 4 элементов
    let rowCol = arrayRandElement(allField); // создается переменная в которой вызывается функция, в 
    // которую передается весь главный массив
    checkInputAndExclude(rowCol); // функция проверяет наш рандомный элемент массива на то к какой части
    // поля он относится. и поняв это, она удаляет вокруг него такое количество клеток на поле, 
    // которое соответствует логике, прописанной для каждой определенной клетки поля
    checkMassiv1(allField, rowCol);
    objOfOneFloor[i] = rowCol;
    shipsArray.push(rowCol);
  }

  crTwoFloor();
  crThreeFloor();
  // shipsArray.forEach((item) => {
  //   setHit(item);
  // });
  console.log('shipsArray:', shipsArray);
  setHandler();
}

function createAllField(y) {
  for (let i = 0, len = 0; len < 10; len++) {
    i = String(i);
    len = String(len);
    let lenPlusI = i + len;
    y.push(lenPlusI);
  }
}

function createAllField1(y) {
  for (let len = 10, x = 0; x < 90; x++, len++) {
    let lenPlusI1 = String(len);
    y.push(lenPlusI1);
  }
}

function handleFireButton() {
  let guessInput = document.getElementById("guessInput");
  let guess = guessInput.value;
  if (guess === null || guess.length !== 2) {
  } else {
    let firstSign = guess.charAt(0);
    let firstNumber = alphabet.indexOf(firstSign);
    let secondNumber = guess.charAt(1);
    if (isNaN(firstNumber) || isNaN(secondNumber)) {
    } else if (firstNumber < 0 || firstNumber >= 10 ||
      secondNumber < 0 || secondNumber >= 10) {
    } else {
      let trueNumber = firstNumber + secondNumber;
      if (checkMassiv1(shipsArray, trueNumber)) {
        setHit(trueNumber);
        hits = hits + 1;
        sunkShips.push(trueNumber);
        console.log(shipsArray)
      } else if (checkSunkMassiv(sunkShips, trueNumber)) {
      } else {
        setMiss(trueNumber);
      }
    }
  }
  if (hits == 20) {
    let i = document.getElementById("messageArea");
    i.innerHTML = "Поздравляю, вы потопили вcе корабли!";
  }
}

function handleKeyPress(e) {
  let fireButton = document.getElementById("fireButton");
  if (e.keyCode === 13) {
    fireButton.click();
    return false;
  }
}

// получает массив, создает рандомный индекс, который не больше чем последний индекс
// переданного массива. по этому индексу возращает элемент из переданного массива
function arrayRandElement(arr) {
  let rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
}

// функция для определения, к какой части поля относится однопалубник
// еще она удаляет вокруг однопалубника пространство шириной в одну клетку
// и удаляет и однопалубник и пространство из главного массива
function checkInputAndExclude(rowCol) {
  if (rowCol == sidesOfField.lUpCorner[0]) {
    operationFuncs.if00(allField, rowCol); // функция, которая удаляет 3 клетки вокруг элемента "00"
  } else if (rowCol == sidesOfField.rUpCorner[0]) {
    operationFuncs.if09(allField, rowCol);
  } else if (rowCol == sidesOfField.lDownCorner[0]) {
    operationFuncs.if90(allField, rowCol);
  } else if (rowCol == sidesOfField.rDownCorner[0]) {
    operationFuncs.if99(allField, rowCol);
  } else if (checkMassiv(sidesOfField.upperArray, rowCol)) {
    operationFuncs.ifUpper(allField, rowCol);
  } else if (checkMassiv(sidesOfField.rightArray, rowCol)) {
    operationFuncs.ifRight(allField, rowCol);
  } else if (checkMassiv(sidesOfField.downArray, rowCol)) {
    operationFuncs.ifDown(allField, rowCol);
  } else if (checkMassiv(sidesOfField.leftArray, rowCol)) {
    operationFuncs.ifLeft(allField, rowCol);
  } else {
    operationFuncs.ifAnother(allField, rowCol);
  }
}

//функция для проверки массива на наличие элемента
function checkMassiv(arr, x) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == x) {
      return true;
    }
  }
  return false;
}

//функция для проверки массива на наличие элемента и удаление этого элемента из массива
function checkMassiv1(arr, x) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == x) {
      delElArray(arr, i);
      return true;
    }
  }
  return false;
}
function checkMassiv2(arr, x) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == x) {
      delElArray2(arr, i);
      return true;
    }
  }
  return false;
}
function checkMassiv3(arr, x) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == x) {
      delElArray3(arr, i);
      return true;
    }
  }
  return false;
}

function delElArray(arr, x) {
  arr.splice(x, 1);
}
function delElArray2(arr, x) {
  arr.splice(x, 1);
  if (arr[x] != undefined) {
    emptySpacesAroundShip.push(arr[x]);
  }
}
function delElArray3(arr, x) {
  arr.splice(x, 1);
  if (arr[x] != undefined) {
    emptySpacesAroundShip2.push(arr[x]);
  }
}

// создает коллекцию двухпалубных кораблей 
function crTwoFloor() {
  let h = 0;
  for (; object1.twoFloorVar == false;) {
    for (; object1.twoFloorArr.a.length !== 2;) {
      let rowCol = arrayRandElement(allField);
      let ggh = universalFunc(rowCol);
      if (ggh == false) {
      }
      else {
        object1.twoFloorArr.a.push(rowCol); // пушу 1 палубу
        object1.twoFloorArr.a.push(ggh); // пушу 2 палубу
        shipsArray.push(rowCol); // пушу в общий массив всех палуб
        shipsArray.push(ggh); // пушу в общий массив всех палуб
        checkInput2(allField, sidesOfField, rowCol);
        allField.push(ggh);
        checkInput2(allField, sidesOfField, ggh);
        checkMassiv1(allField, rowCol);
        checkMassiv1(allField, ggh);
        objOfTwoFloor[0].push(rowCol);
        objOfTwoFloor[0].push(ggh);
      }

    }

    for (; object1.twoFloorArr.b.length !== 2;) {
      let rowCol2 = arrayRandElement(allField);
      let ggh2 = universalFunc(rowCol2);
      if (ggh2 == false) {
      }
      else {
        object1.twoFloorArr.b.push(rowCol2);
        object1.twoFloorArr.b.push(ggh2);
        shipsArray.push(rowCol2);
        shipsArray.push(ggh2);
        checkInput2(allField, sidesOfField, rowCol2);
        allField.push(ggh2);
        checkInput2(allField, sidesOfField, ggh2);
        checkMassiv1(allField, rowCol2);
        checkMassiv1(allField, ggh2);
        objOfTwoFloor[1].push(rowCol2);
        objOfTwoFloor[1].push(ggh2);
      }

    }

    for (; object1.twoFloorArr.c.length !== 2;) {
      let rowCol3 = arrayRandElement(allField);
      let ggh3 = universalFunc(rowCol3);
      if (ggh3 == false) {
      }
      else {
        object1.twoFloorArr.c.push(rowCol3);
        object1.twoFloorArr.c.push(ggh3);
        shipsArray.push(rowCol3);
        shipsArray.push(ggh3);
        checkInput2(allField, sidesOfField, rowCol3);
        allField.push(ggh3);
        checkInput2(allField, sidesOfField, ggh3);
        checkMassiv1(allField, rowCol3);
        checkMassiv1(allField, ggh3);
        objOfTwoFloor[2].push(rowCol3);
        objOfTwoFloor[2].push(ggh3);
      }

    }

    if (object1.twoFloorArr.a.length == 2 && (object1.twoFloorArr.b.length + object1.twoFloorArr.c.length == 4)) {
      object1.twoFloorVar = true;
    }
  }
}

function crThreeFloor() {
  for (; object1.threeFloorVar == false;) {
    for (; object1.threeFloorArr.a.length !== 3;) {
      let rowCol = arrayRandElement(allField);
      let ggh = universalFunc(rowCol);
      let ggh2 = universalFunc(ggh);
      if (ggh == false || ggh2 == false || ggh == ggh2 || rowCol == ggh || rowCol == ggh2) {
        continue;
      }
      else {
        object1.threeFloorArr.a.push(rowCol); // пушу 1 палубу
        object1.threeFloorArr.a.push(ggh); // пушу 2 палубу
        object1.threeFloorArr.a.push(ggh2); // пушу 3 палубу
        shipsArray.push(rowCol); // пушу в общий массив всех палуб
        shipsArray.push(ggh); // пушу в общий массив всех палуб
        shipsArray.push(ggh2); // пушу в общий массив всех палуб
        checkInput2(allField, sidesOfField, rowCol);
        allField.push(ggh);
        checkInput2(allField, sidesOfField, ggh);
        allField.push(ggh2);
        checkInput2(allField, sidesOfField, ggh2);
        checkMassiv1(allField, rowCol);
        checkMassiv1(allField, ggh);
        checkMassiv1(allField, ggh2);
        objOfThreeFloor[0].push(rowCol);
        objOfThreeFloor[0].push(ggh);
        objOfThreeFloor[0].push(ggh2);
      }
    }

    for (; object1.threeFloorArr.b.length !== 3;) {
      let rowCol = arrayRandElement(allField);
      let ggh = universalFunc(rowCol);
      let ggh2 = universalFunc(ggh);
      if (ggh == false || ggh2 == false || ggh == ggh2 || rowCol == ggh || rowCol == ggh2) {
        continue;
      }
      else {
        object1.threeFloorArr.b.push(rowCol); // пушу 1 палубу
        object1.threeFloorArr.b.push(ggh); // пушу 2 палубу
        object1.threeFloorArr.b.push(ggh2); // пушу 3 палубу
        shipsArray.push(rowCol); // пушу в общий массив всех палуб
        shipsArray.push(ggh); // пушу в общий массив всех палуб
        shipsArray.push(ggh2); // пушу в общий массив всех палуб
        checkInput2(allField, sidesOfField, rowCol);
        allField.push(ggh);
        checkInput2(allField, sidesOfField, ggh);
        allField.push(ggh2);
        checkInput2(allField, sidesOfField, ggh2);
        checkMassiv1(allField, rowCol);
        checkMassiv1(allField, ggh);
        checkMassiv1(allField, ggh2);
        objOfThreeFloor[1].push(rowCol);
        objOfThreeFloor[1].push(ggh);
        objOfThreeFloor[1].push(ggh2);
      }
    }
    if (object1.threeFloorArr.a.length == 3 && object1.threeFloorArr.b.length == 3) {
      object1.threeFloorVar = true;
    }
  }
}

function compareTwoArrays(arr1, arr2) {
  for (let i = 0; i < arr1.length; i++) {
    for (let k = 0; k < arr2.length; k++) {
      if (arr2[k] == arr1[i]) {
        return false;
      }
    }
  }
  return true;
}
//  функция берет первую палубу и смотрит к какой части поля она относится
//  от этого зависит, куда мы пойдем, чтобы строить вторую палубу

function universalFunc(rowCol) {
  if (rowCol == sidesOfField.lUpCorner[0]) { // случайно создаю первую палубу 2-палубного корабля
    // и проверяю, относится ли она к "00"
    let uu = secTwo(secondFloorOfTwo, rowCol, 1); //затем пытаюсь создать вторую палубу
    // при помощи цифры я указываю какой набор мат вычислений буду производить
    // в этой же функции я совершаю рандом для второй палубы
    if (simpleNumbers.indexOf(uu) === -1) { //здесь проверяю, односимвольное ли число или нет
      // если не односимвольное, то просто преобразую в строку
      uu = String(uu);
    }
    else {
      uu = String(uu);
      uu = "0" + uu;
    }
    if (checkArr(allField, uu)) {
      return uu;
    }
    return false;
  }
  else if (rowCol == sidesOfField.rUpCorner[0]) {
    let uu = secTwo(secondFloorOfTwo, rowCol, 2);
    if (simpleNumbers.indexOf(uu) === -1) {
      uu = String(uu);
    } else {
      uu = String(uu);
      uu = "0" + uu;
    }
    if (checkArr(allField, uu)) {
      return uu;
    }
    return false;
  }
  else if (rowCol == sidesOfField.lDownCorner[0]) {
    let uu = secTwo(secondFloorOfTwo, rowCol, 3);
    if (checkArr(allField, uu)) {
      return uu;
    }
    return false;
  }
  else if (rowCol == sidesOfField.rDownCorner[0]) {
    let uu = secTwo(secondFloorOfTwo, rowCol, 4);
    if (checkArr(allField, uu)) {
      return uu;
    }
    return false;
  }
  else if (checkMassiv(sidesOfField.upperArray, rowCol)) {
    let uu = secTwo(secondFloorOfTwo, rowCol, 5);
    if (simpleNumbers.indexOf(uu) === -1) {
      uu = String(uu);
    } else {
      uu = String(uu);
      uu = "0" + uu;
    }
    if (checkArr(allField, uu)) {
      return uu;
    }
    return false;
  }
  else if (checkMassiv(sidesOfField.rightArray, rowCol)) {
    let uu = secTwo(secondFloorOfTwo, rowCol, 6);
    if (simpleNumbers.indexOf(uu) === -1) {
      uu = String(uu);
    } else {
      uu = String(uu);
      uu = "0" + uu;
    }
    if (checkArr(allField, uu)) {
      return uu;
    }
    return false;
  }
  else if (checkMassiv(sidesOfField.downArray, rowCol)) {
    let uu = secTwo(secondFloorOfTwo, rowCol, 7);
    if (checkArr(allField, uu)) {
      return uu;
    }
    return false;
  }
  else if (checkMassiv(sidesOfField.leftArray, rowCol)) {
    let uu = secTwo(secondFloorOfTwo, rowCol, 8);
    if (simpleNumbers.indexOf(uu) === -1) {
      uu = String(uu);
    }
    else { // если наша вторая палуба это цифра от 0 до 9, то ей прибавляется строковый "0"
      uu = String(uu);
      uu = "0" + uu;
    }
    if (checkArr(allField, uu)) {
      return uu;
    }
    return false;
  }
  else if (true) {
    let uu = secTwo(secondFloorOfTwo, rowCol, 0);
    if (simpleNumbers.indexOf(uu) === -1) {
      uu = String(uu);
    }
    else { // если наша вторая палуба это цифра от 0 до 9, то ей прибавляется строковый "0"
      uu = String(uu);
      uu = "0" + uu;
    }
    if (checkArr(allField, uu)) {
      return uu;
    }
    return false;
  }
}

function checkArr(arr, x) {
  if (arr.indexOf(x) === -1) {
    return false;
  } else {
    return true;
  }
}


function checkSunkMassiv(mas, x) {
  for (let i = 0, len = mas.length; i < len; i++) {
    if (mas[i] == x) {
      return true;
    }
  }
  return false;
}

// довольно интересная функция, которой передается объект secondFloorOfTwo
// объект secondFloorOfTwo содержит 4 метода, которые по сути являются 
// единственными 4 путями как можно продолжить 1-палубный корабль до 2-палубного
// для этого есть только 4 пути на нашем поле. уйти вверх, вправо, вниз или влево
// но особенность этой функции не только в этом, она еще и реализует рандом между этими путями
// то есть мало того, что здесь прописано куда только можем мы уйти при совпадении
// rowcol с уникальными сторонами нашего поля, так еще и происходит случайный выбор между этими направлениями
function secTwo(arr, x, y) {
  if (y == 0) {
    let array = [
      g = arr.a(x),
      f = arr.b(x),
      r = arr.c(x),
      h = arr.d(x)
    ];
    return arrayRandElement(array);
  } else if (y == 1) {
    let array = [
      r = arr.c(x),
      h = arr.d(x)
    ];
    return arrayRandElement(array);
  } else if (y == 2) {
    let array = [
      g = arr.a(x),
      h = arr.d(x)
    ];
    return arrayRandElement(array);
  } else if (y == 3) {
    let array = [
      f = arr.b(x),
      r = arr.c(x)
    ];
    return arrayRandElement(array);
  } else if (y == 4) {
    let array = [
      g = arr.a(x),
      f = arr.b(x)
    ];
    return arrayRandElement(array);
  } else if (y == 5) {
    let array = [
      g = arr.a(x),
      r = arr.c(x),
      h = arr.d(x)
    ];
    return arrayRandElement(array);
  } else if (y == 6) {
    let array = [
      g = arr.a(x),
      f = arr.b(x),
      h = arr.d(x)
    ];
    return arrayRandElement(array);
  } else if (y == 7) {
    let array = [
      g = arr.a(x),
      f = arr.b(x),
      r = arr.c(x)
    ];
    return arrayRandElement(array);
  } else if (y == 8) {
    let array = [
      f = arr.b(x),
      r = arr.c(x),
      h = arr.d(x)
    ];
    return arrayRandElement(array);
  }
}

// служит для поиска совпадений с массивами уникальных сторон нашего поля
// если находит, то укорачивает эти массивы
// одновременно с этим удаляет нашу палубу и клетки свободного пространства вокруг нее из главного массива
function checkInput2(arr, nextArr, rowCol) {
  if (rowCol == nextArr.lUpCorner[0]) {
    operationFuncs.if00(arr, rowCol);
  } else if (rowCol == nextArr.rUpCorner[0]) {
    operationFuncs.if09(arr, rowCol);
  } else if (rowCol == nextArr.lDownCorner[0]) {
    operationFuncs.if90(arr, rowCol);
  } else if (rowCol == nextArr.rDownCorner[0]) {
    operationFuncs.if99(arr, rowCol);
  } else if (checkMassiv(nextArr.upperArray, rowCol)) {
    operationFuncs.ifUpper(arr, rowCol);
  } else if (checkMassiv(nextArr.rightArray, rowCol)) {
    operationFuncs.ifRight(arr, rowCol);
  } else if (checkMassiv(nextArr.downArray, rowCol)) {
    operationFuncs.ifDown(arr, rowCol);
  } else if (checkMassiv(nextArr.leftArray, rowCol)) {
    operationFuncs.ifLeft(arr, rowCol);
  } else if (true) {
    operationFuncs.ifAnother(arr, rowCol);
  }
}

function test() {
  let ee = arrayRandElement(allField);
  let tt = universalFunc(ee);
}

function setHit(x) {
  let a = document.getElementById(x);
  a.setAttribute("class", "hit");
}

function setMiss(x) {
  let a = document.getElementById(x);
  a.setAttribute("class", "miss");
}

window.onload = init;