---
layout: contact
title: Kontakt
---

<?php
  require_once('_app/php/config.php');
  require_once('_app/php/functions.php');

  if ($_POST['submit'] == 'Nachricht senden') {
    $response = processContactForm($_POST);
  }
?>

<div class="wrapper">
  <div class="back">
    <a href="index.html" class="back-button">Zurück zur Startseite</a>
  </div>

  <main>
    <p>Du möchtest Kontakt zu mir aufnehmen? Dann nutze dafür doch das folgende Kontaktformular. Ich würde mich sehr über eine nette Nachricht freuen!</p>

    <?php echo !empty($response) ? $response : ''; ?>

    <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="post">
      <div class="field_wrap two-col">
        <input type="text" name="name" placeholder="Dein Name">
        <input type="email" name="email" placeholder="Deine E-Mail">
      </div>
      <div class="field_wrap">
        <input type="text" name="subject" placeholder="Dein Betreff">
      </div>
      <div class="field_wrap">
        <textarea name="message" placeholder="Deine Nachricht" rows="20" cols="80"></textarea>
      </div>
      <input type="submit" name="submit" value="Nachricht senden">
    </form>
  </main>

  {% include footer.html %}
</div>
