# Quy trình bảo trì website Home Massage Juffair

Website: https://homemassagejuffair.com  
Mã nguồn: `baokhoi01032000-ui/spa`  
Nhánh triển khai: `main`

## Thông tin WhatsApp hiện tại

- Số hiển thị: **+968 9597 9230**
- Số dùng trong liên kết: **96895979230**
- Liên kết chuẩn: `https://wa.me/96895979230`

Lưu ý: liên kết `wa.me` chỉ dùng chữ số, không có dấu `+`, khoảng trắng hoặc dấu gạch.

## Phạm vi phải cập nhật

Khi đổi số WhatsApp, phải thay đồng thời ở:

1. Nút WhatsApp nổi.
2. Nút đặt lịch trong phần đầu trang.
3. Nút đặt lịch của từng nhân viên và dịch vụ.
4. Form đặt lịch và đoạn JavaScript tạo nội dung tin nhắn.
5. Phần Contact, Footer và Policies.
6. Dữ liệu SEO có cấu trúc: `telephone` và `sameAs`.
7. Tất cả landing page tiếng Anh và tiếng Ả Rập.

Các tệp cần kiểm tra:

- `index.html`
- `full-body-massage-juffair.html`
- `home-massage-juffair.html`
- `hotel-massage-juffair.html`
- `massage-manama.html`
- `oil-massage-juffair.html`
- `thai-massage-juffair.html`
- `مساج-المنامة.html`
- `مساج-بالزيوت-الجفير.html`
- `مساج-تايلندي-الجفير.html`
- `مساج-فندقي-الجفير.html`
- `مساج-كامل-للجسم-الجفير.html`
- `مساج-منزلي-الجفير.html`

## Quy trình thay số

1. Xác nhận số mới có mã quốc gia.
2. Chuẩn hóa thành hai dạng:
   - Dạng hiển thị có dấu `+` và khoảng trắng.
   - Dạng liên kết chỉ gồm chữ số.
3. Tìm số cũ trong toàn bộ tệp HTML.
4. Thay mọi liên kết `wa.me`, số hiển thị, JavaScript và dữ liệu SEO.
5. Kiểm tra không còn số cũ trong bất kỳ tệp HTML nào.
6. Cập nhật nhánh `main` để hệ thống hosting tự triển khai.
7. Mở bản live và xác minh:
   - Số hiển thị đúng.
   - Nút WhatsApp chuyển tới đúng số.
   - Trang chủ và landing page vẫn hiển thị bình thường.

## Nhật ký cập nhật

### 11/09/2026 — Đổi WhatsApp

- Số cũ: **+973 3951 1579**
- Số mới: **+968 9597 9230**
- Đã đồng bộ toàn bộ 13 tệp HTML.
- Đã kiểm tra mã nguồn không còn số cũ.
- Đã xác minh bản live và liên kết `wa.me/96895979230`.
