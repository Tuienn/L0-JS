import { getDistrictsByProvinceID, getWardsByDistrictID } from "./handleAPI.js";

const inputIsNull = (input) => {
    if (input.value == "") {
        return true;
    }
    return false;
};
const isPhoneNumber = (phoneNumber) => {
    const regex = /^\d{10}$/;
    return regex.test(phoneNumber);
};
const isEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

const inputLocationIsSelected = (input) => {
    if (input.value == "default") {
        return false;
    }
    return true;
};

const addClassInputError = (input) => {
    input.classList.add("form-input--error");
};
const removeClassInputError = (input) => {
    input.classList.remove("form-input--error");
};

const checkError_groupInputName = (groupErrorMessage, groupInput) => {
    if (inputIsNull(groupInput[0]) && !inputIsNull(groupInput[1])) {
        addClassInputError(groupInput[0]);
        removeClassInputError(groupInput[1]);
        groupErrorMessage[0].innerText = "(*) Vui lòng nhập họ";
        return false;
    } else if (inputIsNull(groupInput[1]) && !inputIsNull(groupInput[0])) {
        addClassInputError(groupInput[1]);
        removeClassInputError(groupInput[0]);
        groupErrorMessage[0].innerText = "(*) Vui lòng nhập tên";
        return false;
    } else if (inputIsNull(groupInput[0]) && inputIsNull(groupInput[1])) {
        addClassInputError(groupInput[0]);
        addClassInputError(groupInput[1]);
        groupErrorMessage[0].innerText = "(*) Vui lòng nhập họ và tên";
        return false;
    } else {
        removeClassInputError(groupInput[0]);
        removeClassInputError(groupInput[1]);
        groupErrorMessage[0].innerText = "";
        return true;
    }
};

const checkError_inputEmail = (groupErrorMessage, groupInput) => {
    if (inputIsNull(groupInput[2])) {
        addClassInputError(groupInput[2]);
        groupErrorMessage[1].innerText = "(*) Vui lòng nhập email";
        return false;
    } else if (!isEmail(groupInput[2].value)) {
        addClassInputError(groupInput[2]);
        groupErrorMessage[1].innerText = "(*) Email không hợp lệ";
        return false;
    } else {
        removeClassInputError(groupInput[2]);
        groupErrorMessage[1].innerText = "";
        return true;
    }
};

const checkError_inputLocation = (groupErrorMessage, groupInput) => {
    if (
        !inputLocationIsSelected(groupInput[4]) ||
        !inputLocationIsSelected(groupInput[5]) ||
        !inputLocationIsSelected(groupInput[6]) ||
        inputIsNull(groupInput[7])
    ) {
        addClassInputError(groupInput[4]);
        addClassInputError(groupInput[5]);
        addClassInputError(groupInput[6]);
        addClassInputError(groupInput[7]);
        groupErrorMessage[3].innerText = "(*) Vui lòng nhập đủ địa chỉ";
        return false;
    } else {
        removeClassInputError(groupInput[4]);
        removeClassInputError(groupInput[5]);
        removeClassInputError(groupInput[6]);
        removeClassInputError(groupInput[7]);
        groupErrorMessage[3].innerText = "";
        return true;
    }
};

const checkError_inputPhoneNumber = (groupErrorMessage, groupInput) => {
    if (inputIsNull(groupInput[3])) {
        addClassInputError(groupInput[3]);
        groupErrorMessage[2].innerText = "(*) Vui lòng nhập số điện thoại";
        return false;
    } else if (!isPhoneNumber(groupInput[3].value)) {
        addClassInputError(groupInput[3]);
        groupErrorMessage[2].innerText = "(*) Số điện thoại không hợp lệ";
        return false;
    } else {
        removeClassInputError(groupInput[3]);
        groupErrorMessage[2].innerText = "";
        return true;
    }
};

const checkInputLocationIsChecked_inOrder = (
    inputProvince,
    inputDistrict,
    inputWard
) => {
    const errorMessageLocation = document.querySelectorAll(".form-error")[3];
    inputDistrict.addEventListener("click", () => {
        if (!inputLocationIsSelected(inputProvince)) {
            addClassInputError(inputProvince);
            errorMessageLocation.innerText = "(*) Vui lòng chọn Tỉnh/Thành phố";
            return false;
        } else {
            removeClassInputError(inputProvince);
            errorMessageLocation.innerText = "";
            return true;
        }
    });

    inputWard.addEventListener("click", () => {
        if (
            !inputLocationIsSelected(inputDistrict) &&
            inputLocationIsSelected(inputProvince)
        ) {
            addClassInputError(inputDistrict);
            errorMessageLocation.innerText = "(*) Vui lòng chọn Huyện/Quận";
            return false;
        } else if (
            !inputLocationIsSelected(inputDistrict) &&
            !inputLocationIsSelected(inputProvince)
        ) {
            addClassInputError(inputProvince);
            addClassInputError(inputDistrict);
            errorMessageLocation.innerText =
                "(*) Vui lòng chọn Tỉnh/Thành phố và Huyện/Quận";
            return false;
        } else {
            removeClassInputError(inputDistrict);
            errorMessageLocation.innerText = "";
            return true;
        }
    });
};

const handleOnFocusInput_clearInputError = (groupInput) => {
    const groupInputLength = groupInput.length;
    for (let i = 0; i < groupInputLength; i++) {
        groupInput[i].addEventListener("focus", () => {
            removeClassInputError(groupInput[i]);
        });
    }
};

const loadData_inputDistrict = (inputProvince, inputDistrict) => {
    inputProvince.addEventListener("change", () => {
        const provinceCode = inputProvince.value;
        const dataDistrictFilter = getDistrictsByProvinceID(provinceCode);
        const htmls = dataDistrictFilter.map(
            (district) =>
                `<option value=${district.code}>${district.name}</option>`
        );
        const html = htmls.join("");
        inputDistrict.innerHTML = ` <option
                                        value="default"
                                        selected
                                        disabled
                                        hidden
                                    >
                                        Chọn Huyện/Quận
                                    </option>
                                    ${html}
                                `;
    });
};
const loadData_inputWard = (inputDistrict, inputWard) => {
    inputDistrict.addEventListener("change", () => {
        const districtCode = inputDistrict.value;
        const dataWardFilter = getWardsByDistrictID(districtCode);

        const htmls = dataWardFilter.map(
            (ward) => `<option value=${ward.code}>${ward.name}</option>`
        );
        const html = htmls.join("");
        inputWard.innerHTML = ` <option
                                    value="default"
                                    selected
                                    disabled
                                    hidden
                                >
                                    Chọn Xã/Phường
                                </option>
                                ${html}
                            `;
    });
};

const eventSelectLocation = () => {
    //Select select tag with element id input--province -> id input--district -> id input--ward
    const inputProvince = document.getElementById("input--province");
    const inputDistrict = document.getElementById("input--district");
    const inputWard = document.getElementById("input--ward");

    loadData_inputDistrict(inputProvince, inputDistrict);
    loadData_inputWard(inputDistrict, inputWard);
    checkInputLocationIsChecked_inOrder(
        inputProvince,
        inputDistrict,
        inputWard
    );
};

export {
    checkError_groupInputName,
    checkError_inputEmail,
    checkError_inputPhoneNumber,
    checkError_inputLocation,
    handleOnFocusInput_clearInputError,
    eventSelectLocation,
};
