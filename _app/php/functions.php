<?php
  use JRCologne\Utils\Mail\Mail;
  use JRCologne\Utils\Mail\Message;

  function processContactForm(array $form_data) {
    unset($form_data['csrf_token'], $form_data['submit']);

    foreach ($form_data as $key => $value) {
      $form_data[$key] = clean($value);
    }

    ['name' => $name, 'email' => $email, 'subject' => $subject, 'message' => $message, 'spam_check' => $spam_check] = $form_data;

    if ( empty($name) && empty($email) && empty($subject) && empty($message) && empty($spam_check) ) {
      return ERR_HTML_START . 'Du hast nicht alle Felder ausgefüllt. Bitte versuche es nochmal!' . ERR_HTML_END;
    }

    if ($spam_check != '8') {
      return ERR_HTML_START . 'Du hast die untenstehende Frage zur Spam-Bekämpfung leider falsch beantwortet. Bitte versuche es nochmal!' . ERR_HTML_END;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
      return ERR_HTML_START . 'Du hast keine gültige E-Mail-Adresse angegeben. Bitte versuche es nochmal!' . ERR_HTML_END;
    }

    $email = explode(',', $email);
    $email = $email[0];

    if (!sendMail($name, $email, $subject, $message)) {
      return ERR_HTML_START . 'Beim Versand der E-Mail ist leider ein Fehler aufgetreten. Bitte versuche es nochmal!' . ERR_HTML_END;
    }

    header('Location: danke.html');
    exit();
  }

  function clean(string $value) {
    return htmlspecialchars(stripslashes(trim($value)));
  }

  function sendMail(string $name, string $email, string $subject, string $message) {
    $message = new Message($message, $name);

    $mail = new Mail(RECEIVER, $email, $subject, $message->getMessage());

    return $mail->sent;
  }
?>
