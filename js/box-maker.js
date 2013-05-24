/*
 *  This is just a utitlity script so we can 
 *  add random content to masonry-ed layouts
 */

var boxMaker = {};

function WssZoom(WssObj, WssWidth, WssHeight) {
    var WssScale = Math.max(WssWidth / WssObj.width, WssHeight / WssObj.height);
    var WssNewWidth = WssObj.width * WssScale;
    var WssNewHeight = WssObj.height * WssScale;
    var WssDiv = WssObj.parentNode;
    WssObj.width = WssNewWidth;
    WssObj.height = WssNewHeight;
    WssDiv.style.width = WssWidth + "px";
    WssDiv.style.height = WssHeight + "px";
    WssDiv.style.overflow = "hidden";
    //WssObj.style.marginLeft = (WssWidth - WssNewWidth) / 2 + "px";
    //WssObj.style.marginTop = (WssHeight - WssNewHeight) / 2 + "px";
}

function processPyyLabelPsg(aboutpsg)
{
  var escapeUserInput = function(str){
    return str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
  };
  var reg = new RegExp("("+escapeUserInput("<tgb>")+")","g");
  aboutpsg = aboutpsg.replace(reg,"<font onclick=addSearchWord(this)>");
  var reg = new RegExp("("+escapeUserInput("<tge>")+")","g");
  aboutpsg = aboutpsg.replace(reg,"</font>");
  return aboutpsg;
}

function processPAtoA(aboutpsg) {
  return aboutpsg.replace(/<\/p><a.*(?=<\/a><p>)<\/a><p>/g,function(line){
    line=line.replace('<p>','');
    line=line.replace('</p>','');
    return line;
    });
}

function deleteMyself(ele) {
  ele.parentNode.removeChild(ele);
}

function loadBestIntroduce(inrtostrid) {
  var ele = document.getElementById(inrtostrid+"text");
  try {
  document.getElementById(inrtostrid+"pic").style = "display:none";}
  catch(e) {

  }

  $.post("/GetBestIntroduces", {psgID:inrtostrid},
    function(response) {
      var temptext = '';
      for(var i=0;i<response.length;++i) {
        temptext += (('<p>'+(i+1)+'.'+response[i][1]).substr(0, 80) + "..."+"<p>");
      }
      ele.innerHTML = temptext;
  },'JSON');
}

function loadOneFullText(ele) {
  var psgid = ele.parentNode.parentNode.getAttribute('psgid');
  $.post("/GetOnePassage", {psgID:psgid},
          function(response){

            var html = '';
            var abouttitle = processPyyLabelPsg(response.title)
            var aboutpsg = response.summary;

            aboutpsg = processPyyLabelPsg(aboutpsg);
           },'JSON'
      );
}

function addSearchWord(ele) {
  var keywords_box = document.getElementById(search_cf.keywordboxid);
  var keywords = keywords_box.childNodes;
  for(wdnum in keywords) {
    if(ele.innerHTML == keywords[wdnum].innerHTML)
      return;
  }
  var word = document.createElement("button");
  word.className = 'blue-pill';
  word.innerHTML = ele.innerHTML;
  word.setAttribute('style',search_cf.keywordstyle);
  word.setAttribute('onclick','deleteMyself(this)');

  keywords_box.appendChild(word);
}

boxMaker.makeBoxes = function(data_arr) {
  var boxes = [],
      count = data_arr.length;

  for (var i=0; i < count; i++ ) {
    var story = document.createElement("div");
    story.className = story_cf.class;

    var img = document.createElement("img");
    img.className = story_cf.img_class;
    img.setAttribute('src',data_arr[i].img);

    var title = document.createElement("div");
    title.className = story_cf.title_class;
    title.innerHTML = data_arr[i].title;

    var text = document.createElement("div");
    text.className = story_cf.text_class;
    text.innerHTML = data_arr[i].text;

    story.appendChild(img);
    story.appendChild(title);
    story.appendChild(text);
    boxes.push(story);
  }

  return boxes;
};