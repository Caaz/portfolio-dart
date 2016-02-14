import "server/utilities.dart";
import "package:express/express.dart";

// If this file looks clean it just means there's a really messy file somewhere else.

main() async {
  await compile();
  new Express()
  ..use(new HybridFileHandler('public'))
  ..get('/', (ctx) => renderPage(ctx,'index'))
  ..listen('0.0.0.0', 80);
}
