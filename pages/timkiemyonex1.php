<?php include '../assets/php/check_user.php'; ?>
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CoolNet</title>
  <link rel="stylesheet" href="../assets/css/allsanpham.css">
  <link rel="stylesheet" href="../assets/css/root.css">
  <link rel="stylesheet" href="../assets/css/fontinter.css">
  <link rel="icon" type="image/png" href="../assets/css/favicon-logo.ico">
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
            <div class="icon">
              <img src="../assets/img/Medium Icons.png" type="width:24px" >
            </div>

           <div class="textmucluc">
              <span>DANH MỤC SẢN PHẨM</span>
              

            </div>



            <div class="navmenu">

              <ul>


                <li class><a href="../pages/allsanpham1.php" ><span class="icon">
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
<section>
    <div class="home">
      <div class="containerhome">

            <div class="container-back" id="timkiemcoban">



            </div>

            <div class="container-select">
                <div class="filter-group">
                  <h3>Tìm kiếm nâng cao</h3>
                  <label class="form-label">Tên sản phẩm</label>
                  <div style="display: flex; gap: 8px; width: 100%;">
                    <input type="text" id="productName" name="keyword" class="form-control" value="" placeholder="Nhập tên sản phẩm...">
                    <button type="button" id="searchProductBtn" class="btn-search">Tìm kiếm</button>
                  </div>

                <h3>CHỌN MỨC GIÁ</h3>
                 <label><input type="checkbox" class="price" value="500k-1tr"> 500.000đ - 1 triệu</label><br>

                 <label><input type="checkbox" class="price" value="1-2tr"> 1 - 2 triệu</label><br>

                 <label><input type="checkbox" class="price" value="2-3tr"> 2 - 3 triệu</label><br>

                 <label><input type="checkbox" class="price" value=">3tr"> Giá trên 3 triệu</label><br>





                    <label class="form-label">Phân loại</label>
                    <select id="categoryFilter" class="form-control" name="category">
                        <option value="">-- Tất cả --</option>
                    </select>


                <h3>THƯƠNG HIỆU</h3>
                <label><input type="checkbox" class="brand" value="Lining"> Lining</label><br>
                <label><input type="checkbox" class="brand" value="Yonex"> Yonex</label><br>






                </div>

            </div>
            <div class="container-sanpham">
                <div class="khung-sapxep">
                 <span>Sắp xếp:</span>
                 <select name="chonboloc" id="idsapxep">
                    <option value="tangdan">Giá: tăng dần</option>
                    <option value="giamdan">Giá: giảm dần</option>
                    <option value="moinhat">Mới nhất</option>
                 </select>


                </div>


                <div class="container-sanphambot" id="productList">

                </div>

                <div class="container-phantrang">
                  <div class="pagination">
                      <a href="#">&laquo;</a>   <!-- nút Previous -->
                      <a href="#" class="active">1</a>
                      <a href="#">2</a> <!-- trang đang chọn -->
                      <a href="#">3</a>
                      <a href="#">4</a>
                      <a href="#">5</a>
                      <a href="#">&raquo;</a>   <!-- nút Next -->
                  </div>
                </div>

                <div class="container-goiy">
                  <h3>COOLNET – Cửa Hàng Vợt Cầu Lông Chính Hãng Uy Tín Toàn Quốc</h3>
                  <span><b>Bạn đang tìm nơi bán vợt cầu lông chính hãng?</b></span>
                  <br>
                  <span><b>COOLNET</b> là hệ thống chuyên vợt cầu lông uy tín, cung cấp <b>vợt cầu lông chính hãng giá rẻ</b>,
                  mẫu mã đa dạng, dịch vụ.</span>
                  <br>
                  <h3>Tại sao nên mua vợt tại COOLNET?</h3>
                  <span><b>Thương hiệu chính hãng:</b> Yonex, Victor, Lining.</span>
                  <br>
                  <span><b>Phù hợp mọi đối tượng:</b> Từ người mới chơi đến VĐV chuyên nghiệp.</span>
                  <br>
                  <span><b>Cập nhật bảng giá chuẩn:</b> Báo giá vợt Yonex, Victor, Lining... chính xác, minh bạch.</span>
                  <br>
                  <span><b>Dịch vụ tận tâm:</b> Tư vấn chọn vợt, bảo hành chính hãng, đan cước chuẩn.</span>
                  <br>
                  <h3>Các dòng vợt cầu lông nổi bật</h3>
                  <span><b>Yonex: </b> 	Công nghệ hiện đại, VĐV chuyên nghiệp tin dùng</span>
                  <br>
                  <span><b>Victor: </b> 	Hỗ trợ sức mạnh, đánh công mạnh mẽ</span>
                  <br>
                  <span><b>Lining: </b> 	Thiết kế trẻ trung, dễ chơi, giá tốt  </span>
                  <br>
                  <h3>Vợt cầu lông bao nhiêu là hợp lý?</h3>
                  <span><b>Vợt cho người mới:</b> 500.000đ – 1.500.000đ </span>
                  <br>
                  <span><b>Vợt cho người chơi lâu năm:</b> 1.500.000đ – 3.000.000đ </span>
                  <br>
                  <span><b>Vợt cao cấp, chuyên nghiệp:</b> Trên 3.000.000đ </span>
                </div>
            </div>



      </div>
    </div>

</section>
</main>


<script src="../assets/js/timkiemcoban.js"></script>
<script src="../assets/js/load_cart.js"></script>
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
              <li><a href="">• Sản phẩm khuyến mãi</a></li>

              <li><a href="">• Sản phẩm nổi bật</a></li>

              <li><a href="">• Tất cả sản phẩm</a></li>
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
