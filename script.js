// 1. Kode untuk merapikan URL (Menghilangkan .html)
if (window.location.pathname.endsWith(".html")) {
    const cleanUrl = window.location.pathname.replace(/\.html$/, "");
    window.history.replaceState(null, "", cleanUrl);
}

// 2. Alamat bot VynzzHost (Port disesuaikan ke 25578 sesuai gambar panel kamu)
const URL_BOT_DISCORD = 'http://vynzzhost-properties:25578/order-masuk';

// 3. Fungsi utama untuk mengirim data ke Bot Discord
async function kirimOrderan(id, item, harga, nama, nomorWa) {
    try {
        await fetch(URL_BOT_DISCORD, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                order_id: id,
                produk: item,
                harga: harga,
                pembeli: nama,
                wa: nomorWa // Menambahkan data WA agar admin bisa klik hubungi
            })
        });
        console.log("Data berhasil terkirim ke Bot VynzzHost");
    } catch (err) {
        // Jika gagal, cek apakah bot di panel VynzzHost sedang 'Running'
        console.error("Gagal lapor ke bot: ", err);
    }
}
