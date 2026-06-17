//Game Mode Options
var PreviewMode = true; //Oyunda puan kaybı olup olmamasını belirtir. true ya da false değerini alır.

//Mouse Options
var LastSolidSensitivity = 100; //Nişangah kullanılarak oynanan oyun modunda fare hassasiyet değerinin son katsayısını belirtir.
var FirstSolidSensitivity = 0; //Nişangah kullanılarak oynanan oyun modunda fare hassasiyet değerinin ilk katsayısını belirtir.
var PointerMode = false; //İşaretçi ya da nişangah kullanılarak oynanacak oyun modunu belirtir.
var CrosshairName = "crosshair1"; //Belirtilen nişangah dosyası adı. Dosya '.png' uzantılı olmalıdır.
var CursorSize = 3; //İşaretçi modundaki imlecin büyüklüğü. İmleç büyüklüğü 0 ile 3 arası değer alır. Görüntü bindirmeleri olmadığı ve ekran keskinliği olduğu sürece daha düşük değerler kullanılabilirdir.

//Level Options
var TotalLevels = 50; //Bütün oyundaki toplam seviye sayısı.
var Level = 1; //Kalınan seviye.
var SystematicGame = true;

//HUD Options
var ShowSize = false; //Anlık sonraki daire ebatını gösterir. true ya da false değerini alır.
var ShowLifetime = false; //Anlık sonraki daire ömrünü gösterir. true ya da false değerini alır.
var MinScreenScale = 1; //Dairelerin belireceği çerçevenin başlangıç oranı. En fazla 1 değerini alır.

//Enemy Options
var MaxLifetime = 2000; //Dairenin azami ömrü.
var MinLifetime = 0; //Dairenin asgari ömrü. 60 FPS monitörler için 20 belirlenmiştir. 0 ise çerçeve hızına göre daire asgari ömrü otomatik belirlenir.
var MaxAmount = 9; //Bir karşılaşmada çıkabilecek azami daire sayısı.
var MaxLife = 1; //Bir dairenin olabilecek azami canı.

//Graphic Quality Options
var FPS = 300; //Kullanılan monitöre göre çerçeve hızı. Standart 60 olur. Verimlilik için düşük tutulması tavsiye edilir.

//Color Options

//Arka plan rengi.
var FirstBGColor = "FF00FF";
var LastBGColor = "000000";

//Maske rengi.
var FirstMaskColor = "0000FF";
var LastMaskColor = "000001";

//Hedef rengi.
var FirstTargetColor = "00FFFF";
var LastTargetColor = "000101";

//Seçili hedef rengi.
var FirstSelectedTargetColor = "77FFFF";
var LastSelectedTargetColor = "010202";

//Düşman rengi.
var FirstEnemyColor = "00FF00";
var LastEnemyColor = "000100";

//Seçili düşman rengi.
var FirstSelectedEnemyColor = "77FF77";
var LastSelectedEnemyColor = "010201";

//Dost rengi.
var FirstAllieColor = "FFFF00";
var LastAllieColor = "010100";

//Seçili dost rengi.
var FirstSelectedAllieColor = "FFFF77";
var LastSelectedAllieColor = "020201";