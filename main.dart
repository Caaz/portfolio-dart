import "server/HybridFileHandler.dart";
import "package:express/express.dart";

main() async {
  HybridFileHandler hybrid = new HybridFileHandler('public');
  new Express()
  ..use(hybrid)
  ..get('/', (ctx) => hybrid.renderView(ctx,'index'))
  ..listen('0.0.0.0', 80);
}
