
/*****************************************/
//推荐关键字文章列表全局变量
sugguestWordPsgList = Array();
//下面两个函数用于深拷贝
function getType(o)
    {
        var _t;
        return ((_t = typeof(o)) == "object" ? o==null && "null" || Object.prototype.toString.call(o).slice(8,-1):_t).toLowerCase();
    }

function extend(destination,source)
   	{
        for(var p in source)
        {
            if(getType(source[p])=="array"||getType(source[p])=="object")
            {
                destination[p]=getType(source[p])=="array"?[]:{};
                arguments.callee(destination[p],source[p]);
            }
            else
            {
                destination[p]=source[p];
            }
        }
    }

function FadeLimit(obj,start,end,speed)
{
    var _a;
    _a=(start>end)?-5:5;
    if(start == end && end == 0)
    	obj.style.display = 'none';
    if(document.all){
        obj.style.filter="alpha(opacity="+parseInt(start+_a)+")";    
    }else
    {
        obj.style.opacity=parseInt(start+_a)/30;
    }
    if(start==end){return;}
    window.setTimeout(function(){
        FadeLimit(obj,start+_a,end,speed);
    },speed);
}


function GoSearchKeyDown() {
        var event = window.event || arguments.callee.caller.arguments[0];
        if (event.keyCode == 13)
        {
            GoSearch();
        }
}

function createComparsionFunction(propertyName)
{
    return function(object1, object2)
    {
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];
        if (value1 > value2)
        {
            return -1;
        } else if (value1 < value2)
        {
            return 1;
        } else
        {
            return 0;
        }
    }
}

function updateSuggustList(word)
{
		/*psglist eachone
		[0]所属源
		[1]文章ID
		[2]文章字数
		[3]文章权重
		[4]题目标记
		[5]预留位
		add:[6]运算后权重*/


	var lower_word = word.toLowerCase();
	$.post("/GetIdListFromWord", {word:lower_word,findclass:''},
					function(get_response){
						var maybe = get_response['maybe'];
						var response = get_response['ans'];
						if(response.length > 0) {
							window.readstate = "selectImpList";

							var response_copy = Array();
							extend(response_copy,response);

							var reslen = response_copy.length;
							var ans_arr = new Array();

							for(var i = 0;i < reslen;++i) {
								var temp = {};
								temp['id'] = response_copy[i][1];
								temp['mark'] = response_copy[i][1]*(response_copy[i][4]+1)*(response_copy[i][5]+1);
								ans_arr.push(temp);
							}
							ans_arr.sort(createComparsionFunction("mark")); //根据mark排序
							extend(sugguestWordPsgList,ans_arr);

							var select_list = sugguestWordPsgList.slice(0,window.count);

							var IdList = {};
							for(var i = 0;i < select_list.length;++i)
							{
								IdList[i] = select_list[i]['id'];
							}

							$.post("/GetIntroducesFromIDList",{id:IdList},
								function(psg_intro_list){
  									window.begin = 0;
									var $container = $('#'+maincontain_cf.id);
									oftenUse.clean_psg();
									document.documentElement.scrollTop=0;

						            oftenUse.add_psg(psg_intro_list);

  									window.begin += window.count;
								},'JSON');
						}
						else {
							alert("No Answer");
						}
					},'JSON'
		);
}


function GoSearch()
{
	var inputer_word = document.getElementById(search_cf.inputid).value;

	var keywords_word = '';
	var search_editword = document.getElementById(search_cf.inputid).value;

	var keywords_box = document.getElementById(search_cf.keywordboxid);
	var keywords = keywords_box.childNodes;
	for(wdnum in keywords) {
		if(typeof(keywords[wdnum].innerHTML) == "undefined") {
			continue;
		}
		  keywords_word += keywords[wdnum].innerHTML + ' ';
	}

	if(search_editword.length < 1) {
		  search_editword += keywords_word;
		}
	if(search_editword.length > 1) {
        oftenUse.changeHTML5URL('search','http://'+window.location.host+'/?searchInput='+inputer_word+'&keyWords='+keywords_word);
		updateSuggustList(search_editword);
	}
}
