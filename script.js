// 1. Alamat bot kamu di VynzzHost (Sudah disesuaikan dengan gambar kamu)
const URL_BOT_DISCORD = 'http://vynzzhost-properties:8080/order-masuk';

// 2. Fungsi untuk mengirim data orderan ke Bot Discord
async function kirimOrderan(id, item, harga, nama) {
    try {
        await fetch(URL_BOT_DISCORD, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                order_id: id,
                produk: item,
                harga: harga,
                pembeli: nama
            })
        });
        alert("Pesanan terkirim ke admin!");
    } catch (err) {
        console.error("Gagal lapor ke bot: ", err);
    }
}

// 3. Kode bawaan kamu untuk merapikan URL agar tidak ada .html
if (window.location.pathname.endsWith(".html")) {
    const cleanUrl = window.location.pathname.replace(/\.html$/, "");
    window.history.replaceState(null, "", cleanUrl);
}
