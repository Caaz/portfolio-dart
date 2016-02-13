import "dart:io";
import "dart:async";
import "package:express/express.dart";
import "package:jaded/jaded.dart" as jade;
import "jade.views.dart" deferred as views;

// Init the page variable!
Map pages = new Map();

main() async {
  // Compile jade pages.
  await _compile();
  new Express()
  // Fancy Static file handler that renders the 404 jade file when there's nothing there!
  ..use(new HybridFileHandler('public'))
  // Index page, nothing fancy.
  ..get('/', (ctx) => renderPage(ctx,'index'))
  // Start the server.
  ..listen('0.0.0.0', 80);
}
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

Future<Map> _compile() async {
  // File name regex. this as opposed to ./this.jade
  RegExp fname = new RegExp(r'.+/(.+?)\.(?:.+?)$');
  // Just check if the file name begins with an underscore. Probably doesn't work exactly as it should but who knows.
  RegExp underscore = new RegExp(r'/_.+$');

  // Now, let's compile our stylesheets.
  for (var file in new Directory('./stylesheets/').listSync())
    if (file is File)
      // Check if there's an underscore, we don't want to compile those.
      if (!underscore.hasMatch(file.path)) {
        // Run our command and print the output.
        var out = Process.runSync('sass', [
          // Use scss, the superset of css.
          '--scss',
          // Compress it for bandwidth reasons.
          '--style=compressed',
          // Fuck the sourcemap.
          '--sourcemap=none',
          // Original file path
          file.path,
          // New file path, as css.
          './public/css/'+fname.firstMatch(file.path).group(1)+'.css']);
        print(out.stdout);
        print(out.stderr);
      }

  // Compile our jade pages.
  new File('jade.views.dart').writeAsStringSync(jade.renderDirectory('views/pages/'));
  // Load the file it compiled
  await views.loadLibrary();
  // Make use the JADE_TEMPLATES to make things slightly less ridiculous.
  for(String key in views.JADE_TEMPLATES.keys)
    // use the filename instead of a path.
    pages[fname.firstMatch(key).group(1)] = views.JADE_TEMPLATES[key];

  // Return our pages, we'll need those.
  return pages;
}
