import "dart:io";
import 'dart:convert';
import "package:carbon/carbon.dart";
import 'jade.views.dart' deferred as jadeViews;

main() async {
  Map config = JSON.decode(new File('config.json').readAsStringSync());
  Carbon server = new Carbon(dirCompile:'public/css');
  await jadeViews.loadLibrary();
  server
  ..views(jadeViews.JADE_TEMPLATES)

  ..route('GET','/',(req) {
    server.render(req.response, 'index');
    return true;
  })

  ..listen(InternetAddress.ANY_IP_V4,
    (config.containsKey("chain"))?443:80,
    chain:(config.containsKey("chain"))?config['chain'].toString():'',
    key:(config.containsKey("key")?config['key'].toString():''));

  // Redirect http to https.
  if(config.containsKey("chain")) {
    HttpServer.bind(InternetAddress.ANY_IP_V4,80).then((HttpServer server) {
      server.listen((HttpRequest req) {
        Uri redir = new Uri( scheme: 'https', host: req.headers.host, path: req.uri.path, fragment: req.uri.fragment);
        if(req.uri.fragment.isEmpty) redir.removeFragment();
        req.response.redirect( redir );
      });
    });
  }
}
