    <?php

require "db.php";

    $sql = "SELECT * FROM products WHERE status = 1";

    $stmt = $pdo->query($sql);

    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($products);

    ?>