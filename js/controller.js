let currententityId; //Переменная, хранящаая текущую сущность (созданную поледней) 
let currentRotationScaleAxis = 'rotateY'; //Переменная, хранящая текущую ось вращения или масштабирования сущности
const rotationScaleAxisArray = ['X', 'Y', 'Z'];


//слушатель нажатий клавиш, запускает все функции из script js. !!!ДОЛЖЕН БЫТЬ ПОДКЛЮЧЁН В HTML ДО <a-scene>!!! 
document.addEventListener('keypress', function(event) {    
    if (event.code == 'KeyB') {
        currententityId = createBox();
    }
    if (event.code == 'KeyN') {
        currententityId = createSphere();
    }
    if (event.code == 'KeyC') {
        changeColor(currententityId);
    }
    //Клавиши, управляющие положением созданных сущностей
    if (event.code == 'KeyO') {
        changeCoordinates(currententityId, 'z-')
    }
    if (event.code == 'KeyL') {
        changeCoordinates(currententityId, 'z+')
    }
    if (event.code == 'KeyK') {
        changeCoordinates(currententityId, 'x-')
    }
    if (event.code == 'Semicolon') {
        changeCoordinates(currententityId, 'x+')
    }
    if (event.code == 'KeyP') {
        changeCoordinates(currententityId, 'y+')
    }
    if (event.code == 'Quote') {
        changeCoordinates(currententityId, 'y-')
    }
    //Клавиши, переключающие активную сущность
    if (event.code == 'BracketLeft') {
        currententityId = changeCurrentEntity(currententityId, 'prev')
    }
    if (event.code == 'BracketRight') {
        currententityId = changeCurrentEntity(currententityId, 'next')
    }
    //Клавиши, вызывающая функцию удаления активной сущности
    if (event.code == 'KeyY') {
        currententityId = removeEntity(currententityId)
    }

    //Клавиша, вызывающая функции переключения осей вращения
    if (event.code == 'KeyV') {
        currentRotationScaleAxis = changeRotationAxis(currentRotationScaleAxis, rotationScaleAxisArray, 'rotate', currententityId);
        //console.log(currentRotationScaleAxis);
    } 
    //Клавиша, вызывающая переключение осей масштабирования

    //Клавиши, вызывающие функции вращения активных сущностей
    if (event.code == 'Equal') {
        rotateEntity(currententityId, currentRotationScaleAxis, '+')
    }
    if (event.code == 'Minus') {
        rotateEntity(currententityId, currentRotationScaleAxis, '-')
    }
    if (event.code == 'KeyM') {
        currententityId = createEntity(currententityId, currentRotationScaleAxis);
    }
    if (event.code == 'KeyU') {
        el = scene.querySelector('a-box')
        el.object3D.rotation.set(
            THREE.Math.degToRad(15),
            THREE.Math.degToRad(30),
            THREE.Math.degToRad(90)
          );
        
    }

})