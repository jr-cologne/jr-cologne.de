<?php
  // Settings for Contact Form //
  const RECEIVER = 'kontakt@jr-cologne.de';
  const ERR_HTML_START = '<p><strong class="error">';
  const ERR_HTML_END = '</strong></p>';

  // Settings for Error Handling //
  const ERROR_LOG_FILE = '../../../jr-cologne_errors.log';

  error_reporting(E_ALL & ~E_NOTICE);
  ini_set('display_errors', 'Off');
  ini_set('log_errors', 'On');
  ini_set('error_log', ERROR_LOG_FILE);

  // Settings for ErrorHandler //
  const ERROR_MAIL_SUBJECT = 'Neue Fehler auf jr-cologne.de';
  const ERROR_MAIL_MSG = 'Es gibt neue Fehler auf jr-cologne.de. Bitte überprüfe den Error Log.';

  // Settings for Session Security //
  ini_set('session.cookie_lifetime', 0);
  ini_set('session.use-cookies', 'On');
  ini_set('session.use_only_cookies', 'On');
  ini_set('session.use_strict_mode', 'On');
  ini_set('session.cookie_httponly', 'On');
  ini_set('session.cookie_secure', 'On');
  ini_set('session.use_trans_sid', 'Off');
  ini_set('session.cache_limiter', 'nocache');
?>
