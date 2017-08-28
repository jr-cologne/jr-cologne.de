---
layout: contact
title: Kontakt
canonical: kontakt.php
---

<header class="header">
  <a href="/" class="logo" title="jr-cologne.de Logo"></a>

  <nav id="nav" class="nav nav--main">
    <div class="navbar">
      <a href="#" id="hamburger-button" title="Navigation">
        <span class="hamburger-icon_top"></span>
        <span class="hamburger-icon"></span>
        <span class="hamburger-icon_bottom"></span>
      </a>
    </div>

    <ul>
      <li><a href="/">Startseite</a></li>
      <li><a href="portfolio.html">Portfolio</a></li>
      <li><a href="blog.html">Blog</a></li>
      <li><a href="resources.html">Ressourcen</a></li>
    </ul>
  </nav>
</header>

<main>
  {% include back-button.html path='impressum.html' text='Zurück zum Impressum' %}

  <h1 class="section-heading section-heading--no-padding-top">{{ page.title }}</h1>

  <p class="text">
    Du möchtest Kontakt zu mir aufnehmen? Dann nutze dafür doch das folgende
    Kontaktformular. Ich würde mich sehr über eine nette Nachricht freuen!
  </p>

  <?php echo !empty($response) ? $response : ''; ?>

  <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="post">
    <label for="name">Name:</label>
    <input type="text" name="name" placeholder="Realer Name oder Nickname" id="name" value="<?php echo !empty($_POST['name']) ? clean($_POST['name']) : ''; ?>">

    <label for="email">E-Mail:</label>
    <input type="email" name="email" placeholder="you@example.com" id="email" value="<?php echo !empty($_POST['email']) ? clean($_POST['email']) : ''; ?>">

    <label for="subject">Betreff:</label>
    <input type="text" name="subject" placeholder="Dein Anliegen" id="subject" value="<?php echo !empty($_POST['subject']) ? clean($_POST['subject']) : ''; ?>">

    <label for="message">Nachricht:</label>
    <textarea name="message" placeholder="Deine Nachricht" rows="20" cols="80"><?php echo !empty($_POST['message']) ? clean($_POST['message']) : ''; ?></textarea>

    <input type="hidden" name="csrf_token" value="<?php echo $_SESSION['csrf_token'] ?>">

    <input type="submit" name="submit" value="Nachricht senden">
  </form>
</main>

<footer class="footer footer--white">
  <div class="footer-logo-nav-container">
    <a href="/" class="logo" title="jr-cologne.de Logo"></a>

    <nav class="nav nav--footer">
      <ul>
        <li><a href="/">Startseite</a></li>
        <li><a href="portfolio.html">Portfolio</a></li>
        <li><a href="blog.html">Blog</a></li>
        <li><a href="resources.html">Ressourcen</a></li>
      </ul>
    </nav>
  </div>

  <nav class="nav nav--legal">
    <ul>
      <li><a href="impressum.html">Impressum</a></li>
      <li><a href="datenschutz.html">Datenschutz</a></li>
    </ul>
  </nav>
</footer>
