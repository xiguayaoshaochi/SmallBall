var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
var browser = {
  versions: function () {
    var u = navigator.userAgent,
      app = navigator.appVersion;
    return { //移动终端浏览器版本信息
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


if (/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)) { //判断是否safari

} else {

}



var num = 1;
var list = [];
var imgArr = [
  "images/index_bg.jpg"
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




$(function () {
  // $(".pro_inside").animate({width:'100%'},1500,()=>{
  //   $(".loading").fadeOut(500);
  // });

  // var bgm = document.getElementById("bgm");
  // document.addEventListener("WeixinJSBridgeReady", function () {
  //   if (isiOS) {
  //     bgm.play();
  //   }

  // }, false);


  // $(".music").on("click",function(){
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
  var stageHeight = $(window).height() / stageScalea;
  var screenHeight = document.documentElement.clientHeight;
  $(".box").css({
    scaleX: stageScalea,
    scaleY: stageScalea
  });
  $("body").css({
    "opacity": 1
  });
  $(".box").height(stageHeight);

  $(".close_btn").on("click", function () {
    $(this).parents(".pages").fadeOut(350);
    if ($(this).hasClass("receive_btn")) {
      setTimeout(() => {
        waterAni();
      }, 350);
    }
  })
// console.log(cropper, Cropper)
  // waterAni();

  function waterAni() {
    $(".zhongzi").css({
      "opacity": 1,
    });
    setTimeout(() => {
      $(".zhongzi").css({
        translate: [0, 0]
      });
      setTimeout(() => {
        $(".kettle_box,.water_btn").fadeIn(500);
      }, 700);
    }, 500);
  }

  var index = 0;
  $(".water_btn").on("click",()=>{
    if (index == 0) {
      kettle_momve(160,Grow1);
      function Grow1() {
        $(".zhongzi").css({
          opacity: 0,
          translate: [0, 20],
          scale: 0.7
        });
        setTimeout(() => {
          $(".plant>div").eq(index - 1).css({
            opacity: 1,
            scale: 1
          })
        }, 350);
      }
    } else if (index == 1) {
      kettle_momve(320, Grow2);
      function Grow2() {
        $(".plant>div").eq(index - 2).css({
          opacity: 0,
          scale: 1.2
        })
        setTimeout(() => {
          $(".plant>div").eq(index - 1).css({
            opacity: 1,
            scale: 1
          })
        }, 350);
      }
    } else if (index == 2) {
      kettle_momve(430, Grow3);

      function Grow3() {
        $(".plant>div").eq(index - 2).css({
          opacity: 0,
          scale: 1.2
        })
        setTimeout(() => {
          $(".plant>div").eq(index - 1).css({
            opacity: 1,
            scale: 1
          })
        }, 350);
      }
    } else if (index == 3) {
      kettle_momve(530, Grow4);

      function Grow4() {
        $(".plant>div").eq(index - 2).css({
          opacity: 0,
          scale: 1
        })
        setTimeout(() => {
          $(".plant>div").eq(index - 1).css({
            opacity: 1,
            scale: 1
          })
          $(".water_btn").fadeOut(350);
          $(".dress_btn").fadeIn(350);
        }, 350);
      }
    }
  })

  $(".dress_btn").on("click",()=>{
    $(".dress_btn,.kettle_box").hide();
    $(".plant").removeClass("swing1");
    $(".choose_box").fadeIn(350);
  })

  var kett_lock = false;
  function kettle_momve(distance,callback) {
    if (kett_lock) {
      return false;
    }
    $(".kettle_shadow").hide();
    kett_lock = true;
    $(".water_btn").removeClass("scale_back2");
    index++;
    $(".kettle").transition({
      translate: [0, -distance],
    }).transition({
      rotate: '-45deg',
      complete: function () {
        $(".sashui").transition({
          opacity: 1,
        }, 350).transition({
          translate: [-10, 10],
          rotate: '28deg',
          opacity: 0,
          complete: function () {
            setTimeout(() => {
              callback();
            }, 350);
            $(".kettle").transition({
              rotate: '0'
            }, 350).transition({
              translate: [0, 0],
              complete: ()=>{
                kett_lock = false;
                $(".water_btn").addClass("scale_back2");
                $(".kettle_shadow").fadeIn(350);
              }
            }, 350)
          }
        }, 250).transition({
          translate: [0,0],
          rotate: '28deg',
          opacity: 0,
        }, 250)
      }
    }, 500)
  }

  var inputEle = document.querySelector('#name')
  inputEle.addEventListener('input', WidthCheck);


// var arr = ['小丽', '小明', '小红', '家庭', '校长'];
function WidthCheck() {
  var str = this;
  var w = 0;
  var tempCount = 0;
  //length 获取字数数，不区分汉字和英文 
  for (var i = 0; i < str.value.length; i++) {
    //charCodeAt()获取字符串中某一个字符的编码 
    var c = str.value.charCodeAt(i);
    //单字节加1 
    if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
      w++;
    } else {
      w += 2;
    }
    if (w > 8) {
      console.log(str.value);
      // str.value = str.value.replace(new RegExp(arr.value.join('|'), 'img'), '*')
      str.value = str.value.substr(0, i);
      break;
    }
  }
}

$("#file").on("change", function () {
  var file = this.files[0]
  var fl = new FileReader()
  fl.readAsDataURL(file)
  fl.onload = function () {
    $("#image").attr("src",fl.result);
    croppImage()
  }
})

function getRoundedCanvas(sourceCanvas) {
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  var width = sourceCanvas.width;
  var height = sourceCanvas.height;

  canvas.width = width;
  canvas.height = height;
  context.imageSmoothingEnabled = true;
  context.drawImage(sourceCanvas, 0, 0, width, height);
  context.globalCompositeOperation = 'destination-in';
  context.beginPath();
  context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
  context.fill();
  return canvas;
}

var croppable = false;
var cropper;
function croppImage() {
  $(".cropperpage").show();
  var image = document.getElementById('image');
  cropper = new Cropper(image, {
    dragMode: 'move',
    aspectRatio: 1,
    viewMode: 1,
    autoCropArea: 0.8,
    minContainerWidth: stageWidtha,
    minContainerHeight: screenHeight,
    restore: false,
    guides: false,
    center: false,
    highlight: false,
    cropBoxMovable: false,
    cropBoxResizable: false,
    toggleDragModeOnDblclick: false,
    ready: function () {
      croppable = true;
    },
  });
}

//确定按钮
$('#edit').on("click", function () {
  $(".cropperpage").hide();
  var croppedCanvas;
  var roundedCanvas;
  var roundedImage;
  console.log(croppable)
  if (!croppable) {
    return;
  }
  // // Crop
  croppedCanvas = cropper.getCroppedCanvas();
  // Round
  roundedCanvas = getRoundedCanvas(croppedCanvas);
  // Show
  roundedImage = document.createElement('img');
  roundedImage.src = roundedCanvas.toDataURL()
  $("#save").attr("src", roundedImage.src);
  $("#lastImg").attr("src", roundedImage.src);
  cropper.destroy();
});





$("#cancle").on("click",()=>{
  $(".cropperpage").hide();
  cropper.destroy();
})

var savearr = {
  "expression": -1,
  "headdress": -1,
  "handObject": -1
}

$(".choose_unit_box>div").on("click",function(){
  var index_ = $(this).index();
  $(".choose_box").attr("chooseType", index_ + 1);
  $(".choose_box").removeClass().addClass('choose_box choose' + (index_ + 1))
})

$(".add_box>div").on("click",function(){
  var index_ = $(this).index();
  var type = $(".choose_box").attr("chooseType") * 1;
  var typeClass;
  switch (type) {
    case 1:
      typeClass = 'expression'
    break;
    case 2:
      typeClass = 'headdress'
    break;
    case 3:
      typeClass = 'handObject'
    break;
  }
  if (type == 1) {
    $(".big_m1").hide();
  }
  console.log(type, typeClass + '_box')
  var $class = '.' + typeClass + '_box';
  $($class).removeClass().addClass(typeClass + '_box').addClass(typeClass + index_);
  savearr[typeClass] = index_;
  console.log(savearr)
})

$(".com_btn").on("click",()=>{
  $(".page2").fadeOut(350);
  GeneratePoster();
  window.myScroll = new IScroll('#wrapper', {
    bounce: false,
    scrollX: true,
    scrollY: false,
    mouseWheel: true,
    startX:-640,
  });

  $(".show_bg").on("touchmove",()=>{
    $(".tips_img,.lf_txt").fadeOut(200);
  })
  
})

// QR图片颜色aa7a4e


function GeneratePoster() {
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');

  var image = new Image();
  image.src = './images/save_img.png';
  image.onload = function () {
    context.drawImage(image, 0, 0, 492, 661);
    context.drawImage(document.getElementById("save"), 35, 35, 100, 100);
    context.drawImage(document.getElementById("code"), 376, 510, 78, 78);
    context.drawImage(document.getElementById("name_box"), 21, 143, 130, 58);
    context.textAlign = 'center';
    context.font = '20px 微软雅黑';
    context.fillText('用户ID', 85, 170);
    context.fillText('西瓜少吃', 85, 192);

    
    // context.restore();
    var image1 = new Image();
    image1.src = './images/expression/cc_1.png';
    console.log(image)
    image1.onload = function () {
      context.save();
      context.rotate(Math.PI / 6);
      context.drawImage(image1, 221, 143, 93, 45);
    }
    
  }
  
}

GeneratePoster();





$(".share_img").on("click", () => {
  setTimeout(() => {
    // window.location.href = 'https://www.baidu.com/';
  }, 200);
})




  // document.body.addEventListener('touchmove', function (e) {
  //   e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
  // }, {
  //   passive: false
  // });

  var agent = navigator.userAgent.toLowerCase(); //检测是否是ios
  var iLastTouch = null; //缓存上一次tap的时间
  if (agent.indexOf('iphone') >= 0 || agent.indexOf('ipad') >= 0) {
    document.body.addEventListener('touchend', function (event) {
      var iNow = new Date()
        .getTime();
      iLastTouch = iLastTouch || iNow + 1 /** 第一次时将iLastTouch设为当前时间+1 */ ;
      var delta = iNow - iLastTouch;
      if (delta < 500 && delta > 0) {
        event.preventDefault();
        return false;
      }
      iLastTouch = iNow;
    }, false);
  }

  // let Orientation = null
  // EXIF.getData(image, function () {
  // Orientation = EXIF.getTag(this, 'Orientation')
  // })
  // switch (Orientation) {
  // case 1: // 不需要选择，正常
  //   break
  // case 6: // 需要顺时针（向左）90度旋转
  //   break
  // case 8: // 需要逆时针（向右）90度旋转   
  //   break
  // case 3: // 需要180度旋转
  //   break
  // }

})