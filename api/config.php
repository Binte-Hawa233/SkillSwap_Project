<?php
error_reporting(0);
ini_set('display_errors', 0);

$host     = "localhost";
$dbname   = "skillswap";
$username = "root";
$password = "";

$conn = mysqli_connect($host, $username, $password, $dbname);

if (!$conn) {
    die(json_encode(['status' => 'error', 'message' => mysqli_connect_error()]));
}

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

session_start();
?>