$(document).ready(function(){
    $("#submit").click(function() {
        let bmiGoal = $("#bmiGoal").val();
        let date = $("#bmiRecordDate").val();
        console.log(date);
        if(bmiGoal == "") {
            alert("請輸入數值");
        } else {
            let api = "http://127.0.0.1:3000/api/BMIsubmit";
            let data = {
                "BmiGoal": bmiGoal,
                "BmiExpectDate": date
            };
            $.post(api, data, (res) => {
                alert("紀錄成功");
                $("#bmiGoal").val("");
                $("#bmiRecordDate").val("");
            });
        }
    });
})