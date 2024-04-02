<?php
header("content-Type: text/html; charset=utf-8");
include("loginSystem.php");

$sql_query = "SELECT * FROM employee ORDER BY eID ASC";
$result = $db_link->query($sql_query);
$total = $result->num_rows;
$setJob = "employee";
$setPassword = "12345";
?>
<?php
if (isset($_POST['action']) && ($_POST['action'] == 'add')) {
    include("loginSystem.php");
    $sql_query = "INSERT INTO employee(eWorkID,eName,ePhone,eBirthday,eJoinday) VALUES (?,?,?,?,?)";
    $sql_query_login = "INSERT INTO loginmember(name,job,account,password) VALUES (?,?,?,?)";
    $stmt_login = $db_link->prepare($sql_query_login);
    $stmt_login->bind_param("ssss",$_POST['eName'],$setJob,$_POST['eWorkID'],$setPassword);
    $stmt = $db_link->prepare($sql_query);
    $stmt->bind_param("sssss", $_POST['eWorkID'], $_POST['eName'], $_POST['ePhone'], $_POST['eBirthday'], $_POST['eJoinday']);
    if ($stmt->execute() && $stmt_login->execute()) {
        $stmt->close();
        $stmt_login->close();
        $db_link->close();
        echo "<script>
                alert('新增成功');location.href='employee.php';</script>";
    } else {
        die("新增失敗");
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UNIQLO 林口outlet店 員工表</title>
    <script src="fontawesome-free-5.15.3-web/js/all.js"></script>
    <script src="js/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" href="css/employee_css.css" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    <script>
        $(document).ready(function() {
            $('#new').click(function() {
                $('#cart_win').show();
            });
            $('#close').click(function() {
                $('#cart_win').hide();
            });
        });
    </script>

</head>

<body>
    <div class="layout">

        <h1>
            <img src="img/uniqlo.png" width="50" height="50"> UNIQLO 林口OUTLET店 員工表
            <hr align="center" width="100%">
        </h1>
        <button id="back" class="addList" onclick="javascript:location.href='hostMain.php'"><i class="fas fa-angle-double-left"></i>返回</button>
    </div>
    <div style="position:relative">
        <div class="main">
            <div class="employee" id="employee">
                <div>
                    <table id='employeeTable' class='employee-table'>
                        <tr style='height:0px;'>
                            <th style="text-align:center">員工編號</th>
                            <th style="text-align:center">姓名</th>
                            <th style="text-align:center">電話</th>
                            <th style="text-align:center">生日</th>
                            <th style="text-align:center">加入日期</th>
                            <th style="text-align:center">功能</th>
                        </tr>
                        <?php
                        while ($row_result = $result->fetch_assoc()) {
                            echo "<tr style='border-style: solid'>" .
                                "<td>" . $row_result['eWorkID'] . "</td>" .
                                "<td>" . $row_result['eName'] . "</td>" .
                                "<td>" . $row_result['ePhone'] . "</td>" .
                                "<td>" . $row_result['eBirthday'] . "</td>" .
                                "<td>" . $row_result['eJoinday'] . "</td>" .
                                "<td><a id='eBtn' href='editEmployee_php.php?id=".$row_result['eID'] ."'>修改</a> " .
                                "<a id='eBtn' href='deleteEmployee_php.php?id=".$row_result['eID']."'>刪除</a></td></tr>";
                        }
                        ?>
                    </table>
                </div>
            </div>
            <div id="btn">
                <button id="new">新增員工</button>
            </div>
        </div>
        <div id="cart_win">
            <div id="close">X</div>
            <br>
            <h1 style="text-align: center;">新增員工</h1>
            <div class="center">
                <br>
                <form class="form-horizontal" method="POST" action="">
                    <div class="form-group">
                        <label class="control-label col-sm-2" for="name" style="font-size:16px">員工姓名</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" style="width:550px" id="name" placeholder="請輸入姓名" name="eName">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-2" for="WorkID" style="font-size:16px">員工ID</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" style="width:550px" id="workID" name="eWorkID">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-2" for="phone" style="font-size:16px">員工電話</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" style="width:550px" id="phone" placeholder="請輸入電話" name="ePhone">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-2" for="birthday" style="font-size:16px">員工生日</label>
                        <div class="col-sm-10">
                            <input type="date" class="form-control" style="width:550px" id="birthday" name="eBirthday">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-sm-2" for="Joinday" style="font-size:16px">加入日期</label>
                        <div class="col-sm-10">
                            <input type="date" class="form-control" style="width:550px" id="joinday" name="eJoinday">
                        </div>
                    </div>
                    <br><br>
                    <div class="form-group">
                        <div class="col-sm-offset-2 col-sm-10">
                            <input type="hidden" name="action" value="add">
                            <button type="submit" class="submit btn btn-default">確認</button>
                            <button type="reset" class="submit btn btn-default">清除</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</body>
<link rel="stylesheet" href="css/employee_css.css" />

</html>