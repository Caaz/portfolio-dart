// Custom JQuery function for fancy typing! I wrote this myself! It's recursive as fuck.
$.fn.typeText = function(text,callback) {
  if((typeof text) == 'string') { text = text.split(''); this.text(''); }
  this.text(this.text() + text.shift());
  if(text.length) setTimeout(function($self){ $self.typeText(text, callback); }, 50, this);
  else if(callback) callback();
  return this;
}
// Another one for erasing things! Also recursive as fuck! I love recursions!
$.fn.eraseText = function(callback) {
  var hasMore = false;
  this.each(function(e,t){
    t.textContent = t.textContent.substr(0,t.textContent.length-1);
    if(t.textContent.length) hasMore = true;
  });
  if(hasMore) { setTimeout(function($self) { $self.eraseText(callback); }, 100, this); }
  else if(callback) callback();
  return this;
}
// A less complicated recursion utilizing both of those recursive functions!
function newMe($target, list) {
  $target.typeText(
    list[Math.floor(Math.random()*list.length)],
    function(){ setTimeout(function(){ $target.eraseText(function(){ newMe($target,list) }); }, 5000); }
  );
}

function scrollTo(id) {$('html').animate({scrollTop:$(id).offset().top},500,'swing');history.pushState(null,null,id);}
// Note how I don't comment the most complicated bit of code. That's because I'm lazy.
// This is supposed to be a page supporting me.
// It's not laziness.
// It's uh, proprietary information.
// Yeah.

// Alright here we actually execute page shit.
$(function(){
  newMe($('#iAmA'), [
      'a Slacker',
      'a Hacker',
      'a Programmer',
      'a Wizard',
      'a Level 80 Night Elf Mohawk',
      'a Pokemon Trainer',
      'a Hobbyist',
      'a Psuedo-RNG Sympathizer',
      // 'a Procrastinator', // Fine.
      'a Guy With a Hashbang Tattoo',
      'a Bonefide Badass',
      'a Master of the Dark Arts',
      'a Chill Dude',
      'a Walking Dead Fan',
      'a Luvdisc Sympathizer',
      'a Sarcastic Asshole',
      'a College Student',
      'an X-Files Lover',
      'Annoyed by Grammar',
      'Probably Sleeping',
      'Addicted to Starbucks',
      'Loving Electro-Swing',
      'Trying to Keep my Git Streak Going',
      'Not Dead, Just Asleep',
      'Dancing on a chair',
      'Trying to be Professional',
      'Just a City Boy',
      'Saving up for a Microwave',
      'Sleep Deprived',
      'Feeding PB&J to the Fish',
      "Just Here so I Don't Get Fined",
      'a Pro at RegEx',
    ]
  );

  // Fancy dynamic navigation stuff.
  // var originalNav = $nav.offset().top;
  // var $sections = $('main > section');
  // var selected;
  // $(window).scroll(function(e) {
  //   var scroll = $(window).scrollTop();
  //   // Update the navigation's position status depending on the scroll amount!
  //   if(($nav.css('position') == 'static') && (scroll > originalNav)) $nav.css({position:'fixed',top:'0px',left:'0px'});
  //   else if(($nav.css('position') == 'fixed') && (scroll <= originalNav)) $nav.css({position:'static'});
  //
  //   // Update the navigation link's selected status depending on where I am.
  //   var at = 'about';
  //   var height = $(window).height();
  //   $sections.each(function(i,e) { if(scroll+height/2 >= $(e).offset().top) at = e.id; });
  //   if((selected != at) && (selected = at)) $nav.children().removeClass('selected').filter('a[href="#'+at+'"]').addClass('selected');
  // }).scroll();
  //
  // // Fancy navigation interaction
  var $nav = $('nav');
  var $scrollable = $('html');
  $nav.on('click','a', function(e){
    e.preventDefault();
    var id=$(e.target).attr('href');
    $scrollable.animate({
      scrollTop:
        // The current scroll position
        // $scrollable.scrollTop()
        // The target's position relative to it's parent.
        + $(id).position().top
        // The scrollable's position relative to it's parent
        // - $scrollable.position().top
      },500,'swing');
    history.pushState(null,null,id);
  });
});
