<?php

include_once ('../source/functions.php');

$uid = oauthByWeibo();

if (empty($uid)) {
    error('未微博授权');
}

if (!DB()->findOne('tb_220501_laurier_user', '*', 'uid = \'' . $uid . '\'')) {
    error('未授权登录');
}

$data = request('data');
$data = base64_decode($data);
$dir = 'uploads/' . date('Ymd', time());

if (!file_exists(__ROOT__ . $dir)) {
    mkdir(__ROOT__ . $dir);
}

$fname = md5(time() . rand(10000, 99999)) . '.jpg';

$fname = $dir . '/' . $fname;

file_put_contents(__ROOT__ . $fname, $data);

success('接口调用成功', ['path' => $fname]);
