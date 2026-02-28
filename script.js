// 1. Merapikan URL (Menghilangkan .html)
if (window.location.pathname.endsWith(".html")) {
    const cleanUrl = window.location.pathname.replace(/\.html$/, "");
    window.history.replaceState(null, "", cleanUrl);
}

// 2. Alamat Bot (Sesuaikan Port 25578 dari gambar panel VynzzHost kamu)
const URL_BOT = 'http://vynzzhost-properties:25578/order-masuk';

// 3. Fungsi Kirim Data ke Bot Discord
async function kirimOrderan(id, item, harga, nama, nomorWa) {
    try {
        await fetch(URL_BOT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                order_id: id,
                produk: item,
                harga: harga,
                pembeli: nama,
                wa: nomorWa
            })
        });
        console.log("Pesanan terkirim ke Bot Discord!");
    } catch (err) {
        console.error("Koneksi ke bot gagal: ", err);
    }
}
