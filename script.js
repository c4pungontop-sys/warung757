import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// 1. Inisialisasi Database (Pastikan Config Firebase sudah ada di HTML)
const db = getDatabase();

// 2. Fungsi Kompresi Gambar (Penting agar RAM Hosting 3GB tidak Crash)
const compressImage = (file) => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const MAX_WIDTH = 500; // Resolusi aman untuk Discord
                let width = img.width;
                let height = img.height;
                if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; }
                canvas.width = width; canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);
                // Kualitas 0.2 agar pengiriman 2 foto super ringan
                resolve(canvas.toDataURL('image/jpeg', 0.2));
            };
        };
    });
};

// 3. Fungsi Utama Pengiriman Order (Gabungan 2 Foto + Firebase)
window.processOrder = async function() {
    const fileBukti = document.getElementById('file-bukti').files[0];
    const fileItem = document.getElementById('item-photo').files[0];
    
    // Validasi Foto Wajib
    if(!fileBukti || !fileItem) {
        return Swal.fire('Data Kurang', 'Foto Item & Bukti Bayar Wajib di-Upload!', 'warning');
    }
    
    Swal.fire({ title: 'Memproses...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

    try {
        // Proses Kompresi 2 Gambar sekaligus
        const imgBukti64 = await compressImage(fileBukti);
        const imgItem64 = await compressImage(fileItem);
        
        // Perhitungan Harga Presisi (Mencegah Rp 0)
        const jumlahZem = parseInt(document.getElementById('jumlah-zem').value || 0);
        const rateSekarang = window.ACTIVE_RATE || 450; 
        const totalHarga = jumlahZem * rateSekarang;
        
        const trxId = "ZVG-" + Math.floor(100000 + Math.random() * 900000);
        const waktu = new Date().toLocaleString('id-ID');

        const dataOrder = {
            id: String(trxId),
            product: String(jumlahZem + " ZEM GIFT"),
            price: Number(totalHarga), // Wajib Number agar Bot tidak ExpectedConstraintError
            status: "PROSES",
            idz_penerima: String(document.getElementById('idz-user').value),
            nama_zepeto: String(document.getElementById('name-user').value),
            catatan: String(document.getElementById('catatan-item').value || "-"),
            wa_pembeli: "+62" + String(document.getElementById('wa-user').value),
            email: String(document.getElementById('email-user').value),
            metode: String(window.chosenMethod),
            bukti_bayar: imgBukti64, // Kolom 1
            foto_item: imgItem64,    // Kolom 2 (Pastikan index.js Bot sudah ada kolom ini)
            date: waktu
        };

        // 4. Simpan ke Firebase (Path 'transactions' agar dideteksi Bot)
        await set(ref(db, 'transactions/' + trxId), dataOrder);
        
        // 5. Simpan ke Riwayat Lokal (LocalStorage)
        let history = JSON.parse(localStorage.getItem('zepetoHistory')) || [];
        history.unshift(dataOrder);
        localStorage.setItem('zepetoHistory', JSON.stringify(history));

        Swal.fire('Berhasil!', 'Pesanan sedang diproses admin.', 'success').then(() => {
            window.location.href = 'riwayat-transaksi.html';
        });
        
    } catch(error) {
        console.error("Error Order:", error);
        Swal.fire('Gagal', 'Terjadi kesalahan sistem database.', 'error');
    }
};

// 6. Merapikan URL agar tidak ada .html
if (window.location.pathname.endsWith(".html")) {
    const cleanUrl = window.location.pathname.replace(/\.html$/, "");
    window.history.replaceState(null, "", cleanUrl);
}
