let body = document.querySelector('body');
let height = document.querySelector('#height');
let weight = document.querySelector('#weight');
let send = document.querySelector('.send');
let bmiBtn = document.querySelector('.bmiBtn');
let bmiBtnCon = document.querySelector('.bmiBtn-content');
let bmiNum = document.querySelector('.bmiNum');
let text = document.querySelector('.text');
let cir = document.querySelector('.circle');
let btnStatus = document.querySelector('.btnStatus');
let list = document.querySelector('.list');
let point = document.querySelector('.point');
let data = JSON.parse(localStorage.getItem('listData')) || [];

send.addEventListener('click', addData, false);
bmiBtn.addEventListener('click', cirBtn, false);
list.addEventListener('click', delData, false);
height.addEventListener('keydown', wFocus, false);
weight.addEventListener('keydown', addDataEnter, false);
body.addEventListener('click', checkAdd, false);

let bmiColor = {
    '理想': {
        btnClass: 'green border',
        statusClass: 'btnStatus',
        class: 'green borderleft',
        resultClass: 'bmiResult',
        bgColor: 'bgGreen'
    },
    '過輕': {
        btnClass: 'blue border',
        statusClass: 'btnStatus',
        class: 'blue borderleft',
        resultClass: 'bmiResult',
        bgColor: 'bgBlue'
    },
    '過重': {
        btnClass: 'orange border',
        statusClass: 'btnStatus',
        class: 'orange borderleft',
        resultClass: 'bmiResult',
        bgColor: 'bgOrange'
    },
    '輕度肥胖': {
        btnClass: 'deepOrange border',
        statusClass: 'btnStatus2',
        class: 'deepOrange borderleft',
        resultClass: 'bmiResult2',
        bgColor: 'bgdeepOrange'
    },
    '中度肥胖': {
        btnClass: 'deepOrange border',
        statusClass: 'btnStatus2',
        class: 'deepOrange borderleft',
        resultClass: 'bmiResult2',
        bgColor: 'bgdeepOrange'
    },
    '重度肥胖': {
        btnClass: 'red border',
        statusClass: 'btnStatus2',
        class: 'red borderleft',
        resultClass: 'bmiResult2',
        bgColor: 'bgRed'
    }
}

updateList(data);

window.onload = function () {
    height.focus();
}

function wFocus(e) {
    if (e.keyCode === 13) {
        weight.focus();
    }
}

function addDataEnter(e) {
    if (e.keyCode === 13) {
        height.focus();
        addData();
    }
}

function addData() {
    let h = parseInt(height.value);
    let w = parseInt(weight.value);
    let BMI = (w / Math.pow((h / 100), 2)).toFixed(2);
    if (height.value === '' || weight.value === '' || h <= 0 || w <= 0) {
        alert('請確實輸入正確的身高和體重');
        height.focus();
        return
    }

    point.textContent = '';
    send.style.display = 'none';

    let date = new Date();
    let y = date.getFullYear();
    let m = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    let d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let today = `${m}-${d}-${y}`;

    let statuStr = '';
    if (BMI >= 18.5 && BMI < 24) {
        statuStr = '理想';
    } else if (BMI < 18.5) {
        statuStr = '過輕';
    } else if (BMI >= 24 && BMI < 27) {
        statuStr = '過重';
    } else if (BMI >= 27 && BMI < 30) {
        statuStr = '輕度肥胖';
    } else if (BMI >= 30 && BMI < 35) {
        statuStr = '中度肥胖';
    } else if (BMI >= 35) {
        statuStr = '重度肥胖';
    }

    let todo = {
        bmi: BMI,
        weight: w,
        height: h,
        time: today,
        status: statuStr,
    }

    data.push(todo);
    updateList(data);
    updateBtn(data);
    localStorage.setItem('listData', JSON.stringify(data));
    height.value = '';
    weight.value = '';
    height.focus();
}

function updateList(items) {
    let str = '';
    let len = items.length;
    for (let i = 0; i < len; i++) {
        str += `<li class="listItem ${bmiColor[items[i].status].class}">
        <span class="${bmiColor[items[i].status].resultClass}">${items[i].status}</span>
        <p>BMI</p>
        <span>${items[i].bmi}</span>
        <p>weight</p>
        <span>${items[i].weight}kg</span>
        <p>height</p>
        <span>${items[i].height}cm</span>
        <p>${items[i].time}</p>
        <a href="#" data-del="${i}">X</a>
    </li>`;
    }
    list.innerHTML = str;
}

function updateBtn(items) {
    let str2 = '';
    let len = items.length;
    for (let i = 0; i < len; i++) {
        str2 = `<div class="bmiBtn-content ${bmiColor[items[i].status].btnClass}">
    <div class="bmiBtnBox">
    <p class="bmiNum">${items[i].bmi}</p>
    <p class="text">BMI</p>
    </div>
    <div class="circle ${bmiColor[items[i].status].bgColor}">
        <img src="img/icons_loop.png">
    </div>
     <div class="${bmiColor[items[i].status].statusClass}">${items[i].status}</div>
    </div>`;
    }
    bmiBtn.innerHTML = str2;
    bmiBtn.style.display = 'block';
}

function delData(e) {
    e.preventDefault();
    let iDel = e.target.dataset.del;
    if (!iDel) { return }
    data.splice(iDel, 1);
    updateList(data);
    localStorage.setItem('listData', JSON.stringify(data));
}

function cirBtn(e) {
    if (e.target.classList.contains('circle') || e.target.nodeName == 'IMG') {
        bmiBtn.style.display = 'none';
        send.style.display = 'block';
        height.focus();
    };
}


function checkAdd(e) {
    let h = height.value;
    let w = weight.value;
    if (e.target.nodeName === 'INPUT' || e.target.nodeName === 'IMG' || e.target.nodeName === 'A' || e.target.classList.contains('circle')) { return }
    if (!h && !w) {
        point.textContent = '請輸入數值';
        height.focus();
    } else if (h && !w) {
        point.textContent = '請輸入體重';
        weight.focus();
    } else if (!h && w) {
        point.textContent = '請輸入身高'
        height.focus();
    } else if (h && w) {
        point.textContent = '輸入完全請按右方按鈕查看結果'
    }
}








































































