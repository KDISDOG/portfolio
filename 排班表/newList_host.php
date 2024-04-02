<?php
header("content-Type: text/html; charset=utf-8");
include("loginSystem.php");

$sql_query = "SELECT * FROM employee ORDER BY eID ASC";
$result = $db_link->query($sql_query);
$total = $result->num_rows;
?>
<?php
if (isset($_POST['action']) && ($_POST['action'] == 'add')) {
    include("LoginSystem.php");
    $name = $_POST['eName'];
    $sql_query_add = "INSERT INTO worklist(eWorkID,eName,eWorkday,eWorktime) VALUES(?, ?, ?, ?)";
    $sql_id = "SELECT eWorkID FROM employee WHERE eName = '$name'";
    $id_result = $db_link->query($sql_id)->fetch_assoc();

    $stmt = $db_link->prepare($sql_query_add);
    $stmt->bind_param("ssss", $id_result['eWorkID'], $_POST['eName'], $_POST['eWorkday'], $_POST['eWorktime']);
    if ($stmt->execute()) {
        $stmt->close();
        $db_link->close();
        echo "<script>
                alert('新增成功');location.href='newList_host.php';</script>";
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
    <title>UNIQLO 排班表</title>
    <script defer src="fontawesome-free-5.15.3-web/js/all.js"></script>
    <script type="text/javascript" src="http://code.changer.hk/jquery/1.11.2/jquery.min.js"></script>
    <script src="js/jquery-3.6.0.min.js"></script>
    <script src="js/jquery-ui-1.12.1/jquery-ui.min.js"></script>
    <link rel="stylesheet" href="css/newwork_css.css">
    <script>
        //hover to change button color
        $(document).ready(function() {
            //hover to change color
            $("button").mouseover(function() {
                $(this).css("background", "rgb(194, 0, 0)");
            });
            $("button").mouseout(function() {
                $(this).css("background", "rgb(165, 0, 165)");
            });
        });
    </script>
</head>

<body>
    <h1 id="title"><img src="img/uniqlo.png" width="50" height="50"> UNIQLO 林口OUTLET店 新增排班</h1>
 
    <button type="button" id="btnGoBack" onclick="javascript:location.href='hostMain.php'">返回</button>
    <form class="form-horizontal" method="POST" action="">
        <div class="addWorker">
            <div id="worker">
                選擇員工 :
                <select name="eName">
                    <option>請選擇員工</option>
                    <?php
                    while ($row_result = $result->fetch_assoc()) {
                        echo "<option>" . $row_result['eName'] . "</option>";
                    }
                    ?>
                </select>
            </div>
            <div id="date">
                選擇日期 : <input type="date" id="datepicker" name="eWorkday"><br>
            </div>
            <div id="time">
                選擇時段 : <input type="radio" name="eWorktime" value="Morning">早班</input>
                <input type="radio" name="eWorktime" value="Afternoon">中班</input>
                <input type="radio" name="eWorktime" value="Night">晚班</input>
            </div>
            <div id="btnConfirm">
                <input type="hidden" name="action" value="add">
                <button type="submit" id="confirm">加入排班</button>
            </div>
        </div>
    </form>
</body>

</html>