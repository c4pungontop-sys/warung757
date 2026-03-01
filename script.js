function kirimOrderKeDiscord(dataOrder) {
    // URL ini sesuaikan dengan IP Server/VPS tempat Mas running index.js
    // Kalau tes di laptop sendiri gunakan http://localhost:3000/send-order
    fetch('http://localhost:3000/send-order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            orderId: dataOrder.id,
            item: dataOrder.namaProduk,
            price: dataOrder.total,
            customer: dataOrder.namaPembeli
        }),
    })
    .then(response => response.json())
    .then(data => console.log('Sukses:', data))
    .catch((error) => console.error('Error:', error));
}

// Contoh cara pakenya:
// kirimOrderKeDiscord({ id: '123', namaProduk: 'Kopi Hitam', total: '5.000', namaPembeli: 'Mas Bro' });

// 3. Kode bawaan kamu untuk merapikan URL agar tidak ada .html
if (window.location.pathname.endsWith(".html")) {
    const cleanUrl = window.location.pathname.replace(/\.html$/, "");
    window.history.replaceState(null, "", cleanUrl);
}
