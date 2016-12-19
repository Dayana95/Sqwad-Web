<?php

function mailit($email_address){
        require_once('phpmailer/PHPMailerAutoload.php');

        $verification_code = MD5(microtime());

        $mail = new PHPMailer();
        $mail->IsSMTP();
        $mail->CharSet="UTF-8";
        $mail->SMTPSecure = 'tls';
        $mail->Host = 'smtp.gmail.com';
        $mail->Port = 587;
        $mail->Username = 'espinoza8917@gmail.com';
        $mail->Password = 'pvdekhyiydwvhlzp';
        $mail->SMTPAuth = true;

        $mail->From = "milton@senorcoders.com";
        $mail->FromName = "milton@senorcoders.com";
        $mail->AddAddress($email_address);

        $mail->IsHTML(true);
        $mail->Subject    = "SQWAD Verification Request";
        $mail->AltBody    = "To view the message, please use an HTML compatible email viewer!";
        $mail->Body    = "Click here to verify your email address <a href='http://sqwad.senorcoders.com/?code=".$verification_code."&email=".$email_address."' >Verify email address</a>";
				return $mail;
}

//$email_address =  explode("?",$_SERVER['REQUEST_URI'])[1];
if(isset($_GET)){
    //$getVars = array_keys($_GET);
    if(isset($_GET['email'])){
      //$email_address=$getVars[0];
      $email_address=$_GET['email'];
      if (!filter_var($email_address, FILTER_VALIDATE_EMAIL)) {
        echo "email address is not correct";
      }else{
				$mail = mailit($email_address);

        if(!$mail->Send())
        {
          echo "Mailer Error: " . $mail->ErrorInfo;
        }
        else
        {
          echo "Message sent!";
          ?>


          <script>
            var dbRef = new Firebase("https://sqwad-app.firebaseio.com/");
            var usersRef = dbRef.child('users');
          </script>

          <?php
          die();
        }
      }
    }
}else{
  echo "there is not email address";
}

?>
