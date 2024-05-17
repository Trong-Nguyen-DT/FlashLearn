# FlashLearn: Website Học Từ Vựng Tiếng Anh

## Giới thiệu

FlashLearn là một nền tảng flashcard trực tuyến, giúp người dùng học từ vựng tiếng Anh một cách hiệu quả. Trong bối cảnh công nghệ phát triển mạnh mẽ và việc học trực tuyến ngày càng phổ biến, nhu cầu học ngoại ngữ trở nên quan trọng hơn bao giờ hết. Tuy nhiên, việc học từ vựng vẫn là một thách thức vì đòi hỏi sự nhớ và luyện tập đều đặn. FlashLearn ra đời để giải quyết vấn đề này bằng cách cung cấp một giao diện thân thiện và dễ sử dụng, cho phép người dùng tạo ra các flashcard cá nhân hoặc sử dụng những bộ từ vựng có sẵn. Flashcard được trình bày trực quan và thu hút, kết hợp với các tính năng kiểm tra, phản hồi tức thì, và theo dõi tiến độ học tập.

## Mục đích, Ý nghĩa, Yêu cầu

### Mục đích
Cung cấp một công cụ học từ vựng tiếng Anh hiệu quả và tiện lợi cho mọi người, giúp người dùng tăng cường khả năng giao tiếp và hiểu biết bằng cách cải thiện vốn từ vựng của họ.

### Ý nghĩa
Tạo ra một môi trường học tập đa dạng và thú vị, khuyến khích người dùng tự tin hơn khi sử dụng tiếng Anh trong các tình huống thực tế. FlashLearn cũng giúp người học chuẩn bị cho các kỳ thi tiếng Anh quan trọng như TOEFL, IELTS, và các kỳ thi tương tự.

### Yêu cầu
- Phát triển giao diện dễ sử dụng và linh hoạt.
- Cung cấp tính năng quản lý flashcard, khóa học và học viên trong khóa học.
- Cung cấp tính năng quản lý tài khoản cá nhân.
- Sử dụng AI để tạo ra các đáp án tương tự, tăng độ khó và đa dạng cho quá trình học.
- Đảm bảo cơ chế phản hồi và thống kê tiến độ học tập.
- Tích hợp tính năng đa nền tảng, cho phép truy cập từ máy tính và điện thoại di động.

## Trình tự triển khai

1. Xác định yêu cầu của đề tài.
2. Thiết kế Use Case, Database, WireFrame cho đề tài.
3. Setup BackEnd (Security, Database), FrontEnd (Route, components, Authentication).
4. Triển khai các chức năng.
5. Deploy dự án lên production và viết báo cáo.

## Công cụ sử dụng

- **Ngôn ngữ**:
  - Backend: Java
  - Frontend: Framework ReactJS
- **Cơ sở dữ liệu**: MySQL
- **Công cụ lưu trữ**: AWS S3
- **Công cụ hỗ trợ**:
  - Github: Quản lý code
  - Trello: Quản lý dự án

## Những kết quả dự kiến đạt được

### Về mặt lý thuyết
- Tìm hiểu và áp dụng OpenAI và các công nghệ trí tuệ nhân tạo vào dự án.
- Nghiên cứu phương pháp spaced repetition để nâng cao hiệu quả học từ vựng.

### Về mặt ứng dụng
- **Đối với học sinh**:
  - Tìm kiếm và tham gia các khóa học phù hợp.
  - Giao diện học từ vựng thân thiện, dễ tiếp cận.
  - Hệ thống theo dõi tiến độ học tập, ôn tập đúng lúc và tăng cường khả năng ghi nhớ.
  - Theo dõi bảng xếp hạng trong khóa học để đo lường tiến bộ và so sánh với các đồng học.
- **Đối với giáo viên**:
  - Quản lý khóa học của mình một cách linh hoạt và hiệu quả, bao gồm tạo mới, chỉnh sửa và xóa khóa học.
  - Quản lý các bài học và từ vựng trong khóa học một cách thuận tiện.
  - Hệ thống quản lý học sinh giúp giáo viên theo dõi và quản lý học sinh tham gia khóa học của mình một cách dễ dàng.
  - Công cụ tạo đáp án tương tự với kết quả giúp tăng cường độ khó cho bài học và tạo ra trải nghiệm học tập đa dạng và thú vị.

## Use Case Diagram
![Use Case Diagram](https://github.com/Trong-Nguyen-DT/FlashLearn/assets/103616323/49e86fd3-9c1e-471a-a170-854d5e423a29)

## Database Diagram
![Database Diagram](https://github.com/Trong-Nguyen-DT/FlashLearn/assets/103616323/ef631e85-4dad-455d-bf53-4c91620ad5f7)
