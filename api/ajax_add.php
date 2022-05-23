<?php

include_once ('../source/functions.php');

$uid = oauthByWeibo();

if (empty($uid)) {
    error('未微博授权');
}

$user = DB()->findOne('tb_220501_laurier_user', '*', 'uid = \'' . $uid . '\'');

if (!$user) {
    error('未授权登录');
}

$nickname = request('nickname');
$headimgurl = request('headimgurl');
$desc = request('desc');

if (empty($nickname)) {
    error('昵称不能为空');
}

if (empty($headimgurl)) {
    error('头像不能为空');
}

if (empty($desc)) {
    error('捏脸数据不能为空');
}

$user['nickname'] = $nickname;
$user['headimgurl'] = $headimgurl;
$user['desc'] = $desc;
$user['flag'] = 1;

DB()->update('tb_220501_laurier_user', $user, 'id=\'' . $user['id'] . '\'');

success('接口调用成功');
