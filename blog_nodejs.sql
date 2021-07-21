-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Máy chủ: mysql-blog-app:3306
-- Thời gian đã tạo: Th5 01, 2021 lúc 02:13 AM
-- Phiên bản máy phục vụ: 5.7.33
-- Phiên bản PHP: 7.2.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `blog_nodejs`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `contact`
--

CREATE TABLE `contact` (
  `ID` int(12) NOT NULL,
  `ID_user` int(12) DEFAULT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `content` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `reply` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `type` int(2) DEFAULT NULL,
  `date_contact` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `date_reply` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `contact`
--

INSERT INTO `contact` (`ID`, `ID_user`, `email`, `content`, `reply`, `type`, `date_contact`, `date_reply`) VALUES
(1, 1, 'vodinhnghia85@gmail.com', 'Hello', 'Hi you!', 1, '16 02 2021 10:31:21', '13 03 2021 10:40:57'),
(4, 1, 'vodinhnghia85@gmail.com', 'Hỏi thông tin admin.', 'What are you ask about info?', 1, '27 02 2021 10:30:04', '13 03 2021 10:41:58'),
(5, 5, 'dinhnghia@gmail.com', 'Tôi muốn hỏi về vấn đề.', 'Bạn muốn hỏi về vấn đề gì ?', 1, '06 03 2021 10:18:13', '13 03 2021 10:42:24'),
(6, 2, 'vothituyetlinh99@gmail.com', 'test', 'Ok ', 1, '13 03 2021 10:15:47', '13 03 2021 10:40:27'),
(7, 4, 'vodinhnghia@gmail.com', 'Kiểm tra chức năng thông báo phần admin .', '', 0, '13 03 2021 10:44:25', '');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `getpass`
--

CREATE TABLE `getpass` (
  `ID` int(12) NOT NULL,
  `username` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email_user` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `date_getpass` varchar(20) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `getpass`
--

INSERT INTO `getpass` (`ID`, `username`, `email_user`, `date_getpass`) VALUES
(1, 'DinhNghia', 'luongsonbac@gmail.com', '14 03 2021 17:09:28'),
(2, 'Võ Đình Nghĩa', 'vodinhnghia@gmail.com', '14 03 2021 17:11:46'),
(3, 'Võ Đình Nghĩa', 'vodinhnghia@gmail.com', '14 03 2021 17:13:00'),
(4, 'Võ Đình Nghĩa', 'vodinhnghia@gmail.com', '14 03 2021 17:15:56'),
(5, 'Võ Đình Nghĩa', 'vodinhnghia@gmail.com', '14 03 2021 17:18:29'),
(6, 'VoDinhNghia', 'admin123@gmail.com', '14 03 2021 17:18:42'),
(7, 'Đình Nghĩa', 'admin123@gmail.com', '14 03 2021 17:19:34'),
(8, 'Đình Nghĩa', 'vodinhnghia@gmail.com', '14 03 2021 17:19:41'),
(9, 'Đình Nghĩa', 'vodinhnghia@gmail.com', '14 03 2021 17:19:55'),
(10, 'Võ Thị Tuyết Linh', 'vothituyetlinh99@gmail.com', '14 03 2021 17:20:15'),
(11, 'Võ Thị Tuyết Linh', 'vothituyetlinh99@gmail.com', '14 03 2021 17:23:10'),
(12, 'Võ Đình Nghĩa', 'vodinhnghia@gmail.com', '16 03 2021 07:12:44'),
(13, 'Võ Đình Nghĩa', 'vodinhnghiaskype@gmail.com', '16 03 2021 07:13:18'),
(14, 'Võ Đình Nghĩa', 'vodinhnghiaskype@gmail.com', '16 03 2021 07:13:49'),
(15, 'Võ Đình Nghĩa', 'vodinhnghiaskype@gmail.com', '16 03 2021 07:13:59'),
(16, 'Võ Đình Nghĩa', 'vodinhnghiaskype@gmail.com', '16 03 2021 20:25:04');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `listpost`
--

CREATE TABLE `listpost` (
  `ID` int(12) NOT NULL,
  `ID_user` int(12) DEFAULT NULL,
  `title` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `content` text COLLATE utf8_unicode_ci,
  `image` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `privacy` int(2) DEFAULT NULL,
  `date_post` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `listpost`
--

INSERT INTO `listpost` (`ID`, `ID_user`, `title`, `content`, `image`, `privacy`, `date_post`) VALUES
(17, 2, 'Cảm nhận về tết', 'Nếu dưới mái nhà của mình mà con người ta chẳng cảm nhận được những ấm yên, mái nhà ấy hẳn còn thiếu sự bao dung và thấu hiểu. Nếu có như thế, cũng đừng ngồi yên trong bóng tối, bởi thay đổi bắt đầu từ chính chúng ta. Nếu không thể nhìn thấy ánh sáng trong ngôi nhà của mình, hãy là người chủ động lau cho những vệt tối dần sáng lên...\r\n(Trích dẫn, hình ảnh minh họa ).', '/images/uploads/04-02-2021-14980611_834218783384968_1001746565774831532_n.jpg', 0, '04 02 2021 20:46:38'),
(18, 2, 'Du xuân Phú Yên', 'Chắc hẳn Thái Trinh cũng đã tìm hiểu sơ qua về Gành Đá Dĩa, biểu tượng du lịch của Phú Yên. Mùa nào trong năm nơi đây cũng đón tiếp rất nhiều lượt khách tham quan, tuy nhiên mùa xuân và dịp Tết Gành Đá Dĩa là đẹp nhất. Những con sóng vỗ bờ êm đềm xô vào gành đá đen tuyền, tựa như tổ ong khổng lồ bằng đá nằm cạnh đại dương xanh thẳm. Mùa xuân cũng là mùa của rêu xanh, cây cỏ, hoa lá đâm chòi nảy lộc. Nếu bạn và gia đình dạo bước du xuân đến đây sẽ có rất nhiều khung ảnh đẹp và hùng vĩ đang chờ đón.', '/images/uploads/04-02-2021-duxuanphuyen.jpg', 0, '04 02 2021 21:14:50'),
(19, 1, 'Làng hoa nhộn nhịp đón Tết', 'Trở về những làng hoa những ngày này, không khí tất bật và rộn ràng. Các vườn hoa nhộn nhịp khách đến tham quan, mua hoa. Người trồng hoa nở nụ cười mãn nguyện sau một thời gian chăm bẵm khó khăn. Tết đến với các làng hoa sớm hơn ở các địa phương khác. \r\n(Trich: Baoquangngai.vn)', '/images/uploads/05-02-2021-xuanquangngai.jpg', 0, '05 02 2021 12:00:24'),
(20, 1, 'Cảm xúc ngày cuối năm', 'Bóng chiều dần tắt, tiếng thời gian dường như đang nghiêng về một phía. Nỗi nhớ nhân đôi lên. Chiều đã bắt đầu lạnh, ngân ngấn gió về khiến tia nắng gẫy đôi. Những ngày cuối năm càng trôi nhanh hơn,lòng người hoang hoải…chùng hẳn lại.\r\n(source: https://tanvan.xyz/cam-xuc-ngay-cuoi-nam/)', '/images/uploads/06-02-2021-cuoi-nam.jpg', 0, '06 02 2021 09:10:33'),
(22, 1, 'Code ngày cuối năm.', 'Tranh thu code12', '/images/uploads/14-02-2021-Screenshot from 2021-02-02 21-23-14.png', 1, '14 02 2021 20:35:05'),
(24, 4, 'Chuyện vui lập trình', 'Ông bà ta thường có câu “Một nụ cười bằng mười thang thuốc bổ” vậy nên sau những giờ làm việc, học tập căng thẳng ta cũng nên tìm một thứ gì đó để giải trí một chút cho vui, giúp công việc đạt kết quả cao hơn. (trichs: https://quantrimang.com/tong-hop-nhung-truyen-cuoi-ba-dao-viet-ve-dan-it-164143)', '/images/uploads/03-03-2021-Screenshot from 2021-02-16 19-02-39.png', 0, '16 02 2021 10:42:07'),
(26, 1, 'Những ngày cuối tháng 2', 'Thế rồi tháng 2 lần nữa lại ghé qua đây và chở về một mùa xuân yêu kiều nồng đượm. Tháng hai là độ mùa xuân vừa chín, cây lá đâm chồi, cỏ hoa rợp nở. Nhưng như khúc tản văn mà tôi đã viết, có ai đứng giữa “mùa yêu” ấy mà chợt nhớ tới những thứ khốc khô và buồn bã không nhỉ? Có ai bước giữa mùa tháng hai mà chợt nhớ tới một chút cô đơn, một chút lạnh lùng, một nỗi sầu diệu vợi? Nếu có, thì bài viết hôm nay là dành cho bạn. Xin gửi tới mọi người chùm thơ tháng 2 tâm trạng, lãng mạn, cô đơn và buồn bã nhất mà tôi đã sưu tầm. Hy vọng rằng các bạn cũng sẽ thích những áng thơ tình tháng hai đầy cảm xúc này. Chúc các bạn có những phút giây thật tuyệt bên những vần thơ tình buồn tháng 2 hay!\r\n(Nguồn : https://ocuaso.com/tho-buon/tho-suu-tam/chum-tho-tinh-thang-2-hay.html)', '/images/uploads/27-02-2021-thang2.jpg', 0, '27 02 2021 10:24:31'),
(27, 2, 'Tháng 2 ngày nhớ ai', 'Tháng 2 xuân về người có nhớ ...', '', 0, '27 02 2021 10:28:51'),
(28, 4, 'Tháng 3 sắp tới rồi ', 'Hello tháng 3 ...', '/images/uploads/27-02-2021-sach_cafe.jpg', 0, '27 02 2021 10:31:30'),
(32, 5, 'Thứ 7 máu chảy về tim', '', '/images/uploads/06-03-2021-stt-thu-7-mau-chay-ve-tim-p.jpg', 0, '13 03 2021 21:53:33'),
(34, 7, 'Những vần thơ hay.', 'Bút hoa đưa đẩy hồn thêm lối.\r\nMiệng đọc mắt nhìn đầu lắc lư.', '/images/uploads/14-03-2021-Screenshot from 2021-03-14 11-14-39.png', 1, '14 03 2021 17:29:31'),
(35, 8, 'Hàng Long Thập Bát Chưởng', 'Hàng Long Thập Bát Chưởng là bộ chưởng pháp chí cương được lưu truyền giữa các đời bang chủ Cái Bang. Tên gọi của 18 chiêu thức đều lấy từ Kinh Dịch.\r\nTương truyền bộ chưởng pháp này do bang chủ đời thứ nhất của Cái Bang tên Hồng Tứ Hải sáng tạo ra với tên Dịch Kinh Hàng Long Chưởng gồm rất nhiều chiêu. Hậu thế sau này rút gọn còn 18 chưởng....', '', 1, '14 03 2021 20:55:34'),
(36, 10, 'Biểu cảm về con vật nuôi', 'Tuổi thơ của ai cũng gắn bó với một loài vật nuôi đáng yêu, đó có thể là chú rùa, chú chim hay chú mèo… Riêng với tôi, tuổi thơ của tôi gắn với chú chó Phi Phi dũng cảm.', '/images/uploads/15-03-2021-bieu-cam-ve-con-vat-nuoi-con-cho.jpg', 0, '15 03 2021 08:33:09'),
(37, 11, 'Những ngày cuối tháng 4', 'test ..', '', 0, '24 04 2021 17:02:43');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `manager_avatar`
--

CREATE TABLE `manager_avatar` (
  `ID` int(12) NOT NULL,
  `ID_user` int(12) DEFAULT NULL,
  `image_update` varchar(150) COLLATE utf8_unicode_ci DEFAULT NULL,
  `date_update` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `manager_avatar`
--

INSERT INTO `manager_avatar` (`ID`, `ID_user`, `image_update`, `date_update`) VALUES
(10, 2, '/images/avatars/15-02-2021-photocat.jpg', '15 02 2021 19:19:55'),
(11, 2, '/images/avatars/15-02-2021-106712292_979102752520719_7452376421506811259_n.jpg', '15 02 2021 19:24:03'),
(12, 4, '/images/avatars/16-02-2021-15036301_834215213385325_8760571512419874799_n.jpg', '16 02 2021 10:40:42'),
(13, 4, '/images/avatars/16-02-2021-18870731_709897545885580_1363768799_n.jpg', '16 02 2021 10:47:06'),
(15, 5, '/images/avatars/03-03-2021-2021-01-20-134634.jpg', '03 03 2021 20:42:59'),
(16, 5, '/images/avatars/06-03-2021-photocat.jpg', '06 03 2021 10:05:03'),
(27, 10, '/images/avatars/16-03-2021-avatar-female.jpg', '16 03 2021 08:01:35'),
(28, 11, '/images/avatars/24-04-2021-phuong_binhduong.jpg', '24 04 2021 17:01:45');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `manager_follow`
--

CREATE TABLE `manager_follow` (
  `ID` int(12) NOT NULL,
  `ID_user_follow` int(12) DEFAULT NULL,
  `ID_user_followed` int(12) DEFAULT NULL,
  `status_follow` int(12) DEFAULT NULL,
  `date_follow` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `manager_follow`
--

INSERT INTO `manager_follow` (`ID`, `ID_user_follow`, `ID_user_followed`, `status_follow`, `date_follow`) VALUES
(1, 1, 11, 0, '25 04 2021 13:59:02'),
(2, 1, 10, 0, '25 04 2021 09:11:42'),
(3, 1, 5, 1, '30 04 2021 21:46:16'),
(4, 11, 10, 1, '24 04 2021 21:11:23'),
(5, 1, 2, 0, '24 04 2021 21:13:58'),
(7, 1, 7, 1, '25 04 2021 08:52:00'),
(8, 2, 10, 1, '25 04 2021 08:49:47'),
(9, 2, 7, 1, '25 04 2021 08:50:11'),
(10, 2, 8, 1, '25 04 2021 08:50:30'),
(11, 1, 4, 0, '25 04 2021 08:51:32'),
(12, 1, 8, 1, '30 04 2021 21:45:45'),
(13, 10, 1, 1, '25 04 2021 13:24:26');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `message`
--

CREATE TABLE `message` (
  `ID` int(12) NOT NULL,
  `ID_user_send` int(12) DEFAULT NULL,
  `ID_user_get` int(12) DEFAULT NULL,
  `content_mess` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status_mess` int(2) DEFAULT NULL,
  `date_mess` varchar(20) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `message`
--

INSERT INTO `message` (`ID`, `ID_user_send`, `ID_user_get`, `content_mess`, `status_mess`, `date_mess`) VALUES
(20, 1, 4, 'Hello!', 1, '30 04 2021 21:05:56'),
(21, 4, 1, 'Hi', 1, '30 04 2021 21:06:29'),
(22, 1, 4, 'OK ban', 0, '30 04 2021 21:11:22'),
(23, 5, 1, 'Hello', 1, '30 04 2021 21:32:24'),
(24, 1, 5, 'Hi', 1, '30 04 2021 21:33:14'),
(25, 5, 1, 'Kakak', 0, '30 04 2021 21:43:28');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `share_like_comment`
--

CREATE TABLE `share_like_comment` (
  `ID` int(12) NOT NULL,
  `ID_post` int(12) DEFAULT NULL,
  `ID_user` int(12) DEFAULT NULL,
  `comment` text COLLATE utf8_unicode_ci,
  `type` int(12) DEFAULT NULL,
  `status_like` int(12) NOT NULL,
  `status_notify` int(10) DEFAULT NULL,
  `date_implement` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `share_like_comment`
--

INSERT INTO `share_like_comment` (`ID`, `ID_post`, `ID_user`, `comment`, `type`, `status_like`, `status_notify`, `date_implement`) VALUES
(4, 20, 1, 'like', 0, 0, 0, '14 02 2021 12:05:40'),
(5, 20, 1, 'Thật buồn\r\n', 1, 0, 0, '14 02 2021 12:20:31'),
(6, 20, 1, 'Chia sẻ cùng nhau', 1, 0, 0, '14 02 2021 12:21:11'),
(8, 22, 1, 'like', 0, 0, 0, '15 02 2021 09:12:31'),
(9, 22, 2, 'like', 0, 0, 1, '15 02 2021 19:12:06'),
(10, 22, 4, 'like', 0, 0, 1, '16 02 2021 10:36:40'),
(11, 24, 4, 'like', 0, 0, 0, '16 02 2021 10:42:15'),
(12, 24, 1, 'like', 0, 0, 0, '16 02 2021 11:16:45'),
(13, 24, 1, 'Hello', 1, 0, 0, '16 02 2021 11:16:56'),
(14, 18, 1, 'like', 0, 0, 0, '16 02 2021 11:25:08'),
(15, 18, 1, 'Đẹp lắm em.', 1, 0, 0, '16 02 2021 11:25:23'),
(16, 22, 1, 'hello', 1, 0, 0, '22 02 2021 13:59:19'),
(17, 19, 1, 'like', 0, 0, 0, '22 02 2021 14:02:03'),
(18, 26, 1, 'like', 0, 0, 0, '27 02 2021 10:24:38'),
(19, 26, 1, 'Tháng 2 ngày cuối ta nhớ ai ...', 1, 0, 0, '27 02 2021 10:25:22'),
(20, 26, 2, 'like', 0, 0, 1, '27 02 2021 10:25:37'),
(21, 26, 2, 'Anh nhớ ai vậy ?', 1, 0, 1, '27 02 2021 10:25:50'),
(22, 27, 2, 'like', 0, 0, 0, '27 02 2021 10:28:54'),
(24, 27, 1, 'like', 0, 0, 1, '27 02 2021 10:29:35'),
(25, 28, 4, 'like', 0, 0, 0, '27 02 2021 10:31:36'),
(26, 28, 1, 'like', 0, 0, 0, '27 02 2021 10:32:22'),
(27, 28, 1, 'Ảnh đẹp quá...', 1, 0, 0, '27 02 2021 10:32:35'),
(28, 17, 1, 'like', 0, 0, 0, '27 02 2021 11:07:39'),
(36, 28, 5, 'like', 0, 0, 1, '06 03 2021 10:01:24'),
(37, 28, 5, 'Beautiful image', 1, 0, 1, '06 03 2021 10:01:45'),
(38, 32, 5, 'like', 0, 0, 0, '06 03 2021 10:03:42'),
(39, 26, 5, 'like', 0, 0, 1, '06 03 2021 10:20:50'),
(40, 26, 5, 'Beautiful girl', 1, 0, 1, '06 03 2021 10:21:09'),
(41, 32, 1, 'like', 0, 0, 1, '13 03 2021 16:34:54'),
(42, 27, 1, 'Hello', 1, 0, 1, '13 03 2021 18:06:40'),
(43, 20, 2, 'Anh viết bài chất vậy ...', 1, 0, 1, '13 03 2021 21:20:50'),
(45, 27, 1, 'Em nhớ ai vậy', 1, 0, 1, '14 03 2021 08:56:38'),
(46, 20, 2, 'like', 0, 0, 1, '14 03 2021 09:06:53'),
(47, 34, 7, 'like', 0, 0, 0, '14 03 2021 17:34:55'),
(48, 34, 1, 'like', 0, 0, 1, '14 03 2021 17:35:14'),
(49, 34, 1, 'Thơ hay...', 1, 0, 1, '14 03 2021 17:35:24'),
(50, 34, 7, 'Ok bạn', 1, 0, 0, '14 03 2021 20:11:09'),
(52, 34, 2, 'like', 0, 0, 1, '14 03 2021 20:24:33'),
(53, 35, 8, 'like', 0, 0, 0, '14 03 2021 20:55:42'),
(54, 34, 7, 'Thank for you.', 1, 0, 0, '14 03 2021 21:05:20'),
(55, 36, 10, 'like', 0, 0, 0, '15 03 2021 08:33:15'),
(56, 36, 1, 'like', 0, 1, 1, '15 03 2021 01:57:29'),
(57, 36, 1, 'test', 1, 0, 1, '15 03 2021 01:57:39'),
(58, 28, 7, 'Test', 1, 0, 1, '15 03 2021 02:02:47'),
(59, 34, 7, 'Test\r\n', 1, 0, 0, '15 03 2021 02:03:09'),
(60, 32, 1, 'Test ', 1, 0, 0, '17 03 2021 09:45:16'),
(61, 26, 10, 'like', 0, 0, 1, '24 04 2021 16:57:29'),
(62, 37, 5, 'like', 0, 0, 0, '24 04 2021 17:05:23'),
(63, 37, 1, 'like', 0, 0, 0, '24 04 2021 20:16:04'),
(64, 20, 10, 'like', 0, 0, 0, '25 04 2021 08:53:52');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `ID` int(12) NOT NULL,
  `name` varchar(150) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pass` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `mobile` int(10) DEFAULT NULL,
  `gender` int(10) DEFAULT NULL,
  `level` int(2) DEFAULT NULL,
  `status` int(10) DEFAULT NULL,
  `created_at` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `date_update` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `avatar` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `country` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`ID`, `name`, `pass`, `email`, `mobile`, `gender`, `level`, `status`, `created_at`, `date_update`, `avatar`, `country`) VALUES
(1, 'Võ Đình Nghĩa', '4a3396f4fcc5bffd73c6c2276f8b664e', 'vodinhnghiaskype@gmail.com', 365572875, 1, 0, 1, '01 02 2021 21:28:52', '16 03 2021 21:20:44', '', 'Vietnam'),
(2, 'Võ Thị Tuyết Linh', '43fb94da1177864aa7a9fbb7f072b1e9', 'vothituyetlinh99@gmail.com', 372129501, 0, 0, 0, '04 02 2021 20:42:13', '27 02 2021 10:26:05', '/images/avatars/15-02-2021-106712292_979102752520719_7452376421506811259_n.jpg', 'Phu Yen, Viet Nam'),
(3, 'Admin', 'b67e6428abfd27b95dad3a8ca26f38a7', 'admin123@gmail.com', 365572875, 1, 1, 0, '12 02 2021 08:16:31', '', '', 'Việt Nam'),
(4, 'Đình Nghĩa', '4a3396f4fcc5bffd73c6c2276f8b664e', 'vodinhnghia@gmail.com', 365572875, 1, 0, 0, '16 02 2021 10:36:25', '15 03 2021 08:24:28', '/images/avatars/16-02-2021-15036301_834215213385325_8760571512419874799_n.jpg', 'Bình Hiệp, Bình Sơn, Quảng Ngãi'),
(5, 'Nghĩa Bình Hiệp', '4a3396f4fcc5bffd73c6c2276f8b664e', 'dinhnghia@gmail.com', 365572875, 1, 0, 1, '03 03 2021 19:55:44', '06 03 2021 10:18:56', '/images/avatars/06-03-2021-photocat.jpg', 'Bình Hiệp, Bình Sơn, Quảng Ngãi'),
(7, 'Võ Nghĩa ', '113de9f99888129b5aa80eee5d61ef22', 'vodinhnghia85@gmail.com', 365572875, 1, 0, 0, '14 03 2021 16:48:56', '14 03 2021 20:23:59', '', 'Vietnam'),
(8, 'Kiều Phong', '4b2e0a423c324fe8fbd9b8040f7a4a59', 'kieuphong@gmail.com', 223456677, 1, 0, 0, '14 03 2021 20:51:46', '14 03 2021 20:54:22', '', 'Bang chủ Cái Ban, truyện Kim Dung'),
(10, 'Nguyễn Thị A', '5066222e2beb300edae00d1ac42bb85e', 'nguyenthia@gmail.com', 387777994, 0, 0, 0, '15 03 2021 08:29:09', '16 03 2021 08:01:35', '/images/avatars/16-03-2021-avatar-female.jpg', 'Quảng Ngãi, Việt Nam'),
(11, 'Võ Đình A', '17da7da01903407631ea53b31d5a8793', 'vodinha@gmail.com', 365572875, 1, 0, 0, '24 04 2021 17:00:52', '24 04 2021 17:01:45', '/images/avatars/24-04-2021-phuong_binhduong.jpg', 'Vietnam');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_user` (`ID_user`);

--
-- Chỉ mục cho bảng `getpass`
--
ALTER TABLE `getpass`
  ADD PRIMARY KEY (`ID`);

--
-- Chỉ mục cho bảng `listpost`
--
ALTER TABLE `listpost`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_user` (`ID_user`);

--
-- Chỉ mục cho bảng `manager_avatar`
--
ALTER TABLE `manager_avatar`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_user` (`ID_user`);

--
-- Chỉ mục cho bảng `manager_follow`
--
ALTER TABLE `manager_follow`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_user_followed` (`ID_user_followed`);

--
-- Chỉ mục cho bảng `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_user_get` (`ID_user_get`);

--
-- Chỉ mục cho bảng `share_like_comment`
--
ALTER TABLE `share_like_comment`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_post` (`ID_post`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `contact`
--
ALTER TABLE `contact`
  MODIFY `ID` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `getpass`
--
ALTER TABLE `getpass`
  MODIFY `ID` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT cho bảng `listpost`
--
ALTER TABLE `listpost`
  MODIFY `ID` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT cho bảng `manager_avatar`
--
ALTER TABLE `manager_avatar`
  MODIFY `ID` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT cho bảng `manager_follow`
--
ALTER TABLE `manager_follow`
  MODIFY `ID` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT cho bảng `message`
--
ALTER TABLE `message`
  MODIFY `ID` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT cho bảng `share_like_comment`
--
ALTER TABLE `share_like_comment`
  MODIFY `ID` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `listpost`
--
ALTER TABLE `listpost`
  ADD CONSTRAINT `listpost_ibfk_1` FOREIGN KEY (`ID_user`) REFERENCES `user` (`ID`);

--
-- Các ràng buộc cho bảng `share_like_comment`
--
ALTER TABLE `share_like_comment`
  ADD CONSTRAINT `share_like_comment_ibfk_1` FOREIGN KEY (`ID_post`) REFERENCES `listpost` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
