

<?php



if(isset($_GET["url"])){
$url = urldecode(rawurldecode($_GET["url"]));

preg_match("/^(?:http(?:s)?:\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com\/(?:(?:watch)?\?(?:.*&)?v(?:i)?=|(?:embed|v|vi|user)\/))([^\?&\"'>]+)/", $url, $matches);

preg_match("/https?:\/\/(?:www\.)?vimeo\.com\/\d{8}/", $url, $matchesVimeo);

preg_match("/^(?:http(?:s)?:\/\/)?(?:www\.)?(?:m\.)?(?:dai\.ly\/|dailymotion\.com\/[^\?&\"'>]+)/", $url, $matchesDailyMotion);
    preg_match("~/videos/(?:t\.\d+/)?(\d+)~i", $url, $matchesFB);


if($matches){

      $iframeUrl = "<iframe src='https://www.youtube.com/embed/". $matches[1] . "'></iframe>";


       $youtubeArray = array('thumbnail' =>  'https://img.youtube.com/vi/'. $matches[1] .'/0.jpg', 'embed_code' => $iframeUrl);

       echo "<pre>" . json_encode($youtubeArray, JSON_UNESCAPED_SLASHES) . "</pre>";





}
        elseif ($matchesVimeo)
         {


              $vimeoID = (int) substr(parse_url($url, PHP_URL_PATH), 1);

              if($vimeoID != null){

                $hash = unserialize(file_get_contents("http://vimeo.com/api/v2/video/$vimeoID.php"));

                $vimeoThumb = $hash[0]['thumbnail_large'];

                $vimeoEmbed = "<iframe src='https://player.vimeo.com/video/". $vimeoID  ."?color=c800f0&badge=0'></iframe>";

                $vimeoArray = array('thumbnail' => $vimeoThumb, 'embed_code' => $vimeoEmbed);

                echo "<pre>" . json_encode($vimeoArray, JSON_UNESCAPED_SLASHES) . "</pre>";





                
              }



      
      }
      elseif ($matchesDailyMotion) {
          
          $dailymotionID = strtok(basename($url), '_');
         
          $dailyThumb = "http://www.dailymotion.com/thumbnail/video/$dailymotionID";
          $dailyEmbed = "<iframe src='//www.dailymotion.com/embed/video/$dailymotionID'></iframe>";

          $dailyArray = array('thumbnail' => $dailyThumb, 'embed_code' => $dailyEmbed);

          echo "<pre>" . json_encode($dailyArray, JSON_UNESCAPED_SLASHES) . "</pre>";




      }
      elseif ($matchesFB) { 
         
          $fbThumb = "https://graph.facebook.com/$matchesFB[1]/picture";
          $fbEmbed = "<iframe src='https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/facebook/videos/$matchesFB[1]/&show_text=false&appId=208556729547178'></iframe>";

          $fbArray = array('thumbnail' => $fbThumb, 'embed_code' => $fbEmbed);
          echo "<pre>" . json_encode($fbArray, JSON_UNESCAPED_SLASHES) . "</pre>";

      }

      else{
        echo "Invalid video URL";
      }




}


?>
