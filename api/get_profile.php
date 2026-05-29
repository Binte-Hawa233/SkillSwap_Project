<?php
require 'config.php';

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Please login first!']);
    exit;
}

$user_id = $_SESSION['user_id'];
$user    = mysqli_fetch_assoc(mysqli_query($conn, "SELECT * FROM users WHERE id='$user_id'"));

$teach_result = mysqli_query($conn, "SELECT skill_name FROM skills WHERE user_id='$user_id' AND type='teach'");
$learn_result = mysqli_query($conn, "SELECT skill_name FROM skills WHERE user_id='$user_id' AND type='learn'");

$teach_skills = [];
$learn_skills = [];

while ($row = mysqli_fetch_assoc($teach_result)) $teach_skills[] = $row['skill_name'];
while ($row = mysqli_fetch_assoc($learn_result)) $learn_skills[] = $row['skill_name'];

echo json_encode([
    'status'        => 'success',
    'name'          => $user['name'],
    'email'         => $user['email'],
    'bio'           => $user['bio'],
    'profile_image' => $user['profile_image'],
    'teach_skills'  => $teach_skills,
    'learn_skills'  => $learn_skills
]);
?>