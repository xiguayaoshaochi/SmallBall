<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

include_once('waf.php');

ini_set('display_errors', 'On');

header("Content-Type: text/html;charset=utf-8");

date_default_timezone_set('PRC');

define('__ROOT__', __DIR__ . '/../');
define('WB_CALLBACK_URL', ($_SERVER['SERVER_PORT'] == '80' ? 'http://' : 'https://') . $_SERVER['HTTP_HOST'] . $_SERVER['PHP_SELF']);
include_once ('db.class.php');

$db = new mysql();

function urlsafe_b64encode($str) {
    $str = base64_encode($str);
    $str = str_replace(array('+', '/', '='), array('-', '_', ''), $str);
    return $str;
}

/**
 * 
 * @return type
 */
function oauthByWeibo() {
    if (!empty(C('weibo_uid'))) {
        return C('weibo_uid');
    } else if (!empty(request('code'))) {
        return getUid();
    } else {
        gotoWeiboOauth();
    }
}

/**
 * 
 */
function gotoWeiboOauth() {

    include_once( __ROOT__ . 'OAuth/config.php' );
    $o = new SaeTOAuthV2(WB_AKEY, WB_SKEY);
    $oauth_url = $o->getAuthorizeURL(WB_CALLBACK_URL);

    header('location:' . $oauth_url . '&scope=all');
    exit();
}

/**
 * 
 * @return type
 */
function getUid() {
    include_once( __ROOT__ . 'OAuth/config.php' );
    $o = new SaeTOAuthV2(WB_AKEY, WB_SKEY);
    $keys = array();
    $keys['code'] = request('code');
    $keys['redirect_uri'] = WB_CALLBACK_URL;
    try {
        $token = $o->getAccessToken('code', $keys);
    } catch (OAuthException $e) {
        echo('微博授权失败');
        exit();
    }

    if (!$token) {
        echo('微博授权失败');
        exit();
    }

    C("weibo_uid", $token['uid'], time() + 3600 * 24 * 30);
//    setcookie("token", $token['access_token'], time() + 3600 * 24 * 30, "/");

    return $token['uid'];
}

/**
 * 
 * @param type $name
 * @param type $value
 * @param type $expires
 * @param type $path
 * @return type
 */
function C($name, $value = '', $expires = 0, $path = '/') {
    if (empty($value)) {
        return $_COOKIE[$name];
    } else {
        setcookie($name, $value, $expires, $path);
    }
}

/**
 * 
 * @param type $name
 * @return type
 */
function request($name) {
    if (!empty($_POST[$name])) {
        return $_POST[$name];
    }
    if (!empty($_GET[$name])) {
        return $_GET[$name];
    }
}

/**
 * 
 * @global mysql $db
 * @return \mysql
 */
function DB() {
    global $db;
    return $db;
}

/**
 * 
 * @param type $msg_
 * @param type $data_
 */
function success($msg_, $data_ = []) {
    _response(1, $msg_, $data_);
}

/**
 * 
 * @param type $code_
 * @param type $msg_
 */
function error($msg_, $code_ = 0) {
    _response($code_, $msg_);
}

/**
 * 
 * @param type $code_
 * @param type $msg_
 * @param type $data_
 */
function _response($msg_, $code_ = 0, $data_ = FALSE) {
    $back['code'] = $code_;
    $msg_ && $back['msg'] = $msg_;
    $data_ && $back['data'] = $data_;
    echo(json_encode($back, JSON_UNESCAPED_UNICODE));
    die();
}

function getJson($url) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $output = curl_exec($ch);
    curl_close($ch);
    return json_decode($output, true);
}

function getHttp($url) {
    $header = ['user-agent' => 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36',
        'accept-language' => 'zh-CN,zh;q=0.9',
        'accept-encoding' => 'gzip, deflate, br'];
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
    //curl_setopt($curl, CURLOPT_HEADER, 0);
    //curl_setopt($curl, CURLOPT_NOBODY, 0);
    //curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
    //curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($curl, CURLOPT_ENCODING, 'gzip');
    curl_setopt($curl, CURLOPT_HEADER, $header);
    $output = curl_exec($curl);
    curl_close($curl);
    return $output;
}
