<?php include '../assets/php/check_user.php'; ?>
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CoolNet</title>
  <link rel="stylesheet" href="../assets/css/Giohang.css">
  <link rel="stylesheet" href="../assets/css/fontinter.css">
  <link rel="stylesheet" href="../assets/css/root.css">
  <link rel="icon" type="image/png" href="../assets/img/favicon-logo.ico">
</head>
<body>
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
                        <a class="groupitemcart" href="">
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
                          <a href="taikhoan.php">
                            <img class="logo-person" src="../assets/img/daidien4.png" alt="logo của brand"
                          style="width:28px; height: 28px"></a>

                          <a class="text-dangnhap" href="taikhoan.php">Thông tin</a>
                          <a class="text-dangky" style="opacity: 0.8;"
                          href="../assets/php/logout.php">Đăng xuất</a>


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



            </div>



            <div class="navmenu">

              <ul>


                <li class><a href="allsanpham1.php" ><span class="icon">
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
  <div class="container sanpham">

    <h2 class="giohang-title">Giỏ hàng của bạn</h2>

    <!-- 🔥 JS sẽ render vào đây -->
    <div id="cart-list"></div>

    <!-- Tổng tiền -->
    <div class="cart-total">
      <span>Tổng tiền:</span>
      <span class="total-price">0₫</span>
    </div>

    <!-- Action -->
    <div class="cart-actions">
      <button onclick="window.location.href='../pages/allsanpham1.php'">
        Tiếp tục mua hàng
      </button>

      <button id="checkout-btn" onclick="window.location.href='checkout.php'">
        Thanh toán
      </button>
    </div>

  </div>
</main>
<script src="../assets/js/cart.js"></script>

</body>
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
</html>
