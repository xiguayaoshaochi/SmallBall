<?php
include_once('source/functions.php');

$uid = oauthByWeibo();

if (!empty($uid)) {
    $user = DB()->findOne('tb_220501_laurier_user', '*', 'uid = \'' . $uid . '\'');
    if (!$user) {
        $user['uid'] = $uid;
        $user['dateline'] = time();
        $user['flag'] = 0;
        DB()->insert('tb_220501_laurier_user', $user);
        $user['id'] = DB()->insert_id();
    }
} else {
    echo('微博授权失败');
}
?>
<html><head>
        <meta charset="utf-8" content="viewport-fit=cover">
        <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
        <title>乐而雅棉棉花园</title>
        <link rel="stylesheet" href="css/style.css?n=<?=rand(10000,99999)?>">
        <link rel="stylesheet" href="css/swiper.css">
        <link rel="stylesheet" href="css/animate.css">
        <script type="text/javascript">var flag = '<?= $user['flag'] ?>';</script>
        <script src="js/jweixin-1.2.0.js"></script>
        <script src="js/jquery-1.11.min.js" type="text/javascript"></script>
        <script src="js/jquery.transit.min.js"></script>
        <link  href="css/cropper.css" rel="stylesheet">
        <script src="js/cropper.js"></script>
        <!-- <script src="js/swiper.js"></script> -->
        <script src="js/iscroll.js"></script>
        <script type="text/javascript" src="js/jquery.transit.min.js"></script>
      <!--   <script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script> -->
        <!-- <script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script> -->

<!-- <script src="https://cdn.bootcdn.net/ajax/libs/vConsole/3.9.0/vconsole.min.js"></script>

        <script>
            // init vConsole;
            var vConsole = new VConsole();
        </script> -->
    </head>
    <body style="opacity: 0;">
    <!-- <div class="shuaxin" onclick='window.location.reload()' style='width:100px;height:100px;position: absolute;z-index:1000;'></div> -->
        <div class="box">
            <div class="loading pages" style="z-index: 100">
              <!-- <div class="pro">
                <div class="pro_inside" style="width: 0%;"></div>
              </div> -->
              <!-- <div class="loading_txt">Loading......</div> -->
              <div class="big_f"></div>
              <div class="loading_txt">
                  <span></span>
                  <span></span>
                  <span></span>
              </div>
            </div>
            <div class="music music_rotate" style="display: none;"></div>

            <!-- 首页 -->
            <div class="index pages" style="z-index: 10;display: block">
                <div class="index_bg">
                    <img class="index_img" src="./images/index_img.png" alt="">
                    <img class="index_person" src="./images/index_person.png" alt="">
                    <img class="logo" src="./images/index_logo.png" alt="">
                    <div class="start_btn scale_back2 close_btn"></div>
                </div>
            </div>

            <div class="pages page1 page_con" style="z-index: 9;display: block">
                <div class="rule_bg">
                    <div class="receive_btn close_btn"></div>
                </div>
                <div class="rule_btn"></div>
            </div>

            <div class="pages page2" style="z-index: 8;display: block;">
                <div class="water_bg">
                    <div class="font_flower"></div>
                    <img class="paizi" src="./images/paizi.png" alt="">
                    <div class="zhongzi" style="opacity: 1;"></div>
                    <div class="plant swing1">
                        <div class="one"></div>
                        <div class="two"></div>
                        <div class="three"></div>
                        <div class="four" style="opacity: 0;">
                            <div class="big_m"></div>
                            <div class="big_m1" style="display:none"></div>
                            <div class="expression_box expression1"></div>
                            <div class="handObject_box"></div>
                            <div class="headdress_box"></div>
                            <div class="choose_box choose1" chooseType="1" style="display: none;">
                                <div class="choose_unit_box">
                                    <div class="choose_btn"></div>
                                    <div class="choose_btn"></div>
                                    <div class="choose_btn"></div>
                                </div>
                                <div class="add_box">
                                    <div class="add_unit"></div>
                                    <div class="add_unit"></div>
                                    <div class="add_unit"></div>
                                    <div class="add_unit"></div>
                                    <div class="add_unit"></div>
                                    <div class="add_unit"></div>
                                </div>
                                <input class="name" id="name" type="text" />
                                <div class="photo_box">
                                    <img id="save" src="./images/photo.png" alt="" />
                                </div>
                                <div class="upload_btn">
                                    <input type="file" accept="image/jpg,image/png" id="file" />
                                </div>
                                <div class="com_btn" style='z-index: 111; background: none;'></div>
                            </div>
                        </div>
                    </div>
                    <div class="kettle_box" style="display: none;">
                        <div class="kettle_shadow"></div>
                        <div class="kettle">
                            <div class="sashui"></div>
                        </div>
                    </div>
                    <div class="water_btn scale_back2" style="display: none;"></div>
                    <div class="dress_btn" style="display: none;"></div>
                </div>
            </div> 
            <div class="loading_img">
                <img src="./images/choose2.png" alt="">
                <img src="./images/choose3.png" alt="">
            </div>

            <!-- 棉花展示页 -->
            <div class="pages page3" style="z-index: 7;">
                <div class="logo_tips"></div>
                <div class="lf_txt"></div>
                <div class="tips_img">
                    <div class="hand handAni"></div>
                </div>
                <div class="now_num">
                    <span id="totalNum">182721</span>
                </div>
                <div class="poster_btn"></div>
                <div class="show_bg_box" id="wrapper" >
                    <ul class='tran1'>
                        <li>
                            <div class="show_bg shanshuo">
                                <div class="sp_box">
                                    <div class="big_flower">
                                        <span class="id_box" style="width: 220px;margin-left: -110px;">宋祖儿lareina</span>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <!-- <div class="swiper mySwiper show_bg_box">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" style="width:1920px">
                            <div class="show_bg">
                                <div class="sp_box">
                                    <div class="big_flower">
                                        <span class="id_box" style="width: 220px;margin-left: -110px;">宋祖儿lareina</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> -->

                <div class="last pages" style="z-index: 666;display: none;">
                    <div class="con_txt">
                        <span id="selfNum">121377</span>
                    </div>
                    <div class="last_box">
                        <img id="s_Img" src="#" alt="">
                        <div class="last_photo_box">
                            <img src="./images/code.png" id="lastImg" alt="">
                        </div>
                        <div class="name_box">
                            <span>用户ID</span>
                            <span>西瓜少吃</span>
                        </div>
                        <img id="name_box" src="./images/name_box.png" alt="">
                        <div class="cloudFace">
                            <img id="cloudImg" src="#" alt="">
                        </div>
                        <div class="code_box">
                            <img id="code" src="./images/code.png" alt="">
                        </div>
                    </div>
                    <div class="share_btn"></div>
                    <div class="share_img"></div>
                </div>

                <div class="type_page pages" style="z-index: 666;display: none;">
                  <div class="type_box">
                    <input class="type_name" type="text" />
                    <input class="type_phone" type="tel" />
                    <textarea class="type_address" name="address" ></textarea>
                    <div class="submit_btn"></div>
                    <div class="rule_btn"></div>
                  </div>
                  <div class="success_txt" style="display: none;"></div>
                  <div class="share_img1"></div>
                </div>

                <div class="canvas_box pages" style="opacity: 1;z-index:100;pointer-events: none;opacity: 0;">
                    <canvas id="canvas" width="492" height="661"></canvas>
                </div>

                <div class="canvas_box1 pages" style="opacity: 1;z-index:101;opacity: 0;pointer-events: none;">
                    <canvas id="canvas1" width="348" height="266"></canvas>
                </div>
            </div>

            <div class="tip_page pages" style="display: none;z-index: 999;">
                <div class="tip_kuang">
                    <div class="tips_word"></div>
                </div>
            </div>



        </div>
        <div class="pages cropperpage" style="z-index: 15;display: none;">
            <div class="crop_box" style="pointer-events: auto;">
                <img id="image" src="./images/index_logo.png" alt="">
            </div>

            <div id="edit">确定</div>
            <div id="cancle">取消</div>
        </div>

        <div class="music" style="opacity: 0;"></div>


        <audio id="bgm" src="./images/bgm.mp3" style="opacity:0" preload="auto"  controls loop hidden="true"/></audio>
    <script type="text/javascript"  src="js/index.js?n=<?=rand(10000,99999)?>"></script>
    <!-- <script type="text/javascript" src="js/wx_share2.js"></script> -->
</body>
</html>