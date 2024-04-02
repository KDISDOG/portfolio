catchGoalData();
catchBmiData();
// 顯示最新輸入的 BMI Goal
function catchGoalData() {
    let api = "http://127.0.0.1:3000/api/getUserGoal"
    let NewestBmiGoal = 0;
    let BmiExpectDate = [];
    $.get(api, (data) => {
        NewestBmiGoal = data[data.length-1].BmiGoal;
        BmiExpectDate = data[data.length-1].BmiExpectDate;
        $("#YourGoal").append(NewestBmiGoal);
        $("#Dayline").append(BmiExpectDate);
    });
}
function catchBmiData() {
    let api = "http://127.0.0.1:3000/api/getUserData"
    let NowBmi = 0;
    let gap=0;
    $.get(api, (data) => {
        NowBmi = data[data.length-1].BMI;
        $("#YourBMI").append(NowBmi);
    });
}