<?php
    header('Content-Type: text/html; charset=utf-8');
    session_start();
    $password = $_POST['password'];
    $username = $_POST['membercode'];
    $_SESSION['username'] = $username;

    require("loginSystem.php");

    $sql_query_login = "SELECT * FROM loginmember WHERE account = '$username' AND password = '$password'";

    $job_result = $db_link->query($sql_query_login);
    $job = $job_result -> fetch_assoc();
    $result = mysqli_query($db_link,$sql_query_login);
    if(mysqli_num_rows($result)){
        echo "<script>alert('登入成功')</script>";
        $_SESSION['name'] = $job['name'];
        if($job['job'] == "host"){
            header("refresh:0;url='hostMain.php'");
        }else{
            header("refresh:0;url='employeeMain.php'");
        }
    }else{
        echo "<script>alert('登入失敗!請重新登入!')</script>";
        header("refresh:0;url='login.html'");

    }
?>