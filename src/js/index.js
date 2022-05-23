// import Mint from 'mint-filter'
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

function ReadFile(data) {
  // console.log(data)
  // var data = "gay同志\r\n大家看得见\r\n";
  window.txtCon = data.replace(/[\r\n]/g, "|").replace(/[\*\?]/g, "").replace(/\|$/, "");
  // window.txtCon = data.replace(/[\r\n]/g, "|").replace(/[\*\?]/g, "").replace(/\|$/, "").split('|');
  // txtCon = new RegExp(txtCon, 'gi');
  // console.log(txtCon)
  // console.log(txtCon.test("西瓜宝22洁11"))
}
var xhr = new XMLHttpRequest();
xhr.onload = function () {
  ReadFile(xhr.responseText);
};
try {
  if (window.location.href.indexOf('808') > -1) {
    xhr.open("get", "./sensitive_words_lines.txt", true);
  }else{
    xhr.open("get", "js/sensitive_words_lines.txt", true);
  }
  
  xhr.send();
} catch (ex) {
  console.log("catch")
  ReadFile(ex.message);
}




if (/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)) { //判断是否safari

} else {

}

var txt_gen;

var num = 1;
var list = [];
var imgArr = [
  "images/index_bg.jpg", "images/big_bg.jpg"
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

var a = 1;
var c = setInterval(() => {
  if (a % 4 == 0) {
    $(".loading_txt>span").hide();
  }else{
    $(".loading_txt>span").eq((a % 4) - 1).show();
  }
  a++;
  setTimeout(() => {
    clearInterval(c);
    $(".loading").fadeOut(350)
  }, 1500);
}, 500);



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

  var bgm = document.getElementById("bgm");
  document.addEventListener("WeixinJSBridgeReady", function () {
    bgm.play();
  }, false);

  bgm.addEventListener('playing',()=>{
    $(".music").css('opacity',"1");
    $(".music").addClass('music_rotate');
  })

    


  $(".music").on("click",function(){
    if($(this).hasClass('music_rotate')){
      $(this).removeClass('music_rotate');
      bgm.pause();
    }else{
      $(this).addClass('music_rotate');
      bgm.play();
    }
  })

  var stageWidtha = document.documentElement.clientWidth;
  var stageScalea = stageWidtha / 640;
  var stageHeight = $(window).height() / stageScalea;
  var screenHeight = document.documentElement.clientHeight;
  $(".box").css({
    scaleX: stageScalea,
    scaleY: stageScalea
  });
  
  $(".box").height(stageHeight);
  setTimeout(() => {
    $("body").css({
      "opacity": 1
    });
  }, 200);
  

  $(".close_btn").on("click", function () {
    if ($(this).hasClass('start_btn') && bgm.paused) {
      bgm.play();
    }
    $(this).parents(".pages").fadeOut(350);
    if ($(this).hasClass("receive_btn")) {
      setTimeout(() => {
        waterAni();
      }, 350);
    }
  })

  $(".poster_btn").on("click",()=>{
    if (bgm.paused) {
      bgm.play();
    }
    $(".tips_img,.now_num").hide();
    $(".last").fadeIn(350);
  })

  function waterAni() {
    $(".zhongzi").css({
      "opacity": 1,
    });
    setTimeout(() => {
      $(".zhongzi").css({
        translate: [0, 20]
      });
      setTimeout(() => {
        $(".zhongzi").css({
          opacity: 0,
          scale: 0.7
        });
        $(".kettle_box,.water_btn").fadeIn(500);
      }, 500);
    }, 500);
  }

  var index = 0;
  $(".water_btn").on("click",()=>{
    if (index == 0) {
      kettle_momve(160,Grow1);
      function Grow1() {
        // $(".zhongzi").css({
        //   opacity: 0,
        //   translate: [0, 20],
        //   scale: 0.7
        // });
        setTimeout(() => {
          $(".plant>div").eq(index - 1).css({
            opacity: 1,
            scale: 1
          })
        }, 0);
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
    getData(flag, 'middle')
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
  inputEle.addEventListener('change', WidthCheck);

  // window.swiper = new Swiper(".mySwiper", {
  //   direction: "horizontal",
  //   slidesPerView: "auto",
  //   freeMode: true,
  //   mousewheel: true,
  //   resistanceRatio: 0,
  //   on: {
  //     init: function (swiper) {
  //       setTimeout(() => {
  //         this.setTranslate(-640);
  //       }, 200);
  //     },
  //     touchStart: function (swiper, event) {
  //       $(".tips_img,.lf_txt").fadeOut(200);
  //     },
  //   },
  // });



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
      // console.log(str.value);
      // str.value = str.value.replace(new RegExp(arr.value.join('|'), 'img'), '*')
      str.value = str.value.substr(0, i);
      break;
    }
  }
}
window.imgFile = ''
$("#file").on("change", function () {
  imgFile = this.files[0];
  var fl = new FileReader()
  fl.readAsDataURL(imgFile)
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
window.base64Img ='';
$('#edit').on("click", function () {
  $(".cropperpage").hide();
  var croppedCanvas;
  var roundedCanvas;
  var roundedImage;
  // console.log(croppable)
  if (!croppable) {
    return;
  }
  // // Crop
  croppedCanvas = cropper.getCroppedCanvas();
  // Round
  roundedCanvas = getRoundedCanvas(croppedCanvas);
  // Show
  roundedImage = document.createElement('img');
  roundedImage.src = roundedCanvas.toDataURL('image/jpg',1)
  base64Img = roundedImage.src;
  var file = document.getElementById('file');
  file.value = '';
  $("#save").attr("src", base64Img);
  $("#lastImg").attr("src", base64Img);

  cropper.destroy();
});





$("#cancle").on("click",()=>{
  $(".cropperpage").hide();
  cropper.destroy();
})

window.savearr = {
  "expression": 1,
  "headdress": -1,
  "handObject": -1
}
var siter = [16,46,48,49];
var selfSite = localStorage.getItem('selfSite');

//第一次进入或者清除缓存之后重新随机4个位置当中的一个，反之直接读取缓存的位置数据
if (!selfSite) {
  var r = Math.round(Math.random()*3);
  selfSite = siter[r];
  localStorage.setItem('selfSite', siter[r]);
}

console.log(selfSite, 'selfSite')
// 16 46 48 49

// var flag = 1;
function getData(flag,str) {
  if (flag == 0 && str == 'start') {
    return false
  }
 
  $.ajax({
    url: "js/cottonArr.json", //json文件位置
    type: "GET", //请求方式为get
    dataType: "json", //返回数据格式为json
    success: function (dataarr) { //请求成功完成后要执行的方法 
      $.ajax({
        url: "https://h5sites.com/laurier/api/ajax_getRandom.php", //json文件位置
        type: "GET", //请求方式为get
        dataType: "JSON", //返回数据格式为json
        success: function (datastr) { //请求成功完成后要执行的方法 
          // $.addWeiXinEvent();
          console.log(datastr.data.list,'listdata');
          window.dList = datastr.data.list;
          window.totalNum = datastr.data.list.length + 1 + 50;
          window.selfNum = datastr.data.self.id;
          window.selfData = datastr.data.self;
          console.log(selfData, 'selfData1')
          if (selfData.nickname) {
            txt_gen = selfData.nickname;
            savearr = JSON.parse(selfData.desc)
            $("#save").attr("src", selfData.headimgurl);
            $("#lastImg").attr("src", selfData.headimgurl);
          }
          
          if (dList) {
            dList.forEach((el, index) => {
              // console.log(el)
              dataarr[index].name = el.nickname;
              dataarr[index].cottonid = el.id;
              dataarr[index].expression = JSON.parse(el.desc).expression;
              dataarr[index].headdress = JSON.parse(el.desc).headdress;
              dataarr[index].handObject = JSON.parse(el.desc).handObject;
            })
          }
          // console.log(dataarr)
          $.ajax({
            url: "js/site.json", //json文件位置
            type: "GET", //请求方式为get
            dataType: "json", //返回数据格式为json
            success: function (data) { //请求成功完成后要执行的方法 
              // $.addWeiXinEvent();
              dataarr.forEach((el, index) => {
                var ry = '0deg';
                var random = Math.round(Math.random() * 1);
                if (random == 0) {
                  ry = '180deg';
                }
                var leftNum = data[index].left - (380 * (1 - (data[index].width / 380)) / 2);
                var TopNum = data[index].top - (573 * (1 - (data[index].width / 380)) / 2);
                var styleCss = '-webkit-transform: scale(' + (data[index].width / 380) / 1 + ');' +
                  'transform: scale(' + (data[index].width / 380) / 1 + ');' +
                  'left:' + leftNum + 'px;' +
                  'top:' + TopNum + 'px;' +
                  'z-index:' + data[index]['z-index'] + ';'
                var divStr =
                  '<div class="plant" style="' + styleCss + '">' +
                  '<span class="id_box">' + el['name'] + '</span>' +
                  '<div class="four" style="transform:rotateY(' + ry + ')">' +
                  '<div class="big_m"></div>' +
                  '<div class="expression_box expression' + el['expression'] + ' "></div>' +
                  '<div class="handObject_box handObject' + el['handObject'] + '"></div>' +
                  '<div class="headdress_box headdress' + el['headdress'] + '"></div>' +
                  '</div>' +
                  '</div>';
                $(".sp_box").append(divStr);
              })

              if (str == 'start') {
                $(".index,.page1,.page2").hide();
                $("#totalNum").text(totalNum);
                $("#selfNum").text(selfNum);
                GeneratePoster(savearr);
                // selfSite
                $.each($(".sp_box .plant"), function () {
                  // console.log($(this))
                  if ($(this).css('zIndex') == selfSite) {
                    console.log($(this).css('zIndex'))
                    var i1 = savearr.expression;
                    var i2 = savearr.headdress;
                    var i3 = savearr.handObject;
                    $(this).find('.expression_box').removeClass().addClass('expression_box expression' + i1);
                    $(this).find('.headdress_box').removeClass().addClass('headdress_box headdress' + i2);
                    $(this).find('.handObject_box').removeClass().addClass('handObject_box handObject' + i3);
                    $(this).find('.id_box').text(selfData.nickname);
                  }
                })
              }
            }
          })
        },
        error: function (err) {
          console.log(err)
        }
      })
    }
  })
}

getData(flag, 'start')






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
  $(".water_bg").find($class).removeClass().addClass(typeClass + '_box').addClass(typeClass + index_);
  savearr[typeClass] = index_;
  console.log(savearr)
})

var  lockcom = false;
$(".com_btn").on("click",()=>{
  console.log("com触发")
  
  if (lockcom) {
    return false;
  }

  lockcom = true;
  if ($("#name").val() == ""){
    showTip("请输入昵称!")
    lockcom = false;
    return false;
  }
  // const mint = new Mint([txtCon]);
  // var testBoolean = mint.validator($("#name").val());
  
  txtCon = new RegExp(txtCon, 'gi');
  // console.log(,'有没有敏感词');
  if (txtCon.test($("#name").val())) {
    showTip("昵称中包含敏感字符!")
    lockcom = false;
    return false;
  }
  // console.log(testBoolean)
  if ($("#save").attr("src") == "./images/photo.png") {
    showTip("请上传头像!")
    lockcom = false;
    return false;
  }
  txt_gen = $("#name").val();
  console.log("com触发2")
  $.ajax({
    url: "https://h5sites.com/laurier/api/ajax_upload.php", //json文件位置
    type: "POST", //请求方式为get
    data: {
      data: base64Img.slice(22)
    },
    dataType: "JSON", //返回数据格式为json
    success: function (data) { //请求成功完成后要执行的方法 
      // $.addWeiXinEvent();
      window.data11 = data
      console.log(data,data.path)
        $.ajax({
          url: "https://h5sites.com/laurier/api/ajax_add.php", //json文件位置
          type: "POST", //请求方式为get
          data: {
            "nickname": txt_gen, "desc": JSON.stringify(savearr), "headimgurl": data.data.path,
          },
          dataType: "JSON", //返回数据格式为json
          success: function (datastr) { //请求成功完成后要执行的方法 
            // $.addWeiXinEvent();
            console.log(datastr)
            lockcom = false;
          },
          error: function(err){
            console.log(err)
          }
        })
    }
  })
  $("#totalNum").text(totalNum);
  $("#selfNum").text(selfNum);
  $(".page2").fadeOut(350);
  GeneratePoster(savearr);
  // selfSite
  $.each($(".sp_box .plant"),function () {
    // console.log($(this))
    if ($(this).css('zIndex') == selfSite) {
      console.log($(this).css('zIndex'))
       var i1 = savearr.expression;
       var i2 = savearr.headdress;
       var i3 = savearr.handObject;
      $(this).find('.expression_box').removeClass().addClass('expression_box expression' + i1);
      $(this).find('.headdress_box').removeClass().addClass('headdress_box headdress' + i2);
      $(this).find('.handObject_box').removeClass().addClass('handObject_box handObject' + i3);
      $(this).find('.id_box').text(txt_gen);
    }
  })
  // window.myScroll = new IScroll('#wrapper', {
  //   bounce: false,
  //   scrollX: true,
  //   scrollY: false,
  //   mouseWheel: true,
  //   startX:-640,
  // });
  
})

window.myScroll = new IScroll('#wrapper', {
  bounce: false,
  scrollX: true,
  scrollY: false,
  mouseWheel: true,
  useTransform: false,
  startX: -640,
});

var showlock = false;
myScroll.on('beforeScrollStart', () => {
  if (bgm.paused) {
    bgm.play();
  }
  if (showlock) {
    return false;
  }
  showlock = true;
  $(".tips_img,.lf_txt").fadeOut(200);
})




var submit = false;
$(".submit_btn").on("click", function () {
  if (submit) {
    return false;
  }
  submit = true;
  if ($(".type_name").val() == '') {
    showTip('请填写您的姓名！');
    submit = false;
    return false;
  }
  if ($(".type_phone").val() == '') {
    showTip('请填写您的电话！');
    submit = false;
    return false;
  }
  if ($(".type_address").val() == '') {
    showTip('请填写您的地址！');
    submit = false;
    return false;
  }

  $.ajax({
    url: "https://h5sites.com/laurier/api/ajax_update.php", //json文件位置
    type: "GET", //请求方式为get
    dataType: "JSON", //返回数据格式为json
    data: {
      "name": $(".type_name").val(),
      "mobile": $(".type_phone").val(),
      "address": $(".type_address").val(),
    },
    success: function (datastr) { //请求成功完成后要执行的方法 
      console.log(datastr);
      if (datastr.code == 1) {
        $(".success_txt").show();
        $(".type_box").hide();
      }
      setTimeout(() => {
        // window.location.href = 'https://www.baidu.com/';
      }, 200);
    },
    error: function (err) {
      submit = false;
      console.log(err)
    }
  })
})



// QR图片颜色aa7a4e

$(".tip_kuang").on("click",function(){
  $(".tip_page").fadeOut(350);
})

function showTip(txt) {
  $(".tip_page").fadeIn(350);
  $(".tips_word").text(txt);
  setTimeout(() => {
    $(".tip_page").fadeOut(350);
  }, 3000);
}


function GeneratePoster(savearr) {
  var cloudFace;
  var canvas1 = document.getElementById('canvas1');
  var ctx = canvas1.getContext('2d');

  
  if (selfData.nickname) {
    $.ajax({
      url: "https://h5sites.com/laurier/api/ajax_getRandom.php", //json文件位置
      type: "GET", //请求方式为get
      dataType: "JSON", //返回数据格式为json
      success: function (datastr) { //请求成功完成后要执行的方法 
        window.selfData = datastr.data.self;
        console.log(selfData, 'selfData2')
        if (selfData.nickname) {
          txt_gen = selfData.nickname;
          $("#save").attr("src", selfData.headimgurl);
          $("#lastImg").attr("src", selfData.headimgurl);
          savearr = JSON.parse(selfData.desc)
        }
        saveBack();
      },
      error: function (err) {
        console.log(err)
      }
    })
  } else {
    saveBack();
  }

  function saveBack() {
    $(".name_box span").eq(1).text(txt_gen);
    var i1 = savearr.expression;
    var i2 = savearr.headdress;
    var i3 = savearr.handObject;
    var imgSrc = './images/new/';
    if (i1 == -1) {
      i1--;
    }
    if (i2 == -1) {
      i2--;
    }
    if (i3 == -1) {
      i3--;
    }

    var image0 = new Image();
    image0.src = './images/new/handObject/big_m.png';
    image0.onload = function () {
      ctx.drawImage(image0, 0, 0, 348, 266);
      var image1 = new Image();
      image1.src = imgSrc + 'expression/cc_' + (i1 + 1) + '.png';
      image1.onload = function () {
        ctx.drawImage(image1, 0, 0, 348, 266);
        var image2 = new Image();
        image2.src = imgSrc + 'headdress/cc_' + (i2 + 1) + '.png';
        image2.onload = function () {
          ctx.drawImage(image2, 0, 0, 348, 266);
          var image3 = new Image();
          image3.src = imgSrc + 'handObject/cc_' + (i3 + 1) + '.png';
          image3.onload = function () {
            ctx.drawImage(image3, 0, 0, 348, 266);
            cloudFace = canvas1.toDataURL();
            var canvas = document.getElementById('canvas');
            var context = canvas.getContext('2d');
            var image = new Image();
            image.src = './images/save_img2.png';
            image.onload = function () {
              context.drawImage(image, 0, 0, 492, 661);
              context.drawImage(document.getElementById("save"), 35, 35, 100, 100);
              context.drawImage(document.getElementById("code"), 376, 510, 78, 78);
              context.drawImage(document.getElementById("name_box"), 21, 143, 130, 58);
              context.textAlign = 'center';
              context.font = '20px 微软雅黑';
              context.fillText('用户ID', 85, 170);
              context.fillText(txt_gen, 85, 192);
              var image4 = new Image();
              image4.src = cloudFace;
              $("#cloudImg").attr("src", cloudFace);
              image4.onload = function () {
                context.translate(200, 20)
                context.rotate(Math.PI / 6)
                context.drawImage(image4, 15, -45, 348 * 0.55, 266 * 0.55);
                $("#s_Img").attr("src", canvas.toDataURL());
              }
            }
          }
        }
      }
    }
  }


  
}







$(".share_img").on("click", () => {
  $(".last").hide();
  $(".type_page").show();
  if (flag == '2') {
    $(".type_box").hide();
    $(".success_txt").show();
  } else if (flag == '1') {

  }
})

$(".share_img1").on("click", () => {
  setTimeout(() => {
    // window.location.href = 'https://www.baidu.com/';
  }, 200);
})






  document.body.addEventListener('touchmove', function (e) {
    e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
  }, {
    passive: false
  });

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