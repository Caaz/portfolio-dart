$.fn.minako=function(c,d,a){var b=[];this.keypress(function(f){b.push((f.keyCode)?f.keyCode:f.charCode);if(a){console.log(b)}if(function(){for(var e=0;e<c.length;e++){if((!b[e])||(b[e]!==c[e])){return false}}return true}()){d()}if(b.length>=c.length){b.shift()}})};
$(function(){ $(document).minako([38,38,40,40,37,39,37,39,97,98], function(){ $('main').css({transform: 'rotate(180deg)'}); }) });
