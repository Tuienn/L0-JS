const findIndexProductInListData = (listData, idProduct) => {
    return listData.findIndex((item) => item.id === idProduct);
};
const getByIDProduct = (listData, idProduct) => {
    return listData[findIndexProductInListData(listData, idProduct)];
};

//Calculate total of a product => list of total of each product
const totalPriceEachProduct = (listData, cart) => {
    return cart.map((item) => {
        const product = getByIDProduct(listData, item.idProduct);
        return product.price * item.quantity;
    });
};

//Calculate total price of all products
const totalPriceAllProducts = (listData, cart) =>
    totalPriceEachProduct(listData, cart).reduce((a, b) => a + b, 0);

//Calculate total quantity of all products
const totalQuantityAllProducts = (cart) => {
    return cart.reduce((a, b) => a + b.quantity, 0);
};

export {
    totalPriceEachProduct,
    totalPriceAllProducts,
    totalQuantityAllProducts,
    getByIDProduct,
};
