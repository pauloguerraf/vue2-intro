var app = new Vue({
    el: '#app',
    data: {
        brand: 'VueMastery',
        product: 'Las Medias',
        selectedVariant: 0,
        inventory: 0,
        link: 'https://pauloguerraf.dev',
        details: ["80% algodón", "20% poliéster", "género neutro"],
        variants: [
            {
                variantId: 2234,
                variantColor: "green",
                variantImage: "./assets/socks_green.jpg",
                variantQuantity: 10,
                variantOnSale: true
            },
            {
                variantId: 2235,
                variantColor: "blue",
                variantImage: "./assets/socks_blue.jpg",
                variantQuantity: 0,
                variantOnSale: false
            }
        ],
        sizes: ["XS", "S", "M", "L", "XL"],
        cart: 0
    },
    methods: {
        addToCart: function () {
            this.cart += 1
        },
        updateProduct (index) {
            this.selectedVariant = index
            this.inventory = this.variants[this.selectedVariant].variantQuantity
        }
    },
    computed: {
        title() {
            return this.product + ' ' + this.brand
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        onSale() {
            return this.variants[this.selectedVariant].variantOnSale
        }
    }
})