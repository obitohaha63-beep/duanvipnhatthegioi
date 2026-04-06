<?php
include '../assets/php/check_user.php';
include '../assets/php/db.php';

$user_id = $_SESSION['user']['id'];

// Lấy user
$stmt = $conn->prepare("SELECT * FROM users WHERE id = ?");
$stmt->execute([$user_id]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

// Lấy địa chỉ
$stmt2 = $conn->prepare("SELECT * FROM user_address WHERE user_id = ? AND is_default = 1 LIMIT 1");
$stmt2->execute([$user_id]);
$address = $stmt2->fetch(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CoolNet - Checkout</title>
  <link rel="stylesheet" href="../assets/css/Giohang.css">
  <link rel="stylesheet" href="../assets/css/checkout.css">
  <link rel="stylesheet" href="../assets/css/fontinter.css">
  <link rel="stylesheet" href="../assets/css/root.css">
  <link rel="icon" type="image/png" href="../assets/img/favicon-logo.ico">
</head>
<body>

<!-- HEADER (giữ nguyên) -->
<header>
    <div class="headertop">
        <div class="container">
            <!---- LOGO-->
            <div class="containerlogo">
              <div class="logo"><a href="haveaccount.php"><img src="../assets/img/unnamed (5) 2.png" 
                style="width: 245px;"></a>
              </div>
            </div>
           
            <!---- search-->
            <div class="containerSearch"><div class="search">
              <form action="timkiemyonex1.html" target="_blank">
                <input type="text" placeholder="Tìm kiếm...">
                <a href="timkiemyonex1.html" target="_blank"><div class = "containerSearch2">
                   <img src="../assets/img/0e3ea1f4af7bdc0353252fa8af7de9366406fd82 (1).png" class="search-icon"> </div>
              </div>
              </a>
              </form>
            </div>

            <!---- contact------------------------------------------------------------>
            <div class="containercontac">
                <ul class="thongitn">
                    <li class="listitemcall"> 
                        <a class="groupitemcall" href="#"><span class="boxicon">
                            <img src="../assets/img/ringer-volume.png" style="width:24px">
                          </span>
                          <span class="boxtext column">
                            Hotline 
                            <span class="smalltext">0796556438</span>
                          </span>
                        </a>
                      </li>

                      

                      <li class="listitemcart"> 
                        <a class="groupitemcart" href="../pages/Giohang.php">
                          <div class="containercart">
                            <button>
                              <span class="boxicon">
                                <img src="../assets/img/shopping-cart.png" style="width:24px">
                                <span class="jscart">1</span>
                              </span>
                              <span class="boxtext">Giỏ hàng</span>
                            </button>
                          </div>
                        </a>
                      </li>
                </ul>
                <div class="container-login">
                          <a href="../pages/taikhoan.php">
                            <img class="logo-person" src="../assets/img/daidien4.png" alt="logo của brand" 
                          style="width:28px; height: 28px"></a>

                          <a class="text-dangnhap" href="../pages/taikhoan.php">Thông tin</a>
                          <a class="text-dangky" style="opacity: 0.8;" href="../assets/php/logout.php">Đăng xuất</a>
                          
                          
                </div>
            </div>


        </div>
    </div>
    <div class="headerbot">
      <div class="containerbot">
        <div class="khungxanhmucluc">

            <div class="js-menu">
              
            </div>
            <div class="icon">
              <img src="../assets/img/Medium Icons.png" type="width:24px" >
            </div>

            <div class="textmucluc">
              <span>DANH MỤC SẢN PHẨM</span>
              <div class="khungtrangmenu khungtrangmenu-dropdown">
                  <ul>
                    <li><a href="allsanpham1.html">
                      <img src="../assets/img/badminton.png" style="width: 24px;"><span>Vợt cầu lông</span></a></li>

                    <li><a href="allsanpham1.html">
                      <img src="../assets/img/sneakers.png" style="width: 24px;"><span>Giày cầu lông</span></a></li>

                    <li><a href="allsanpham1.html">
                      <img src="../assets/img/piccolo.png" style="width: 24px;"><span>Ống cầu lông</span></a></li>

                    <li><a href="allsanpham1.html">
                      <img src="../assets/img/t-shirt.png" style="width: 24px;"><span>Áo cầu lông</span></a></li>

                    <li><a href="allsanpham1.html">
                      <img src="../assets/img/jeans.png" style="width: 24px;"><span>Quần cầu lông</span></a></li>
                  </ul>
              </div>

              
            </div>
            
            
            
            <div class="navmenu">
              
              <ul>
                <li class><a href="allsanpham1.html" ><span class="icon">
                  <img src="../assets/img/Get a Discount.png" style="width:24px"></span>
                Sản phẩm khuyến mãi</a></li>

                <li class><a href="allsanpham1.html" ><span class="icon">
                <img src="../assets/img/Megaphone.png" style="width:24px"></span>
                Sản phẩm nổi bật</a></li>

                <li class><a href="allsanpham1.html" ><span class="icon">
                <img src="../assets/img/unpacking.png" style="width:24px"></span>
                Tất cả sản phẩm</a></li>
                
              </ul>
            </div>

            
              
            </div>
        </div>

      </div>
    </div>
</header>

<main>
  <div class="checkout-container">
  <!-- Cột trái -->
  <div class="checkout-left">

  <!-- Thông tin đặt hàng -->
  <div class="section">
    <h2>Thông tin đặt hàng</h2>

    <div class="input-group">

      <!-- Họ tên -->
      <h3>Họ và Tên</h3>
      <input type="text" id="fullname">

      <!-- SĐT -->
      <h3>Số điện thoại</h3>
      <input type="text" id="phone">

      <!-- Địa chỉ -->
      <h3>Địa chỉ</h3>

      <!-- Dùng địa chỉ mặc định -->
      <label>
        <input type="radio" name="address_type" value="default" checked>
        Dùng địa chỉ tài khoản
      </label>
      <p id="default-address"></p>

      <!-- Nhập địa chỉ mới -->
      <label>
        <input type="radio" name="address_type" value="new">
        Nhập địa chỉ mới
      </label>

      <!-- FORM địa chỉ mới -->
      <div id="new-address-form" style="display:none;">
        <input type="text" id="detail_address" placeholder="Số nhà, tên đường">
        <input type="text" id="ward" placeholder="Phường/Xã">
        <input type="text" id="district" placeholder="Quận/Huyện">
        <input type="text" id="city" placeholder="Tỉnh/Thành phố">
      </div>

    </div>
  </div>

  <!-- Phương thức thanh toán -->
  <div class="section">
    <h2>Phương thức thanh toán</h2>

    <!-- Tiền mặt -->
    <label>
      <input type="radio" name="payment_method" value="cash" checked>
      Thanh toán khi nhận hàng (COD)
    </label>

    <!-- Chuyển khoản -->
    <label>
      <input type="radio" name="payment_method" value="bank_transfer">
      Chuyển khoản ngân hàng
    </label>

    <!-- Thông tin chuyển khoản -->
    <div id="bank-info" style="display:none;">
      <p><strong>Ngân hàng:</strong> Vietcombank</p>
      <p><strong>Số tài khoản:</strong> 123456789</p>
      <p><strong>Chủ tài khoản:</strong> NGUYEN VAN A</p>

      <h4>Thông tin người chuyển</h4>
      <input type="text" id="bank_name" placeholder="Tên người chuyển">
      <input type="text" id="bank_transaction_code" placeholder="Mã giao dịch">
    </div>

    <!-- Online -->
    <label>
      <input type="radio" name="payment_method" value="online">
      Thanh toán trực tuyến
    </label>

    <div id="online-info" style="display:none;">
      <p>Chức năng đang phát triển...</p>
    </div>

  </div>

</div>

    <!-- Cột phải: Thông tin đơn hàng -->
    <div class="checkout-right">
      <h2>Thông tin đơn hàng</h2>
      <div id="checkout-items"></div>

<p><strong>Tổng tiền hàng:</strong> <span id="subtotal"></span></p>
<p><strong>Phí vận chuyển:</strong> Miễn phí</p>
<p class="total"><strong>Tổng thanh toán: </strong><span id="total"></span></p>
        <p><input type="checkbox"> Xuất hóa đơn</p>
        <h4>Ghi chú đơn hàng: </h4>
        <input type="text" placeholder="Nhập ghi chú">
        <div class="button-group">
          <a href="../pages/haveaccount.php"><button class="btn-outline">Tiếp tục mua hàng</button></a>
          <button class="btn-primary" onclick="placeOrder()">Đặt hàng</button>
        </div>
      </div>
    </div>

  </div>
</main>

<!-- FOOTER (giữ nguyên) -->
<footer>
  <div class="container-footer">
    <div class="khungchinh">
        <div class="col">
          <div class="khung-col1">
            <img class="logo-footer" src="../assets/img/unnamed (5) 2.png">
            <div class="gioithieu-footer">
              <p>COOLNET - Hệ thống cửa hàng chuyên 
                  cung cấp các sản phẩm cầu lông
                  chính hãng: vợt, giày, quần áo, phụ kiện.</p>
            </div>
            <div class="thongtin-col1">
              <ul>
                <li><img src="../assets/img/ringer-volume.png" style="width:24px">
                <a href="">0796556438.</a>
                </li>

                <li><img src="../assets/img/filled-message.png" style="width:24px">
                <a href="">COOLNET@gmail.com</a>
                </li>

                <li><img src="../assets/img/Earth Globe.png" style="width:24px">
                <a href="">Hệ thống mạng xã hội</a>
                </li>
              </ul>
            </div>
          </div>
        </div>     
        <div class="col">
          
            <div class="tittle-footer">
              <div class="chinhsach">CHÍNH SÁCH</div>
            </div>
          <div class="thongtin-col2">
            <ul>
              <li><a href="">• Chính sách giao hàng và đổi trả</a></li>

              <li><a href="">• Chính sách bảo mật thông tin</a></li>

              <li><a href="">• Liên hệ CSKH Online</a></li>

              <li><a href="">• Chính sách thanh toán</a></li>

              <li><a href="">• Điều khoản dịch vụ</a></li>

              <li><a href="">• Chính sách bảo hành</a></li>

              <li><a href="">• Kiểm tra đơn hàng</a></li>
            </ul>
          </div>
        </div>     
        <div class="col">
          <div class="tittle-footer">
              <div class="hoidap">HỎI ĐÁP - DỊCH VỤ</div>
          </div> 
          <div class="thongtin-col3">
            <ul>
              <li><a href="allsanpham1.html">• Sản phẩm khuyến mãi</a></li>

              <li><a href="allsanpham1.html">• Sản phẩm nổi bật</a></li>

              <li><a href="allsanpham1.html">• Tất cả sản phẩm</a></li>
            </ul>
          </div>
          
        </div>     
        <!----- cột 4-->
        <div class="col">
          <div class="tittle-footer">
              <div class="mocua">THỜI GIAN - MỞ CỬA</div>
          </div> 

          <div class="thongtin-col4">
            <ul>
              <li><a href="">08:00 - 21:30</a></li>

              <li><a href="">Tư vấn qua Zalo:0796556438</a></li>

              <div class="text-thanhtoan">PHƯƠNG THỨC THANH TOÁN</div>
              <img class="anh-phuong-thuc-thanh-toan"src="../assets/img/footer_trustbadge.png">
              <img class="bo-cong-thuong" src="../assets/img/bct.png">
            </ul>
          </div>
        </div>     
    </div>
  </div>
  <div class="copyright">
    <div class="container">
      <span class="copyright-text">© Copyright 2025 By COOLNET - HỆ THỐNG CẦU LÔNG UY TÍN.</span>
    </div>
  </div>
</footer>
<script src="../assets/js/checkout.js"></script>
<script src="../assets/js/load_cart.js"></script>
</body>
</html>