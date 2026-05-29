<?php
require 'config.php';

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Please login first!']);
    exit;
}

$user_id = $_SESSION['user_id'];
$bio     = mysqli_real_escape_string($conn, $_POST['bio']);
$teach   = json_decode($_POST['teach_skills']);
$learn   = json_decode($_POST['learn_skills']);

mysqli_query($conn, "UPDATE users SET bio='$bio' WHERE id='$user_id'");
mysqli_query($conn, "DELETE FROM skills WHERE user_id='$user_id'");

foreach ($teach as $skill) {
    $skill = mysqli_real_escape_string($conn, $skill);
    mysqli_query($conn, "INSERT INTO skills (user_id, skill_name, type) VALUES ('$user_id', '$skill', 'teach')");
}

foreach ($learn as $skill) {
    $skill = mysqli_real_escape_string($conn, $skill);
    mysqli_query($conn, "INSERT INTO skills (user_id, skill_name, type) VALUES ('$user_id', '$skill', 'learn')");
}

echo json_encode(['status' => 'success', 'message' => 'Profile updated!']);
?>