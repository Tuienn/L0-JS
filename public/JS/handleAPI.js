//Link API thành phố / tỉnh
const APIProvince = "https://provinces.open-api.vn/api/";
//Link API cho quận / huyện
const APIDistrict = "https://provinces.open-api.vn/api/d/";
//Link API cho phường / xã
const APIWard = "https://provinces.open-api.vn/api/w/";
//Link fakeAPI cho bill
const APIBill = "http://localhost:3000/bill";

// Handle with location
const getLocation = async () => {
    const mainContent = document.getElementById("main");
    mainContent.innerHTML = `<div class="loading"></div>`;

    const response = Promise.all([
        fetch(APIProvince),
        fetch(APIDistrict),
        fetch(APIWard),
    ]);
    const data = Promise.all((await response).map((res) => res.json()));
    return data;
};
const [dataProvince, dataDistrict, dataWard] = await getLocation();

//Filter district by province
const getDistrictsByProvinceID = (codeProvince) => {
    const dataDistrictLength = dataDistrict.length;
    const dataDistrictFilter = [];

    for (let i = 0; i < dataDistrictLength; i++) {
        if (dataDistrict[i].province_code == codeProvince) {
            dataDistrictFilter.push(dataDistrict[i]);
            if (dataDistrict[i + 1].province_code != codeProvince) {
                return dataDistrictFilter;
                // optimize code
            }
        }
    }
    return null;
};
//Filter ward by district
const getWardsByDistrictID = (codeDistrict) => {
    const dataWardLength = dataWard.length;
    const dataWardFilter = [];

    for (let i = 0; i < dataWardLength; i++) {
        if (dataWard[i].district_code == codeDistrict) {
            dataWardFilter.push(dataWard[i]);
            if (dataWard[i + 1].district_code != codeDistrict) {
                return dataWardFilter;
                // optimize code
            }
        }
    }
    return null;
};

// Handle with bill
const getCurrentDate = () => {
    const today = new Date(); // Lấy ngày hiện tại
    const day = String(today.getDate()).padStart(2, "0"); // Lấy ngày và thêm số 0 phía trước nếu < 10
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Lấy tháng (cộng 1 vì tháng bắt đầu từ 0)
    const year = today.getFullYear(); // Lấy năm

    return `${day}/${month}/${year}`; // Trả về chuỗi định dạng ngày/tháng/năm
};
const generateRandomID = (length) => {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    // Hàm đệ quy tạo ID dưới dạng arrow function
    const createID = (id) => {
        return id.length >= length
            ? id
            : createID(
                  id + characters[Math.floor(Math.random() * characters.length)]
              );
    };

    return createID("");
};
const createObjectClientInfo = (
    name,
    itemNumbers,
    totalQuantity,
    totalPrice,
    billDetail
) => {
    return {
        id: generateRandomID(5),
        name,
        time: getCurrentDate(),
        itemNumbers,
        totalQuantity,
        totalPrice,
        billDetail,
    };
};

const postAPI = (data, API) => {
    var options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    fetch(API, options)
        .then(function (response) {
            return response.json();
        })
        .catch(function (error) {
            console.log(error);
        });
};

const createBill_POST = (
    name,
    itemNumbers,
    totalQuantity,
    totalPrice,
    billDetail
) => {
    const bill = createObjectClientInfo(
        name,
        itemNumbers,
        totalQuantity,
        totalPrice,
        billDetail
    );
    postAPI(bill, APIBill);
};
const getBill_GET = async () => {
    const response = await fetch(APIBill);
    const data = await response.json();
    return data;
};
const deleteBill_DELETE = (id) => {
    fetch(`${APIBill}/${id}`, {
        method: "DELETE",
    })
        .then((response) => response.json())
        .catch((error) => console.log(error));
};

export {
    dataProvince,
    getDistrictsByProvinceID,
    getWardsByDistrictID,
    createBill_POST,
    getBill_GET,
    deleteBill_DELETE,
};
