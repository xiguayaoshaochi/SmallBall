DROP TABLE IF EXISTS `tb_220501_laurier_user`;
CREATE TABLE `tb_220501_laurier_user`(
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `uid` varchar(16) NOT NULL COMMENT '微博UID',
  `nickname` VARCHAR(50) COLLATE utf8mb4_unicode_ci  DEFAULT NULL COMMENT '昵称',
  `headimgurl` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '头像',
  `desc` text  COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '棉花详细内容',
  `flag` tinyint(1) UNSIGNED DEFAULT 0 COMMENT '是否上传捏脸数据',
  `dateline` INT(10) UNSIGNED DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uid` (`uid`),
  KEY `flag` (`flag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='乐而雅捏脸活动';