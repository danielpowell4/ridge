import React from "react";
import { VictoryBar, Bar, VictoryChart, VictoryScatter } from "victory";

const dummyData = [
  { id: 13045, created_at: "2018-09-07 16:28:26 -0400" },
  { id: 13046, created_at: "2018-09-07 16:30:04 -0400" },
  { id: 13047, created_at: "2018-09-07 18:20:02 -0400" },
  { id: 13048, created_at: "2018-09-07 22:08:14 -0400" },
  { id: 13049, created_at: "2018-09-08 11:28:45 -0400" },
  { id: 13050, created_at: "2018-09-08 14:18:56 -0400" },
  { id: 13051, created_at: "2018-09-08 14:19:08 -0400" },
  { id: 13052, created_at: "2018-09-08 16:24:28 -0400" },
  { id: 13053, created_at: "2018-09-08 18:17:16 -0400" },
  { id: 13054, created_at: "2018-09-08 22:08:58 -0400" },
  { id: 13055, created_at: "2018-09-08 22:09:21 -0400" },
  { id: 13056, created_at: "2018-09-08 22:09:42 -0400" },
  { id: 13057, created_at: "2018-09-08 22:38:54 -0400" },
  { id: 13058, created_at: "2018-09-08 23:00:38 -0400" },
  { id: 13059, created_at: "2018-09-08 23:01:17 -0400" },
  { id: 13060, created_at: "2018-09-08 23:01:49 -0400" },
  { id: 13061, created_at: "2018-09-08 23:02:35 -0400" },
  { id: 13062, created_at: "2018-09-08 23:03:15 -0400" },
  { id: 13063, created_at: "2018-09-08 23:05:59 -0400" },
  { id: 13064, created_at: "2018-09-08 23:06:12 -0400" },
  { id: 13065, created_at: "2018-09-08 23:06:38 -0400" },
  { id: 13066, created_at: "2018-09-08 23:07:12 -0400" },
  { id: 13067, created_at: "2018-09-08 23:07:46 -0400" },
  { id: 13068, created_at: "2018-09-08 23:08:33 -0400" },
  { id: 13069, created_at: "2018-09-08 23:09:05 -0400" },
  { id: 13070, created_at: "2018-09-08 23:10:14 -0400" },
  { id: 13071, created_at: "2018-09-08 23:11:10 -0400" },
  { id: 13072, created_at: "2018-09-08 23:11:32 -0400" },
  { id: 13073, created_at: "2018-09-09 11:51:22 -0400" },
  { id: 13074, created_at: "2018-09-09 12:47:30 -0400" },
  { id: 13075, created_at: "2018-09-09 20:36:59 -0400" },
  { id: 13076, created_at: "2018-09-09 21:20:44 -0400" },
  { id: 13077, created_at: "2018-09-09 21:20:55 -0400" },
  { id: 13078, created_at: "2018-09-09 21:21:35 -0400" },
  { id: 13079, created_at: "2018-09-10 10:55:20 -0400" },
  { id: 13080, created_at: "2018-09-10 10:55:30 -0400" },
  { id: 13081, created_at: "2018-09-10 10:57:25 -0400" },
  { id: 13082, created_at: "2018-09-10 10:59:49 -0400" },
  { id: 13083, created_at: "2018-09-10 11:14:37 -0400" },
  { id: 13084, created_at: "2018-09-10 11:33:53 -0400" },
  { id: 13085, created_at: "2018-09-10 11:41:34 -0400" },
  { id: 13086, created_at: "2018-09-10 11:53:40 -0400" },
  { id: 13087, created_at: "2018-09-10 12:11:25 -0400" },
  { id: 13088, created_at: "2018-09-10 12:16:36 -0400" },
  { id: 13089, created_at: "2018-09-10 12:21:21 -0400" },
  { id: 13090, created_at: "2018-09-10 13:19:45 -0400" },
  { id: 13091, created_at: "2018-09-10 13:35:12 -0400" },
  { id: 13092, created_at: "2018-09-10 13:47:41 -0400" },
  { id: 13093, created_at: "2018-09-10 14:19:32 -0400" },
  { id: 13094, created_at: "2018-09-10 14:19:50 -0400" },
  { id: 13095, created_at: "2018-09-10 14:20:23 -0400" },
  { id: 13096, created_at: "2018-09-10 15:30:27 -0400" },
  { id: 13097, created_at: "2018-09-10 16:08:45 -0400" },
  { id: 13098, created_at: "2018-09-10 16:32:56 -0400" },
  { id: 13099, created_at: "2018-09-10 19:09:42 -0400" },
  { id: 13100, created_at: "2018-09-10 19:10:12 -0400" },
  { id: 13101, created_at: "2018-09-10 19:41:01 -0400" },
  { id: 13102, created_at: "2018-09-10 20:32:50 -0400" },
  { id: 13103, created_at: "2018-09-10 20:41:01 -0400" },
  { id: 13104, created_at: "2018-09-10 20:46:22 -0400" },
  { id: 13105, created_at: "2018-09-10 22:43:45 -0400" },
  { id: 13106, created_at: "2018-09-10 22:44:18 -0400" },
  { id: 13107, created_at: "2018-09-10 22:48:38 -0400" },
  { id: 13108, created_at: "2018-09-10 23:23:35 -0400" },
  { id: 13109, created_at: "2018-09-10 23:24:17 -0400" },
  { id: 13110, created_at: "2018-09-10 23:24:36 -0400" },
  { id: 13111, created_at: "2018-09-10 23:24:51 -0400" },
  { id: 13112, created_at: "2018-09-10 23:45:44 -0400" },
  { id: 13113, created_at: "2018-09-11 00:04:44 -0400" },
  { id: 13114, created_at: "2018-09-11 11:07:55 -0400" },
  { id: 13115, created_at: "2018-09-11 11:53:15 -0400" },
  { id: 13116, created_at: "2018-09-11 12:17:13 -0400" },
  { id: 13117, created_at: "2018-09-11 12:19:43 -0400" },
  { id: 13118, created_at: "2018-09-11 12:30:05 -0400" },
  { id: 13119, created_at: "2018-09-11 13:51:35 -0400" },
  { id: 13120, created_at: "2018-09-11 14:24:56 -0400" },
  { id: 13121, created_at: "2018-09-11 14:33:06 -0400" },
  { id: 13122, created_at: "2018-09-11 15:30:38 -0400" },
  { id: 13123, created_at: "2018-09-11 15:36:53 -0400" },
  { id: 13124, created_at: "2018-09-11 15:47:53 -0400" },
  { id: 13125, created_at: "2018-09-11 16:19:56 -0400" },
  { id: 13126, created_at: "2018-09-11 16:33:34 -0400" },
  { id: 13127, created_at: "2018-09-11 16:41:42 -0400" },
  { id: 13128, created_at: "2018-09-11 17:28:58 -0400" },
  { id: 13129, created_at: "2018-09-11 17:56:05 -0400" },
  { id: 13130, created_at: "2018-09-11 18:57:57 -0400" },
  { id: 13131, created_at: "2018-09-11 18:58:40 -0400" },
  { id: 13132, created_at: "2018-09-11 19:29:16 -0400" },
  { id: 13133, created_at: "2018-09-11 19:45:37 -0400" },
  { id: 13134, created_at: "2018-09-11 19:49:48 -0400" },
  { id: 13135, created_at: "2018-09-11 19:51:48 -0400" },
  { id: 13136, created_at: "2018-09-11 20:28:56 -0400" },
  { id: 13137, created_at: "2018-09-11 21:48:10 -0400" },
  { id: 13138, created_at: "2018-09-11 22:31:00 -0400" },
  { id: 13139, created_at: "2018-09-11 23:38:10 -0400" },
  { id: 13140, created_at: "2018-09-12 00:28:23 -0400" },
  { id: 13141, created_at: "2018-09-12 09:49:54 -0400" },
  { id: 13142, created_at: "2018-09-12 12:53:33 -0400" },
  { id: 13143, created_at: "2018-09-12 13:09:23 -0400" },
  { id: 13144, created_at: "2018-09-12 13:28:37 -0400" },
  { id: 13145, created_at: "2018-09-12 13:46:50 -0400" },
  { id: 13146, created_at: "2018-09-12 13:59:46 -0400" },
  { id: 13147, created_at: "2018-09-12 14:24:06 -0400" },
  { id: 13148, created_at: "2018-09-12 14:33:10 -0400" },
  { id: 13149, created_at: "2018-09-12 14:34:32 -0400" },
  { id: 13150, created_at: "2018-09-12 14:34:41 -0400" },
  { id: 13151, created_at: "2018-09-12 15:21:46 -0400" },
  { id: 13152, created_at: "2018-09-12 15:25:26 -0400" },
  { id: 13153, created_at: "2018-09-12 16:25:09 -0400" },
  { id: 13154, created_at: "2018-09-12 16:56:12 -0400" },
  { id: 13155, created_at: "2018-09-12 17:02:36 -0400" },
  { id: 13156, created_at: "2018-09-12 17:28:12 -0400" },
  { id: 13157, created_at: "2018-09-12 17:56:42 -0400" },
  { id: 13158, created_at: "2018-09-12 18:29:53 -0400" },
  { id: 13159, created_at: "2018-09-12 21:00:35 -0400" },
  { id: 13160, created_at: "2018-09-12 21:46:38 -0400" },
  { id: 13161, created_at: "2018-09-12 22:22:09 -0400" },
  { id: 13162, created_at: "2018-09-12 22:53:09 -0400" },
  { id: 13163, created_at: "2018-09-13 00:10:05 -0400" },
  { id: 13164, created_at: "2018-09-13 00:20:19 -0400" },
  { id: 13165, created_at: "2018-09-13 09:36:43 -0400" },
  { id: 13166, created_at: "2018-09-13 11:19:22 -0400" },
  { id: 13167, created_at: "2018-09-13 12:47:59 -0400" },
  { id: 13168, created_at: "2018-09-13 13:29:04 -0400" },
  { id: 13169, created_at: "2018-09-13 13:31:55 -0400" },
  { id: 13170, created_at: "2018-09-13 13:50:23 -0400" },
  { id: 13171, created_at: "2018-09-13 14:12:56 -0400" },
  { id: 13172, created_at: "2018-09-13 14:46:52 -0400" },
  { id: 13173, created_at: "2018-09-13 15:09:18 -0400" },
  { id: 13174, created_at: "2018-09-13 15:31:09 -0400" },
  { id: 13175, created_at: "2018-09-13 17:38:11 -0400" },
  { id: 13176, created_at: "2018-09-13 17:39:16 -0400" },
  { id: 13177, created_at: "2018-09-13 17:45:07 -0400" },
  { id: 13178, created_at: "2018-09-13 21:11:56 -0400" },
  { id: 13179, created_at: "2018-09-14 10:06:27 -0400" },
  { id: 13180, created_at: "2018-09-14 10:44:13 -0400" },
  { id: 13181, created_at: "2018-09-14 10:56:58 -0400" },
  { id: 13182, created_at: "2018-09-14 11:40:51 -0400" },
  { id: 13183, created_at: "2018-09-14 11:58:06 -0400" },
  { id: 13184, created_at: "2018-09-14 12:54:42 -0400" },
  { id: 13185, created_at: "2018-09-14 14:54:31 -0400" },
  { id: 13186, created_at: "2018-09-14 16:03:07 -0400" },
  { id: 13187, created_at: "2018-09-14 17:19:49 -0400" },
  { id: 13188, created_at: "2018-09-14 23:02:07 -0400" },
  { id: 13189, created_at: "2018-09-15 10:13:42 -0400" },
  { id: 13190, created_at: "2018-09-15 10:24:13 -0400" },
  { id: 13191, created_at: "2018-09-15 11:54:21 -0400" },
  { id: 13192, created_at: "2018-09-15 18:14:05 -0400" },
  { id: 13193, created_at: "2018-09-16 17:44:03 -0400" },
  { id: 13194, created_at: "2018-09-16 23:09:27 -0400" },
  { id: 13195, created_at: "2018-09-16 23:10:30 -0400" },
  { id: 13196, created_at: "2018-09-17 09:06:04 -0400" },
  { id: 13197, created_at: "2018-09-17 09:16:04 -0400" },
  { id: 13198, created_at: "2018-09-17 09:16:18 -0400" },
  { id: 13199, created_at: "2018-09-17 09:23:00 -0400" },
  { id: 13200, created_at: "2018-09-17 09:25:50 -0400" },
  { id: 13201, created_at: "2018-09-17 09:26:23 -0400" },
  { id: 13202, created_at: "2018-09-17 10:49:56 -0400" },
  { id: 13203, created_at: "2018-09-17 11:07:17 -0400" },
  { id: 13204, created_at: "2018-09-17 11:22:17 -0400" },
  { id: 13205, created_at: "2018-09-17 11:22:37 -0400" },
  { id: 13206, created_at: "2018-09-17 11:23:58 -0400" },
  { id: 13207, created_at: "2018-09-17 11:33:51 -0400" },
  { id: 13208, created_at: "2018-09-17 11:45:39 -0400" },
  { id: 13209, created_at: "2018-09-17 12:04:07 -0400" },
  { id: 13210, created_at: "2018-09-17 13:21:36 -0400" },
  { id: 13211, created_at: "2018-09-17 14:32:50 -0400" },
  { id: 13212, created_at: "2018-09-17 15:22:31 -0400" },
  { id: 13213, created_at: "2018-09-17 16:19:33 -0400" },
  { id: 13214, created_at: "2018-09-17 17:16:58 -0400" },
  { id: 13215, created_at: "2018-09-17 19:56:36 -0400" },
  { id: 13216, created_at: "2018-09-17 21:06:16 -0400" },
  { id: 13217, created_at: "2018-09-17 21:08:22 -0400" },
  { id: 13218, created_at: "2018-09-17 21:52:47 -0400" },
  { id: 13219, created_at: "2018-09-17 23:32:10 -0400" },
  { id: 13220, created_at: "2018-09-17 23:33:21 -0400" },
  { id: 13221, created_at: "2018-09-18 08:06:01 -0400" },
  { id: 13222, created_at: "2018-09-18 08:48:16 -0400" },
  { id: 13223, created_at: "2018-09-18 09:35:27 -0400" },
  { id: 13224, created_at: "2018-09-18 09:35:53 -0400" },
  { id: 13225, created_at: "2018-09-18 09:36:07 -0400" },
  { id: 13226, created_at: "2018-09-18 09:36:23 -0400" },
  { id: 13227, created_at: "2018-09-18 09:59:25 -0400" },
  { id: 13228, created_at: "2018-09-18 10:16:46 -0400" },
  { id: 13229, created_at: "2018-09-18 10:50:42 -0400" },
  { id: 13230, created_at: "2018-09-18 12:32:13 -0400" },
  { id: 13231, created_at: "2018-09-18 13:03:21 -0400" },
  { id: 13232, created_at: "2018-09-18 13:13:21 -0400" },
  { id: 13233, created_at: "2018-09-18 13:13:50 -0400" },
  { id: 13234, created_at: "2018-09-18 13:17:51 -0400" },
  { id: 13235, created_at: "2018-09-18 13:32:54 -0400" },
  { id: 13236, created_at: "2018-09-18 13:41:00 -0400" },
  { id: 13237, created_at: "2018-09-18 13:54:56 -0400" },
  { id: 13238, created_at: "2018-09-18 15:54:36 -0400" },
  { id: 13239, created_at: "2018-09-18 15:54:51 -0400" },
  { id: 13240, created_at: "2018-09-18 16:12:43 -0400" },
  { id: 13241, created_at: "2018-09-18 17:35:41 -0400" },
  { id: 13242, created_at: "2018-09-18 23:43:55 -0400" },
  { id: 13243, created_at: "2018-09-18 23:45:37 -0400" },
  { id: 13244, created_at: "2018-09-19 04:36:44 -0400" },
  { id: 13245, created_at: "2018-09-19 08:16:47 -0400" },
  { id: 13246, created_at: "2018-09-19 10:51:42 -0400" },
  { id: 13247, created_at: "2018-09-19 10:55:44 -0400" },
  { id: 13248, created_at: "2018-09-19 11:33:03 -0400" },
  { id: 13249, created_at: "2018-09-19 11:35:41 -0400" },
  { id: 13250, created_at: "2018-09-19 11:36:10 -0400" },
  { id: 13251, created_at: "2018-09-19 12:06:14 -0400" },
  { id: 13252, created_at: "2018-09-19 12:22:01 -0400" },
  { id: 13253, created_at: "2018-09-19 12:22:13 -0400" },
  { id: 13254, created_at: "2018-09-19 12:53:45 -0400" },
  { id: 13255, created_at: "2018-09-19 12:54:46 -0400" },
  { id: 13256, created_at: "2018-09-19 13:01:06 -0400" },
  { id: 13257, created_at: "2018-09-19 13:24:29 -0400" },
  { id: 13258, created_at: "2018-09-19 13:28:44 -0400" },
  { id: 13259, created_at: "2018-09-19 13:45:24 -0400" },
  { id: 13260, created_at: "2018-09-19 14:04:09 -0400" },
  { id: 13261, created_at: "2018-09-19 17:06:41 -0400" },
  { id: 13262, created_at: "2018-09-19 18:22:35 -0400" },
  { id: 13263, created_at: "2018-09-19 18:26:21 -0400" },
  { id: 13264, created_at: "2018-09-20 08:54:53 -0400" },
  { id: 13265, created_at: "2018-09-20 10:05:48 -0400" },
  { id: 13266, created_at: "2018-09-20 11:14:31 -0400" },
  { id: 13267, created_at: "2018-09-20 12:44:30 -0400" },
  { id: 13268, created_at: "2018-09-20 13:34:01 -0400" },
  { id: 13269, created_at: "2018-09-20 13:44:11 -0400" },
  { id: 13270, created_at: "2018-09-20 13:57:38 -0400" },
  { id: 13271, created_at: "2018-09-20 14:40:41 -0400" },
  { id: 13272, created_at: "2018-09-20 14:46:43 -0400" },
  { id: 13273, created_at: "2018-09-20 15:13:52 -0400" },
  { id: 13274, created_at: "2018-09-20 15:14:34 -0400" },
  { id: 13275, created_at: "2018-09-20 15:56:37 -0400" },
  { id: 13276, created_at: "2018-09-20 16:17:48 -0400" },
  { id: 13277, created_at: "2018-09-20 16:18:20 -0400" },
  { id: 13278, created_at: "2018-09-20 18:07:56 -0400" },
  { id: 13279, created_at: "2018-09-20 19:37:28 -0400" },
  { id: 13280, created_at: "2018-09-20 20:22:01 -0400" },
  { id: 13281, created_at: "2018-09-20 20:22:18 -0400" },
  { id: 13282, created_at: "2018-09-20 20:29:01 -0400" },
  { id: 13283, created_at: "2018-09-20 20:29:16 -0400" },
  { id: 13284, created_at: "2018-09-20 20:57:23 -0400" },
  { id: 13285, created_at: "2018-09-20 21:48:41 -0400" },
  { id: 13286, created_at: "2018-09-21 08:11:43 -0400" },
  { id: 13287, created_at: "2018-09-21 08:56:55 -0400" },
  { id: 13288, created_at: "2018-09-21 09:05:44 -0400" },
  { id: 13289, created_at: "2018-09-21 09:23:50 -0400" },
  { id: 13290, created_at: "2018-09-21 11:36:21 -0400" },
  { id: 13291, created_at: "2018-09-21 11:39:36 -0400" },
  { id: 13292, created_at: "2018-09-21 11:48:35 -0400" },
  { id: 13293, created_at: "2018-09-21 11:54:40 -0400" },
  { id: 13294, created_at: "2018-09-21 12:19:14 -0400" },
  { id: 13295, created_at: "2018-09-21 12:20:53 -0400" },
  { id: 13296, created_at: "2018-09-21 12:21:18 -0400" },
  { id: 13297, created_at: "2018-09-21 12:21:55 -0400" },
  { id: 13298, created_at: "2018-09-21 12:22:36 -0400" },
  { id: 13299, created_at: "2018-09-21 13:09:37 -0400" },
  { id: 13300, created_at: "2018-09-21 17:10:59 -0400" },
  { id: 13301, created_at: "2018-09-21 18:01:54 -0400" },
  { id: 13302, created_at: "2018-09-22 09:32:23 -0400" },
  { id: 13303, created_at: "2018-09-22 09:46:31 -0400" },
  { id: 13304, created_at: "2018-09-22 13:02:35 -0400" },
  { id: 13305, created_at: "2018-09-22 18:19:15 -0400" },
  { id: 13306, created_at: "2018-09-23 17:17:40 -0400" },
  { id: 13307, created_at: "2018-09-24 08:46:44 -0400" },
  { id: 13308, created_at: "2018-09-24 09:31:49 -0400" },
  { id: 13309, created_at: "2018-09-24 09:44:04 -0400" },
  { id: 13310, created_at: "2018-09-24 11:34:39 -0400" },
  { id: 13311, created_at: "2018-09-24 11:37:55 -0400" },
  { id: 13312, created_at: "2018-09-24 12:03:21 -0400" },
  { id: 13313, created_at: "2018-09-24 12:29:16 -0400" },
  { id: 13314, created_at: "2018-09-24 13:10:46 -0400" },
  { id: 13315, created_at: "2018-09-24 13:19:14 -0400" }
];

const dayPair = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat"
};

const groupByWDay = data => {
  const keyValueData = data.reduce((acc, d) => {
    let date = new Date(d.created_at).getDay();
    date in acc ? acc[date]++ : (acc[date] = 1);
    return acc;
  }, {});

  return Object.keys(keyValueData).map(k => ({
    x: dayPair[k],
    y: keyValueData[k]
  }));
};

const groupByDate = data => {
  const keyValueData = data.reduce((acc, d) => {
    let date = new Date(d.created_at).toLocaleDateString();
    date in acc ? acc[date]++ : (acc[date] = 1);
    return acc;
  }, {});

  return Object.keys(keyValueData).map(k => ({
    x: new Date(k),
    y: keyValueData[k]
  }));
};

const increment = data => {
  const datedData = data.map(d => ({
    ...d,
    createdAt: new Date(d.created_at)
  }));

  return datedData
    .map(d => ({
      ...d,
      countToDate: datedData.filter(other => other.createdAt <= d.createdAt)
        .length
    }))
    .map(d => ({
      x: d.createdAt,
      y: d.countToDate
    }));
};

class Tasks extends React.Component {
  constructor() {
    super();
    this.state = {
      style: {
        data: { fill: "tomato" }
      }
    };
  }

  render() {
    const dayData = groupByWDay(dummyData);
    const dailyData = groupByDate(dummyData);
    const incrementedData = increment(dummyData);

    const firstDate = Math.min(...incrementedData.map(d => d.x));
    const lastDate = Math.max(...incrementedData.map(d => d.x));
    const lowestValue = Math.min(...incrementedData.map(d => d.y));
    const highestValue = Math.max(...incrementedData.map(d => d.y));

    const scatterDomain = {
      x: [firstDate, lastDate],
      y: [lowestValue, highestValue]
    };

    const scatterDomainPadding = {
      x: lastDate * 0.05,
      y: highestValue
    };

    return (
      <div style={{ margin: "0 auto", display: "flex", flexFlow: "row wrap" }}>
        <VictoryBar
          polar
          data={dayData}
          labels={d => d.x}
          width={400}
          height={400}
          domain={{ y: [0, Math.max(...dayData.map(d => d.y)) * 1.05] }}
          style={{
            data: { fill: "tomato", stroke: "#ccc", strokeWidth: 3 },
            parent: { maxWidth: "50%" }
          }}
        />
        <VictoryChart
          height={400}
          width={400}
          domainPadding={{ x: 50, y: [0, 20] }}
          style={{ parent: { maxWidth: "50%" } }}
        >
          <VictoryBar
            dataComponent={<Bar events={{ onClick: this.handleClick }} />}
            style={this.state.style}
            data={dayData}
          />
        </VictoryChart>
        <VictoryChart
          height={400}
          width={400}
          domainPadding={{ x: 50, y: [0, 20] }}
          scale={{ x: "time" }}
          style={{ parent: { maxWidth: "50%" } }}
        >
          <VictoryBar
            dataComponent={
              <Bar
                events={{
                  onClick: () => {
                    /*this.handleClick*/
                  }
                }}
              />
            }
            style={this.state.style}
            data={dailyData}
          />
        </VictoryChart>
        <VictoryChart
          domain={scatterDomain}
          scale={{ x: "time" }}
          style={{ parent: { maxWidth: "50%" } }}
        >
          <VictoryScatter
            style={{ data: { fill: "tomato" } }}
            domain={scatterDomain}
            domainPadding={{ x: 10, y: scatterDomain.y[1] / 10 }}
            data={incrementedData}
          />
        </VictoryChart>
      </div>
    );
  }
}

export default Tasks;
