var oftenUse = {};

oftenUse.getClass = function(tagName, className) {  //第一个参数 表示是className是所属那个dom标签下,这样为了提高检索效率
            //如果是火狐择调用火狐的getElementsByClassName 内置函数
            if (document.getElementsByClassName) {
                return document.getElementsByClassName(className)
            }
            else {
                var nodes = document.getElementsByTagName(tagName),
                ret = []
                for (i = 0; i < nodes.length; i++) {
                    if (hasClass(nodes[i], className)) { ret.push(nodes[i]) }
                }
                return ret;
            }
        }
        
oftenUse.hasClass = function(node, className) {
    var names = node.className.split(/\s+/) //这个正则表达式是因为class可以有多个,判断是否包含
    for (i = 0; i < names.length; i++) {
        if (names[i] == className) return true;
    }
    return false;
}

oftenUse.changeHTML5URL = function (title,url) {
    var state = { //这里可以是你想给浏览器的一个State对象，为后面的StateEvent做准备。
    title : title,
    url : url};
    if (typeof(Worker) !== "undefined") {
      history.replaceState(state, title, url);
    };
}

oftenUse.addStory = function (response) {
    var $container = $('#'+maincontain_cf.id);
    var $boxes = $( boxMaker.makeBoxes(response) );

    $container.append( $boxes );
}

oftenUse.clean_psg = function () {
    var $container = $('#'+maincontain_cf.id);
    $container.innerHTML = '';
}


oftenUse.feedConfirm = function(my) {
    var feedlinelist = $("li.eachFeed");
    var list_len = feedlinelist.length;

    for(var i=0;i<list_len;++i){
      feedlinelist[i].style.backgroundColor = '#009ACD';
    }
    my.style.backgroundColor = 'brown';

    window.selectFeedList = my.getAttribute('line');
    window.readstate = "selectfeed";
    window.begin = 0;
    ajaxcall.GetIntroducesFromFeedList();
    window.begin += window.count;
  }

oftenUse.getScroll = function()    
{       
  var t, l, w, h;  
              
  if (document.documentElement && 
  document.documentElement.scrollTop)   
  {           
  t = document.documentElement.scrollTop;           
  l = document.documentElement.scrollLeft;           
  w = document.documentElement.scrollWidth;           
  h = document.documentElement.scrollHeight;       
  } else if (document.body)   
  {           
  t = document.body.scrollTop;           
  l = document.body.scrollLeft;           
  w = document.body.scrollWidth;          
  h = document.body.scrollHeight;       
  }       
  return { t: t, l: l, w: w, h: h };   
}

oftenUse.getstyle = function(sname) { 
for (var i=0;i<document.styleSheets.length;i++) { 
var rules; 
if (document.styleSheets[i].cssRules) { 
rules = document.styleSheets[i].cssRules; 
} else { 
rules = document.styleSheets[i].rules; 
} 
for (var j=0;j<rules.length;j++) { 
if (rules[j].selectorText == sname) { 
//selectorText 属性的作用是对一个选择的地址进行替换.意思应该是获取RULES[J]的CLASSNAME.有说错的地方欢迎指正 
return rules[j].style; 
} 
} 
} 
} 

