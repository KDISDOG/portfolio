<?php
header("content-Type: text/html; charset=utf-8");
include("LoginSystem.php");

$sql_query = "SELECT * FROM worklist";
$result = $db_link->query($sql_query);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo json_encode($row, JSON_UNESCAPED_UNICODE) . ' ';
    }
} else {
    echo "0 結果";
}
$db_link->close();
