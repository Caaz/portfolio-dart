// Custom JQuery function for fancy typing! I wrote this myself! It's recursive as fuck.
$.fn.typeText = function(text,callback) {
  if((typeof text) == 'string') { text = text.split(''); this.text(''); }
  this.text(this.text() + text.shift());
  var $self = this;
  if(text.length) setTimeout(function(){ $self.typeText(text, callback); }, 50);
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
  if(hasMore) { var $self = this; setTimeout(function() { $self.eraseText(callback); }, 100); }
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
      'A Slacker',
      'A Hacker',
      'A Programmer',
      'A Wizard',
      'A Level 80 Night Elf Mohawk',
      'A Pokemon Trainer',
      'A Professional?',
      'A Hobbyist',
      'A Psuedo-RNG Sympathizer',
      // 'A Procrastinator', // Fine.
      'A Guy With a Hashbang Tattoo',
      'A Bonefide Badass',
      'A Planner',
      'A Master of the Dark Arts',
      'A Chill Dude',
      'A Walking Dead Fan',
      'A Luvdisc Sympathizer',
      'A Sarcastic Asshole',
      'A College Student',
      'An X-Files Lover',
      'Annoyed by Gramar',
      'Probably Sleeping',
      'Addicted to Starbucks',
      'Loving Electro-Swing',
      'Trying to Keep my Git Streak Going',
      'Not Dead, Just Asleep',
      'Dancing on a chair',
      'Better Than You'
    ]
  );

  // Fancy dynamic navigation stuff.
  var $nav = $('nav');
  var originalNav = $nav.offset().top;
  var $sections = $('main > section');
  var selected;
  $(window).scroll(function(e) {
    var scroll = $(window).scrollTop();
    var height = $(window).height();
    // Update the navigation's position status depending on the scroll amount!
    if(($nav.css('position') == 'static') && (scroll > originalNav)) $nav.css({position:'fixed',top:'0px',left:'0px'});
    else if(($nav.css('position') == 'fixed') && (scroll <= originalNav)) $nav.css({position:'static'});

    // Update the navigation link's selected status depending on where I am.
    var at = 'about';
    $sections.each(function(i,e) { if(scroll+height/2 >= $(e).offset().top) at = e.id; });
    if((selected != at) && (selected = at)) $nav.children().removeClass('selected').filter('a[href="#'+at+'"]').addClass('selected');
  });
  // Force an update immediately!
  $(window).scroll();

  // Fancy navigation interaction
  $nav.on('click','a', function(e){var id=$(e.target.parentNode).attr('href');e.preventDefault();$('html').animate({scrollTop:$(id).offset().top},500,'swing');history.pushState(null,null,id);});
});
