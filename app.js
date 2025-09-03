// Futbol Tabu — Sadece Futbolcular (v2.5 → base-only)
// İstekler: sadece BASE_CARDS kullan; default yok.
// - Site kapanıp açılınca her zaman KURULUM ekranı
// - Oyun bitince en başa dön
// - "Yeni Kart" yok
// - Başlat’a basmadan kart görünmez; Başlat’a basınca ilk kart otomatik gelir

const STORAGE_KEY = "ft_state_v2_5";

// SADECE BUNU KULLAN (listeyi sen dolduracaksın)
const BASE_CARDS = [
  { w: "Lionel Messi", t: ["Barcelona", "Arjantin", "PSG", "Inter Miami", "10"] },
  { w: "Cristiano Ronaldo", t: ["Real Madrid", "Portekiz", "Al Nassr", "Gol", "7"] },
  { w: "Neymar", t: ["Brezilya", "PSG", "Barcelona", "222", "10"] },
  { w: "Kylian Mbappé", t: ["Fransa", "PSG", "Hız", "Real Madrid", "Dünya Kupası"] },
  { w: "Erling Haaland", t: ["Norveç", "Manchester City", "Forvet", "Gol", "B.Dortmund"] },
  { w: "Robert Lewandowski", t: ["Polonya", "Bayern", "Barcelona", "B.Dortmund", "9"] },
  { w: "Kevin De Bruyne", t: ["Belçika", "Asist", "Manchester City", "Orta saha", "Premier League"] },
  { w: "Mohamed Salah", t: ["Mısır", "Liverpool", "Kanat", "Hız", "Premier League"] },
  { w: "Luka Modrić", t: ["Hırvatistan", "Real Madrid", "Orta saha", "Ballon d'Or", "10"] },
  { w: "Karim Benzema", t: ["Fransa", "Real Madrid", "Forvet", "Gol", "Balon d'Or"] },
  { w: "Antoine Griezmann", t: ["Fransa", "Atletico", "Saç", "Forvet", "Dans"] },
  { w: "Harry Kane", t: ["İngiltere", "Tottenham", "Bayern", "Forvet", "Kupa"] },
  { w: "Heung-min Son", t: ["Güney Kore", "Tottenham", "Kanat", "Kim Min Jae", "Kaptan"] },
  { w: "Marcus Rashford", t: ["İngiltere", "Manchester United", "Kanat", "Genç", "10"] },
  { w: "Bruno Fernandes", t: ["Portekiz", "Manchester United", "Orta saha", "Asist", "8"] },
  { w: "Jude Bellingham", t: ["İngiltere", "Real Madrid", "B.Dortmund", "Orta saha", "5"] },
  { w: "Phil Foden", t: ["İngiltere", "Manchester City", "Altyapı", "Orta saha", "47"] },
  { w: "Jack Grealish", t: ["İngiltere", "Manchester City", "Saç bandı", "Kanat", "Aston Villa"] },
  { w: "Riyad Mahrez", t: ["Cezayir", "Manchester City", "Kanat", "Teknik", "Cezayir milli"] },
  { w: "Raheem Sterling", t: ["İngiltere", "Manchester City", "Chelsea", "Hız", "Kanat"] },
  { w: "Sadio Mané", t: ["Senegal", "Liverpool", "Bayern", "Forvet", "Salah"] },
  { w: "Virgil van Dijk", t: ["Hollanda", "Liverpool", "Stoper", "Kaptan", "Fizik"] },
  { w: "Trent Alexander-Arnold", t: ["İngiltere", "Liverpool", "Bek", "Asist", "Real Madrid"] },
  { w: "Andrew Robertson", t: ["İskoçya", "Liverpool", "Sol bek", "Kaptan", "Asist"] },
  { w: "Alisson Becker", t: ["Brezilya", "Liverpool", "Kaleci", "Sakallı", "Kafa gol"] },
  { w: "Ederson", t: ["Brezilya", "Manchester City", "Kaleci", "Ayak", "Fenerbahçe"] },
  { w: "Thibaut Courtois", t: ["Belçika", "Real Madrid", "Kaleci", "De Bruyne", "Altın Eldiven"] },
  { w: "Marc-André ter Stegen", t: ["Almanya", "Barcelona", "Kaleci", "Refleks", "Ayak"] },
  { w: "Manuel Neuer", t: ["Almanya", "Bayern", "Kaleci", "Süpürücü", "Dünya Kupası"] },
  { w: "Gianluigi Buffon", t: ["İtalya", "Juventus", "Kaleci", "Efsane", "Parma"] },
  { w: "Jan Oblak", t: ["Slovenya", "Atletico", "Kaleci", "Refleks", "La Liga"] },
  { w: "Gianluigi Donnarumma", t: ["İtalya", "PSG", "Kaleci", "Manchester City", "Milan"] },
  { w: "Sergio Ramos", t: ["İspanya", "Real Madrid", "Stoper", "Kırmızı kart", "Kaptan"] },
  { w: "Gerard Piqué", t: ["İspanya", "Barcelona", "Stoper", "Shakira", "La Masia"] },
  { w: "Jordi Alba", t: ["İspanya", "Barcelona", "Sol bek", "Hız", "İnter Miami"] },
  { w: "Sergio Busquets", t: ["İspanya", "Barcelona", "Ön libero", "Pas", "İnter Miami"] },
  { w: "Xavi", t: ["İspanya", "Barcelona", "Orta saha", "Pas", "Iniesta"] },
  { w: "Andres Iniesta", t: ["İspanya", "Barcelona", "Orta saha", "Dünya Kupası", "Xavi"] },
  { w: "Carles Puyol", t: ["İspanya", "Barcelona", "Stoper", "Kıvırcık saç", "Kaptan"] },
  { w: "Zinedine Zidane", t: ["Fransa", "Real Madrid", "Juventus", "Kafa gol", "Şampiyonlar ligi"] },
  { w: "Thierry Henry", t: ["Fransa", "Arsenal", "Forvet", "Hız", "Invincibles"] },
  { w: "Patrick Vieira", t: ["Fransa", "Arsenal", "Orta saha", "Kaptan", "Fizik"] },
  { w: "Dennis Bergkamp", t: ["Hollanda", "Arsenal", "Forvet", "Uçak fobisi", "Teknik"] },
  { w: "Frank Lampard", t: ["İngiltere", "Chelsea", "Orta saha", "Golcü", "8"] },
  { w: "John Terry", t: ["İngiltere", "Chelsea", "Stoper", "Kaptan", "26"] },
  { w: "Didier Drogba", t: ["Fildişi Sahili", "Chelsea", "Forvet", "Güçlü", "Final golü"] },
  { w: "Eden Hazard", t: ["Belçika", "Chelsea", "Real Madrid", "Kanat", "Dripling"] },
  { w: "Michael Essien", t: ["Gana", "Chelsea", "Orta saha", "Güç", "Uzaktan şut"] },
  { w: "Claude Makélélé", t: ["Fransa", "Chelsea", "Ön libero", "Rol", "Real Madrid"] },
  { w: "Petr Čech", t: ["Çekya", "Chelsea", "Kaleci", "Kask", "Arsenal"] },
  { w: "David Silva", t: ["İspanya", "Manchester City", "Orta saha", "Teknik", "Asist"] },
  { w: "Bernardo Silva", t: ["Portekiz", "Manchester City", "Orta saha", "Çok yönlü", "Dripling"] },
  { w: "Yaya Touré", t: ["Fildişi Sahili", "Manchester City", "Orta saha", "Güç", "Frikik"] },
  { w: "Vincent Kompany", t: ["Belçika", "Manchester City", "Stoper", "Kaptan", "Uzaktan gol"] },
  { w: "Mario Balotelli", t: ["İtalya", "Inter", "Milan", "Why always me", "Forvet"] },
  { w: "Andrea Pirlo", t: ["İtalya", "Milan", "Juventus", "Oyun kurucu", "Frikik"] },
  { w: "Gennaro Gattuso", t: ["İtalya", "Milan", "Orta saha", "Sert", "Kavga"] },
  { w: "Clarence Seedorf", t: ["Hollanda", "Milan", "Orta saha", "ŞL şampiyonu", "Teknik"] },
  { w: "Kaká", t: ["Brezilya", "Milan", "Real Madrid", "Balon d'Or", "10"] },
  { w: "Andriy Shevchenko", t: ["Ukrayna", "Milan", "Forvet", "Gol", "Dynamo Kiev"] },
  { w: "Paolo Maldini", t: ["İtalya", "Milan", "Defans", "Kaptan", "Efsane"] },
  { w: "Alessandro Nesta", t: ["İtalya", "Milan", "Stoper", "Zarif", "Savunma"] },
  { w: "Javier Zanetti", t: ["Arjantin", "Inter", "Bek", "Kaptan", "Dayanıklılık"] },
  { w: "Esteban Cambiasso", t: ["Arjantin", "Inter", "Orta saha", "Çalışkan", "ŞL 2010"] },
  { w: "Diego Milito", t: ["Arjantin", "Inter", "Forvet", "Final", "2010"] },
  { w: "Samuel Eto'o", t: ["Kamerun", "Barcelona", "Inter", "Forvet", "Hız"] },
  { w: "Francesco Totti", t: ["İtalya", "Roma", "10", "Kaptan", "Tek kulüp"] },
  { w: "Daniele De Rossi", t: ["İtalya", "Roma", "Orta saha", "Sert", "Kaptan"] },
  { w: "Alessandro Del Piero", t: ["İtalya", "Juventus", "10", "Frikik", "Forvet"] },
  { w: "Giorgio Chiellini", t: ["İtalya", "Juventus", "Stoper", "Savunma", "Sert"] },
  { w: "Leonardo Bonucci", t: ["İtalya", "Juventus", "Stoper", "Fenerbahçe", "BBC"] },
  { w: "Federico Chiesa", t: ["İtalya", "Juventus", "Kanat", "Liverpool", "EURO 2020"] },
  { w: "Ciro Immobile", t: ["İtalya", "Lazio", "Forvet", "Gol", "Beşiktaş"] },
  { w: "Marco Verratti", t: ["İtalya", "PSG", "Orta saha", "Kısa", "Pas"] },
  { w: "Nicolò Barella", t: ["İtalya", "Inter", "Orta saha", "Çalışkan", "EURO 2020"] },
  { w: "Mesut Özil", t: ["Almanya", "Arsenal", "10 numara", "Fenerbahçe", "Real Madrid"] },
  { w: "Toni Kroos", t: ["Almanya", "Real Madrid", "Orta saha", "Pas", "Uzun top"] },
  { w: "Thomas Müller", t: ["Almanya", "Bayern", "Forvet arkası", "Aidiyet", "Dünya Kupası"] },
  { w: "Miroslav Klose", t: ["Almanya", "Dünya Kupası", "Gol rekoru", "Lazio", "Forvet"] },
  { w: "Bastian Schweinsteiger", t: ["Almanya", "Bayern", "Orta saha", "Dünya Kupası", "Kaptan"] },
  { w: "Philipp Lahm", t: ["Almanya", "Bayern", "Bek", "Kaptan", "Versatil"] },
  { w: "Marco Reus", t: ["Almanya", "Dortmund", "Kanat", "Sakatlık", "10"] },
  { w: "Mario Götze", t: ["Almanya", "Dünya Kupası", "Final golü", "Dortmund", "Bayern"] },
  { w: "Kai Havertz", t: ["Almanya", "Chelsea", "Arsenal", "Forvet", "Baş"] },
  { w: "Jamal Musiala", t: ["Almanya", "Bayern", "Genç", "Dripling", "10"] },
  { w: "Ömer Toprak", t: ["Türkiye", "Dortmund", "Stoper", "Leverkusen", "Milli"] },
  { w: "Arda Turan", t: ["Türkiye", "Galatasaray", "Barcelona", "Atletico", "Orta saha"] },
  { w: "Emre Belözoğlu", t: ["Türkiye", "Fenerbahçe", "Orta saha", "Kaptan", "Inter"] },
  { w: "Alex de Souza", t: ["Brezilya", "Fenerbahçe", "10", "Kaptan", "Frikik"] },
  { w: "Hakan Çalhanoğlu", t: ["Türkiye", "Milan", "Inter", "Frikik", "10"] },
  { w: "Burak Yılmaz", t: ["Türkiye", "Galatasaray", "Beşiktaş", "Forvet", "Gol"] },
  { w: "Mauro Icardi", t: ["Arjantin", "Inter", "Galatasaray", "Forvet", "Aşkın Olayım"] },
  { w: "Kerem Aktürkoğlu", t: ["Türkiye", "Galatasaray", "Kanat", "Emre Belözoğlu", "Fenerbahçe"] },
  { w: "Fernando Muslera", t: ["Uruguay", "Galatasaray", "Kaleci", "Kaptan", "Surat"] },
  { w: "Altay Bayındır", t: ["Türkiye", "Fenerbahçe", "Kaleci", "Manchester United", "Genç"] },
  { w: "Cenk Tosun", t: ["Türkiye", "Beşiktaş", "Everton", "Forvet", "Fenerbahçe"] },
  { w: "Oğuzhan Özyakup", t: ["Türkiye", "Beşiktaş", "Orta saha", "Arsenal altyapı", "10"] },
  { w: "Ricardo Quaresma", t: ["Portekiz", "Beşiktaş", "Trivela", "Kanat", "Porto"] },
  { w: "Pepe", t: ["Portekiz", "Real Madrid", "Beşiktaş", "Stoper", "Sert"] },
  { w: "Ronaldo Nazário", t: ["Brezilya", "Inter", "Real Madrid", "Fenomeno", "Forvet"] },
  { w: "Ronaldinho", t: ["Brezilya", "Barcelona", "PSG", "Gülüş", "10"] },
  { w: "Rivaldo", t: ["Brezilya", "Barcelona", "10", "Balon d'Or", "Milan"] },
  { w: "Romário", t: ["Brezilya", "Barcelona", "PSV", "Forvet", "Gol"] },
  { w: "Bebeto", t: ["Brezilya", "Dünya Kupası", "Bebek sevinci", "Forvet", "Manchester United"] },
  { w: "Cafu", t: ["Brezilya", "Roma", "Milan", "Sağ bek", "Kaptan"] },
  { w: "Roberto Carlos", t: ["Brezilya", "Real Madrid", "Sol bek", "Füze şut", "Frikik"] },
  { w: "Dani Alves", t: ["Brezilya", "Barcelona", "Sağ bek", "Asist", "Kupa"] },
  { w: "Casemiro", t: ["Brezilya", "Real Madrid", "Manchester United", "Ön libero", "Sert"] },
  { w: "Vinícius Jr.", t: ["Brezilya", "Real Madrid", "Kanat", "Hız", "Dripling"] },
  { w: "Rodrygo", t: ["Brezilya", "Real Madrid", "Kanat", "Genç", "Gol"] },
  { w: "Raphinha", t: ["Brezilya", "Barcelona", "Kanat", "Leeds", "Dripling"] },
  { w: "Gabriel Jesus", t: ["Brezilya", "Arsenal", "Manchester City", "Forvet", "9"] },
  { w: "Richarlison", t: ["Brezilya", "Tottenham", "Forvet", "Sevinç", "Everton"] },
  { w: "Zlatan Ibrahimović", t: ["İsveç", "Milan", "PSG", "Ajax", "Forvet"] },
  { w: "Christian Eriksen", t: ["Danimarka", "Tottenham", "Inter", "Orta saha", "Kalp olayı"] },
  { w: "Peter Schmeichel", t: ["Danimarka", "Manchester United", "Kaleci", "Baba", "Kupa"] },
  { w: "Kasper Schmeichel", t: ["Danimarka", "Leicester", "Kaleci", "Premier League", "Baba-oğul"] },
  { w: "Martin Ødegaard", t: ["Norveç", "Arsenal", "Orta saha", "Kaptan", "10"] },
  { w: "Aleksandar Mitrović", t: ["Sırbistan", "Fulham", "Forvet", "Kafa", "Gol"] },
  { w: "Dusan Vlahović", t: ["Sırbistan", "Juventus", "Forvet", "Gol", "9"] },
  { w: "Luka Jović", t: ["Sırbistan", "Real Madrid", "Forvet", "Fiorentina", "Gol"] },
  { w: "Edin Džeko", t: ["Bosna", "Inter", "Yaşlılık", "Forvet", "Fenerbahçe"] },
  { w: "Miralem Pjanić", t: ["Bosna", "Juventus", "Barcelona", "Orta saha", "Pas"] },
  { w: "Luka Perišić", t: ["Hırvatistan", "Inter", "Kanat", "Çalışkan", "Final"] },
  { w: "Ivan Rakitić", t: ["Hırvatistan", "Barcelona", "Orta saha", "Sevilla", "Pas"] },
  { w: "Marcelo Brozović", t: ["Hırvatistan", "Inter", "Ön libero", "Çalışkan", "Tetov"] },
  { w: "Mario Mandžukić", t: ["Hırvatistan", "Juventus", "Bayern", "Forvet", "Final"] },
  { w: "Pavel Nedvěd", t: ["Çekya", "Juventus", "Orta saha", "Altın Top", "Saç"] },
  { w: "Milan Baroš", t: ["Çekya", "Liverpool", "Forvet", "Euro 2004", "Gol"] },
  { w: "Petr Čech", t: ["Çekya", "Chelsea", "Kaleci", "Kask", "Arsenal"] },
  { w: "Hugo Lloris", t: ["Fransa", "Tottenham", "Kaleci", "Kaptan", "Dünya Kupası"] },
  { w: "Didier Deschamps", t: ["Fransa", "Juventus", "Orta saha", "Kaptan", "Teknik direktör"] },
  { w: "David Trezeguet", t: ["Fransa", "Juventus", "Forvet", "Altın gol", "Monaco"] },
  { w: "Franck Ribéry", t: ["Fransa", "Bayern", "Kanat", "Yarık", "Dripling"] },
  { w: "Kingsley Coman", t: ["Fransa", "Bayern", "Kanat", "Hız", "Final golü"] },
  { w: "Ousmane Dembélé", t: ["Fransa", "Barcelona", "Kanat", "Hız", "Dortmund"] },
  { w: "Aurélien Tchouaméni", t: ["Fransa", "Real Madrid", "Orta saha", "Monaco", "Genç"] },
  { w: "Eduardo Camavinga", t: ["Fransa", "Real Madrid", "Orta saha", "Genç", "Çok yönlü"] },
  { w: "Raphaël Varane", t: ["Fransa", "Real Madrid", "Manchester United", "Stoper", "Dünya Kupası"] },
  { w: "N'Golo Kanté", t: ["Fransa", "Chelsea", "Orta saha", "Çalışkan", "Leicester"] },
  { w: "Paul Pogba", t: ["Fransa", "Juventus", "Manchester United", "Orta saha", "Saç stilleri"] },
  { w: "İlkay Gündoğan", t: ["Almanya", "Manchester City", "Barcelona", "Orta saha", "Kaptan"] },
  { w: "Kai Havertz", t: ["Almanya", "Chelsea", "Arsenal", "Forvet", "Baş"] },
  { w: "Jadon Sancho", t: ["İngiltere", "Dortmund", "Manchester United", "Kanat", "Genç"] },
  { w: "Bukayo Saka", t: ["İngiltere", "Arsenal", "Kanat", "Genç", "Penaltı"] },
  { w: "Declan Rice", t: ["İngiltere", "Arsenal", "West Ham", "Orta saha", "Kaptan"] },
  { w: "Mason Mount", t: ["İngiltere", "Chelsea", "Manchester United", "Orta saha", "Genç"] },
  { w: "Jordan Henderson", t: ["İngiltere", "Liverpool", "Orta saha", "Kaptan", "Çalışkan"] },
  { w: "Steven Gerrard", t: ["İngiltere", "Liverpool", "Orta saha", "Kaptan", "Slip"] },
  { w: "Frank Lampard", t: ["İngiltere", "Chelsea", "Orta saha", "Gol", "8"] },
  { w: "Wayne Rooney", t: ["İngiltere", "Manchester United", "Forvet", "Rekor", "Everton"] },
  { w: "Paul Scholes", t: ["İngiltere", "Manchester United", "Orta saha", "Pas", "Turuncu saç"] },
  { w: "Ryan Giggs", t: ["Galler", "Manchester United", "Kanat", "Hız", "Usta"] },
  { w: "David Beckham", t: ["İngiltere", "Manchester United", "Real Madrid", "Frikik", "LA Galaxy"] },
  { w: "Roy Keane", t: ["İrlanda", "Manchester United", "Orta saha", "Sert", "Kaptan"] },
  { w: "Rio Ferdinand", t: ["İngiltere", "Manchester United", "Stoper", "Hız", "Premier League"] },
  { w: "Nemanja Vidić", t: ["Sırbistan", "Manchester United", "Stoper", "Sert", "Kafa"] },
  { w: "Patrice Evra", t: ["Fransa", "Manchester United", "Sol bek", "Kaptan", "Sosyal medya"] },
  { w: "Ashley Cole", t: ["İngiltere", "Arsenal", "Chelsea", "Sol bek", "Hız"] },
  { w: "Sergio Agüero", t: ["Arjantin", "Manchester City", "Forvet", "Messi", "Kalp"] },
  { w: "Carlos Tevez", t: ["Arjantin", "Manchester United", "Manchester City", "Forvet", "Juventus"] },
  { w: "Gonzalo Higuaín", t: ["Arjantin", "Real Madrid", "Napoli", "Juventus", "Forvet"] },
  { w: "Ángel Di María", t: ["Arjantin", "Real Madrid", "PSG", "Kanat", "Asist"] },
  { w: "Paulo Dybala", t: ["Arjantin", "Juventus", "Roma", "10", "Solak"] },
  { w: "Lautaro Martínez", t: ["Arjantin", "Inter", "Forvet", "Gol", "10"] },
  { w: "Julián Álvarez", t: ["Arjantin", "Manchester City", "Forvet", "Athletico Madrid", "River Plate"] },
  { w: "Enzo Fernández", t: ["Arjantin", "Chelsea", "Orta saha", "Benfica", "Genç"] },
  { w: "Alexis Mac Allister", t: ["Arjantin", "Liverpool", "Orta saha", "Dünya Kupası", "Kırmızı saç"] },
  { w: "Rodrigo De Paul", t: ["Arjantin", "Atletico", "Orta saha", "Koruma", "Messi"] },
  { w: "Nicolás Otamendi", t: ["Arjantin", "Benfica", "Stoper", "Manchester City", "Sert"] },
  { w: "Cristian Romero", t: ["Arjantin", "Tottenham", "Stoper", "Sert", "Atalanta"] },
  { w: "Emiliano Martínez", t: ["Arjantin", "Aston Villa", "Kaleci", "Penaltı", "Dünya Kupası"] },
  { w: "Diego Maradona", t: ["Arjantin", "Napoli", "El", "10", "Ölü"] },
  { w: "Ariel Ortega", t: ["Arjantin", "River Plate", "10", "Fenerbahçe", "Teknik"] },
  { w: "Hernán Crespo", t: ["Arjantin", "Parma", "Inter", "Forvet", "Gol"] },
  { w: "Gabriel Batistuta", t: ["Arjantin", "Fiorentina", "Forvet", "Gol", "Roma"] },
  { w: "Diego Simeone", t: ["Arjantin", "Atletico", "Orta saha", "Sert", "Teknik direktör"] },
  { w: "James Rodríguez", t: ["Kolombiya", "Real Madrid", "10", "Monaco", "Dünya Kupası"] },
  { w: "Radamel Falcao", t: ["Kolombiya", "Atletico", "Monaco", "Forvet", "Galatasaray"] },
  { w: "Juan Cuadrado", t: ["Kolombiya", "Juventus", "Kanat", "Hız", "Kolombiya"] },
  { w: "Alexis Sánchez", t: ["Şili", "Arsenal", "Inter", "Barcelona", "Kanat"] },
  { w: "Arturo Vidal", t: ["Şili", "Juventus", "Bayern", "Orta saha", "Mohawk"] },
  { w: "Gary Medel", t: ["Şili", "Inter", "Beşiktaş", "Sert", "Pitbull"] },
  { w: "Luis Suárez", t: ["Uruguay", "Liverpool", "Barcelona", "Isırma", "Forvet"] },
  { w: "Edinson Cavani", t: ["Uruguay", "Napoli", "PSG", "Forvet", "Gol"] },
  { w: "Diego Godín", t: ["Uruguay", "Atletico", "Stoper", "Kaptan", "Savunma"] },
  { w: "Andrea Belotti", t: ["İtalya", "Torino", "Forvet", "Gol", "9"] },
  { w: "Lorenzo Insigne", t: ["İtalya", "Napoli", "Kanat", "Kısa", "10"] },
  { w: "Federico Bernardeschi", t: ["İtalya", "Juventus", "Kanat", "Solak", "Fiorentina"] },
  { w: "João Félix", t: ["Portekiz", "Atletico", "Chelsea", "Forvet", "Genç"] },
  { w: "João Cancelo", t: ["Portekiz", "Manchester City", "Barcelona", "Bek", "Teknik"] },
  { w: "Diogo Jota", t: ["Portekiz", "Liverpool", "Forvet", "Wolves", "Gol"] },
  { w: "Rúben Dias", t: ["Portekiz", "Manchester City", "Stoper", "Kaptan", "Savunma"] },
  { w: "Nani", t: ["Portekiz", "Manchester United", "Kanat", "Trivela", "Sporting"] },
  { w: "Ricardo Quaresma", t: ["Portekiz", "Beşiktaş", "Trivela", "Porto", "Kanat"] },
  { w: "Rui Costa", t: ["Portekiz", "Milan", "Benfica", "10", "Orta saha"] },
  { w: "Luis Figo", t: ["Portekiz", "Barcelona", "Real Madrid", "Balon d'Or", "Kanat"] },
  { w: "Pepe", t: ["Portekiz", "Real Madrid", "Stoper", "Sert", "Porto"] },
  { w: "Eusébio", t: ["Portekiz", "Benfica", "Forvet", "Panter", "Efsane"] },
  { w: "George Best", t: ["Kuzey İrlanda", "Manchester United", "Kanat", "Efsane", "5"] },
  { w: "Steven Gerrard", t: ["İngiltere", "Liverpool", "Orta saha", "Kaptan", "Slip"] },
  { w: "Xabi Alonso", t: ["İspanya", "Liverpool", "Real Madrid", "Orta saha", "Uzaktan şut"] },
  { w: "Fernando Torres", t: ["İspanya", "Liverpool", "Atletico", "Forvet", "El Niño"] },
  { w: "David Villa", t: ["İspanya", "Valencia", "Barcelona", "Forvet", "Dünya Kupası"] },
  { w: "Álvaro Morata", t: ["İspanya", "Real Madrid", "Atletico", "Juventus", "Forvet"] },
  { w: "Isco", t: ["İspanya", "Real Madrid", "10", "Teknik", "Malaga"] },
  { w: "Iker Casillas", t: ["İspanya", "Real Madrid", "Kaleci", "Kaptan", "Dünya Kupası"] },
  { w: "Raúl", t: ["İspanya", "Real Madrid", "Forvet", "7", "Efsane"] },
  { w: "Fernando Hierro", t: ["İspanya", "Real Madrid", "Stoper", "Kaptan", "Gol"] },
  { w: "Guti", t: ["İspanya", "Real Madrid", "Orta saha", "Topuk pası", "Teknik"] },
  { w: "Guillermo Ochoa", t: ["Meksika", "Kaleci", "Dünya Kupası", "Saç", "Refleks"] },
  { w: "Christian Pulisic", t: ["ABD", "Chelsea", "Milan", "Kanat", "USMNT"] },
  { w: "Achraf Hakimi", t: ["Fas", "PSG", "Sağ bek", "Dortmund", "Inter"] },
  { w: "Hakim Ziyech", t: ["Fas", "Ajax", "Chelsea", "Kanat", "Solak"] },
  { w: "Youssef En-Nesyri", t: ["Fas", "Sevilla", "Forvet", "Gol", "Fenerbahçe"] },
  { w: "Sofyan Amrabat", t: ["Fas", "Fiorentina", "Manchester United", "Orta saha", "Fenerbahçe"] },
  { w: "Riyad Mahrez", t: ["Cezayir", "Manchester City", "Kanat", "Dripling", "Leicester"] },
  { w: "Pierre-Emerick Aubameyang", t: ["Gabon", "Arsenal", "Dortmund", "Forvet", "Hız"] },
  { w: "Emmanuel Adebayor", t: ["Togo", "Arsenal", "Manchester City", "Forvet", "Real Madrid"] },
  { w: "Jay-Jay Okocha", t: ["Nijerya", "Fenerbahçe", "PSG", "10", "Dripling"] },
  { w: "John Obi Mikel", t: ["Nijerya", "Chelsea", "Orta saha", "Defansif", "Nijerya"] },
  { w: "Victor Osimhen", t: ["Nijerya", "Napoli", "Forvet", "Maske", "Galatasaray"] },
  { w: "Mohammed Kudus", t: ["Gana", "Ajax", "West Ham", "Orta saha", "Dripling"] },
  { w: "Michael Essien", t: ["Gana", "Chelsea", "Orta saha", "Güç", "Uzaktan şut"] },
  { w: "Thomas Partey", t: ["Gana", "Arsenal", "Orta saha", "Defansif", "Atletico"] },
  { w: "Kalidou Koulibaly", t: ["Senegal", "Napoli", "Stoper", "Güçlü", "Chelsea"] },
  { w: "Youssoufa Moukoko", t: ["Almanya", "Dortmund", "Genç", "Forvet", "17"] },
  { w: "Wilfried Zaha", t: ["Fildişi Sahili", "Crystal Palace", "Kanat", "Hız", "Dripling"] },
  { w: "Sebastian Haller", t: ["Fildişi Sahili", "Ajax", "Dortmund", "Forvet", "Gol"] },
  { w: "Khvicha Kvaratskhelia", t: ["Gürcistan", "Napoli", "Kanat", "Dripling", "77"] },
  { w: "Victor Gyökeres", t: ["İsveç", "Sporting", "Forvet", "Gol", "Genç"] },
  { w: "Ángel Correa", t: ["Arjantin", "Atletico", "Kanat", "Forvet", "10"] },
  { w: "Rodrigo Bentancur", t: ["Uruguay", "Juventus", "Tottenham", "Orta saha", "Uruguay"] },
  { w: "Federico Valverde", t: ["Uruguay", "Real Madrid", "Orta saha", "Hız", "Çok yönlü"] },
  { w: "Matthijs de Ligt", t: ["Hollanda", "Juventus", "Bayern", "Stoper", "Ajax"] },
  { w: "Frenkie de Jong", t: ["Hollanda", "Barcelona", "Orta saha", "Ajax", "Pas"] },
  { w: "Memphis Depay", t: ["Hollanda", "Lyon", "Barcelona", "Forvet", "Baş"] },
  { w: "Georginio Wijnaldum", t: ["Hollanda", "Liverpool", "PSG", "Orta saha", "Gol"] },
  { w: "Arjen Robben", t: ["Hollanda", "Bayern", "Kanat", "Solak", "Hız"] },
  { w: "Wesley Sneijder", t: ["Hollanda", "Inter", "10", "Galatasaray", "Orta saha"] },
  { w: "Robin van Persie", t: ["Hollanda", "Uçan", "Manchester United", "Forvet", "Fenerbahçe"] },
  { w: "Dirk Kuyt", t: ["Hollanda", "Liverpool", "Forvet", "Çalışkan", "Fenerbahçe"] },
  { w: "Patrick Kluivert", t: ["Hollanda", "Barcelona", "Forvet", "Ajax", "Gol"] },
  { w: "Clarence Seedorf", t: ["Hollanda", "Milan", "Orta saha", "ŞL", "Teknik"] },
  { w: "Oleksandr Zinchenko", t: ["Ukrayna", "Arsenal", "Manchester City", "Bek", "Orta saha"] },
  { w: "Marek Hamšík", t: ["Slovakya", "Napoli", "Orta saha", "Saç", "Trabzonspor"] },
  { w: "Milan Škriniar", t: ["Slovakya", "Inter", "PSG", "Stoper", "Güç"] },
  { w: "Jan Vertonghen", t: ["Belçika", "Tottenham", "Stoper", "Ajax", "Sol"] },
  { w: "Toby Alderweireld", t: ["Belçika", "Tottenham", "Stoper", "Ajax", "Uzun pas"] },
  { w: "Romelu Lukaku", t: ["Belçika", "Inter", "Chelsea", "Forvet", "Güç"] },
  { w: "Dries Mertens", t: ["Belçika", "Napoli", "Forvet", "Küçük forvet", "Gol"] },
  { w: "Axel Witsel", t: ["Belçika", "Atletico", "Orta saha", "Sarı saç", "Zenit"] },
  { w: "Youri Tielemans", t: ["Belçika", "Leicester", "Aston Villa", "Orta saha", "Gol"] },
  { w: "Leandro Trossard", t: ["Belçika", "Arsenal", "Kanat", "Direk", "Teknik"] },
  { w: "Hakim Ziyech", t: ["Fas", "Ajax", "Chelsea", "Kanat", "Galatasaray"] },
  { w: "Sofiane Feghouli", t: ["Cezayir", "Valencia", "Galatasaray", "Kanat", "10"] },
  { w: "İrfan Can Kahveci", t: ["Türkiye", "Fenerbahçe", "Orta saha", "Başakşehir", "10"] },
  { w: "Ferdi Kadıoğlu", t: ["Türkiye", "Fenerbahçe", "Bek", "Kanat", "Çift ayak"] },
  { w: "Rade Krunić", t: ["Bosna", "Milan", "Orta saha", "Çalışkan", "8"] },
  { w: "Ante Rebić", t: ["Hırvatistan", "Milan", "Kanat", "Hız", "Forvet"] },
  { w: "Rafael Leão", t: ["Portekiz", "Milan", "Kanat", "Hız", "17"] },
  { w: "Sandro Tonali", t: ["İtalya", "Milan", "Newcastle", "Orta saha", "Pirlo benzeri"] },
  { w: "Bruno Guimarães", t: ["Brezilya", "Newcastle", "Orta saha", "8", "Pas"] },
  { w: "Kieran Trippier", t: ["İngiltere", "Newcastle", "Bek", "Frikik", "Atletico"] },
  { w: "Miguel Almirón", t: ["Paraguay", "Newcastle", "Kanat", "Hız", "Gol"] },
  { w: "Allan Saint-Maximin", t: ["Fransa", "Newcastle", "Kanat", "Dripling", "Bant"] },
  { w: "Ivan Toney", t: ["İngiltere", "Brentford", "Forvet", "Gol", "Penaltı"] },
  { w: "James Maddison", t: ["İngiltere", "Leicester", "Tottenham", "10", "Orta saha"] },
  { w: "Harvey Barnes", t: ["İngiltere", "Leicester", "Newcastle", "Kanat", "Genç"] },
  { w: "Wilfred Ndidi", t: ["Nijerya", "Leicester", "Orta saha", "Defansif", "Top kap"] },
   { w: "Rüştü Reçber", t: ["Fenerbahçe","Barcelona","Beşiktaş","Kaleci","Milli Takım"] },
  { w: "Volkan Demirel", t: ["Fenerbahçe","Kaleci","Kaptan","Milli Takım","Teknik Direktör"] },
  { w: "Tuncay Şanlı", t: ["Fenerbahçe","Middlesbrough","Forvet","Milli Takım","Çalımlar"] },
  { w: "Tümer Metin", t: ["Beşiktaş","Fenerbahçe","Orta saha","Sol ayak","Yorumcu"] },
  { w: "Sergen Yalçın", t: ["Beşiktaş","Galatasaray","Fenerbahçe","10 numara","Teknik Direktör"] },
  { w: "Şenol Güneş", t: ["Trabzonspor","Kaleci","Teknik Direktör","Dünya 3.lüğü","Milli Takım"] },
  { w: "Fatih Terim", t: ["Galatasaray","Defans","İmparator","Teknik Direktör","Milli Takım"] },
  { w: "Metin Oktay", t: ["Galatasaray","Forvet","Taçsız Kral","Gol Kralı","Efsane"] },
  { w: "Hakan Şükür", t: ["Galatasaray","Inter","Forvet","Gol Kralı","Milli Takım"] },
  { w: "Arif Erdem", t: ["Galatasaray","Forvet","UEFA Kupası","Milli Takım","Teknik Direktör"] },
  { w: "Ümit Davala", t: ["Galatasaray","Sağ bek","UEFA Kupası","Milli Takım","Tek Ayak"] },
  { w: "Okan Buruk", t: ["Galatasaray","Orta saha","UEFA Kupası","Milli Takım","Teknik Direktör"] },

  // --- Yabancı yıldızlar Türkiye’de ---
  { w: "Alex de Souza", t: ["Fenerbahçe","Brezilya","10","Kaptan","Frikik"] },
  { w: "Roberto Carlos", t: ["Fenerbahçe","Real Madrid","Sol bek","Füze Şut","Brezilya"] },
  { w: "Pierre van Hooijdonk", t: ["Fenerbahçe","Hollanda","Frikik","Forvet","Golcü"] },
  { w: "Dirk Kuyt", t: ["Fenerbahçe","Hollanda","Forvet","Çalışkan","Liverpool"] },
  { w: "Nicolas Anelka", t: ["Fenerbahçe","Fransa","Forvet","Chelsea","Manchester City"] },
  { w: "Roberto Soldado", t: ["Fenerbahçe","İspanya","Forvet","Valencia","Tottenham"] },
  { w: "Robin van Persie", t: ["Fenerbahçe","Hollanda","Forvet","Arsenal","Manchester United"] },

  { w: "Gheorghe Hagi", t: ["Galatasaray","Romanya","10","Karpatların Maradonası","Teknik"] },
  { w: "Gheorghe Popescu", t: ["Galatasaray","Romanya","Stoper","UEFA Kupası","Kaptan"] },
  { w: "Claudio Taffarel", t: ["Galatasaray","Brezilya","Kaleci","Dünya Kupası","Teknik Ekip"] },
  { w: "Didier Drogba", t: ["Galatasaray","Fildişi Sahili","Forvet","Şampiyonlar Ligi","Efsane"] },
  { w: "Wesley Sneijder", t: ["Galatasaray","Hollanda","Orta saha","10","Inter"] },
  { w: "Fernando Muslera", t: ["Galatasaray","Uruguay","Kaleci","Kaptan","Refleks"] },

  { w: "Ricardo Quaresma", t: ["Beşiktaş","Portekiz","Trivela","Kanat","Porto"] },
  { w: "Pepe", t: ["Beşiktaş","Portekiz","Stoper","Sert","Real Madrid"] },
  { w: "Mario Gomez", t: ["Beşiktaş","Almanya","Forvet","Gol Kralı","Fiorentina"] },
  { w: "Anderson Talisca", t: ["Beşiktaş","Brezilya","10","Uzaktan Şut","Al Nassr"] },
  { w: "Demba Ba", t: ["Beşiktaş","Senegal","Forvet","Chelsea","Golcü"] },
  { w: "Atiba Hutchinson", t: ["Beşiktaş","Kanada","Orta saha","Kaptan","Dayanıklılık"] },

  { w: "Abdullah Avcı", t: ["İstanbulspor","Başakşehir","Trabzonspor","Teknik Direktör","Milli Takım"] },
  { w: "Burak Yılmaz", t: ["Beşiktaş","Galatasaray","Trabzonspor","Forvet","Gol Kralı"] },
  { w: "Mehmet Topal", t: ["Galatasaray","Fenerbahçe","Orta saha","Örümcek Adam","Milli Takım"] },
  { w: "Selçuk İnan", t: ["Galatasaray","Trabzonspor","Orta saha","Frikik","Milli Takım"] },
  { w: "Nihat Kahveci", t: ["Real Sociedad","Beşiktaş","Forvet","Milli Takım","Golcü"] },
  { w: "Rıdvan Dilmen", t: ["Fenerbahçe","Orta saha","Şeytan","Milli Takım","Yorumcu"] },
  { w: "Aykut Kocaman", t: ["Fenerbahçe","Konyaspor","Forvet","Teknik Direktör","Golcü"] },
  { w: "Tanju Çolak", t: ["Galatasaray","Fenerbahçe","Gol Kralı","Altın Ayakkabı","Forvet"] },
  { w: "Bafetimbi Gomis", t: ["Galatasaray","Fransa","Forvet","Aslan","Golcü"] },
  { w: "Henry Onyekuru", t: ["Galatasaray","Kanat","Hız","Monaco","Nijerya"] },
  { w: "Emmanuel Eboué", t: ["Galatasaray","Arsenal","Sağ bek","Fildişi Sahili","Şampiyon"] },
  { w: "Felipe Melo", t: ["Galatasaray","Pitbull","Brezilya","Orta saha","Kavgacı"] },
  { w: "Younès Belhanda", t: ["Galatasaray","Fas","10 numara","Montpellier","Orta saha"] },
  { w: "Diego Lugano", t: ["Fenerbahçe","Uruguay","Stoper","Kaptan","Sert"] },
  { w: "Stephen Appiah", t: ["Fenerbahçe","Gana","Orta saha","Güçlü","Kaptan"] },
  { w: "Josef de Souza", t: ["Fenerbahçe","Brezilya","Orta saha","Beşiktaş","Samba"] },
  { w: "Vedat Muriqi", t: ["Fenerbahçe","Kosova","Forvet","Lazio","Golcü"] },
  { w: "Enner Valencia", t: ["Fenerbahçe","Ekvador","Forvet","Golcü","Hız"] },
  { w: "Vincent Aboubakar", t: ["Beşiktaş","Kamerun","Forvet","Golcü","Kupa"] },


];

/* ---- State ---- */
let state = {
  deck: Array.isArray(BASE_CARDS) ? BASE_CARDS : [],
  used: [],
  scores:{A:0,B:0},
  teamNames:{A:"Takım A", B:"Takım B"},
  turn:"A",
  duration:60, remain:60,
  points:{right:1, taboo:-1, pass:-1},
  goal:10,
  running:false,
  started:false
};

/* ---- Helpers ---- */
const $ = sel => document.querySelector(sel);
function fmt(s){ s=Math.max(0,Math.floor(s)); return `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`; }
function setTime(sec){ state.remain=sec; $("#time").textContent=fmt(sec); }
function shuffle(arr){ for(let i=arr.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [arr[i],arr[j]]=[arr[j],arr[i]] } return arr; }
function showSetup(){ $("#setupScreen").classList.remove("hidden"); $("#gameScreen").classList.add("hidden"); }
function showGame(){ $("#setupScreen").classList.add("hidden"); $("#gameScreen").classList.remove("hidden"); }

/* ---- Cards ---- */
function renderCard(card){
  $("#word").textContent = card ? card.w : "—";
  const wrap = $("#tabus"); wrap.innerHTML = "";
  if(card && Array.isArray(card.t)){
    card.t.forEach(k=>{ const s=document.createElement("span"); s.className="pill"; s.textContent=k; wrap.appendChild(s); });
  }
}
function nextCard(){
  if (!state.deck || state.deck.length === 0) { renderCard(null); return; }
  if (state.used.length === state.deck.length) state.used = [];
  let idx; do { idx = Math.floor(Math.random() * state.deck.length); } while (state.used.includes(idx));
  state.used.push(idx); renderCard(state.deck[idx]);
}

/* ---- UI ---- */
function updateMiniScore(){
  $("#teamAName").textContent = state.teamNames.A;
  $("#teamBName").textContent = state.teamNames.B;
  $("#scoreA").textContent = state.scores.A;
  $("#scoreB").textContent = state.scores.B;
  $("#turnLabel").textContent = state.turn === "A" ? state.teamNames.A : state.teamNames.B;
  $("#goalLabel").textContent = state.goal;
}
function swapTurn(){ state.turn = state.turn==="A" ? "B" : "A"; }

/* ---- Timer ---- */
let tickHandle=null;
function start(){
  if(state.running) return;

  // Başlat’a basınca ilk kartı otomatik getir (eğer görünmüyorsa)
  const currentWord = $("#word").textContent?.trim();
  const noCardShown = !currentWord || currentWord === "—" || currentWord === "Hazır?";
  if (noCardShown) nextCard();

  state.running=true; $("#btnStart").disabled=true; $("#btnPause").disabled=false;
  const target = performance.now() + state.remain*1000;
  function tick(){
    const left = Math.max(0,(target-performance.now())/1000);
    setTime(left);
    if(left<=0){ stop(); onRoundEnd(); return; }
    tickHandle = requestAnimationFrame(tick);
  }
  tickHandle = requestAnimationFrame(tick);
  persist();
}
function stop(){ if(tickHandle) cancelAnimationFrame(tickHandle); state.running=false; $("#btnStart").disabled=false; $("#btnPause").disabled=true; persist(); }

/* ---- Round End / Overlay ---- */
function onRoundEnd(){
  stop();
  swapTurn();
  setTime(state.duration);

  $("#ovTeamA").textContent = state.teamNames.A;
  $("#ovTeamB").textContent = state.teamNames.B;
  $("#ovScoreA").textContent = state.scores.A;
  $("#ovScoreB").textContent = state.scores.B;

  $("#overlay").classList.remove("hidden");
}
document.getElementById("nextTurn").addEventListener("click", function (e) {
  e.preventDefault();
  e.stopPropagation();
  document.getElementById("overlay").classList.add("hidden");

  // Bir sonraki turda kart ancak Başlat'a basınca gelsin
  renderCard(null);
  updateMiniScore();
});

/* ---- Scoring ---- */
function applyScore(delta){
  state.scores[state.turn]+=delta;
  if(state.scores[state.turn] >= state.goal){
    stop();
    updateMiniScore();
    alert(`🏆 Kazanan: ${ state.turn==="A" ? state.teamNames.A : state.teamNames.B }`);
    // OYUN BİTTİ → EN BAŞA DÖN
    hardResetToSetup();
    return;
  }
  updateMiniScore();
  nextCard();
}

/* ---- Events ---- */
$("#btnCorrect").addEventListener("click", ()=>applyScore(state.points.right), {passive:true});
$("#btnTaboo").addEventListener("click", ()=>applyScore(state.points.taboo), {passive:true});
$("#btnPass").addEventListener("click", ()=>applyScore(state.points.pass), {passive:true});
$("#btnReset").addEventListener("click", ()=>{ softResetRound(); }, {passive:true});
$("#btnStart").addEventListener("click", start, {passive:true});
$("#btnPause").addEventListener("click", stop, {passive:true});

// Kurulum ekranı → oyuna geçiş (kart GÖSTERME; sadece hazırlık)
document.getElementById("startGame").addEventListener("click", ()=>{
  const a = $("#teamAInput").value.trim() || "Takım A";
  const b = $("#teamBInput").value.trim() || "Takım B";
  state.teamNames={A:a, B:b};

  state.duration = Math.max(15, Math.min(180, +$("#optDuration").value||60));
  state.points.right = +$("#optRight").value || 1;
  state.points.taboo = +$("#optTaboo").value || -1;
  state.points.pass  = +$("#optPass").value  || -1;
  state.goal = Math.max(5, Math.min(50, +$("#optGoal").value||10));

  state.started = true;

  // Oyun ekranını göster ama kart çekme — Başlat’a kadar isim görünmesin
  showGame();
  setTime(state.duration);
  state.used = [];          // taze deste
  shuffle(state.deck);      // dağıt
  renderCard(null);         // isim görünmesin
  updateMiniScore();
  persist();
}, {passive:true});

/* ---- Reset Helpers ---- */
function softResetRound(){
  stop();
  state.scores={A:0,B:0}; state.turn="A"; state.used=[];
  setTime(state.duration);
  renderCard(null);         // kart temiz
  updateMiniScore();
  persist();
}
function hardResetToSetup(){
  // Tam fabrika ayarlarına dön ve setup'a geç
  stop();
  state = {
    deck: Array.isArray(BASE_CARDS) ? BASE_CARDS : [],
    used: [],
    scores:{A:0,B:0},
    teamNames:{A:"Takım A", B:"Takım B"},
    turn:"A",
    duration:60, remain:60,
    points:{right:1, taboo:-1, pass:-1},
    goal:10,
    running:false,
    started:false
  };
  renderCard(null);
  showSetup();
  persist();
}

/* ---- Storage ---- */
function persist(){ try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }catch{} }
(function restore(){
  try{
    const s = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if(s) state = Object.assign(state, s);
  }catch{}
  // İSTEK: site kapanıp açılınca en başa dön
  state.started = false;           // her yüklemede setup
  state.running = false;
  state.remain = state.duration;   // süre başa
  state.used = [];                 // deste başa
  renderCard(null);                // isim gözükmesin
  persist();
})();

// Sayfa kapanırken de başa döndür (ek güvence)
window.addEventListener("beforeunload", () => {
  try{
    const snapshot = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") || {};
    snapshot.started = false;
    snapshot.running = false;
    snapshot.remain = snapshot.duration || 60;
    snapshot.used = [];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  }catch{}
});

/* ---- Init ---- */
(function init(){
  showSetup();           // her zaman setup
  setTime(state.remain); // süre göster
  renderCard(null);      // kart gizli
})();
