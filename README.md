This is docs of nestjs_medium

yarn

yarn dev

docker compose up -d db -> tạo ra 1 con DB trên docker trỏ vào cổng 5432

nhớ phải check xem đã tạo database postgres ở trên máy hay chưa
nếu chưa tạo thì phải tạo bằng tay 1 database tên là postgres có mật khẩu là postgres trước khi chạy lệnh yarn dev

-- Update commit số 3 --
Ở commit này đã tạo 1 file docker-compose.yml mục đích là để tạo ra 1 con database trên docker chạy trên cổng 5432 của docker
theo như commit số 3 thì đã hoàn thành việc tạo ra nó

-- Update commit số 4 --
Câu lệnh bên dưới tạo ra 1 Schema của data base
---- npm run migration:generate -- src/user/migrations/user ----

Câu lệnh bên dưới tạo database từ file generate bên trên
---- npm run migration:run ----

Sau khi chạy 2 câu lệnh bên trên thì sẽ có thể dùng postman để add được user vào trong database local chạy bằng docker

Câu lệnh bên dưới show ra những migration đã tạo
---- npm run migration:show ----

Câu lệnh bên duới revert lại file migration gần nhất
---- npm run typeorm -- migration:revert ----

migration:create cho phép bạn tạo ra một file migration trống, trong đó bạn có thể viết các truy vấn SQL tùy chỉnh để thay đổi cấu trúc cơ sở dữ liệu. Điều này rất hữu ích khi bạn muốn thực hiện những thay đổi phức tạp hơn mà migration:generate không thể xử lý được.
---- npx typeorm migration:create src/user/migrations/user ----

Ví dụ, bạn có thể muốn thêm một cột mới vào một bảng, nhưng chỉ khi cột đó chưa tồn tại. Hoặc bạn có thể muốn thực hiện một thay đổi dữ liệu lớn mà không ảnh hưởng đến hiệu suất của ứng dụng. Trong những trường hợp như vậy, migration:create sẽ rất hữu ích.

Về việc xóa một cột, bạn có thể làm điều đó trong phương thức up của file migration bằng cách sử dụng queryRunner.dropColumn('table', 'column'). Tuy nhiên, hãy nhớ rằng bạn cũng cần phải cung cấp một cách để hoàn tác thay đổi này trong phương thức down.
