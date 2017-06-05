<?php
  function processContactForm(array $form_data) {
    array_pop($form_data);

    // clean data
    foreach ($form_data as $key => $value) {
      $form_data[$key] = clean($value);
    }

    ['name' => $name, 'email' => $email, 'subject' => $subject, 'message' => $message] = $form_data;

    // check if form is filled in correctly
    if ( !empty($name) && !empty($email) && !empty($subject) && !empty($message) ) {
      // check email
      if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // prevent multiple emails
        $email = explode(',', $email);
        $email = $email[0];

        // send email
        if (sendMail($name, $email, $subject, $message)) {
          header('Location: danke.html');
        } else {
          return '<p><strong>Beim Versand der E-Mail ist leider ein Fehler aufgetreten. Bitte versuche es nochmal!</strong></p>';
        }
      } else {
        return '<p><strong>Du hast keine gültige E-Mail-Adresse angegeben. Bitte versuche es nochmal!</strong></p>';
      }
    } else {
      return '<p><strong>Du hast nicht alle Felder ausgefüllt. Bitte versuche es nochmal!</strong></p>';
    }
  }

  // clean value
  function clean(string $value) {
    return htmlspecialchars(stripslashes(trim($value)));
  }

  // send mail
  function sendMail(string $name, string $email, string $subject, string $message) {
    $subject = '=?UTF-8?B?'.base64_encode($subject).'?=';
    $headers = [
                    "MIME-Version: 1.0",
                    "Content-type: text/plain; charset=utf-8",
                    'From: ' . RECEIVER,
                    'Reply-To: ' . RECEIVER,
                    "Subject: {$subject}",
                    "X-Mailer: PHP/".phpversion()
                ];

    if ( !empty(RECEIVER) && mail(RECEIVER, $subject, $message . PHP_EOL . PHP_EOL . PHP_EOL . $name, implode("\r\n", $headers)) ) {
      return true;
    } else {
      return false;
    }
  }
?>