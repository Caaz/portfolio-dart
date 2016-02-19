var state = {'pos':[0,0],'hue':0};
$(function(){
  var $proto = $('section#iskanvas');
  var $canvas = $('<canvas>');
  var width = $proto.outerWidth();
  var height = $proto.outerHeight();
  $canvas.attr( 'width', width );
  $canvas.attr( 'height', height );
  $canvas.css( { maxWidth:'100%', maxHeight:'100%' } );
  $canvas.on('mousemove', state, function(e) { e.data["pos"] = [e.pageX, e.pageY]; });
  $('section#iskanvas').replaceWith($canvas);
  var ctx = $canvas[0].getContext("2d");
  var id = setInterval(draw, 1, width,height,ctx,state,$canvas[0]);
});
function draw(width,height,ctx, s,canvas, color) {
  // var imgData=ctx.getImageData(5,5,width-5,height-5);
  // ctx.putImageData(imgData,0,0,0,0,width+10,height+10);
  var spread = 10;
  // s['hue'] = (s['hue'] > 360)?s['hue']++:0;
  s['hue']++;
  // console.log(s['hue']);
  ctx.fillStyle= "hsl("+s['hue']+",100%,50%)";
  ctx.fillRect(s['pos'][0]-5,s['pos'][1]-5,10,10);
  ctx.drawImage(canvas,-spread/2,-spread/2,width+spread,height+spread);
  ctx.fillText("")
}
// hsl(25, 63%, 71%)
