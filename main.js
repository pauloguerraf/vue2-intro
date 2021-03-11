Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template:`<div class="product">
                <div class="product-image">
                    <img v-bind:src="image">
                </div>
                <div class="product-info">
                    <h1>{{title}}</h1>
                    <p v-if="onSale">{{title}} están On Sale!</p>
                    <p v-else><br></p>
                    <div>
                        <p v-if="inStock">Si hay</p>
                        <p v-else :class="{lineThrough:!inStock}">Ya no hay</p>
                        <p>Shipping: {{shipping}} </p>
                    </div>

                    <h2>Details</h2>
                    <ul v-for="detail in details">
                        <li>{{detail}}</li>
                    </ul>

                    <h2>Sizes</h2>
                    <ul v-for="size in sizes">
                        <li>{{size}}</li>
                    </ul>

                    <div v-for="(variant, index) in variants" :key="variant.variantId"
                    class="color-box"
                    :style="{backgroundColor: variant.variantColor}"
                    @mouseover="updateProduct(index)">
                    </div>


                    <button v-on:click="addToCart" :disabled="!inStock"
                    :class="{disabledButton:!inStock}">Add to Cart</button>

                    <div class="cart">
                        <p>Cart ({{cart}})</p>
                    </div>
                </div>
            </div>
            <div class="app-footer">
                <p>Desarrollado por : <a v-bind:href="link">pauloguerraf.dev</a></p>
            </div>`,
    data() {
        return {
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
            cart: 0,
        }            
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
        },
        shipping() {
            if (this.premium) {
                return "free"
            }
            return 2.99
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        premium: false
    }
})