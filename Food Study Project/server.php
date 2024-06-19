<?php //php синтаксис
$_POST = json_decode(file_get_contents('php://input'), true); // для того, чтобы php понимал и читал json
echo var_dump($_POST); // Получаем данные от запросов POST