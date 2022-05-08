var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
var browser = {
  versions: function () {
    var u = navigator.userAgent, app = navigator.appVersion;
    return {         //移动终端浏览器版本信息
      trident: u.indexOf('Trident') > -1, //IE内核
      presto: u.indexOf('Presto') > -1, //opera内核
      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
      iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, //是否iPad
      webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
    };
  }(),
  language: (navigator.browserLanguage || navigator.language).toLowerCase()
}


if (/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)) {//判断是否safari

} else {

}



var num = 1;
var list = [];
var imgArr=[
  "images/index_bg.jpg", "images/last_bg.jpg", "images/0.jpg", "images/projector.png", "images/video2_poster.png",
  "images/index_logo.png", "images/index.jpg", "images/logo2.png", "images/envelope.png", "images/envelope_mask.png",
  "images/logo6.png", "images/logo3.png", "images/car/_0000_car6.jpg", "images/car/_0001_car5.jpg", "images/car/_0002_car4.jpg",
  "images/car/_0003_car3.jpg", "images/car/_0004_car2.jpg", "images/car/_0005_car1.jpg"
]
// for (let i = 0; i < imgArr.length; i++) {
//   const el = imgArr[i];
//   var img = new Image();
//   img.src = el;
//   img.onload = function(){
//     if (i == imgArr.length - 1) {
//       console.log('jizaiwancheng');
//     }
//   }
// }




function getQueryString(name) { 
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
    var r = window.location.search.substr(1).match(reg); 
    if (r != null) return unescape(r[2]); 
    return null; 
}




$(function(){
  // $(".pro_inside").animate({width:'100%'},1500,()=>{
  //   $(".loading").fadeOut(500);
  // });

  // var bgm = document.getElementById("bgm");
  // document.addEventListener("WeixinJSBridgeReady", function () {
  //   if (isiOS) {
  //     bgm.play();
  //   }
    
  // }, false);
  

  // $(".music").bind("click",function(){
  //   if($(this).hasClass('music_rotate')){
  //     $(this).removeClass('music_rotate');
  //     bgm.pause();
  //   }else{
  //     $(this).addClass('music_rotate');
  //     bgm.play();
  //   }
  // })

  var stageWidtha = document.documentElement.clientWidth;
  var stageScalea = stageWidtha / 640;
  $(".box").css({ scaleX: stageScalea, scaleY: stageScalea });
  $("body").css({ "opacity": 1 });
  $(".box").height($(window).height() / stageScalea);


  
  $(".phone_bottom").bind("click",function(){
    $(".index_bg .hand_cir").hide();
    $(".index").fadeOut(350);
  })

  var index = 1;
  var lock = false;
  $(".image_box").bind("click",function(){
    if(lock){
      return false
    }
    lock = true;
    if(index == 7){
      $(".page_con").fadeOut(350);
      return false
    }
    $(".page_image1").fadeOut(350);
    $(".tip").fadeOut(350);
    $(".page_con .hand_cir").hide();
    setTimeout(function(){
      $(".page_txt,.page_image2,.tip").fadeOut(350);
      $(".page_image1").fadeOut(350);
      setTimeout(function(){
        $(".page_con").removeClass("page" + index);
        index++;
        $(".page_con").attr("index",index);
        $(".page_con").addClass("page" + index);
        setTimeout(function(){
          $(".page_txt,.page_image1").fadeIn(350);
          setTimeout(function(){
            $(".page_con .hand_cir").fadeIn(350);
            $(".page_image2,.tip").fadeIn(350);
            lock = false;
          },350)
          $(".page_image1").show();
        },0)
      },350)
    },2000)
  })








  document.body.addEventListener('touchmove', function (e) {
    e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
  }, { passive: false });

  var agent = navigator.userAgent.toLowerCase();        //检测是否是ios
  var iLastTouch = null;                                //缓存上一次tap的时间
  if (agent.indexOf('iphone') >= 0 || agent.indexOf('ipad') >= 0)
  {
      document.body.addEventListener('touchend', function(event)
      {
          var iNow = new Date()
              .getTime();
          iLastTouch = iLastTouch || iNow + 1 /** 第一次时将iLastTouch设为当前时间+1 */ ;
          var delta = iNow - iLastTouch;
          if (delta < 500 && delta > 0)
          {
              event.preventDefault();
              return false;
          }
          iLastTouch = iNow;
      }, false);
  }

})