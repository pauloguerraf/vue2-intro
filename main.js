var app = new Vue({
    el: '#app',
    data: {
        product: 'Las Medias',
        image: './assets/socks_green.jpg',
        link: 'https://pauloguerraf.dev',
        inventory: 0,
        onSale: true,
        details: ["80% algodón", "20% poliéster", "género neutro"],
        variants: [
            {
                variantId: 2234,
                variantColor: "green"
            },
            {
                variantId: 2235,
                variantColor: "blue"
            }
        ],
    sizes: ["XS", "S", "M", "L", "XL"],
    }
})