/*window.readstate = "allfeed" read all feed
                     "selectfeed" read selectfeed
                     "selectImpList" read searchList*/
window.readstate = "allfeed";
window.newest = 0;
window.begin = 0;
window.count = 5;
window.selectImpList = '';
window.selectFeedList = 0;

xreader_cf = {
	'class':'xreader'
};

story_cf = {
	'class':'story',
	'img_class':'story_img',
	'title_class':'story_title',
	'text_class':'story_text'
};

style_cf = {
	'xreader_width':parseInt(oftenUse.getstyle('.xreader')['width']),
	'story_width':parseInt(oftenUse.getstyle('.story')['width']),
	'story_marginright':parseInt(oftenUse.getstyle('.story')['margin-right'])
}