<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$ch = curl_init();
curl_setopt($ch,CURLOPT_USERAGENT,'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13');
curl_setopt($ch,CURLOPT_ENCODING , "");
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	$requestBody = file_get_contents('php://input');
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_POSTFIELDS,$requestBody);
	curl_setopt($ch, CURLOPT_HTTPHEADER, array(                                                                          
    //'Content-Type: application/json',                                                                                
    'Content-Length: ' . strlen($requestBody)
	));       
}else{
	curl_setopt($ch, CURLOPT_HTTPHEADER, array(                                                                          
		//'Content-Type: application/json'
	));       
}
$url = rawurldecode($_GET['url']);

curl_setopt($ch, CURLOPT_URL,$url);


curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$out  = curl_exec ($ch);

curl_close ($ch);

header('Content-Type: application/json');
echo $out;