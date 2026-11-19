// ===================================================================
//  DAFTAR BANDING
//  Untuk menambah / mengubah banding, cukup edit daftar di bawah ini.
//  - nama : teks yang tampil di kotak
//  - link : alamat tujuan saat kotak di-klik (ganti "#" dengan link asli)
//  - singkatan (opsional): singkatan/kata kunci tambahan, contoh:
//      { nama: "Salah Pack", link: "#", singkatan: ["SPK", "packing"] }
//
//  Singkatan dari huruf depan tiap kata dibuat OTOMATIS, contoh:
//    "Tingkat Pengiriman Tepat Waktu Normal" -> TPTWN
//    sehingga mengetik "TPTW" akan menampilkan semua
//    "Tingkat Pengiriman Tepat Waktu ..."
// ===================================================================
const bandingList = [
  { nama: "Tingkat Pengiriman Tepat Waktu Normal", link: "https://jtexpress.feishu.cn/wiki/T57XwPhp8isL7IkkY0bc85lUnEc?from=from_copylink" },
  { nama: "Tingkat Pengiriman Tepat Waktu Retur", link: "https://jtexpress.feishu.cn/wiki/T57XwPhp8isL7IkkY0bc85lUnEc?from=from_copylink" },
  { nama: "Cross Pick Up Agent", link: "https://forms.gle/rVAwdXq2ySLdc9rw8" },
  { nama: "AWB Stuck", link: "https://docs.google.com/spreadsheets/d/1R3XjeJyo1-nXHAu6oaGJxgIRWdeFEmUAhuqYe-nW6cs/edit?gid=779833622#gid=779833622" },
  { nama: "TTD RETUR LUAR CANGKUPAN", link: "https://docs.google.com/spreadsheets/d/13wfHPS2pNIS3bcGArRDybOHjLfhnrvgosDr2Cv9-qXI/edit?gid=1960388129#gid=1960388129" },
  { nama: "KODE RETUR & PICKUP FULLFILMENT", link: "https://docs.google.com/spreadsheets/d/13wfHPS2pNIS3bcGArRDybOHjLfhnrvgosDr2Cv9-qXI/edit?gid=1960388129#gid=1960388129" },
  { nama: "MAINTAIN KODE RETUR", link: "https://docs.google.com/spreadsheets/d/13wfHPS2pNIS3bcGArRDybOHjLfhnrvgosDr2Cv9-qXI/edit?gid=1960388129#gid=1960388129" },
  { nama: "LONGLAT SELLER DILUAR CAKUPAN", link: "https://docs.google.com/spreadsheets/d/13wfHPS2pNIS3bcGArRDybOHjLfhnrvgosDr2Cv9-qXI/edit?gid=1960388129#gid=1960388129" },
  { nama: "PIC OUTGOING", link: "https://docs.google.com/spreadsheets/d/13wfHPS2pNIS3bcGArRDybOHjLfhnrvgosDr2Cv9-qXI/edit?gid=1960388129#gid=1960388129" },
];

// ===================================================================
//  Tidak perlu diubah di bawah ini
// ===================================================================
const listEl = document.getElementById("banding-list");
const searchEl = document.getElementById("search");
const emptyEl = document.getElementById("empty");

// Singkatan otomatis: huruf pertama tiap kata, mis. "Salah Pack" -> "sp"
function buatSingkatan(nama) {
  return nama
    .split(/\s+/)
    .filter(Boolean)
    .map((kata) => kata[0])
    .join("")
    .toLowerCase();
}

// Siapkan teks yang bisa dicari untuk tiap banding
const dataCari = bandingList.map((b) => ({
  ...b,
  namaKecil: b.nama.toLowerCase(),
  semuaSingkatan: [buatSingkatan(b.nama), ...(b.singkatan || [])].map((s) =>
    s.toLowerCase()
  ),
}));

// Setiap kata yang diketik harus cocok dengan nama ATAU singkatan.
// Contoh: "tptw retur" -> "tptw" cocok singkatan, "retur" cocok nama.
function cocok(b, kataKunci) {
  return kataKunci.every(
    (k) =>
      b.namaKecil.includes(k) || b.semuaSingkatan.some((s) => s.includes(k))
  );
}

function render(keyword) {
  const kataKunci = keyword.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const hasil = dataCari.filter((b) => cocok(b, kataKunci));

  listEl.innerHTML = "";
  hasil.forEach((b) => {
    const a = document.createElement("a");
    a.className = "banding-item";
    a.href = b.link;
    a.textContent = b.nama;
    if (b.link !== "#") {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }
    listEl.appendChild(a);
  });

  emptyEl.hidden = hasil.length > 0;
}

searchEl.addEventListener("input", () => render(searchEl.value));
render("");
