const findIndexProductInListData = (listData, idProduct) => {
    return listData.findIndex((item) => item.id === idProduct);
};
const findIdProductInCart = (id, cart) => {
    return cart.findIndex((product) => product.idProduct === id);
};
const getByIDProduct = (listData, idProduct) => {
    return listData[findIndexProductInListData(listData, idProduct)];
};

//Calculate total of a product => list of total of each product
const getTotalPriceEachProduct = (listData, cart) => {
    return cart.map((item) => {
        const product = getByIDProduct(listData, item.idProduct);
        return product.price * item.quantity;
    });
};

//Calculate total price of all products
const getTotalPriceAllProducts = (listData, cart) =>
    getTotalPriceEachProduct(listData, cart).reduce((a, b) => a + b, 0);

//Calculate total quantity of all products
const getTotalQuantityAllProducts = (cart) => {
    return cart.reduce((a, b) => a + b.quantity, 0);
};

//Get info to save in bill(post API)
const getItemNumbers = (cart) => {
    return cart.length;
};
// Create bill detail for each shopping cart
const createBillDetail = (listData, cart) => {
    return cart.map((item) => {
        const product = getByIDProduct(listData, item.idProduct);
        return {
            idProduct: product.id,
            name: product.name,
            quantity: item.quantity,
            subTotal: product.price,
            total: product.price * item.quantity,
        };
    });
};

export {
    getTotalPriceEachProduct,
    getTotalPriceAllProducts,
    getTotalQuantityAllProducts,
    getByIDProduct,
    getItemNumbers,
    createBillDetail,
    findIdProductInCart
};
