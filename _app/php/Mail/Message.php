<?php
  namespace JRCologne\Utils\Mail;

  class Message {
    private $message;

    public function __construct(string $text, string $name = null) {
      $this->message = $this->createMessage($text, $name);
    }

    private function createMessage(string $text, string $name = null) {
      if ($name) {
        return $text . PHP_EOL . PHP_EOL . PHP_EOL . 'Gesendet von: ' . $name;
      } else {
        return $text;
      }
    }

    public function getMessage() {
      return $this->message;
    }
  }
?>
