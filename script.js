import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// Fungsi yang dipanggil saat user selesai bayar/klik order
function kirimKeFirebase(idTrx, namaProduk, hargaProduk) {
    const db = getDatabase();
    const waktu = new Date().toLocaleString('id-ID');

    const dataOrder = {
        id: idTrx,
        product: namaProduk,
        price: hargaProduk,
        date: waktu,
        status: "PROSES" // Status awal wajib PROSES agar bot mendeteksi
    };

    // Simpan ke path 'transactions' agar terbaca bot dan riwayat-transaksi.html
    set(ref(db, 'transactions/' + idTrx), dataOrder);
}

// 3. Kode bawaan kamu untuk merapikan URL agar tidak ada .html
if (window.location.pathname.endsWith(".html")) {
    const cleanUrl = window.location.pathname.replace(/\.html$/, "");
    window.history.replaceState(null, "", cleanUrl);
}
