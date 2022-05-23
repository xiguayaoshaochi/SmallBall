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

$list = DB()->find('tb_220501_laurier_user', '*', ' flag = 1 and id <> \'' .
        $user['id'] . '\' order by rand() limit 50');

$total = DB()->findOne('tb_220501_laurier_user', 'count(id)', 'flag = 1');

success('接口调用成功', ['self' => $user, 'list' => $list, 'total' => $total]);
