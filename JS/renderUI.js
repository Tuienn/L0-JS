import {
    getByIDProduct,
    totalPriceEachProduct,
    totalPriceAllProducts,
} from "./shoppingCart.js";

const mainSection = document.getElementById("main");

//Render list products
const renderProducts_main = (listProducts) => {
    const htmls = listProducts.map((product) => {
        return `<div class="col l-3 m-4 c-6">
                        <div class="product">
                            <div class="product--img">
                                <img
                                    src=${product.url}
                                    alt=""
                                />
                                <div class="cart-plus">
                                    <i class="fa-solid fa-cart-plus"></i>
                                </div>
                            </div>
                            <div>
                                <h3 class="product--name">${product.name}</h3>
                                <div>
                                    <p class="product--price">$${product.price}</p>
                                    <p class="product--quantity">
                                        Quantity: ${product.quantity}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>`;
    });
    const html = htmls.join("");
    mainSection.innerHTML = `<div class="row">${html}</div>`;
};

//Render shopping cart
const renderShoppingCart_main = (cartIsNull, listData, cart) => {
    if (cartIsNull === true) {
        mainSection.innerHTML = `<div class="empty-cart">
            <img src="./empty-cart.png" alt="" />
        </div>
        <div class="summary">
            <button class="btn-back">
                <i class="fa-solid fa-arrow-left"></i>
                Back To Shopping
            </button>
            <div class="total" style="display:none">
                <h4>Total: $12500</h4>
                <button class="btn-buy">Buy</button>
            </div>
        </div>`;
    }
    if (cartIsNull === false) {
        const totalPriceEachProduct_arr = totalPriceEachProduct(listData, cart);
        const htmls = cart.map((product, index) => {
            const productInListData = getByIDProduct(
                listData,
                product.idProduct
            );
            return `<tr>
                        <td>
                            <div class="tbl__product-name">
                                <img
                                    src= ${productInListData.url}
                                    alt=""
                                />
                                <div>
                                    <h1>${productInListData.name}</h1>
                                    <p>Quantity: ${productInListData.quantity}</p>
                                </div>
                            </div>
                        </td>
                        <td class="tbl__quantity">
                            <i class="fa-solid fa-minus"></i>
                            <p>${product.quantity}</p>
                            <i class="fa-solid fa-plus"></i>
                        </td>
                        <td>$${productInListData.price}</td>
                        <td class="tbl__total">$${totalPriceEachProduct_arr[index]}</td>
                        <td class="tbl__clear-cart">
                            <i class="fa-regular fa-circle-xmark"></i>
                        </td>
                    </tr>`;
        });

        const table = `<table>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                            <th>Total</th>
                            <th>Clear Cart</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${htmls.join("")}
                    </tbody>
                </table>
                <div class="summary">
                    <button class="btn-back">
                        <i class="fa-solid fa-arrow-left"></i>
                        Back To Shopping
                    </button>
                    <div class="summary__total">
                        <h2>Total: $${totalPriceAllProducts(
                            listData,
                            cart
                        )}</h2>
                        <button class="btn-buy">Buy</button>
                    </div>
                </div>`;

        mainSection.innerHTML = table;
    }
};

const renderClientInfo_main = (dataProvince) => {
    const htmls = dataProvince.map((data) => {
        return `<option value=${data.code}>${data.name}</option>`;
    });
    const html = htmls.join("");

    mainSection.innerHTML = `<form action="">
                    <div class="form__heading">
                        <h1>Thông tin người mua</h1>
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                    <div class="form__main-content">
                        <div class="form-field form-field--name">
                            <label for="input--surname" class="form-label"
                                >Họ và tên<span>*</span></label
                            >
                            <div class="form-field__group-input">
                                <input
                                    type="text"
                                    placeholder="Họ"
                                    id="input--surname"
                                    class="form-input"
                                />

                                <input
                                    type="text"
                                    placeholder="Tên"
                                    class="form-input"
                                />
                            </div>
                            <p class="form-error"></p>
                        </div>
                        <div class="form-field">
                            <label for="input--email"
                                >Email<span>*</span></label
                            >
                            <input
                                type="email"
                                class="form-input"
                                id="input--email"
                                placeholder="Email"
                            />
                            <p class="form-error"></p>
                        </div>
                        <div class="form-field">
                            <label for="input--phone"
                                >Số điện thoại<span>*</span></label
                            >
                            <input
                                type="tel"
                                class="form-input"
                                id="input--phone"
                                placeholder="Số điện thoại"
                            />
                            <p class="form-error"></p>
                        </div>
                        <div class="form-field form-field--address">
                            <label for="input--province"
                                >Địa chỉ<span>*</span></label
                            >
                            <div class="form-field__group-input">
                                <div>
                                    <select
                                        name=""
                                        id="input--province"
                                        class="form-input"
                                    >
                                        <option
                                            value="default"
                                            selected
                                            disabled
                                            hidden
                                        >
                                            Chọn Tỉnh/Thành phố
                                        </option>
                                        ${html}
                                    </select>
                                    <select name="" id="input--district" class="form-input">
                                        <option
                                            value="default"
                                            selected
                                            disabled
                                            hidden
                                        >
                                            Chọn Huyện/Quận
                                        </option>
                                    </select>
                                    <select name="" id="input--ward" class="form-input">
                                        <option
                                            value="default"
                                            selected
                                            disabled
                                            hidden
                                        >
                                            Chọn Xã/Phường
                                        </option>
                                    </select>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Số nhà"
                                    class="form-input"
                                />
                            </div>
                            <p class="form-error"></p>
                        </div>
                        <div class="form-field">
                            <label for="input--note">Lời nhắn</label>
                            <textarea
                                name=""
                                id="input--note"
                                class="form-input"
                            ></textarea>
                        </div>
                    </div>
                    <div class="form__group-btn">
                        <button type="button">Hủy</button>
                        <button type="button">Xác nhận</button>
                    </div>
                </form>`;
};

export { renderProducts_main, renderShoppingCart_main, renderClientInfo_main };
