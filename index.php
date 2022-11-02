<?php
require "config.php";

function get_now_playing() {
	global $dev, $apikey;
	if($dev) {
		// For testing so I don't make unnecessary API calls.
		echo "🎶 sewnfkt - sub bass in the ceiling fan, but i mean if the head was rolling why did it even miss like bullets?";
		return;
	}

	$url =  "http://ws.audioscrobbler.com/2.0/";
	$user = "okeverly";

	$params = http_build_query(array(
		"method" => "user.getrecenttracks",
		"user" => $user,
		"api_key" => $apikey,
		"format" => "json"
	));

	$url .= "?" . $params;

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_URL, $url);

	$response = json_decode(curl_exec($ch));
	$track = $response->{"recenttracks"}->{"track"}[0];
	$artist = strtolower($track->{"artist"}->{"#text"});
	$name = strtolower($track->{"name"});
	$url = $track->{"url"};

	printf("<a href=\"%s\" target=\"_blank\">🎶 %s - %s</a>", $url, $artist, $name);
}
?>

<!DOCTYPE html>
<html>
	<head>
		<title>everly</title>
		<link rel="icon" type="image/x-icon" href="assets/images/favicon.png">
		<link href="assets/fonts/fonts.css" rel="stylesheet">
		<link href="assets/styles.css" rel="stylesheet">
		<meta content="everly" property="og:title">
		<meta content="#FF0080" data-react-helmet="true" name="theme-color">
	</head>
	<body onresize="resize()" onload="main()" onmousemove="mousemove(event)" onkeydown="keydown(event)">
		<canvas id="canvas-background"></canvas>
		<p id="renderer-debug"><span id="renderer-info"></span><br><span id="renderer-status"></span></p>
		<div class="container">
			<div class="header">
				<img src="assets/images/picture.jpg" width="56px">
				<div class="name">
					<h1>everly</h1>
					<div class="under-name">
						<p class="pronouns">she/her</p>
						<p class="discord-tag">#1111</p>
					</div>
				</div>
			</div>
			<div class="content">
				<div class="now-playing">
					<?php get_now_playing(); ?>
				</div>
				<div class="links">
					<a href="https://twitter.com/meowtionblur" target="_blank">
						<img src="assets/images/icons/twitter.png" title="Twitter">
					</a>
					<a href="https://www.youtube.com/@everlyy" target="_blank">
						<img src="assets/images/icons/youtube.png" title="YouTube">
					</a>
					<a href="https://github.com/everlyy" target="_blank">
						<img src="assets/images/icons/github.png" title="GitHub">
					</a>
					<a href="https://steamcommunity.com/profiles/76561198446630909" target="_blank">
						<img src="assets/images/icons/steam.png" title="Steam">
					</a>
					<a href="https://www.last.fm/user/okeverly" target="_blank">
						<img src="assets/images/icons/lastfm.png" title="last.fm">
					</a>
				</div>
			</div>
		</div>
		<div class="footer">
			<a href="https://github.com/everlyy/everly.lol" target="_blank">source code</a>
		</div>
		<script src="assets/scripts/shapes.js"></script>
		<script src="assets/scripts/particle.js"></script>
		<script src="assets/scripts/renderer.js"></script>
	</body>
</html>
