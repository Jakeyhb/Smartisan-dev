"use strict";
$(function () {
  $("img.star-pic").lazyload({
    effect: "fadeIn"
  })
});
var mySwiper = new Swiper(".swiper-container", {
  pagination: {
    el: ".swiper-pagination",
    clickable: !0
  },
  autoplay: {
    delay: 3e3
  },
  loop: !0
});
new Swiper(".swiper-container"),
  (mySwiper = document.querySelector(".swiper-container").swiper).slideNext();
var options1 = {
  url: "http://qsblogs.com/anta/products",
  data: {
    goods_id: "112015518,912015523,912025502,152011153R,96928142,95717751"
  },
  type: "post",
  dataType: "json"
}
  , def1 = $.ajax(options1);
def1.done(function (o) {
  var t = "";
  o.data.forEach(function (o) {
    t += '<li><a href="javascript:void(0)">\n                    <img class="lazy" data-original="'.concat(o.info.image, '" alt="">\n                    <h3>').concat(o.info.pro_title, "</h3>\n                    <p>¥").concat(o.info.price, "</p>\n                </a></li>")
  }),
    $(".new-products .products-list").append(t)
});
var options2 = {
  url: "http://qsblogs.com/anta/products",
  data: {
    goods_id: "112015518,112018087,112011619,122015558,912025565,912025521,95017643,95011704,95018705,152017112"
  },
  type: "post",
  dataType: "json"
}
  , def2 = $.ajax(options2);
def2.done(function (o) {
  var t = "";
  o.data.forEach(function (o) {
    t += '<li><a href="javascript:void(0)">\n                    <img class="lazy" data-original="'.concat(o.info.image, '" alt="">\n                    <h3>').concat(o.info.pro_title, "</h3>\n                    <p>¥").concat(o.info.price, "</p>\n                </a></li>")
  }),
    $(".popular-products .products-list").append(t),
    $(function () {
      $("img.lazy").lazyload({
        effect: "fadeIn"
      })
    })
}),
  $(".star-list li").on("mouseover", function () {
    $(this).find(".introduce").css("display", "block").stop(!0).animate({
      opacity: 1
    }, 600),
      $(this).find(".introduce img").stop(!0).animate({
        bottom: 0
      }, 600)
  }),
  $(".star-list li").on("mouseout", function () {
    $(this).find(".introduce").stop(!0).animate({
      opacity: 0
    }, 600, function () {
      $(this).css("display", "none")
    }),
      $(this).find(".introduce img").stop(!0).animate({
        bottom: "-5%"
      }, 600)
  }),
  $(".recommend-products a").on("mouseover", function () {
    $(this).css({
      backgroundColor: "rgba(0, 0, 0, 0)"
    })
  }),
  $(".recommend-products a").on("mouseout", function () {
    $(this).css({
      backgroundColor: "rgba(0, 0, 0, 0.4)"
    })
  }),
  $(".wechat").on("mouseover", function () {
    $(this).find(".wechat-qrcode").show()
  }),
  $(".wechat").on("mouseout", function () {
    $(this).find(".wechat-qrcode").hide()
  });
//# sourceMappingURL=index-50942caea2.js.map
