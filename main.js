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
                variantColor: "green",
                variantImage: "./assets/socks_green.jpg"
            },
            {
                variantId: 2235,
                variantColor: "blue",
                variantImage: "./assets/socks_blue.jpg"
            }
        ],
        sizes: ["XS", "S", "M", "L", "XL"],
        cart: 0
    },
    methods: {
        addToCart: function () {
            this.cart += 1
        },
        updateProduct: function (variantImage) {
            this.image = variantImage
        }
    }
})