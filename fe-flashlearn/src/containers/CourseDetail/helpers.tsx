import { PATHS } from '@appConfig';
import { FaRankingStar, FaUser } from 'react-icons/fa6';
import { PiBookOpenFill } from 'react-icons/pi';
import { RiSettings4Fill } from 'react-icons/ri';
import { BiDumbbell } from 'react-icons/bi';

export const courseDetailBreadCrumb = [
  {
    label: 'Danh Sách Khóa Học',
    path: PATHS.courses,
  },
  {
    label: 'Chi Tiết Khóa Học',
  },
];

export const courseTabs = (id: string) => [
  {
    label: 'Bài Học',
    icon: <PiBookOpenFill size={20} />,
    path: PATHS.lessonsList.replace(':courseId', id),
  },
];

export const teacherTabs = (id: string) => [
  {
    label: 'học viên',
    icon: <FaUser size={20} />,
    path: PATHS.studentsList.replace(':courseId', id),
  },
  {
    label: 'Cài Đặt',
    icon: <RiSettings4Fill size={20} />,
    path: PATHS.courseSetting.replace(':courseId', id),
  },
];

export const studentTabs = (id: string) => [
  {
    label: 'Luyện Tập',
    icon: <BiDumbbell size={20} />,
    path: PATHS.practice.replace(':courseId', id),
  },
  {
    label: 'Bảng Xếp Hạng',
    icon: <FaRankingStar size={20} />,
    path: PATHS.rankList.replace(':courseId', id),
  },
];
