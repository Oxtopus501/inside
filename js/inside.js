/*Пара мыслей о сохранении результатов работы:

все а-сущности должны быть записаны в массив, где имена их классов - ключи,
а значения - обекты, в которых записаны все атрибуты сущностей, а именно: геометрия, координаты, цвет, ротация.

Сохраняем этот массив в localStorage браузера (после каждого изменения сцены? Хз, будет долго), 
скорее, отвести для этого сохранения отдельную кнопку

Далее, написать функцию, которая при каждом старте перерендерит сцену, добавив все а-сущности из массива*/ 

let scene = document.querySelector('a-scene');
let entityCounter = 0; 
let colorNumber = 0; //Счётчик цветов, используется в changeColor. А ПОЧЕМУ БЫ И НЕТ?))00)
//Объект, хранящий положение только последней сущности, это тупо
//TODO: переписать объекты в классы (ну рили, код будет короче) или хотя бы сделать объект, где имяКлассаСущности - ключ, а её координаты - объекты-значения
/*let position = {
    x: 0,
    y: 0,
    z: 0
}*/
const entities = []; //массив, хранящий все аСущности
//Создаёт новый куб, возвращает имя класса новой сущности.
//TODO: Переписать под любые виды примитивов или написать для них отдельные функции
function createBox() {
    const entityId = 'e' + entityCounter;
    let entityInfo = {
        id: entityId,
        position: {
            x: 0,
            y: 0,
            z: 0
        },
        color: '#00FF00',
        rotation: {
            x: 0,
            y: 0,
            z: 0
        },
        geometry: {
            primitive: 'box',
            width: 1,
            height: 1,
            depth: 1
        },
    }
    let box = document.createElement('a-box');
    box.setAttribute('position', `${entityInfo.position.x} ${entityInfo.position.y} ${entityInfo.position.z}`);
    box.setAttribute('color', '#00FF00');
    box.setAttribute('id', entityId);
    entityCounter++;
    scene.appendChild(box);
    
    entities.push(entityInfo);
    //console.log(box.idName);
    //console.log('createBox(), массив обновлён:',entities);
    return box.id;    
}

function createSphere() {
    const entityId = 'e' + entityCounter;
    let entityInfo = {
        id: entityId,
        position: {
            x: 0,
            y: 0,
            z: 0
        },
        color: '#00FF00',
        rotation: {
            x: 0,
            y: 0,
            z: 0
        },
        geometry: {
            primitive: 'sphere',
            width: null,
            height: null,
            depth: null,
            radius: 1
        },
    }
    let sphere = document.createElement('a-sphere');
    sphere.setAttribute('position', `${entityInfo.position.x} ${entityInfo.position.y} ${entityInfo.position.z}`);
    sphere.setAttribute('color', '#00FF00');
    sphere.setAttribute('id', entityId);
    sphere.setAttribute('radius', 1);
    entityCounter++;
    scene.appendChild(sphere);
    
    entities.push(entityInfo);
    //console.log(box.idName);
    //console.log('createBox(), массив обновлён:',entities);
    return sphere.id;  
}

//Создаёт пустую сущность, внутрь которой кладётся сущность с геомертией и [TODO:оси]
function createEntity(currententityId, currentRotationScaleAxis) {
    if (currententityId != undefined) {
        let number; //Хранение индекса объекта в массиве сущностей. Number - индекс объекта с классом, совпадающем с currententityId
        //Находим в массиве объект, класс которого совпадает с currententityId, передаём его индекс в number
        //находим индекс в списке filter'ом.
        entities.filter(function(item, index) {
            if (item.id == currententityId) {
                number = index;
            }
        })

        let entity = document.getElementById(entities[number].id)
        //console.log(entity)
        axisArray = entity.querySelectorAll('a-cylinder')
        //console.log(axisArray)
        axisArray.forEach(function(item) {
            item.setAttribute('visible', 'false')
        })
    }
    
    //Создаём сущность
    //position и rotation она хранит в себе

    //Внутрь кладём фигуру через вызов одной из функций create...
    //Ещё кладём внутрь оси зелёного цвета, одна из которых будет активна (красного цвета)
    const entityId = 'e' + entityCounter;
    let entityInfo = {
        id: entityId,
        position: {
            x: 0,
            y: 0,
            z: 0
        },
        color: '#00FF00',
        rotation: {
            x: 0,
            y: 0,
            z: 0
        },
        geometry: {
            primitive: 'box',
            width: 1,
            height: 1,
            depth: 1
        },
    }
    let entity = document.createElement('a-entity');
    entity.setAttribute('position', `${entityInfo.position.x} ${entityInfo.position.y} ${entityInfo.position.z}`);
    entity.setAttribute('id', entityId);

    //entity.setAttribute('geometry', 'primitive: box')
    //entity.setAttribute('material', 'color: red')

    //TODO написать вызов функции создания в зависимости от геометрии
    let innerGeometry = document.createElement('a-box');
    innerGeometry.setAttribute('position', `0 0 0`);
    innerGeometry.setAttribute('color', '#00FF00');
    innerGeometry.setAttribute('class', 'innerGeometry')
    entity.appendChild(innerGeometry);

    let xAxis = document.createElement('a-cylinder');
    xAxis.setAttribute('position', `0 0 0`)
    xAxis.setAttribute('height', '2')
    xAxis.setAttribute('radius', `0.02`)
    xAxis.setAttribute('rotation', '0 0 90')
    if (currentRotationScaleAxis == 'rotateX') {
        xAxis.setAttribute('color', '#FF0000')
    } 
    else {
        xAxis.setAttribute('color', '#00FF00')
    }
    xAxis.setAttribute('class', 'xAxis')
    
    entity.appendChild(xAxis)

    let yAxis = document.createElement('a-cylinder');
    yAxis.setAttribute('position', `0 0 0`)
    yAxis.setAttribute('height', '2')
    yAxis.setAttribute('radius', `0.02`)
    if (currentRotationScaleAxis == 'rotateY') {
        yAxis.setAttribute('color', '#FF0000')
    } 
    else {
        yAxis.setAttribute('color', '#00FF00')
    }
    yAxis.setAttribute('class', 'yAxis')
    entity.appendChild(yAxis)

    let zAxis = document.createElement('a-cylinder');
    zAxis.setAttribute('position', `0 0 0`)
    zAxis.setAttribute('height', '2')
    zAxis.setAttribute('radius', `0.02`)
    zAxis.setAttribute('rotation', '90 0 0')
    if (currentRotationScaleAxis == 'rotateZ') {
        zAxis.setAttribute('color', '#FF0000')
    } 
    else {
        zAxis.setAttribute('color', '#00FF00')
    }
    zAxis.setAttribute('class', 'zAxis')
    entity.appendChild(zAxis)

    entityCounter++;
    entities.push(entityInfo);

    scene.appendChild(entity)
    return entity.id
}

//Меняет цвет сущности, класс которой получен в аргументе
//TODO: брать color из объекта (находим по полю класс) внутри массива
function changeColor(currententityId) {
    let colorsArray = ['red', 'green', 'blue', 'crimson', 'limegreen', 'steelblue', 'gold',]; //Список доступных цветов. TODO: переписать систему под настройку всех трёх каналов или, хотя бы, рандомный цвет
    //console.log(currententityId);
    let entity = document.getElementById(currententityId); //сохраняем сущность в переменную
    let innerGeometry = entity.querySelector('.innerGeometry')
    innerGeometry.setAttribute('color', colorsArray[colorNumber]); //Собсна, задаём цвет сущности из списка
    //Записываем в объект текущий цвет
    entities.forEach(function(ent){
        if (ent.id == currententityId) {
            ent.color = colorsArray[colorNumber]
        }
    }) 
    //console.log(entities);

    colorNumber++; //
    if (colorNumber >= colorsArray.length) {
        colorNumber = 0;
    }
    //Получить досступ к объекту по ключу-классу
    
}

//Меняет координаты сущности, получет на вход имя класса сущности, которую двигаем, и направление, куда двигаем
function changeCoordinates(currententityId, direction) {
    let entity = document.getElementById(currententityId);
    //console.log(entity.attributes);
    //Берём position из объекта (находим перебором массива по полю id) внутри массива

    entities.forEach(function(ent){
        if (ent.id == currententityId) {
            if (direction == 'z-') {
                ent.position.z -= 0.1
            }
            if (direction == 'z+') {
                ent.position.z += 0.1
            }
            if (direction == 'x-') {
                ent.position.x -= 0.1
            }
            if (direction == 'x+') {
                ent.position.x += 0.1
            }
            if (direction == 'y+') {
                ent.position.y += 0.1
            }
            if (direction == 'y-') {
                ent.position.y -= 0.1
            }
            entity.setAttribute('position', `${ent.position.x} ${ent.position.y} ${ent.position.z}`);
        }
    }) 
    //console.log(entities);
}

//Вращение и изменение размеров сущностей. Пока только вращение по оси Y, потом допишем остальное
function rotateEntity(currententityId, modification, direction) {
    let entity = document.getElementById(currententityId);
    //console.log(entity)
    let geometry = entity.firstChild
    //console.log(geometry)
    //console.log(entity.attributes);
    //Берём rotation из объекта (находим перебором массива по полю id) внутри массива
    entities.forEach(function(ent){
        if (ent.id == currententityId) {
            if (modification == 'rotateX') {
                if (direction == '+') {
                    ent.rotation.x += 5
                    if (ent.rotation.x >= 360) {
                        ent.rotation.x -= 360
                    }
                }
                if (direction == '-') {
                    ent.rotation.x -= 5
                    if (ent.rotation.x <= -360) {
                        ent.rotation.x += 360
                    }
                }
            }
            if (modification == 'rotateY') {
                if (direction == '+') {
                    ent.rotation.y += 5
                    if (ent.rotation.y >= 360) {
                        ent.rotation.y -= 360
                    }
                }
                if (direction == '-') {
                    ent.rotation.y -= 5
                    if (ent.rotation.y <= -360) {
                        ent.rotation.y += 360
                    }
                }
            }
            if (modification == 'rotateZ') {
                if (direction == '+') {
                    ent.rotation.z += 5
                    if (ent.rotation.z >= 360) {
                        ent.rotation.z -= 360
                    }
                }
                if (direction == '-') {
                    ent.rotation.z -= 5
                    if (ent.rotation.z <= -360) {
                        ent.rotation.z += 360
                    }
                }
            }
            geometry.object3D.rotation.set(
                THREE.Math.degToRad(ent.rotation.x),
                THREE.Math.degToRad(ent.rotation.y),
                THREE.Math.degToRad(ent.rotation.z)
              );
            //entity.setAttribute('rotation', `${ent.rotation.x} ${ent.rotation.y} ${ent.rotation.z}`);
            console.log(`${ent.rotation.x} ${ent.rotation.y} ${ent.rotation.z}`)
        }
        //console.log(entity);
    }); 
    //console.log(entities);
    //console.log(currententityId);
}

//Меняем текущую сущность (в которой мы мождем вносить изменения)
function changeCurrentEntity(currententityId, direction) {
    let number; //Хранение индекса объекта в массиве сущностей. Number - индекс объекта с классом, совпадающем с currententityId
    //Находим в массиве объект, класс которого совпадает с currententityId, передаём его индекс в number
    //находим индекс в списке filter'ом.
    entities.filter(function(item, index) {
        if (item.id == currententityId) {
            number = index;
        }
    })

    entity = document.getElementById(entities[number].id)
    //console.log(entity)
    axisArray = entity.querySelectorAll('a-cylinder')
    //console.log(axisArray)
    axisArray.forEach(function(item) {
        item.setAttribute('visible', 'false')
    })

    //Проверяем направление
    if (direction == 'next') {
        //Если выбираем следующий объект, проверяем, меньше ли его индекс, чем длина массива
        if (number < entities.length - 1) { 
            number++; //Просто увеличивем индекс, если true (да, индекс меньше)
        } else {
            number = 0; //Если false (нет. индекс не меньше), начинаем с нулевого элемента массива (делаем круг)
        }
    } else {
        //Направление: предыдущий объект. Проверяем, больше ли его индекс, чем 0 
        if (number > 0) {
            number--; //True - индекс больше 0, уменьшаем на 1
        } else {
            number = entities.length - 1; //False - индекс не больше нуля, присваиваем ему индекс последнего объекта массива
        }
    }

    entity = document.getElementById(entities[number].id)
    //console.log(entity)
    axisArray = entity.querySelectorAll('a-cylinder')
    //console.log(axisArray)
    axisArray.forEach(function(item) {
        item.setAttribute('visible', 'true')
    })

    //console.log(entities[number].id);
    
    currententityId = entities[number].id;


    
    return currententityId;
}

//TODO: Функция удаления сущности
function removeEntity(currententityId) {
    //Удалить объект из массива entities
    let number;
    entities.filter(function(item, index) {
        if (item.id == currententityId) {
            number = index;
        }
    })
    entities.splice(number, 1);
    console.log(entities);

    //Удалить сущность
    let entityToRemove = document.getElementById(currententityId);
    //Проверка длины массива. Если в нем есть объекты, назначаем текущим нулевой 
    if (entities.length > 0) {
        currententityId = entities[0].id;
    } else {currententityId = null} //Иначе Null'им

    //console.log('Текущий активный класс:',currententityId);
    scene.removeChild(entityToRemove);
    return currententityId
}

//Функция вклчающая вращение и переключающая ось вращения
function changeRotationAxis(currentRotationScaleAxis, rotationScaleAxisArray, modification, currententityId) {
    console.log(currentRotationScaleAxis)
    let number
    let onlyAxis = currentRotationScaleAxis.slice(-1);  //Забираем букву оси из переменной текущей модификации и оси
    //Ищем номер элемента текущей оси в массиве, присваиваем его переменной number
    //console.log('OnlyAxis ',onlyAxis )
    rotationScaleAxisArray.forEach(function(item, index) { 
        if(item == onlyAxis) {
            number = index;
        }
    })
    //Увеличиваем Number на 1, если он не выходит за пределы длины массива или начинаем сначала 
    if (number < rotationScaleAxisArray.length - 1) {
        number++
    } else {
        number = 0;
        
    }
    //console.log('Number: ', number)
    //НАходим текущую активную ось вращения, меняем её цвет на зелёный
    entity = document.getElementById(currententityId); //текущую сущность находим по текущей активной сущности, полученной из аргумента
    activeAxis = entity.querySelector('.' + onlyAxis.toLowerCase() + 'Axis') //Внутри текущей сущности находим активную ось по классу. Класс = буква оси в нижнем регистре + слово Axis
    //console.log('Активная ось до изменения: ' , activeAxis)
    activeAxis.setAttribute('color', '#00FF00')

    //Изменяем текущую ось вращения 
    currentRotationScaleAxis = modification + rotationScaleAxisArray[number];
    ///console.log(currentRotationScaleAxis)
    newActiveAxis = entity.querySelector('.' + rotationScaleAxisArray[number].toLowerCase() + 'Axis')
    //console.log(newActiveAxis)
    newActiveAxis.setAttribute('color', '#FF0000')
    /*
    entities.forEach(function(ent){
        if (ent.id == currententityId) {
            console.log(ent.id)
        }
    }) */
    //Меняем значение текущей модификации и оси, склеивая название модификации (в данном случае - вращение) и оси
    console.log(currentRotationScaleAxis)
    return currentRotationScaleAxis
}

