# İşaretçi Alıştırması (pointer-training)

İşaretçi alıştırması sizi oyun için herhangi bir fareye ve grafik düzenine dengeler.

Hedef vuruş ve refleks geliştirme amaçlı, tarayıcı tabanlı bir nişan alma (aim trainer) oyunudur.

Oyun zorlaştıkça sizden daha çok şey ister. Önemli olan sabırlı davranabilmektir.

Renk düzeni dikkati geliştirmek için seçilmiştir. Mor renkli arkaplan, görülebilir en ince tayf renkle sizin dikkatinizi görüntüye vermenize yardımcı bir uyaran olur.

Etkisini oyun oynamaya başladığınız 10 dakika içerisinde fark edeceksiniz. Alıştırma deneyiminiz direkt sizin fare ve grafik koşullarını azaltmanıza olanak tanıyarak oyun deneyiminizi arttırır ve böylece dikkatiniz oyunun şartlarına odaklanır. Tıpkı insanların robotlar karşısında dövüş eğitimi yüklemesi gibi :P.

## Nasıl Çalışır?

Ekranda rastgele beliren **yeşil düşman** dairelerine tıklayarak onları yok edin. **Sarı müttefik** dairelerine tıklamayın (can kaybettirir). Her roundda bir **camgöbeği hedef** daire belirlenir; hedefin merkezine ne kadar yakın tıklarsanız o kadar yüksek puan alırsınız.

- Belirlenen seviyeden oluşan ilerleme sistemi
- Daireler küçültülebilir, hızlandırılabilir ve sayıları artabilir
- Art arda isabetli vuruşlarla combo çarpanı kazanın

## Oynanış

Oyun 5 saniyelik geri sayımın ardından başlar. F11 ile tam ekran moduna geçebilirsiniz.

İki kontrol modu mevcuttur:
- **Nişangâh Modu** (varsayılan): Fare imleci gizlenir, özel bir nişangâh çaprazı ile nişan alıp tıklayarak ateş edersiniz.
- **İmleç Modu**: Doğrudan fare imleci ile dairelerin üzerine tıklarsınız.

## Başlatma

`index.html` dosyasını herhangi bir web tarayıcısında açın.

## Yapılandırma

Tüm oyun ayarları `config.js` dosyasında bulunur:
- Seviye sayısı, daire boyutları, ömür süreleri
- Renk paletleri (seviyeye göre kademeli değişim)
- Fare hassasiyeti, imleç/nişangâh seçimi
- Önizleme modu (can kaybı olmadan pratik)

## Dosya Yapısı

```
index.html       -- Ana sayfa
training.js      -- Oyun motoru
training.css     -- Stiller
config.js        -- Yapılandırma
ga.js            -- Google Analytics (eski sürüm)
crosshairs/      -- Nişangâh resimleri
cursors/         -- İmleç resimleri
```

## Teknolojiler

Saf JavaScript (ES6), HTML5, CSS3. Hiçbir harici kütüphane veya bağımlılık içermez.
