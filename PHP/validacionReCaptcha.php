<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $recaptchaSecret = '6LdlPRsqAAAAANi_yX-4bOB_Fm60-5Psk5TcdGWx';
    $recaptchaResponse = $_POST['g-recaptcha-response'];

    $response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=$recaptchaSecret&response=$recaptchaResponse");
    $responseKeys = json_decode($response, true);

    if (intval($responseKeys["success"]) !== 1) {
        echo 'Por favor, completa el reCAPTCHA.';
    } else {
        // No hacer nada adicional
        echo '¡reCAPTCHA verificado exitosamente!';
    }
}
?>

