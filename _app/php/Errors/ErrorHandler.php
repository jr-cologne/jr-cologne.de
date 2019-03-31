<?php
  namespace JRCologne\Utils\Errors;
  use JRCologne\Utils\Mail\Mail;

  class ErrorHandler {
    private $errors = [];

    public function __construct() {
      $this->errors = file(ERROR_LOG_FILE);
    }

    public function check() {
      if (count($this->errors) >= 3) {
        return true;
      }

      return false;
    }

    public function sendErrorNotificationMail(string $to, string $from, string $subject, string $message, array $headers = []) {
      $mail = new Mail($to, $from, $subject, $message, $headers);

      return $mail->sent;
    }
  }
?>
