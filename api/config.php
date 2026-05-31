<?php
error_reporting(0);
ini_set('display_errors', 0);

$host     = "sql12.freesqldatabase.com";  // your server from email
$dbname   = "sql12828776";                // your database name
$username = "sql12828776";                // your username
$password = "ycVTdBA479";         // your password from email
$port     = 3306;

$conn = mysqli_connect($host, $username, $password, $dbname, $port);

if (!$conn) {
    die(json_encode(['status' => 'error', 'message' => mysqli_connect_error()]));
}

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

session_start();
?>
