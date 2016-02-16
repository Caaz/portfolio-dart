import "server/HybridFileHandler.dart";
import "package:express/express.dart";

main() async {
  HybridFileHandler hybrid = new HybridFileHandler('public');
  await hybrid.compileViews();
  new Express()
  ..use(hybrid)
  ..get('/', (ctx) => hybrid.renderView(ctx,'index'))
  ..listen('0.0.0.0', 80);
}
