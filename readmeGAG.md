[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=14383096&assignment_repo_type=AssignmentRepo)
# HacktivGAG

⏰ estimated time: 210 minutes

Buatlah sebuah website bernama `HacktivGAG` dimana pengguna dapat saling berbagi `Meme` (/miːm/ _MEEM_).
Baca dengan teliti spesifikasi yang tertulis.

Gunakan nama database: `livecodep1w4`

## Release 0 (3 Point)

Buatlah model dan table untuk:

1. Category
- name (string)
- description (string)

2. Meme
- author (string)
- title (string)
- imageURL (string)
- votes (integer)
- isFunny (boolean)

## Release 1 (2 Point)

Relasi antara `Category` dan `Meme` adalah sebagai berikut:

- 1 `Category` bisa memiliki banyak `Meme`
- 1 `Meme` hanya memiliki 1 `Category`

Buatlah migration baru untuk menambahkan kolom yang dibutuhkan sehingga dapat memenuhi kriteria diatas.

## Release 2 (6 Point)

Buatlah seeding untuk melakukan input data `Category` berdasarkan data berikut:

| name          | description                   |
|---------------|-------------------------------|
| Animals       | It's so fluffy I'm gonna die! |
| Technology    | Tech, programming, IT related |
| Anime & Manga | Weeb rule the world           |
| School        | Its happy to be young         |
| Random        | Why so serious                |

## Release 3 (10 Point)

Buatlah routing yang **HARUS** mengikuti format berikut:

| Method | Route             | Description                                                         |
|--------|-------------------|---------------------------------------------------------------------|
| GET    | /                 | Menampilkan seluruh `Meme`                                          |
| GET    | /categories       | Menampilkan seluruh `Category`                                      |
| GET    | /categories/:id   | Menampilkan `Meme` yang memiliki category dengan id yang diminta    |
| GET    | /memes/add        | Menampilkan form untuk menambahkan `Meme`                           |
| POST   | /memes/add        | Menambahkan data `Meme`                                             |
| GET    | /memes/:id/vote   | Melakukan vote terhadap `Meme` dan tambah value dari kolom `votes`  |
| GET    | /memes/:id/funny  | Mengubah isFunny dari `Meme` menjadi true  berdasarkan id           |

## Release 4  (14 Point)
Untuk `GET /categories`, tampilkan data `Category` dalam bentuk table yang memiliki kolom sebagai berikut:

1. Id
2. Name
3. Description
4. Action

Pada kolom action terdapat sebuah tombol list Meme yang akan mengarahkan kita pada routing `GET /categories/:id` (release 8)

## Release 5 (21 Point)
Untuk route `GET /`, tampilkan data `Meme` dengan ketentuan yang harus muncul adalah sebagai berikut:
1. Image => menampilkan gambar dari imageURL
2. Caption => terdiri dari title dan author dari meme dengan format `<title> by <author>`.
Buatlah caption ini menggunakan **getter** `caption`
3. Category => menampilkan nama category
4. Status => manfaatkan **instance method** `showStatus`
    - `Standard`, jika votes masih 0
    - `Good`, Jika votes tidak 0 dan isFunny false
    - `Funny`, jika isFuny true
5. Published => memanfaatkan **helper** untuk menampikan kapan meme itu dibuat.
Dengan format `<mm> minutes ago` atau `<hh> hours ago` berdasarkan `createdAt`.
```txt
Contoh: `createdAt` memiliki value _2020-05-01 10:00:00_
- Jika waktu saat ini adalah _2020-05-01 10:12:00_, maka tampilkan _12 minutes ago_
- Jika waktu saat ini adalah _2020-05-01 13:30:00_, maka tampilkan _3 hours ago_

gunakan new Date() untuk mendapatkan waktu saat ini.
```

Buatlah sebuah tombol/link untuk menambahkan meme baru dengan nama 'Add Meme' yang akan mengarahkan ke routing `GET /memes/add`.

![release 5](./assets/release-5.png)


## Release 6 (11 Point)
Pada route `GET /memes/add`, akan menampilkan form untuk menambahkan `Meme` baru yang memiliki beberapa input:
1. Title => Text
1. Author => Text
2. Image => Text
3. Category => Select option yang value nya diambil dari data Catetgories pada database,
pada ejs menampilkan name dan description dengan format `name - description`.
4. Submit

Setiap meme yang baru dibuat akan memiliki `votes 0` dan `isFunny false` gunakanlah Hooks.
Setelah di submit data akan bertambah dan kembali ke halaman `GET /`.

Buatlah validasi dimana seluruh data harus terisi dan tampilkan error jika ada data yang tidak diisi (boleh menggunakan res.send selama error message nya jelas).

```txt
Jika kamu membutuhkan link meme untuk mencoba create, silahkan gunakan link berikut :
http://arah.in/memes-1
http://arah.in/memes-2
http://arah.in/memes-3
http://arah.in/memes-4
http://arah.in/memes-5
```

## Release 7 (21 Point)

Untuk route `GET /categories/:id`, akan menampilkan data `Meme` dengan status **isFunny false** yang akan di-vote (action) dalam table

### Table
bentuk table yang memiliki kolom sebagai berikut:
1. image => gambar dari imageURL
2. Title => title meme
3. Author => name author
4. Total Votes => menampilkan votes
5. Status => manfaatkan **instance method** `showStatus`
    - `Standard`, jika votes masih 0
    - `Good`, Jika votes tidak 0 dan isFunny false
    - `Funny`, jika isFuny true
6. Action

pada kolom action terdapat tombol/link `Vote` yang akan menambahkan votes `Meme` melalui routing `GET /memes/:id/vote`.

setelah tombol `Vote` ditekan, kembali lagi ke halaman `GET /categories/:id`.

Jika votes sudah mencapai 10, maka tombol/link `Vote` berubah menjadi `Is Funny` yang akan mengarahkan ke routing `GET /memes/:id/funny`, yang akan mengubah isFunny `Meme` menjadi true.

setelah tombol `Is Funny` ditekan, kembali lagi ke halaman `GET /categories/:id` dan `Meme` tersebut tidak akan muncul di list.

### Link

Diatas table list meme tampilkanlah tombol/link untuk menuju ke category yang lain selain dari yang dipilih secara **dinamis**, gunakanlah chaining untuk masalah ini.

**CASE :**
Misalkan kita sedang berada di meme dengan category `Animals` berarti dibawah table list meme, tampilkan tombol/link menuju category `Technology, Anime & Manga, School, dan Random`.

![release 8](./assets/vote-funny-button.png)

## Release 9 (12 Point)
Tambahkan sebuah input untuk fitur search berdasarkan title pada halaman `Meme List` ( `GET /`).

Data yang didapat akan ditampilkan pada halaman yang sama atau `GET /`.

Notes: pencarian tidak case sensitive.

![release 9](./assets/release-9.png)
