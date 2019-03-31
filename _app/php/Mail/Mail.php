<?php
  namespace JRCologne\Utils\Mail;

  class Mail {
    private $to;
    private $from;
    private $subject;
    private $message;
    private $headers;
    public $sent = false;

    public function __construct(string $to, string $from, string $subject, string $message, array $headers = []) {
      $this->to = $to;
      $this->from = $from;
      $this->subject = $this->getSubject($subject);
      $this->message = $message;

      if ($headers) {
        $this->headers = $this->getHeaders($headers);
      } else {
        $this->headers = $this->getHeaders();
      }

      $this->sent = $this->sendMail();
    }

    private function getSubject(string $subject) {
      return '=?UTF-8?B?' . base64_encode($subject) . '?=';
    }

    private function getHeaders(array $custom_headers = []) {
      if ($custom_headers) {
        return implode("\r\n", $custom_headers);
      }

      return implode("\r\n", [
        'MIME-Version: 1.0',
        'Content-type: text/plain; charset=utf-8',
        "From: {$this->from}",
        "Reply-To: {$this->from}",
        "Subject: {$this->subject}",
        'X-Mailer: PHP/' . phpversion()
      ]);
    }

    private function sendMail() {
      $to = $this->to;
      $subject = $this->subject;
      $message = $this->message;
      $headers = $this->headers;

      return mail($to, $subject, $message, $headers);
    }
  }
?>
