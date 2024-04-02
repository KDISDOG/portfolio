<?php
include("loginSystem.php");
if (isset($_POST['action']) && ($_POST['action'] == 'update')) {
    $sql_query = "UPDATE employee SET eName =?, ePhone = ?, eBirthday = ?, eJoinday = ? WHERE eID = ?";
    $stmt = $db_link->prepare($sql_query);
    $stmt->bind_param("ssssi", $_POST['eName'], $_POST['ePhone'], $_POST['eBirthday'], $_POST['eJoinday'], $_POST['eID']);

    if ($stmt->execute()) {
        $stmt->close();
        $db_link->close();
        echo "<script>alert('更新成功 !');</script>";
        header("refresh:0;url='employee.php'");
    } else {
        die("更新失敗");
    }
}

$sql_select = "SELECT eID, eWorkID, eName, ePhone, eBirthday, eJoinday FROM employee WHERE eID = ?";
$stmt = $db_link->prepare($sql_select);
$stmt->bind_param("i", $_GET["id"]);
$stmt->execute();
$stmt->bind_result($eID, $eWorkID, $eName, $ePhone, $eBirthday, $eJoinday);
$stmt->fetch();
?>

<!DOCTYPE html>
<html>

<style type="text/css">
    <?php include 'css/newwork_css.css'; ?>
    form{
        text-align:center;
        font-family:monospace;
        font-size:30px;
    }
    h1{
        text-align:center;
        font-family:monospace;
        font-size:50px;
    }
    input{
        font-size:20px
    }
</style>

<body>
<h1>
    <img src="img/uniqlo.png" width="50" height="50"> UNIQLO 修改員工  
    <hr align="center" width="100%">
</h1>
<form method="POST" action="">
    <table align="center">
        <tr>
            <td>姓名 : </td>
            <td><input type="text" name="eName" value="<?php echo $eName ?>"></td>
        </tr>
        <br>

        <tr>
            <td>電話 : </td>
            <td><input type="text" name="ePhone" value="<?php echo $ePhone ?>"></td>
        </tr>
        <br>

        <tr>
            <td>生日 : </td>
            <td><input type="date" name="eBirthday" value="<?php echo $eBirthday ?>"></td>
        </tr>
        <br>

        <tr>
            <td>入社日期 : </td>
            <td><input type="date" name="eJoinday" value="<?php echo $eJoinday ?>"></td>
        </tr>
        <br>

        <tr>
            <td colspan="2" style="text-align: center">
                <input type="hidden" name="eID" value="<?php echo $eID; ?>">
                <input type="hidden" name="action" value="update">
                <input type="submit" name="btnSMT" value="更新員工資料">
                <input type="reset" name="btnRST" value="重新填寫">
            </td>
        </tr>
    </table>
</form>
</body>
</html>