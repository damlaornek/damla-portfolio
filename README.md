# Damla — Kişisel Portföy

Minimal, beyaz ve kurumsal bir HTML5 kişisel portföyü. Projede semantik HTML, responsive CSS, vanilla JavaScript ve sunucu tarafında çalışan bir dil modeli API asistanı bulunur.

## İçerik

- `public/index.html` — sayfa yapısı ve içerikler
- `public/css/style.css` — responsive tasarım ve animasyonlar
- `public/js/script.js` — menü, sohbet arayüzü ve etkileşimler
- `server.js` — Express sunucusu ve AI API uç noktası
- `.env.example` — gerekli ortam değişkenlerinin örneği

## Yerel çalıştırma

Gereksinim: desteklenen bir Node.js LTS sürümü ve npm.

1. Bu klasörü aç.
2. Terminalde bu klasöre git.
3. Bağımlılıkları kur:

   ```bash
   npm install
   ```

4. `.env.example` dosyasını `.env` adıyla kopyala.
5. `.env` içindeki `OPENAI_API_KEY` değerine kendi API anahtarını gir. İstersen `OPENAI_MODEL` değerini hesabında erişimin olan bir modelle değiştir.
6. Sunucuyu başlat:

   ```bash
   npm start
   ```

7. Tarayıcıda `http://localhost:3000` adresini aç.

AI asistanı, sunucudaki `OPENAI_API_KEY` tanımlanana kadar yanıt vermez. API kullanımının ücretleri ve erişimi sağlayıcının hesabına bağlıdır.

## Güvenlik

- API anahtarını asla HTML, CSS veya tarayıcıda çalışan JavaScript dosyalarına koyma.
- `.env` dosyası `.gitignore` içinde tutulur; GitHub'a gönderilmemelidir.
- Bu örnek eğitim amaçlı bir başlangıçtır. Herkese açık dağıtım öncesinde rate limiting, kötüye kullanım koruması, uygun loglama ve gizlilik bilgilendirmesi ekle.
- Sohbet içeriği üçüncü taraf AI sağlayıcısına gönderilir; siteyi yayımlamadan önce kullanıcıları uygun biçimde bilgilendir.
- Gerçek API çağrıları ücret oluşturabilir. API sağlayıcının güncel fiyatlandırmasını kontrol et.

## Yayına alma notu

`public/` klasörü statik bir site olarak yayımlanabilir; fakat gerçek AI asistanının çalışması için `server.js` dosyasını çalıştıran bir Node.js sunucusu gerekir. Yalnızca GitHub Pages'e yüklemek `/api/chat` uç noktasını çalıştırmaz. Frontend'i statik barındırıp backend'i ayrı bir Node.js servisine dağıtacaksan `public/js/script.js` içindeki API adresini uygun backend adresine göre yapılandırman gerekir.

## Kişiselleştirme kontrol listesi

- [ ] GitHub ana profil bağlantısını kendi hesabınla değiştir.
- [ ] LinkedIn bağlantısını kendi profilinle değiştir.
- [ ] `YOUR_EMAIL@example.com` adresini değiştir.
- [ ] Hakkımda, beceriler ve deneyim metinlerini kontrol et.
- [ ] Tamamlanmış olmayan projeleri tamamlanmış gibi göstermediğinden emin ol.
- [ ] Telefonda ve masaüstünde görünümü test et.
- [ ] API anahtarını `.env` dosyasına ekle ve GitHub'a göndermediğini doğrula.
