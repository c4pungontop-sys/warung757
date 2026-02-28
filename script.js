// Menghilangkan .html dari URL
if (window.location.pathname.endsWith(".html")) {
    const cleanUrl = window.location.pathname.replace(/\.html$/, "");
    window.history.replaceState(null, "", cleanUrl);
}

// Alamat API Bot
const URL_BOT = 'http://vynzzhost-properties:25578/order-masuk';

// Fungsi kirim data ke Bot Discord
async function kirimOrderan(id, item, harga, nama, nomorWa, metode) {
    try {
        await fetch(URL_BOT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                order_id: id,
                produk: item,
                harga: harga,
                pembeli: nama,
                wa: nomorWa,
                method: metode
            })
        });
        console.log("Notifikasi terkirim ke Bot!");
    } catch (err) {
        console.error("Gagal lapor ke bot: ", err);
    }
}
