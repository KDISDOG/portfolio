// Script for Chart of Weight
var labelsWeight = [];
var datapointWeight = [];
const data = {
    labels: labelsWeight,
    datasets: [{
        label: 'Weight over time',
        data: datapointWeight,
        backgroundColor: ['rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)'],
        borderWidth: 1
    }]
};

const configWeightLine = {
    type: 'line',
    data,
};

const dataWforPie = {
    labels: labelsWeight,
    datasets: [{
        label: 'Weight over time',
        data: datapointWeight,
        backgroundColor: getRandomColorW
    }]
};

// Bar 設定
const configWeightBar = {
    type: 'bar',
    data,
    options: { scales: {} }
};

// Pie 設定
const configWeightPie = {
    type: 'pie',
    data: dataWforPie,
};

// Radar 設定
const configWeightRadar = {
    type: 'radar',
    data,
};

// 設定顯示區域(maybe)
let myChartWeight = new Chart(
    document.getElementById('myChartWeight'),
    configWeightBar
);

// 篩選圖表顯示範圍
function filterDataW() {
    const labels2Weight = [...labelsWeight];
    //console.log(labels2);
    const dateRangeStart = document.getElementById('dateRangeStart');
    const dateRangeEnd = document.getElementById('dateRangeEnd');
    //get the index number in array
    const indexdateRangeStart = labels2Weight.indexOf(dateRangeStart.value);
    //console.log(indexdateRangeStart);
    const indexdateRangeEnd = labels2Weight.indexOf(dateRangeEnd.value);
    //只顯示選取的日期
    const filterDate = labels2Weight.slice(indexdateRangeStart, indexdateRangeEnd + 1);
    //replace labels
    myChartWeight.config.data.labels = filterDate;
    //datapoints
    const datapoints2Weight = [...datapointWeight];
    const filterDataPoint = datapoints2Weight.slice(indexdateRangeStart, indexdateRangeEnd + 1);
    myChartWeight.config.data.datasets[0].data = filterDataPoint;
    myChartWeight.update();
}

// 更新圖表
function changeChartW(chartType) {
    console.log(chartType.value);
    myChartWeight.destroy();
    if (chartType.value === 'line') {
        myChartWeight = new Chart(document.getElementById('myChartWeight'), configWeightLine);
    }
    if (chartType.value === 'bar') {
        myChartWeight = new Chart(document.getElementById('myChartWeight'), configWeightBar);
    }
    if (chartType.value === 'pie') {
        myChartWeight = new Chart(document.getElementById('myChartWeight'), configWeightPie);
    }
    if (chartType.value === 'radar') {
        myChartWeight = new Chart(document.getElementById('myChartWeight'), configWeightRadar);
    }
}

function getRandomColorW() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Script for Chart of Bmi
const labelsBmi = [];
const datapointBmi = [];

const data2 = {
    labels: labelsBmi,
    datasets: [{
        label: 'Bmi over time',
        data: datapointBmi,
        backgroundColor: ['rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)'],
        borderWidth: 1
    }]
};

const configBmiLine = {
    type: 'line',
    data,
};

const dataBforPie = {
    labels: labelsBmi,
    datasets: [{
        label: 'Bmi over time',
        data: datapointBmi,
        backgroundColor: getRandomColorB
    }]
};

const configBmiBar = {
    type: 'bar',
    data
};

const configBmiPie = {
    type: 'pie',
    data: dataBforPie,
};

const configBmiRadar = {
    type: 'radar',
    data,
};

let myChartBmi = new Chart(
    document.getElementById('myChartBmi'),
    configBmiBar
);

// 篩選圖表顯示範圍
function filterDataB() {
    const labels2Bmi = [...labelsBmi];
    console.log(labels2Bmi);
    const dateRangeStart = document.getElementById('dateRangeStart');
    const dateRangeEnd = document.getElementById('dateRangeEnd');
    //get the index number in array
    const indexdateRangeStart = labels2Bmi.indexOf(dateRangeStart.value);
    console.log(indexdateRangeStart);
    const indexdateRangeEnd = labels2Bmi.indexOf(dateRangeEnd.value);
    //只顯示選取的日期
    const filterDate = labels2Bmi.slice(indexdateRangeStart, indexdateRangeEnd + 1);
    //replace labels
    myChartBmi.config.data.labels = filterDate;
    //datapoints
    const datapoints2Bmi = [...datapointBmi];
    const filterDataPoint = datapoints2Bmi.slice(indexdateRangeStart, indexdateRangeEnd + 1);
    myChartBmi.config.data.datasets[0].data = filterDataPoint;
    myChartBmi.update();
}

// 更新圖表
function changeChartB(chartType) {
    console.log(chartType.value);
    myChartBmi.destroy();
    if (chartType.value === 'line') {
        myChartBmi = new Chart(document.getElementById('myChartBmi'), configBmiLine);
    }
    if (chartType.value === 'bar') {
        myChartBmi = new Chart(document.getElementById('myChartBmi'), configBmiBar);
    }
    if (chartType.value === 'pie') {
        myChartBmi = new Chart(document.getElementById('myChartBmi'), configBmiPie);
    }
    if (chartType.value === 'radar') {
        myChartBmi = new Chart(document.getElementById('myChartBmi'), configBmiRadar);
    }
}

function getRandomColorB() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}