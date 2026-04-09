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
  <title>CoolNet</title>
  <link rel="icon" type="image/png" href="../assets/img/favicon-logo.ico">
  <link rel="stylesheet" href="../assets/css/product.css">
  <link rel="stylesheet" href="../assets/css/root.css">

</head>
<body data-mode="user">
<header>
    <div class="headertop">
        <div class="container">
            <!---- LOGO-->
            <div class="containerlogo">
              <div class="logo"><a href="../pages/haveaccount.php"><img src="../assets/img/unnamed (5) 2.png"
                style="width: 245px;"></a>
              </div>
            </div>

            <!---- search-->
            <div class="containerSearch"><div class="search">
              <form action="timkiemyonex.html" target="_blank">
                <input type="text" placeholder="Tìm kiếm...">
                <a href="timkiemyonex.html" target="_blank"><div class = "containerSearch2">
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

                      <li class="listitemuser">
                        <a class="groupitemuser"><span class="boxicon">
                            <img class="logo-person" src="../assets/img/daidien4.png" alt="logo của brand" >
                          </span>
                          <span class="boxtext column">
                            <a class="info"style="cursor: pointer;" href="taikhoan.php">Thông tin</a>
                            <a class="logout" style="opacity: 0.8;"
                            href="../assets/php/logout.php">Đăng xuất</a>
                          </span>
                        </a>
                      </li>

                      <li class="listitemcart">
                        <a class="groupitemcart" href="Giohang.php">
                          <div class="containercart">
                            <button>
                              <span class="boxicon">
                                <img src="../assets/img/shopping-cart.png" style="width:24px">
                                <span class="jscart">0</span>
                              </span>
                              <span class="boxtext">Giỏ hàng</span>
                            </button>
                          </div>
                        </a>
                      </li>
                </ul>
            </div>


        </div>
    </div>
    <div class="headerbot">
      <div class="containerbot">
        <div class="khungxanhmucluc">
            <div class="icon">
              <img src="../assets/img/Medium Icons.png" type="width:24px" >
            </div>

            <div class="textmucluc">
              <span>DANH MỤC SẢN PHẨM</span>



            </div>

            <div class="navmenu">

              <ul>

                <li class><a href="../pages/allsanpham1.php"><span class="icon">
                <img src="../assets/img/unpacking.png" style="width:24px"></span>
                Tất cả sản phẩm</a></li>

              </ul>
            </div>



            </div>
        </div>

      </div>
    </div>
</header>
<main class = "mid-content">
    <div class="linkedline">
  <p class="linkedline-content"></p>
</div>
    <div class = "important-content" id="detailProducts">
      <div class = "bigcontent">

      </div>

      <div class = "sales-commitment">
        <div class = "sales-commitment-content">
          <div class = "sales-commitment-frame"> Cam kết bán hàng </div>
            <ul class = "sales-commitment-list">
              <li><img src="../assets/img/baohanh.png" alt="baohanh" class = "anhchung"> <span>🎁 Bảo hành chính hãng theo nhà sản xuất</span></li>
              <li><img src="../assets/img/mienphigiaohang.png" alt="baohanh" class = "anhchung"><span>Miễn phí giao hàng trong 2-3 ngày toàn quốc và 4H trong nội thành TP.HCM (Đơn trên 2 triệu). Trừ ống cầu.</span></li>
              <li><img src="../assets/img/hotrodoitra.png" alt="baohanh" class = "anhchung"><span>Hỗ trợ đổi trả cho hàng chính hãng (có phiếu bảo hành) miễn phí trong vòng 7 ngày.*</span></li>
              <li><img src="../assets/img/giaohanglayngay.png" alt="baohanh" class = "anhchung"><span>Hỗ trợ đặt giao hàng lấy ngay tại TP.HCM ( Khách hàng chi trả phí theo phí của Ahamove, Grab)</span></li>
            </ul>
        </div>
      </div>


    </div>
</main>
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
              <li><a href="">Chính sách giao hàng và đổi trả</a></li>

              <li><a href="">Chính sách bảo mật thông tin</a></li>

              <li><a href="">Liên hệ CSKH Online</a></li>

              <li><a href="">Chính sách thanh toán</a></li>

              <li><a href="">Điều khoản dịch vụ</a></li>

              <li><a href="">Chính sách bảo hành</a></li>

              <li><a href="">Kiểm tra đơn hàng</a></li>
            </ul>
          </div>
        </div>
        <div class="col">
          <div class="tittle-footer">
              <div class="hoidap">HỎI ĐÁP - DỊCH VỤ</div>
          </div>
          <div class="thongtin-col3">
            <ul>
              <li><a href="allsanpham.html">Sản phẩm khuyến mãi</a></li>

              <li><a href="allsanpham.html">Sản phẩm nổi bật</a></li>

              <li><a href="allsanpham.html">Tất cả sản phẩm</a></li>
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
      <span class="copyright-text"> <a href="">© Copyright 2025 By COOLNET - HỆ THỐNG CẦU LÔNG UY TÍN.</a></span>
    </div>
  </div>
</footer>
<script src="../assets/js/product_detail.js"></script>
<script src="../assets/js/load_cart.js"></script>
</body>
</html>
