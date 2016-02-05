import "dart:io";
import "package:express/express_build.dart";

main(){
  // Init folder lyout.
  ['./public/css','./jade/layouts','./scss'].forEach((folder) => new Directory(folder).createSync(recursive: true));
  new File('./jade/pages/jade.yaml').createSync(recursive: true);

  RegExp fname = new RegExp(r'.+/(.+?)\.(?:.+?)$');
  for (var file in new Directory('./scss/').listSync())
    if (file is File)
      Process.run('sass', ['--scss','--style=compressed','--sourcemap=none',file.path,'./public/css/'+fname.firstMatch(file.path).group(1)+'.css']).then((ProcessResult results) {
        print(results.stdout);
      });
  build(["--full"]);
}
