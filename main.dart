import "dart:io";
import "package:carbon/carbon.dart";
import 'jade.views.dart' deferred as jadeViews;

main() async {
  Carbon server = new Carbon(dirCompile:'public/css');
  await jadeViews.loadLibrary();

  server
  ..views(jadeViews.JADE_TEMPLATES)

  ..route('GET','/',(req) {
    server.render(req.response, 'index');
    return true;
  })

  ..listen(InternetAddress.ANY_IP_V4, 80,
    chain: (Platform.environment.containsKey('CHAIN'))?Platform.environment['CHAIN']:'');
}
