<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>UNIQLO 林口排班表</title>
    <script src="fontawesome-free-5.15.3-web/js/all.js"></script>
    <script type="text/javascript" src="http://code.changer.hk/jquery/1.11.2/jquery.min.js"></script>
    <script src="js/jquery-3.6.0.min.js"></script>
    <script defer src="js/showCalendar.min.js"></script>
    <link rel="stylesheet" href="css/main_css.css" />
</head>

<body>
    <div class="layout">
        <div class="calendarTitle" id="calendarTitle"></div>
        <h1>
            <img src="img/uniqlo.png" width="50" height="50"> UNIQLO 林口排班表

            <hr align="center" width="100%">
        </h1>


        <div class="addBtn">
            <button id="addList" type="button" style="background-color: #2E4053" onclick="javascript:location.href='newList_host.php'">
                <i class="fas fa-user"></i>新增排班
            </button>
            <button id="addList" type="button" style="background-color: #2E4053" onclick="javascript:location.href='employee.php'">
                <i class="far fa-clipboard"></i>編輯員工
            </button>
            <button id="addList" type="button" style="background-color: #2E4053" onclick="javascript:location.href='logout.php'">
                <i class="fas fa-sign-out-alt"></i>登出
            </button>
            <hr style="margin-top: 10px; margin-bottom: 10px;">
            <input type="date" name="Sdate" id="Sdate">
            <input id="sreach" type="button" value="查詢" style="background-color: #2E4053; color: #D4E6F1; height: 30px; width: 50px" />
        </div>
    </div>
    <div style="position: relative;">
        <div class="main">
            <div class="calendar" id="calendar"></div>
        </div>
        <style>
            #close {
                position: absolute;
                top: 0px;
                left: 96%;
                /* width: 360px; */
                padding: 2px;
                margin: 4px;
                border-radius: 4px;
                cursor: pointer;
            }

            .button {
                height: 35px;
                width: 100px;
                background-color: #7F38EC;
                color: white;
                border: none;
                padding: 5px 5px;
                text-align: center;
                margin: 20px 4px;
                display: inline-block;
            }

            .center {
                margin: auto;
                width: 700px;
            }

            .submit {
                border: 1px solid #2E4053;
                background-color: #AED6F1;
                color: #2E4053;
            }

            #cart_win {
                position: absolute;
                border: 1px solid white;
                padding: 10px;
                background-color: #AED6F1;
                color: #2E4053;
                display: none;
                border-radius: 8px;
                box-shadow: 10px 10px 20px rgb(0, 0, 0, 0.5);
                width: 800px;
                padding-top: 30px;
                margin-bottom: 100px;
                top: 5%;
                left: 30%;
            }
        </style>
        <div id="cart_win">
            <div id="close">X</div>
            <br>
            <h1 style="text-align: center;">班表</h1>
            <div class="center">
                <br>
                <table class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <td width="15%">早班</td>
                            <td width="15%">中班</td>
                            <td width="15%">晚班</td>
                        </tr>
                    </thead>
                    <tbody id="tbody"></tbody>
                </table>
            </div>
        </div>
    </div>
</body>
<script type="text/javascript">
    var theDate;
    $(document).ready(function() {

        $('.currentMonth').click(function() {
            $('#cart_win').fadeIn();
            theDate = $(this).attr('data'); //點擊日期

            $.ajax({
                type: 'POST',
                url: 'test.php',
                data: {

                },
                success: function(data) {
                    var a = data.split(' ');
                    var trStr = ' ';
                    var getDate = new Array;
                    var spDate;
                    for (var i = 0; i < a.length - 1; i++) {
                        getDate = JSON.parse(a[i]).eWorkday.split('-');
                        spDate = getDate[0] + getDate[1] + getDate[2]; //欲取得日期
                        trStr += '<tr class="example">';
                        if (theDate == spDate) {
                            if (JSON.parse(a[i]).eWorktime == 'morning')
                                trStr += '<td width="15%">' + JSON.parse(a[i]).eName + '</td>';
                            else trStr += '<td>' + ' ' + '</td>';
                            if (JSON.parse(a[i]).eWorktime == 'afternoon')
                                trStr += '<td width="15%">' + JSON.parse(a[i]).eName + '</td>';
                            else trStr += '<td>' + ' ' + '</td>';
                            if (JSON.parse(a[i]).eWorktime == 'night')
                                trStr += '<td width="15%">' + JSON.parse(a[i]).eName + '</td>';
                            else trStr += '<td>' + ' ' + '</td>';
                        }
                        $("#tbody").html(trStr);
                    }
                }
            });
        });
        $('.currentDay').click(function() {
            $('#cart_win').fadeIn();
            theDate = $(this).attr('data');
            $.ajax({
                type: 'POST',
                url: 'test.php',
                data: {

                },
                success: function(data) {
                    var a = data.split(' ');
                    var trStr = ' ';
                    var getDate = new Array;
                    var spDate;
                    for (var i = 0; i < a.length - 1; i++) {
                        getDate = JSON.parse(a[i]).eWorkday.split('-');
                        spDate = getDate[0] + getDate[1] + getDate[2]; //欲取得日期
                        trStr += '<tr class="example">';
                        if (theDate == spDate) {
                            if (JSON.parse(a[i]).eWorktime == 'morning')
                                trStr += '<td width="15%">' + JSON.parse(a[i]).eName + '</td>';
                            else trStr += '<td>' + ' ' + '</td>';
                            if (JSON.parse(a[i]).eWorktime == 'afternoon')
                                trStr += '<td width="15%">' + JSON.parse(a[i]).eName + '</td>';
                            else trStr += '<td>' + ' ' + '</td>';
                            if (JSON.parse(a[i]).eWorktime == 'night')
                                trStr += '<td width="15%">' + JSON.parse(a[i]).eName + '</td>';
                            else trStr += '<td>' + ' ' + '</td>';
                        }
                        $("#tbody").html(trStr);
                    }
                }
            });
        });
        $('#close').click(function() {
            $('#cart_win').fadeOut();
        });
    });
</script>

</html>