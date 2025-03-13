# BE_BookRestaurant
## Cách chạy dự án
1. Cài thư viện ```npm i```
 2. Cài database từ ```db.sql``` vô database của mình
 3. Cấu hình file ```.env``` theo mẫu ```.env.examples```
 4. Chạy dự án ``` npm run dev```

## Kiểm tra
1. Các ràng buộc về thời gian (Những chức năng nào liên quan đến bảng có chưa thời gian ngoại trừ createAi và updateAt thì không cần) thì cần kiểm tra xem: Thời gian trong quá khứ, bàn có rảnh vào thời gian đó hay không
2. kiểm tra ràng buộc liên quan đến số người.