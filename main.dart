import "dart:io";
import 'dart:convert';
import "package:carbon/carbon.dart";
// import "../Dart/lib/Carbon/lib/carbon.dart";
import 'jade.views.dart' deferred as jadeViews;
import 'package:mongo_dart/mongo_dart.dart';

main() async {
  // Db db = new Db("mongodb://localhost:27017/portfolio");
  // await db.open();

  Map config = JSON.decode(new File('config.json').readAsStringSync());
  Carbon server = new Carbon(dirCompile:'public/css');
  await jadeViews.loadLibrary();
  server
  ..views(jadeViews.JADE_TEMPLATES)
  // Index.
  ..addSimpleRoute()
  // Strange drawing thing
  ..addSimpleRoute(path:'/trip',render:'isk')
  ..addRoute(
    new Route(
      regex:new RegExp(r'^/echo/(.+?)/?$', caseSensitive: false),
      handler:(req, {Iterable<Match> matches}) {
        server.render(req.response, 'debug', {"msg":matches.first.group(1)} );
        return true;
      }
    )
  )
  ..listen(InternetAddress.ANY_IP_V4,
    (config.containsKey("chain"))?443:80,
    chain:(config.containsKey("chain"))?config['chain'].toString():'',
    key:(config.containsKey("key")?config['key'].toString():''));

  // Redirect http to https.
  if(config.containsKey("chain")) server.forceHttps();
}
