import "package:express/express.dart";
// 
void main(){
  Express app = new Express()
  ..use(new StaticFileHandler("public"));
  app.listen("127.0.0.1", 80);
}
