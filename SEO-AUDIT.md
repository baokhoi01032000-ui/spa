# Báo cáo SEO — 14/10/2026

Repository: baokhoi01032000-ui/spa. Base main: 52f7ef9.
Nhánh: seo/canonical-hreflang-audit-20261014. Không merge hoặc triển khai.

## Kết quả audit toàn repo và website live

- 13 trang indexable trả 200, mỗi trang có một H1; title và description trong repo không trùng. Giữ metadata và H1 đã đúng.
- 12 landing page có canonical/hreflang kết thúc bằng `/`, nhưng Cloudflare trả 308 sang URL không có `/`. Sitemap lại chứa `.html`, cũng trả 308. Đã đồng bộ canonical, hreflang, liên kết chuyển ngôn ngữ và sitemap về URL extensionless trả 200.
- `/massage/juffair` trả 301 về `/`; `/massage/juffair/` trả 200 bản sao trang chủ. Thêm redirect chính xác cho biến thể có slash, giữ rule cũ.
- URL không tồn tại trả 200 trang chủ vì mặc định SPA fallback. Thêm `404.html` với noindex để Cloudflare Pages xử lý 404. Cần xác minh HTTP 404 trên preview/live sau khi được duyệt.
- Landing page thiếu Open Graph và schema. Bổ sung OG title/description/url/type/locale, WebPage JSON-LD dựa trên thông tin hiện có và x-default về bản EN tương ứng. Không tạo phiên bản AR giả cho trang chủ song ngữ.
- Trang chủ có breadcrumb Home > Services > Booking nhưng đó là các section ngang hàng. Loại bỏ breadcrumb sai. Loại bỏ khai báo giờ mở cửa 00:00–23:59 trong schema vì nội dung hiển thị chỉ xác nhận dịch vụ hằng ngày theo lịch hẹn; không thay branding 24/7 hoặc thông tin hiển thị.
- Thêm liên kết từ các nhãn hiện có trên trang chủ tới 6 landing page EN; bản AR được truy cập qua liên kết đổi ngôn ngữ. Giữ nguyên chữ, màu và bố cục. Thêm lang=ar cho đoạn giới thiệu AR.
- robots.txt đã hợp lệ, cho phép crawl và khai báo sitemap chính xác; giữ nguyên.
- Lần đọc qua công cụ tìm kiếm trả title cũ; tải HTML trực tiếp xác nhận title live hiện khớp main. Không kết luận có lỗi deployment từ cache tìm kiếm.

## Tracking

- Trang chủ có GTM-MDJMBHTR và Google Ads AW-18294179895.
- Có listener cho click WhatsApp và submit bookingForm, gửi conversion tới AW-18294179895/9swqCJiJ6OUcELeQrJNE với value=1, currency=VND. VND cần được chủ tài khoản xác minh, chưa tự đổi.
- Không thấy GA4 G- ID trực tiếp trong HTML; GA4 hoặc tag Ads có thể nằm trong GTM. Chưa có quyền container/tài khoản nên chưa chứng minh được tag nội bộ, conversion nhận thành công hoặc không ghi nhận trùng.
- 12 landing page không có GTM/Ads tag trực tiếp. Đây là khoảng trống đo lường cần quyết định sau khi audit container. Không sao chép tracking hoặc tạo ID/event mới khi chưa kiểm tra container.
- Giữ nguyên toàn bộ mã tracking, số WhatsApp, đường dẫn CTA và logic form.

## Files sửa

- index.html; 6 landing page EN: full-body-massage-juffair.html, home-massage-juffair.html, hotel-massage-juffair.html, massage-manama.html, oil-massage-juffair.html, thai-massage-juffair.html.
- 6 landing page AR: مساج-المنامة.html, مساج-بالزيوت-الجفير.html, مساج-تايلندي-الجفير.html, مساج-فندقي-الجفير.html, مساج-كامل-للجسم-الجفير.html, مساج-منزلي-الجفير.html.
- sitemap.xml, _redirects. Thêm 404.html, scripts/seo-check.cjs và báo cáo này.
- Không sửa CSS, ảnh, dịch vụ, giá hoặc branding.

## Kiểm tra và giới hạn

- `node scripts/seo-check.cjs`: PASS trên 13 trang; metadata/H1 duy nhất, canonical/sitemap, hreflang đối ứng, schema JSON parse, JavaScript syntax, local asset/internal link/anchor.
- So sánh body với base Git: nội dung, cấu trúc, script/booking giữ nguyên sau khi bỏ các liên kết mới và chuẩn hóa URL/ngôn ngữ. CSS và ảnh không thay đổi.
- `git diff --check`: PASS. Kiểm tra sitemap XML parse và gói build tĩnh riêng.
- Repo là HTML/CSS tĩnh, không có package.json hoặc build command. Build ở đây là đóng gói tài sản Pages, không chạy npm build giả.
- Đây là kiểm tra mã nguồn/SEO, không phải chứng nhận đầy đủ W3C hay Google Rich Results. Chưa chạy browser rendering, Lighthouse hoặc có dữ liệu CrUX/Search Console, nên chưa báo điểm hoặc Core Web Vitals. Banner khoảng 372 KB; ảnh dưới fold đã lazy-load. Không tự thay ảnh để giữ thiết kế.
- Các rule 301/404 mới chưa áp dụng lên live; cần kiểm tra trên preview sau khi có quyền GitHub/Cloudflare. Không merge/deploy tự động.

## Google Ads

12 headlines có độ dài: 20, 21, 17, 24, 20, 25, 21, 23, 19, 24, 23, 20.
4 descriptions: 78, 82, 90, 83. Tất cả PASS; giữ nguyên nội dung được duyệt.
Final URL: https://homemassagejuffair.com/.
CSV mẫu Google Ads Editor được giao riêng, Campaign/Ad group để trống có chủ ý. Chưa có Google Ads API authentication nên chưa xác minh account/campaign/ad group/ad hiện có và chưa sửa quảng cáo. Không thay budget/bidding/keywords/targeting/status.

## Quyền còn thiếu

- GitHub connector đã xác thực baokhoi01032000-ui và xác nhận quyền push/admin vào repo; dùng connector để tạo nhánh và PR. Credential manager cục bộ chưa có tài khoản.
- GTM/GA4/Google Ads access để xem cấu hình và đối chiếu event thực tế. Không cần quyền sửa ngân sách.
- Cloudflare hoặc preview URL để xác minh cấu hình build, redirect/404 sau khi PR được duyệt; chưa yêu cầu quyền triển khai production.

Tài liệu tham chiếu: https://developers.cloudflare.com/pages/configuration/serving-pages/ và https://support.google.com/google-ads/editor/answer/57747.
