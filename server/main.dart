import "dart:io";
import "package:express/express.dart";
import "package:jaded/jaded.dart" as jade;

import "../jade/pages/jade.views.dart" as pages;

void main(){
  Express app = new Express()
    ..use(new JadeViewEngine(pages.JADE_TEMPLATES))
    ..use(new StaticFileHandler('public'))
    ..get('/', (ctx){
      ctx.render('index');
    });

  app.listen("0.0.0.0", 80);
}
