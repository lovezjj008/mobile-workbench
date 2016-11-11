// data format:
// el:"#uappmanager",
//  data:[{
//  "label" : "询报价",
//  "img" : "img/xbj.png",
//  "url" : "http://uapma.yonyou.com:8443/weixin/summerShow_web/index.html"
//  },
//  {
//    "label" : "招投标",
//    "img" : "img/ztb.png",
//    "url" : "http://uapma.yonyou.com:8443/weixin/summerShow_web/index.html"
//  },
//  {
//    "label" : "超市",
//    "img" : "img/cs.png",
//    "url" : "http://uapma.yonyou.com:8443/weixin/summerShow_web/index.html"
//  },
//  {
//    "label" : "在线竞价",
//    "img" : "img/jj.png",
//    "url" : "http://uapma.yonyou.com:8443/weixin/summerShow_web/index.html"
//  },
//  {
//    "label" : "供应商准入",
//    "img" : "img/zr.png",
//    "url" : "http://uapma.yonyou.com:8443/weixin/summerShow_web/index.html"
//  },
//  {
//    "label" : "收获",
//    "img" : "img/sh.png",
//    "url" : "http://uapma.yonyou.com:8443/weixin/summerShow_web/index.html"
//  },
//  {
//    "label" : "对账",
//    "img" : "img/dz.png",
//    "url" : "http://uapma.yonyou.com:8443/weixin/summerShow_web/index.html"
//  }],
//  colum : 4

let $ = window.$ || window.jQuery

function APPManager(id,options){
  this.id = id;
  this.options = options = ( options || {} );
  this.arr = options.data || this.arr;
  this.colum = options.colum || 4;
  this.moreType = false;
  this.scroller = null;
  this.height = {};
  this.init();
}
APPManager.prototype = {
  init : function(){
    this.create();
    this.setCss();
  },
  create : function(){
    var sortableTxtL = "<ul class='clearfix' id='um-sortable'>";
    var more = "<div class='um-more'><div style='height:40px'><img src='static/img/more.png' width=40 class='mt10'></div><div class='f12 mt5'>更多应用</div></div>";
    var sortableTxtR = "</ul>";
    var lis = "";
    var data = this.arr;
    for (var i = 0; i < data.length; i++){
      lis += "<li class='um-small'><a class='um-black' data-url = '"+data[i].url+"'><div class='um-delete'></div><img src='"+data[i].img+"' width=40 /><div class='f12 mt5'>"+data[i].label+"</div></a></li>"
    }
    var sortableTemp = sortableTxtL + lis + more + sortableTxtR;
    $(this.id).append(sortableTemp);

    this.runn();
    this.close();
    this.remove();
    this.openApp();
  },
  runn : function(){
    var el = document.getElementById("um-sortable");
    Sortable.create(el,{handle:".um-black"});
  },
  close : function(){
    $(document).on("click",function(){
      $(".um-small").removeClass("um-dragli");
    });
  },
  remove : function(){
    $(".um-delete").on("touchstart",function(){

      $(this).parents(".um-small").remove();
      return false;
    });
  },
  setCss : function(){
    var w = $(this.id).width() / this.colum;
    $(".um-small").css("width",w);
  },
  openApp : function(){
    $(".um-more").on("click",function(){
      UM.page.changePage({
        target: "#application",
        isReverse: 0,
        transition: "um"
      });
    });
    $('#asdf').onePageNav();
    //this.provinceLoaded();
    //this.scroll();
  },
  nav : function(){

  },
  provinceLoaded : function (){
    var _this = this;
    this.Scroller = new iScroll("applist",{
      hScroll:false,
      vScroll:true,
      vScrollbar:false,
      bounce:true,
      momentum:true,
      onScrollMove : function(){
        //console.log(_this.height["b"])
        if( -this.y >= _this.height["b"]){
          $("#b").addClass("active")
        }
      }
    });
  },
  scroll: function(){
    var _this = this;
    this.getHeight();
    $("#appclassify").on("click","li",function(){
      if($(this).hasClass("active")){
        return false;
      }
      var dataId = $(this).attr("data-id");
      $(this).addClass("active").siblings().removeClass("active");
      var height = -_this.height[dataId];
      _this.Scroller.scrollTo(0,height,200);

    })
  }

}

//$.fn.vvv = function(options) {
//  return this.each(function() {
//    new APPManager(this,options);
//  });
//};
export default APPManager
