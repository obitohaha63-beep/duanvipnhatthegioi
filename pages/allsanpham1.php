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
<body data-mode="guest">
<header>
    <div class="headertop">
        <div class="container">
            <!---- LOGO-->
            <div class="containerlogo">
              <div class="logo"><a href="html4.html"><img src="../assets/img/unnamed (5) 2.png" 
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
                        <a class="groupitemcart" href="login.html">
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
              <div class="khungtrangmenu khungtrangmenu-dropdown">
                  <ul>
                    <li><a href="allsanpham.html"><img src="../assets/img/badminton.png" style="width: 24px;"><span>Vợt cầu lông</span></a></li>
                    <li><a href="allsanpham.html"><img src="../assets/img/sneakers.png" style="width: 24px;"><span>Giày cầu lông</span></a></li>
                    <li><a href="allsanpham.html"><img src="../assets/img/piccolo.png" style="width: 24px;"><span>Ống cầu lông</span></a></li>
                    <li><a href="allsanpham.html"><img src="../assets/img/t-shirt.png" style="width: 24px;"><span>Áo cầu lông</span></a></li>
                    <li><a href="allsanpham.html"><img src="../assets/img/jeans.png" style="width: 24px;"><span>Quần cầu lông</span></a></li>
                  </ul>
              </div>

              
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
    <h3>Phân loại sản phẩm</h3>

    <label>
      <input type="checkbox" class="category" value="Vợt cầu lông"> Vợt cầu lông
    </label><br>

    <label>
      <input type="checkbox" class="category" value="Giày cầu lông"> Giày cầu lông
    </label><br>
    <button onclick="window.location.href='../pages/timkiemyonex1.php'">Tìm kiếm nâng cao</button>
    

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

                

            
            
      </div>
    </div>    

</section>
</main>


<script src="../assets/js/allsanpham.js"></script>
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