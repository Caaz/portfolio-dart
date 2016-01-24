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

// Note how I don't comment the most complicated bit of code. That's because I'm lazy.
// This is supposed to be a page supporting me.
// It's not laziness.
// It's uh, proprietary information.
// Yeah.

// Alright here we actually execute page shit.
$(function(){
  // Start this which is basically a loop.
  newMe(
    // Where we're actually placing the what I am text.
    $('#iAmA'),
    // List of things I am. (Self proclaimed, of course) Maybe I'll move this to some ajax call or something.
    ['Web Developer','Slacker','Hacker','Programmer','Wizard','Level 70 Mohawk Night Elf','Pokemon Trainer','Professional?','Hobbyist','Psuedo-RNG Sympathizer','Procrastinator','Bonefide Badass','Guy With a Hashbang Tattoo','Planner','Master of the Dark Arts (Perl)','Chill Dude','Walking Dead Fan','']
  );

  // Fancy header shit.
  var $name = $('#name');
  $name.children().hide();
  $name.hover(function(){ $(this).children().show(); },function(){ $(this).children().hide(); });

  // Make navigation stick to the top when we scroll down
  var $nav = $('nav');
  // Grab our original offset, we need this.
  var originalNav = $nav.offset().top;
  $(window).scroll(function(e) {
    var scroll = $(window).scrollTop();
    // On initial position, if the scroll position passes the nav's position, then fix it.
    if(($nav.css('position') == 'static') && (scroll > originalNav)) $nav.css({position:'fixed',top:'0px',left:'0px'});
    // Once we scroll back up, place the navigation back where it belongs.
    else if(($nav.css('position') == 'fixed') && (scroll <= originalNav)) $nav.css({position:'static'});
  });
});
