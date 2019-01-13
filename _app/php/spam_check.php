<?php
  if (empty($_SESSION['spam_check']) || empty($_POST)) {
    $spam_checks = SPAM_CHECKS;

    shuffle($spam_checks);

    $_SESSION['spam_check'] = $spam_checks[0];

    unset($spam_checks);
  }
?>
