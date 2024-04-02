$("#submit").click(function() {
    let age = $("#age").val();
    let Height = $("#height").val();
    if (age == "" && Height == "") {
        alert("請輸入數值");
    } else {
        let api = "http://127.0.0.1:3000/api/editmember";
        let data = {
            "height": Height,
            "age": age
        };
        $.post(api, data, (res) => {
            alert("更新成功");
        });
        $(".record").fadeOut();
    }
});