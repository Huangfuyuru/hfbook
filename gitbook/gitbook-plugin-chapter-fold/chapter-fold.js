require(["gitbook","jQuery"],function(e,i){var r="expanded",a=".chapter",t="expChapters",n=function(e){(e.hasClass("expanded")?s:l)(e)},s=function(e){e.length&&e.hasClass(r)&&(e.removeClass(r),c(e))},l=function(e){e.length&&!e.hasClass(r)&&(e.addClass(r),c(e))},c=function(){var s=JSON.parse(localStorage.getItem(t))||{};if(!arguments.length)return i(a).map(function(e,a){if(s[i(this).data("level")])return this});arguments[0].each(function(e,a){var t=i(this).data("level"),n=i(this).hasClass(r);s[t]=n}),localStorage.setItem(t,JSON.stringify(s))};e.events.bind("page.change",function(){var e;(e=i(".articles").parent(a).children("a")).append(i('<i class="exc-trigger fa"></i>')),e.on("click",function(e){e.preventDefault(),n(i(e.target).closest(a))}),l(c()),s(i(a)),e=i(a+".active"),l(e),l(e.parents(a))})});