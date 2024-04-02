<?php
    header('Content-Type: text/html; charset=utf-8');
    require("LoginSystem.php");
    session_start();
    $username = $_SESSION['username'];
    $furtherPassword = $_POST['furtherPassword'];
    $newPassword = $_POST['newPassword'];
    $checkPassword = $_POST['newPassword_2'];
    $sql_query_check = "SELECT * FROM loginmember WHERE account = '$username' AND password = '$furtherPassword'";
    $result = mysqli_query($db_link,$sql_query_check);

    if($newPassword != $checkPassword){
        echo "<script>alert('兩次輸入密碼不相同!請重新輸入!');</script>";
        header("refresh:0;url='employeePassword.html'");
    }else if(mysqli_num_rows($result)){
        $sql_query = "UPDATE loginmember SET password = ? WHERE account = ?";
        $stmt = $db_link->prepare($sql_query);
        $stmt -> bind_param("ss",$_POST['newPassword'],$username);
        $stmt->execute();
        $stmt->close();
        $db_link->close();
    echo "<script>alert('修改成功!請重新登入!');</script>";
        header("location:login.html");
    }else{
    echo "<script>alert('原密碼輸入錯誤!請重新輸入!');</script>";
    header("refresh:0;url='employeePassword.html'");
    }



?>