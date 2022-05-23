<?php

include_once( 'config.php' );
include_once('saetv2.ex.class.php');
$o = new SaeTOAuthV2(WB_AKEY, WB_SKEY);
if (isset($_REQUEST['code'])) {
    $keys = array();
    $keys['code'] = $_REQUEST['code'];
    $keys['redirect_uri'] = WB_CALLBACK_URL;
    try {
        $token = $o->getAccessToken('code', $keys);
    } catch (OAuthException $e) {
        
    }
}
if (!$token) {
    header("location:../error1.php?type=unOAuth&back=" . urlencode($_COOKIE['back']));
    exit();
}



//var_dump($token);

setcookie("weibo_uid", $token["uid"], time() + 3600 * 24 * 30, "/");
setcookie("token", $token["access_token"], time() + 3600 * 24 * 30, "/");
//if($_COOKIE["back"]!="") {
//    $u = $_COOKIE['back'];
//    setcookie("back","",-time() + 3600 * 24 * 30, "/");
//    header("location:{$u}&token=".$token["access_token"]."&uid=".$token["uid"]);
//}else {
    header("location:http://h5sites.com//index.php?app=Default&act=index&token=".$token["access_token"]."&ques=".$_COOKIE["ques"]."&uid=".$token["uid"]);
//}
?>
