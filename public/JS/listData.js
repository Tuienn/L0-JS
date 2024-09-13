import library from "./file.js";
//Declare a list of products
let listData = [
    {
        id: 1,
        name: "Nike Air Force 1",
        price: 1000,
        quantity: 100,
        url: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/df4a60dc-5801-4897-96b6-218643b5b4e8/W+NIKE+V2K+RUN.png",
    },
    {
        id: 2,
        name: "Nike Air Max 90",
        price: 1200,
        quantity: 80,
        url: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/1f6fceb7-c776-4b2c-9ada-12a39e10346e/BLAZER+LOW+%2777+VNTG.png",
    },
    {
        id: 3,
        name: "Nike Air Jordan",
        price: 1500,
        quantity: 70,
        url: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/faf9f49d-3136-4a20-b58b-e13dcd9f0e2d/W+NIKE+DOWNSHIFTER+13.png",
    },
    {
        id: 4,
        name: "Nike React Run",
        price: 1800,
        quantity: 90,
        url: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e87fe74f-554c-4824-a788-4ae4f307b2c1/W+BLAZER+LOW+%2777+VNTG.png",
    },
    {
        id: 5,
        name: "Nike ZoomX",
        price: 2000,
        quantity: 60,
        url: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/21713e79-bf62-4d20-8c3c-21bfa4ffffff/W+NIKE+CORTEZ.png",
    },
    {
        id: 6,
        name: "Nike Dunk Low",
        price: 900,
        quantity: 120,
        url: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/03f2c10f-64e4-4f6f-9cbc-a954d1ce0678/W+NIKE+V2K+RUN.png",
    },
    {
        id: 7,
        name: "Nike Blazer Mid",
        price: 1100,
        quantity: 110,
        url: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/483542c8-030b-4531-b50c-9a9024e0471b/W+AIR+MAX+PLUS.png",
    },
    {
        id: 8,
        name: "Nike Pegasus",
        price: 950,
        quantity: 95,
        url: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/ee32714e-ddf8-4312-b263-919a7d0a9e22/KILLSHOT+2.png",
    },
    {
        id: 9,
        name: "Nike Air Zoom",
        price: 1300,
        quantity: 85,
        url: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/489b06f3-42b4-45a2-aa75-4cfb16ac2e71/NIKE+COURT+VISION+LO+NN.png",
    },
    {
        id: 10,
        name: "Nike Metcon 8",
        price: 1700,
        quantity: 75,
        url: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/f9adcbc4-2bd2-4756-a6fe-db4e2be7f671/GIANNIS+FREAK+6+TB+EP.png",
    },
];

//Key value to be used for local storage
const keyLocalStorageListSP = "DANHSACHSP";
const keyLocalStorageItemCart = "DANHSACHITEMCART";

//Set list data into local storage
if (library.getLocalStorage(keyLocalStorageListSP) === null) {
    library.updateListData_afterBuy(listData);
}
//First time, set list data into local storage

export { keyLocalStorageListSP, keyLocalStorageItemCart };
