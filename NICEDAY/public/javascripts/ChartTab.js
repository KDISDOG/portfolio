function chartTab(evt, tabName) {
    var i, canvasbox, tablinks;
    canvasbox = document.getElementsByClassName("canvasbox");
    for (i = 0; i < canvasbox.length; i++) {
        canvasbox[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
        console.log(i);
    }
    console.log(tabName);
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function getUserData() {
    let api = "http://127.0.0.1:3000/api/getUserData";
    let lastWeight=0;
    let lastExercise=0;
    $.get(api, (data) => {
        for (let i = 0; i < data.length; i++) {
            labelsWeight.push(data[i].InputDate);
            datapointWeight.push(data[i].TodayWeight);
            labelsBmi.push(data[i].InputDate);
            datapointBmi.push(data[i].BMI);
        }
        lastWeight=data[data.length-1].TodayWeight;
        lastExercise=data[data.length-1].ExerciseTime;
        console.log(lastWeight);
        $("#dateRangeStart").attr("min", data[0].InputDate);
        $("#dateRangeStart").attr("max", data[data.length-1].InputDate);
        $("#dateRangeEnd").attr("min", data[0].InputDate);
        $("#dateRangeEnd").attr("max", data[data.length-1].InputDate);
        $("#lastdayweight").append(lastWeight+" KG");
        $("#lastdayexercise").append(" "+lastExercise+" Minute");
    });
}

$(document).ready(function() {
    getUserData();
    $(".btnrecord").click(function() {
        $(".record").fadeIn();
    })
    $(".close").click(function() {
        $(".record").fadeOut();
    })
    $("#submit").click(function() {
        let todayWeight = $("#weight").val();
        let exercise = $("#exercise").val();
        let fullDate = new Date();
        let month = fullDate.getMonth() + 1;
        let day = fullDate.getDate();
        let simpleDate = fullDate.getFullYear() + '-' + (('' + month).length < 2 ? '0' : '') + month + '-' + (('' + day).length < 2 ? '0' : '') + day;
        if (todayWeight == "" && exercise == "") {
            alert("請輸入數值");
        } else {
            let api = "http://127.0.0.1:3000/api/submitData";
            let data = {
                "InputDate": simpleDate,
                "TodayWeight": todayWeight,
                "ExerciseTime": exercise
            };
            $.post(api, data, (res) => {
                alert("紀錄成功");
                $("#weight").val("");
                $("#exercise").val("");
            });
            $(".record").fadeOut();
            location.reload();
        }
    });
})