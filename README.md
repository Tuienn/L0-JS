***Một vài lời của em ạ
    - Chúc anh chị review bài em 1 ngày tốt lành ạ
    - Link gitHub: [text](https://github.com/Tuienn/L0-JS.git)
    - Em có thay đổi tên của 1 số biến, function để tránh vừa tiếng anh, vừa tiếng việt

A. Cách chạy dự án
    Sử dụng "yarn start" = file index.html(http://localhost:3000/) 
                           json server(http://localhost:3000/bill)
B. Cấu trúc file 
    1. File bill.json: Lưu danh sách hóa đơn 2. Folder public
        a. File index.html: Trang chính(HOME + BILL + SHOPPING CART)
        b. Folder CSS 
            - File: responsive.css: responsive với Mobile, tablet, PC 
            - Folder utilities 
                + File base.css: CSS base cho trang web 
                + File grid.css: Grid layout thư viện (Học ở F8) hỗ trợ responsive cho trang HOME 
            - Folder main 
                + File index.css: CSS tổng quát cho .overlay, #main và loading  
                + File bill.css: CSS cho trang BILL 
                + File clientInfo.css: CSS cho form Thông tin người mua 
                + File navBar.css: CSS cho Thanh navbar 
                + File product.css: CSS cho item sản phẩm trang HOME 
                + File shoppingCart.css: CSS cho trang SHOPPING CART
        c. Folder JS 
            - File index.js: File chính xử lý các event, import các chức năng của các file còn lại 
            - File file.js: Thư viện thao tác với localStorage và API 
            - File listData.js: Lưu thông tin của các sản phẩm 
            - File renderUI.js: Xử lý thao tác render giao diện cho các trang HOME + BILL + SHOPPING CART 
            - File clientInfo.js: Xử lý logic cho form Thông tin người mua(chỉ hỗ trợ xử lý event cho index.js)
            - File shoppingCart.js: Xử lý logic của trang SHOPPING CART(chỉ hỗ trợ xử lý event cho index.js)
C. Bài tập

Bài 1: File listData.js 
    **Note: - Chuyển thuộc tính soLuong -> quantity
            - Thêm thuộc tính url là link ảnh

Bài 2: File file.js: dùng function setLocalStorage

Bài 3: 
    - File file.js: dùng function getLocalStorage
    - File renderUI.js viêt function renderProducts_main render các sản phẩm ra trang HOME
    - File index.js: import function renderProducts_main từ renderUI.js
        + Lần đầu mặc định renderProducts_main được chạy để render ra homePage
        + Sự kiện click vào HOME ở navbar cũng renderProducts_main

Bài 4: 
    - Giỏ hàng là "let cart"
    - File shoppingCart.js: Function findIdProductInCart tìm id sản phẩm trong giỏ hàng
    - File file.js: dùng function setLocalStorage
    - File index.js: addSP đổi tên thành addProduct, function này xử lý logic khi thêm sản phẩm vào giỏ hàng

Bài 5: 
    - Function getTotalPriceEachProduct: tính tổng tiền của mỗi sản phẩm (quantity * price)
    - Function getTotalPriceAllProducts: tính tổng tiền của tất cả sản phẩm
    - Function getTotalQuantityAllProducts: tính tổng số lượng các sản phẩm trong giỏ hàng

Bài 6: 
    - File renderUI.js: function renderShoppingCart_main để render giao diện cho trang SHOPPING CART 
    - File shoppingCart.js: Function getByIDSP -> đổi tên thành getByIDProduct
    - File index.js: 
        + Function handleMinusQuantity, handlePlusQuantity, reRenderTotalEachProduct, reRenderTotalAllProducts xử lý event khi tăng - giảm số lượng sản phẩm trong giỏ hàng
        + Function handleClearAProduct xử lý xóa 1 sản phẩm trong giỏ hàng

Bài 7:
    - File renderUI.js: Function renderClientInfo_main xử lý render form thông tin người mua
    - File index.js: Function handleOpenClientInfo xử lý event cho nút "Buy" hiện form thông tin người mua và thêm các sự kiện khác cho form này thông qua function handleClientInfo_main

Bài 8: File file.js:  Function getLocation (fetch đồng thời 3 API)

Bài 9:
    - File clientInfo.js: 
        + Function checkInputLocationIsChecked_inOrder xử lý cho thứ tự chọn tỉnh -> huyện -> xã
        + Function getDistrictsByProvinceID và getWardsByDistrictID xử lý lấy dữ liệu
        + Function loadData_inputDistrict, loadData_inputWard xử lý render ra thông tin quận/huyện, phường/xã

Bài 10: File file.js: function generateRandomID xử lý tạo ra id ngẫu nhiên

Bài 11: 
    - File clientInfo.js: các function validate input: checkError_groupInputName, checkError_inputEmail, checkError_inputPhoneNumber, checkError_inputLocation
    - File file.js: function createObjectClientInfo tạo ra object để lưu vào bill.json 

Bài 13: File bill.json để lưu thông tin các hóa đơn được trả về từ form thông tin người mua

Bài 14: 
    - File file.js
        + Function getBill_GET để lấy dữ liệu các bill từ API
        + Function createBill_POST để tạo 1 bill mới(sau khi form thông tin người mua không có lỗi và nhấn nút "Xác nhận")
        + Function deleteBill_DELETE để xóa 1 bill(khi nhấn nút X để return bill)

Bài 15: 
    - File index.js
        + Kiểm tra số lượng mua tối đa của 1 sản phẩm(Đã xử lý cho sự kiện tăng - giảm sản phẩm trong giỏ hàng)
        + Function handleClearAProduct xử lý xóa 1 sản phẩm trong giỏ hàng
        + Function reRenderTotalEachProduct, reRenderTotalAllProducts cập nhật số tiền
        + Function updateListData_afterBuy để cập nhật listData sau khi mua

Bài 16: 
    - File renderUI.js
        + Function renderBill_main để render bill(dữ liệu được fetch trong index.js với function getBill_GET)
        + Tạo tag select cho nút "Details" để xem thông tin sản phẩm
        + Function updateListData_afterReturn để cập nhật listData sau khi trả hàng
        
Bài 17: File file.js với IFFE

    


    

