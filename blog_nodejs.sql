-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Máy chủ: mysql-blog-app:3306
-- Thời gian đã tạo: Th3 13, 2021 lúc 02:23 PM
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
(23, 14, 2, 'like', 0, 0, 1, '27 02 2021 10:29:06'),
(24, 27, 1, 'like', 0, 0, 0, '27 02 2021 10:29:35'),
(25, 28, 4, 'like', 0, 0, 0, '27 02 2021 10:31:36'),
(26, 28, 1, 'like', 0, 0, 0, '27 02 2021 10:32:22'),
(27, 28, 1, 'Ảnh đẹp quá...', 1, 0, 0, '27 02 2021 10:32:35'),
(28, 17, 1, 'like', 0, 0, 0, '27 02 2021 11:07:39'),
(32, 29, 1, 'like', 0, 0, 0, '06 03 2021 10:00:32'),
(33, 29, 1, 'Good like', 1, 0, 0, '06 03 2021 10:00:42'),
(34, 29, 5, 'Ok man', 1, 0, 0, '06 03 2021 10:00:57'),
(35, 29, 5, 'like', 0, 0, 0, '06 03 2021 10:01:01'),
(36, 28, 5, 'like', 0, 0, 0, '06 03 2021 10:01:24'),
(37, 28, 5, 'Beautiful image', 1, 0, 0, '06 03 2021 10:01:45'),
(38, 32, 5, 'like', 0, 0, 0, '06 03 2021 10:03:42'),
(39, 26, 5, 'like', 0, 0, 1, '06 03 2021 10:20:50'),
(40, 26, 5, 'Beautiful girl', 1, 0, 1, '06 03 2021 10:21:09'),
(41, 32, 1, 'like', 0, 0, 0, '13 03 2021 16:34:54'),
(42, 27, 1, 'Hello', 1, 0, 0, '13 03 2021 18:06:40'),
(43, 20, 2, 'Anh viết bài chất vậy ...', 1, 0, 0, '13 03 2021 21:20:50');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `share_like_comment`
--
ALTER TABLE `share_like_comment`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_post` (`ID_post`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `share_like_comment`
--
ALTER TABLE `share_like_comment`
  MODIFY `ID` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `share_like_comment`
--
ALTER TABLE `share_like_comment`
  ADD CONSTRAINT `share_like_comment_ibfk_1` FOREIGN KEY (`ID_post`) REFERENCES `listpost` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
