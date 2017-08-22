<?php
  use JRCologne\Utils\Errors\ErrorHandler;
  use JRCologne\Utils\Mail\Mail;
  use JRCologne\Utils\Mail\Message;

  $message = new Message(ERROR_MAIL_MSG);

  $error_handler = new ErrorHandler;

  if ($error_handler->check()) {
    $error_handler->sendErrorNotificationMail(RECEIVER, RECEIVER, ERROR_MAIL_SUBJECT, $message->getMessage());
  }
?>