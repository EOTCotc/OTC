import Vue from 'vue';
import Vuei18n from 'vue-i18n';

import zh from "./lang/zh"
import en from "./lang/en"
import zhTw from './lang/zhTw'
import de from "./lang/de";
import es from "./lang/es";
import fr from "./lang/fr";
import id from "./lang/id";
import it from "./lang/it";
import ja from "./lang/ja";
import ko from "./lang/ko";
import nl from "./lang/nl";
import pt from "./lang/pt";
import ru from "./lang/ru";
import th from "./lang/th";
import vi from "./lang/vi";
import ar from "./lang/ar";

Vue.use(Vuei18n);

var type = navigator.appName;
if (type == "Netscape") {
  var browserLang = navigator.language;//获取浏览器配置语言，支持非IE浏览器
} else {
  var browserLang = navigator.userLanguage;//获取浏览器配置语言，支持IE5+ == navigator.systemLanguage
};
var browserLang = browserLang.slice(0, 2);//获取浏览器配置语言前两位
localStorage.setItem('langText', browserLang)
// 用户选择了语言
let lang = JSON.parse(localStorage.getItem('lang'))
if (lang) {
  lang = lang.lang
}

const i18n = new Vuei18n({
	locale: lang || browserLang, // 语言
	messages: {
		// 文案
		zh, // 文案的中文版
		en, // 文案的英文版
		zhTw,
		de,
		ar,
		es,
		fr,
		id,
		it,
		ja,
		ko,
		nl,
		pt,
		ru,
		th,
		vi,
	},
});

export default i18n;
