/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$.ajax({
  url: "https://www.buick.com.cn/weixinjssign/getbuicksign.aspx",
    type: "GET",
    cache: true,
  data: { signurl: location.href},
  dataType: "json",
    success: function(back) {
      
      var mes = back;
      // console.log(back, mes.appId);
      
        wx.config({
            debug: false,
            appId: mes.appId,
            timestamp: mes.timestamp,
            nonceStr: mes.nonceStr,
            signature: mes.signature,
            jsApiList: [
                // 所有要调用的 API 都要加到这个列表中
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
//                'scanQRCode'
            ]
        });
    },
    error: function(char) {

    }
});



wx.ready(function() {
    // 在这里调用 API
    console.log("sss");
    wx.error(function(res) {
        //console.log(res)
    });
//    wx.hideOptionMenu();
    $.addWeiXinEvent(0);
});


$.addWeiXinEvent = function() {
  $.shareAppDesc = '特别的2022，特别别开生面，特别未来可期。';
  $.shareAppTitle = '致亲爱的别克人';
  $.timelineTitle = '致亲爱的别克人';

  $.shareImage = 'https://m.buick.com.cn/act/2022newyear/images/share.jpg';
  $.shareUrl = location.href;
	
	
	

  wx.onMenuShareAppMessage({
        title: $.shareAppTitle,
        desc: $.shareAppDesc,
        link: $.shareUrl,
        imgUrl: $.shareImage,
        success: function(res) {
            // _hmt.push(['_trackEvent', '分享朋友', 'click']);
        }
    });
    wx.onMenuShareTimeline({
        title: $.timelineTitle,
        link: $.shareUrl,
        imgUrl: $.shareImage,
        success: function(res) {
            // _hmt.push(['_trackEvent', '分享朋友圈', 'click']);
        }
    });
};