<template>
    <div class="offcanvas offcanvas-end" data-bs-scroll="true" tabindex="-1" id="offcanvasCart"
        aria-labelledby="My Cart">
        <div class="offcanvas-header justify-content-end">
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <div class="order-md-last">
                <h4 class="d-flex justify-content-between align-items-center mb-3">
                    <span class="text-dark">Your cart</span>
                    <span class="badge bg-dark rounded-pill">2</span>
                </h4>
                <ul class="list-group mb-3">
                    <li class="list-group-item d-flex justify-content-between lh-sm">
                        <div>
                            <div class=" ">
                                <img src="https://m.media-amazon.com/images/I/81MNZIQ65RL._SX679_.jpg"
                                    class="tab-image " style="height: 70px; width: 70px;"></img>
                            </div>
                            <h6 class="my-0">II WAAREE II Bifacial 550 Watt Pack of 4 II High Efficiency II Dual Glass
                                Bifacial Mono
                                PERC Solar</h6>
                            <div class="my-2 row align-items-center">
                                <div class="col-6">
                                    <div class="input-group product-qty">
                                        <span class="input-group-btn">
                                            <button type="button" class="quantity-left-minus btn border btn-number"
                                                data-type="minus">
                                                <i class="fas fa-minus"></i>
                                            </button>
                                        </span>
                                        <input type="text" id="quantity" name="quantity"
                                            class="form-control input-number text-center" value="1">
                                        <span class="input-group-btn">
                                            <button type="button" class="quantity-right-plus btn border btn-number"
                                                data-type="plus">
                                                <i class="fas fa-plus"></i>
                                            </button>
                                        </span>
                                    </div>
                                </div>
                                <div class="col-6 text-end">
                                    <h6 class="text-body-secondary mb-0">₹70,000</h6>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="list-group-item d-flex justify-content-between lh-sm">
                        <div>
                            <div class=" ">
                                <img src="https://m.media-amazon.com/images/I/81MNZIQ65RL._SX679_.jpg"
                                    class="tab-image " style="height: 70px; width: 70px;"></img>
                            </div>
                            <h6 class="my-0">II WAAREE II Bifacial 550 Watt Pack of 4 II High Efficiency II Dual Glass
                                Bifacial Mono
                                PERC Solar</h6>
                            <div class="my-2 row align-items-center">
                                <div class="col-6">
                                    <div class="input-group product-qty">
                                        <span class="input-group-btn">
                                            <button type="button" class="quantity-left-minus btn border btn-number"
                                                data-type="minus">
                                                <i class="fas fa-minus"></i>
                                            </button>
                                        </span>
                                        <input type="text" id="quantity" name="quantity"
                                            class="form-control input-number text-center" value="1">
                                        <span class="input-group-btn">
                                            <button type="button" class="quantity-right-plus btn border btn-number"
                                                data-type="plus">
                                                <i class="fas fa-plus"></i>
                                            </button>
                                        </span>
                                    </div>
                                </div>
                                <div class="col-6 text-end">
                                    <h6 class="text-body-secondary mb-0">₹70,000</h6>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="list-group-item d-flex justify-content-between ">
                        <span>Total </span>
                        <h5 class="mt-1">₹1,40,000</h5>
                    </li>
                </ul>

                <router-link to="/cart">
                    <button class="w-100 btn btn-dark btn-lg" type="submit"
                        @click="closeOffcanvas('offcanvasCart')">Continue to checkout</button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
 

// Existing Offcanvas function
function closeOffcanvas(offcanvasId) {
    const offcanvasEl = document.getElementById(offcanvasId);
    const bsOffcanvas = Offcanvas.getInstance(offcanvasEl);

    if (bsOffcanvas) {
        // Hide the offcanvas
        bsOffcanvas.hide();

        // Restore scrolling after Bootstrap's transition (default 300ms)
        setTimeout(() => {
            const backdrop = document.querySelector('.offcanvas-backdrop');
            if (backdrop) backdrop.remove();

            // Restore page scroll
            document.body.style.overflow = '';
            document.body.style.paddingRight = ''; // optional, in case Bootstrap added padding
        }, 300);
    }
}</script>