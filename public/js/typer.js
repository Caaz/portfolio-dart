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
function newMe($target, list) {
  $target.typeText(
    list[Math.floor(Math.random()*list.length)],
    function(){ setTimeout(function(){ $target.eraseText(function(){ newMe($target,list) }); }, 5000); }
  );
}
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
      'a Tutor at FCC!'
    ]
  );
});
