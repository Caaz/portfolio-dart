import "dart:io";
import "dart:async";
import "package:express/express.dart";
import "package:jaded/jaded.dart" as jade;
import "../jade.views.dart" deferred as views;

// Fucking organize this file.

// Init the page variable!
Map pages = new Map();
renderPage(HttpContext ctx,String page) => ctx..sendHtml(pages[page]())..end();
class HybridFileHandler extends StaticFileHandler {
  String atPath;
  HybridFileHandler([this.atPath]);
  void execute(HttpContext ctx){
    String path = relativePath(ctx.req.uri.path);
    logDebug("serving $path");
    File file = new File(path);
    if (file.existsSync()) {
      ctx.responseContentType = ContentTypes.getContentType(file);
      file.openRead()
      .pipe(ctx.res)
      .catchError((e) => ctx.sendText("error sending '$path': $e", contentType: "text/plain", httpStatus: 500, statusReason:"static file error"));
    }
    else renderPage(ctx,'404');
  }
}
Future<Map> compile() async {
  // File name regex. this as opposed to ./this.jade
  RegExp fname = new RegExp(r'.+/(.+?)\.(?:.+?)$');
  // Just check if the file name begins with an underscore. Probably doesn't work exactly as it should but who knows.
  RegExp underscore = new RegExp(r'/_.+$');

  // Now, let's compile our stylesheets.
  for (var file in new Directory('./stylesheets/').listSync())
    if ((file is File) && (!underscore.hasMatch(file.path)))
      // Run sass with scss syntax, compress it, and don't use a sourcemap.
      Process.run('sass', [ '--scss', '--style=compressed', '--sourcemap=none',
        // Original file, output file.
        file.path, './public/css/'+fname.firstMatch(file.path).group(1)+'.css'])
        // If there was an error, throw it!
        ..then((proc){ if(proc.stderr.length>1) throw proc.stderr; });


  // Compile our jade pages.
  new File('jade.views.dart').writeAsStringSync(jade.renderDirectory('views/pages/'));
  // Load up our compiled pages.
  await views.loadLibrary();
  // Make keys less ridiculous by only using the file name.
  for(String key in views.JADE_TEMPLATES.keys)
    pages[fname.firstMatch(key).group(1)] = views.JADE_TEMPLATES[key];
  return pages;
}
