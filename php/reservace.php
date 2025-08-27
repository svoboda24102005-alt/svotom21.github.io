<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $jmeno = $_POST["name"];
    $email = $_POST["email"];
    $datum = $_POST["date"];
    $noci  = $_POST["nights"];
    $pokoj = $_POST["room"];
    $cena  = $_POST["price"];
    $celkem = $cena * $noci;

    // ukladani do souboru
    $zaznam = "$jmeno | $email | $pokoj | $datum | $noci nocí | $celkem Kč\n";
    file_put_contents("rezervace.txt", $zaznam, FILE_APPEND);

    echo "Díky $jmeno, rezervace na $pokoj byla přijata. Cena celkem: $celkem Kč.";
}
?>