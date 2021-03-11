Vue.config.devtools = true
Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">

        <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
                <li v-for="error in errors">{{error}}</li>
            </ul>
        </p>
        <p>
            <label for="name">Name:</label>
            <input v-model="name">
        </p>
        <p>
            <label for="review">Review:</label>
            <textarea id="review" v-model="review"></textarea>
        </p>
        <p>
            <label for="rating">Rating:</label>
            <select id="rating" v-model.number="rating">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </select>
        </p>
        <p>
            <input type="submit" value="submit">
        </p>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors:[]
        }
    },
    methods: {
        onSubmit() {
            if (this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                }
            }
            else {
                if (!this.name) this.errors.push("Name required")
                if (!this.review) this.errors.push("Review required")
                if (!this.rating)this.errors.push("Rating required")
            }
            this.$emit('review-submitted', productReview)
            this.name = null
            this.review = null
            this.rating = null
        }
    }
})
Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: `<div>
        <h2>Product Details</h2>
        <ul v-for="detail in details">
            <li>{{detail}}</li>
        </ul>
    </div>`
})

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

                    
                    
                    <h2>Sizes</h2>
                    <ul v-for="size in sizes">
                        <li>{{size}}</li>
                    </ul>

                    <div v-for="(variant, index) in variants" :key="variant.variantId"
                    class="color-box"
                    :style="{backgroundColor: variant.variantColor}"
                    @mouseover="updateProduct(index)">
                    </div>


                    <div>
                        <button v-on:click="addToCart" :disabled="!inStock"
                        :class="{disabledButton:!inStock}">Add to Cart</button>
                    </div>
                    <div>
                        <button v-on:click="removeFromCart" :disabled="!inStock"
                        :class="{disabledButton:!inStock}">Remove from Cart</button>
                    </div>
                </div>
                <div>
                    <h2>Reviews</h2>
                    <p v-if="!reviews.length"> There are no reviews yet.</p>
                    <ul>
                        <li v-for="review in reviews">
                            <p>{{review.name}}</p>
                            <p>{{review.rating}}</p>
                            <p>{{review.review}}</p>
                        </li>
                    </ul>
                </div>
                <product-review @review-submitted="addReview"></product-review>
            </div>
            <div class="app-footer">
                <p>Desarrollado por : <a v-bind:href="link">pauloguerraf.dev</a></p>
            </div>
            
            
            `,
    data() {
        return {
            brand: 'VueMastery',
            product: 'Las Medias',
            selectedVariant: 0,
            inventory: 0,
            link: 'https://pauloguerraf.dev',
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
                    variantQuantity: 2,
                    variantOnSale: false
                }
            ],
            sizes: ["XS", "S", "M", "L", "XL"],
            reviews:[]
        }            
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        removeFromCart() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
        },
        updateProduct (index) {
            this.selectedVariant = index
            this.inventory = this.variants[this.selectedVariant].variantQuantity
        },
        addReview(productReview) {
            this.reviews.push(productReview)
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
        premium: false,
        details: ["80% algodón", "20% poliéster", "género neutro"],
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        },
        removeProduct(id) {
            const index = this.cart.indexOf(id)
            if(index >- 1)this.cart.splice(index, 1)
        }
    }
})