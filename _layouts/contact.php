<?php
  require_once('vendor/autoload.php');

  if ($_POST['submit'] == 'Nachricht senden') {
    $response = processContactForm($_POST);
  }

?>

<!DOCTYPE html>
<html lang="de">
  <head>
    {% include head.html stylesheet='contact' %}
  </head>
  <body>
    {{ content }}

    {% include foot.html %}
  </body>
</html>
