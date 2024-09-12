import { keyLocalStorageListSP, keyLocalStorageItemCart } from "./listData.js";
import library from "./file.js";

import {
    renderProducts_main,
    renderShoppingCart_main,
    renderClientInfo_main,
    renderBill_main,
} from "./renderUI.js";
import {
    getTotalPriceAllProducts,
    getByIDProduct,
    getTotalQuantityAllProducts,
    getItemNumbers,
    getTotalPriceEachProduct,
    createBillDetail,
} from "./shoppingCart.js";

import {
    checkError_groupInputName,
    checkError_inputEmail,
    checkError_inputPhoneNumber,
    checkError_inputLocation,
    handleOnFocusInput_clearInputError,
    eventSelectLocation,
} from "./clientInfo.js";

// First call API
const [dataProvince, dataDistrict, dataWard] = await library.getLocation();

//Overlay
const overlay = document.querySelector(".overlay");
const openOverlay = () => {
    overlay.classList.add("active");
    navBarContent.classList.add("overlay-active");
};
const openOverlay_disabledNavbar = () => {
    overlay.classList.add("active");
    navBarContent.classList.add("overlay-active");
    navBarContent.classList.add("disabled");
};
const closeOverlay = () => {
    overlay.classList.remove("active");
    navBarContent.classList.remove("overlay-active");
    navBarContent.classList.remove("disabled");
};
// Navbar
const navBarContent = document.getElementById("navbar");
const navBars = document.querySelector(".navbar__bars");
const navbarGroupBtn = document.querySelector(".navbar__group-btn");

//On mobile click navbar_bars
navBars.addEventListener("click", () => {
    openOverlay();
    navbarGroupBtn.classList.add("active-mobile");
    document.body.style.overflow = "hidden"; //Prevent scroll when overlay is active
});
const removeActiveOverlay = () => {
    closeOverlay();
    navbarGroupBtn.classList.remove("active-mobile");
    document.body.style.overflow = "visible"; //Allow scroll when overlay is not active
};
//On mobile close overlay = click overlay
overlay.addEventListener("click", removeActiveOverlay);
// On mobile close overlay = click navbarGroupBtn
navbarGroupBtn.addEventListener("click", removeActiveOverlay);

//Get list data from local storage
let listDataFromLocalStorage = library.getLocalStorage(keyLocalStorageListSP);

//Home page
//Default render home page
renderProducts_main(listDataFromLocalStorage);

const btnHomePage = document.querySelector(".nav-btn--home");
// All event of add product to cart
const handleHomePage_main = () => {
    const findIdProductInCart = (id) => {
        return cart.findIndex((product) => product.idProduct === id);
    };

    const addProduct = (i) => {
        // idProduct = i + 1 (i = index of btn of group_plusCart)
        const index = findIdProductInCart(i + 1);

        if (index !== -1) {
            cart[index].quantity += 1;
        } else {
            cart.push({ idProduct: i + 1, quantity: 1 });
        }
        library.setLocalStorage(keyLocalStorageItemCart, cart);
    };

    const group_plusCart = document.querySelectorAll(".cart-plus");
    group_plusCart.forEach((btnPlusCart, i) => {
        // Index of product in listDataFromLocalStorage = index of button in group_plusCart + 1
        btnPlusCart.addEventListener("click", () => addProduct(i));
    });
};
handleHomePage_main();

btnHomePage.addEventListener("click", () => {
    renderProducts_main(listDataFromLocalStorage);
    handleHomePage_main();
});

//Shopping cart
let cart = library.getLocalStorage(keyLocalStorageItemCart) || [];
const reRenderTotalEachProduct = (index) => {
    const totalEachProduct = getTotalPriceEachProduct(
        listDataFromLocalStorage,
        cart
    )[index];
    document.querySelectorAll("td.tbl__total")[
        index
    ].innerText = `$${totalEachProduct}`;
};
const reRenderTotalAllProducts = () => {
    const totalAllProducts = getTotalPriceAllProducts(
        listDataFromLocalStorage,
        cart
    );
    document.querySelector(
        ".summary__total h2"
    ).innerText = `Total: $${totalAllProducts}`;
};
const handleMinusQuantity = () => {
    const groupQuantity = document.querySelectorAll("td.tbl__quantity");

    groupQuantity.forEach((quantityElement, i) => {
        quantityElement
            .querySelector("i:first-child")
            .addEventListener("click", () => {
                if (cart[i].quantity > 0) {
                    cart[i].quantity -= 1;
                    quantityElement.querySelector("p").innerText =
                        cart[i].quantity;

                    library.setLocalStorage(keyLocalStorageItemCart, cart);
                    reRenderTotalEachProduct(i);
                    reRenderTotalAllProducts();
                }
            });
    });
};

const handlePlusQuantity = () => {
    const groupQuantity = document.querySelectorAll("td.tbl__quantity");

    groupQuantity.forEach((quantityElement, i) => {
        const productInListData = getByIDProduct(
            listDataFromLocalStorage,
            cart[i].idProduct
        );
        quantityElement
            .querySelector("i:last-child")
            .addEventListener("click", () => {
                if (cart[i].quantity < productInListData.quantity) {
                    cart[i].quantity += 1;
                    quantityElement.querySelector("p").innerText =
                        cart[i].quantity;

                    library.setLocalStorage(keyLocalStorageItemCart, cart);
                    reRenderTotalEachProduct(i);
                    reRenderTotalAllProducts();
                }
            });
    });
};

const handleBackToShopping = () => {
    document.querySelector(".btn-back").addEventListener("click", () => {
        renderProducts_main(listDataFromLocalStorage);
        handleHomePage_main();
    });
};
const clearCart = () => {
    cart = [];
    library.setLocalStorage(keyLocalStorageItemCart, cart);
};

//Client info
const closeClientInfo = () => {
    closeOverlay();
    renderShoppingCart_main(checkCartIsNull(), listDataFromLocalStorage, cart);
    handleShoppingCart_main();
};

const handleCloseClientInfo = () => {
    const btnClose = document.querySelector(".form__heading i");
    const btnClose2 = document.querySelector(".form__group-btn button");
    btnClose.addEventListener("click", closeClientInfo);
    overlay.addEventListener("click", closeClientInfo);
    btnClose2.addEventListener("click", closeClientInfo);
};

const handleSubmitClientInfo = () => {
    const btnSubmit = document.querySelector(
        "form .form__group-btn button:last-child"
    );

    const groupErrorMessage = document.querySelectorAll(".form-error");
    const groupInput = document.querySelectorAll(".form-input");

    handleOnFocusInput_clearInputError(groupInput);

    btnSubmit.addEventListener("click", () => {
        const nameIsCorrect = checkError_groupInputName(
            groupErrorMessage,
            groupInput
        );
        const emailIsCorrect = checkError_inputEmail(
            groupErrorMessage,
            groupInput
        );
        const phoneNumberIsCorrect = checkError_inputPhoneNumber(
            groupErrorMessage,
            groupInput
        );
        const locationIsCorrect = checkError_inputLocation(
            groupErrorMessage,
            groupInput
        );

        if (
            nameIsCorrect &&
            emailIsCorrect &&
            phoneNumberIsCorrect &&
            locationIsCorrect
        ) {
            library.createBill_POST(
                `${groupInput[0].value} ${groupInput[1].value}`,
                getItemNumbers(cart),
                getTotalQuantityAllProducts(cart),
                getTotalPriceAllProducts(listDataFromLocalStorage, cart),
                createBillDetail(listDataFromLocalStorage, cart)
            );
            listDataFromLocalStorage = library.updateListData(
                listDataFromLocalStorage
            );
            alert("Buy successfully!");
            clearCart();

            removeActiveOverlay();
            renderProducts_main(listDataFromLocalStorage);
        }
    });
};

const handleClientInfo_main = () => {
    handleCloseClientInfo();
    handleSubmitClientInfo();
    eventSelectLocation(dataDistrict, dataWard);
};

const handleOpenClientInfo = () => {
    const btnBuy = document.querySelector("button.btn-buy");

    btnBuy.addEventListener("click", () => {
        openOverlay_disabledNavbar();
        renderClientInfo_main(dataProvince);
        handleClientInfo_main();
    });
};

const handleShoppingCart_main = () => {
    if (cart.length !== 0) {
        handleMinusQuantity();
        handlePlusQuantity();
        handleClearCart();
        handleOpenClientInfo();
    }
    handleBackToShopping();
};
const handleClearCart = () => {
    const groupClearCart = document.querySelectorAll("td.tbl__clear-cart i");
    groupClearCart.forEach((clearCartBtn, i) => {
        clearCartBtn.addEventListener("click", () => {
            if (confirm("Are you sure you want to delete this product?")) {
                cart.splice(i, 1);
                library.setLocalStorage(keyLocalStorageItemCart, cart);
                renderShoppingCart_main(
                    checkCartIsNull(),
                    listDataFromLocalStorage,
                    cart
                );
                handleShoppingCart_main();
            }
        });
    });
};

//Check cart is null?
const checkCartIsNull = () => {
    return cart.length === 0 ? true : false;
};

const cartPage = document.querySelector(".nav-btn--cart");
cartPage.addEventListener("click", () => {
    renderShoppingCart_main(checkCartIsNull(), listDataFromLocalStorage, cart);
    handleShoppingCart_main();
});

//Render bill to main
const handleRemoveBill = (bills) => {
    const groupRemoveBill = document.querySelectorAll("table.table-bill i");

    groupRemoveBill.forEach((btnBill, i) => {
        btnBill.addEventListener("click", () => {
            if (confirm("Are you sure you want to delete this bill?")) {
                library.deleteBill_DELETE(bills[i].id);
                bills.splice(i, 1);
                renderBill_main(bills);
                handleBill_main();
            }
        });
    });
};
const preventSelectDetails = () => {
    const groupSelectElement = document.querySelectorAll(".details");

    groupSelectElement.forEach((element) => {
        const defaultValue = element.value;
        element.addEventListener("change", (e) => {
            e.target.value = defaultValue;
        });
    });
};
const btnBill = document.querySelector(".nav-btn--bill");
const handleBill_main = async () => {
    const bills = await library.getBill_GET();
    renderBill_main(bills);
    if (bills.length !== 0) {
        handleRemoveBill(bills);
        preventSelectDetails();
    }
    handleBackToShopping();
};
btnBill.addEventListener("click", handleBill_main);
