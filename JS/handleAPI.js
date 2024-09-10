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
const createObjectClientInfo = (name, email, phoneNumber, address, note) => {
    return {
        id: generateRandomID(10),
        time: new Date().toLocaleString(),
        name,
        email,
        phoneNumber,
        address,
        note,
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

const createBill_POST = (name, email, phoneNumber, address, note) => {
    const bill = createObjectClientInfo(
        name,
        email,
        phoneNumber,
        address,
        note
    );
    postAPI(bill, APIBill);
};

export {
    dataProvince,
    getDistrictsByProvinceID,
    getWardsByDistrictID,
    createBill_POST,
};
