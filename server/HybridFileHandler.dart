import "dart:io";
import "dart:async";
import "package:express/express.dart";
import "package:jaded/jaded.dart" as jade;
import "../jade.views.dart" deferred as views;

class HybridFileHandler extends StaticFileHandler {
  String atPath;
  HybridFileHandler([this.atPath]) { _compile(); }
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
    else renderView(ctx,'404');
  }
  Future _compile() async {
    RegExp fileName = new RegExp(r'.+/(.+?)\.(?:.+?)$');
    RegExp underscore = new RegExp(r'/_.+$');
    // Compile stylesheets.
    for (var file in new Directory('stylesheets/').listSync())
      if ((file is File) && (!underscore.hasMatch(file.path)))
        Process.run('sass', [ '--scss', '--style=compressed', '--sourcemap=none',
          file.path, '$atPath/css/'+fileName.firstMatch(file.path).group(1)+'.css'])
          ..then((proc){ if(proc.stderr.length>1) throw proc.stderr; });
    // Compile jade.
    new File('jade.views.dart').writeAsStringSync(jade.renderDirectory('views/pages/'));
    views.loadLibrary();
  }
  HttpContext renderView(HttpContext ctx, String key) => ctx..sendHtml(views.JADE_TEMPLATES["views/pages/$key.jade"]())..end();
}
