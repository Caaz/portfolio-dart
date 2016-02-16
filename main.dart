import "dart:io";
import "package:carbon/carbon.dart";
import 'jade.views.dart' deferred as jadeViews;

main() async {
  String chain = '';
  if (Platform.environment.containsKey('CHAIN')) {
    chain = Platform.environment['CHAIN'];
    print("Got chain: $chain");
  }
  Carbon server = new Carbon(dirCompile:'public/css');
  await jadeViews.loadLibrary();
  server
  ..views(jadeViews.JADE_TEMPLATES)

  ..route('GET','/',(req) {
    server.render(req.response, 'index');
    return true;
  })

  ..listen(InternetAddress.ANY_IP_V4, (chain.isNotEmpty)?443:80, chain:chain);
}
