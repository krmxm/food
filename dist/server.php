<?php
$_POST = json_decode(file_get_contents("php://input"), true);
echo var_dump($_POST); // эта команда данныйе, которые пришли с клиента, превращает их в строку, показывает обратно на клиенте, это тот response, который приходит к нам от сервера