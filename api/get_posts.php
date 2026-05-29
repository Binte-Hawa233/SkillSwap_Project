<?php
require 'config.php';

$sql = "SELECT posts.*, users.name 
        FROM posts 
        JOIN users ON posts.user_id = users.id 
        ORDER BY posts.created_at DESC";

$result = mysqli_query($conn, $sql);
$posts  = [];

while ($row = mysqli_fetch_assoc($result)) {
    $likes    = mysqli_fetch_assoc(mysqli_query($conn, "SELECT COUNT(*) as total FROM likes WHERE post_id=" . $row['id']));
    $comments = mysqli_fetch_assoc(mysqli_query($conn, "SELECT COUNT(*) as total FROM comments WHERE post_id=" . $row['id']));

    $posts[] = [
        'id'         => $row['id'],
        'name'       => $row['name'],
        'content'    => $row['content'],
        'topic'      => $row['topic'],
        'created_at' => $row['created_at'],
        'likes'      => $likes['total'],
        'comments'   => $comments['total']
    ];
}

echo json_encode($posts);
?>