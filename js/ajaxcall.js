var ajaxcall = {};

ajaxcall.firstGetNewestID = function() {
    $.get("/GetNewestID", {},
        function(response){
            window.newest = response['max(id)'];
            ajaxcall.GetIntroduces();
        });
    window.begin += window.count;
}

ajaxcall.getNewestID = function() {
    $.get("/GetNewestID", {},
        function(response){
            window.newest = response['max(id)'];
        });
}

ajaxcall.updateAllFeed = function() {
	$.post("/GetIntroduces", {newestID:window.newest,psgID:window.begin,passageCount:window.count},
	function(response){
	    oftenUse.addStory(response)
	 },'JSON');
}

ajaxcall.updateSelectFeed = function() {
    $.post("/GetIntroducesFromFeedList", {newestID:window.newest,psgID:window.begin,passageCount:window.count,feedListStr:window.selectFeedList},
      function(response){
	    oftenUse.addStory(response)
       },'JSON'
    );
}

ajaxcall.GetIntroduces = function() {
    $.post("/GetIntroduces", {newestID:window.newest,psgID:window.begin,passageCount:window.count},
          function(response){
        	var $container = $('.'+xreader_cf.class);
          var $boxes = $( boxMaker.makeBoxes(response) );
          $container.append( $boxes );
           },'JSON'
      );
}

ajaxcall.GetIntroducesFromFeedList = function(my) {
    $.post("/GetIntroducesFromFeedList", {newestID:window.newest,psgID:window.begin,passageCount:window.count,feedListStr:window.selectFeedList},
      function(response){
        var $container = $('#'+maincontain_cf.id);
        $container.empty();

        var $boxes = $( boxMaker.makeBoxes(response) );
        $newElems = $boxes.css({ opacity: 0 });
        $container.append( $newElems ).masonry( 'appended', $newElems );
        $newElems.animate({ opacity: 1 });

        $container.masonry('reload');
       },'JSON'
    );
}


ajaxcall.updateSelectImpList = function() {
  var select_list = sugguestWordPsgList.slice(window.begin,window.begin+window.count);
  var IdList = {};
  for(var i = 0;i < window.count;++i)
  {
    IdList[i] = select_list[i]['id'];
  }
  $.post("/GetIntroducesFromIDList",{id:IdList},
    function(response){
      oftenUse.addStory(response)
    },'JSON');
}

ajaxcall.GetRssList = function() {
	$.get("/GetRssList",
          function(response){
            for(var i in response)
            {
              var feedblock = document.createElement("li");
              var feedclicker = document.createElement("a");
              feedclicker.innerHTML = response[i]['RssTitle'];
              feedblock.appendChild(feedclicker);
              feedblock.setAttribute('class',feedlist_cf.class);
              feedblock.setAttribute('onclick','oftenUse.feedConfirm(this)');
              feedblock.setAttribute('style',feedlist_cf.style);
              feedblock.setAttribute('line',response[i]['line']);
              document.getElementById(feedlist_cf.id).appendChild(feedblock); 
            }
          }
          ,"json"
    );
}