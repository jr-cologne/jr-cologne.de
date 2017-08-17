<?php
  const RECEIVER = 'kontakt@jr-cologne.de';
  const ERR_HTML_START = '<p><strong class="error">';
  const ERR_HTML_END = '</strong></p>';

  error_reporting(E_ALL & ~E_NOTICE);

  ini_set('display_errors', 'Off');
  ini_set('log_errors', 'On');
  ini_set('error_log', '../../../jr-cologne-errors.log');
?>
