import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as GrIcons from 'react-icons/gr';
import * as Fa6Icons from "react-icons/fa6";

export const SidebarData = [
  {
    title: 'Inicio',
    path: '',
    icon: <AiIcons.AiFillHome color='black'/>,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    // subNav: [
    //   {
    //     title: 'Users',
    //     path: '/overview/users',
    //     icon: <IoIcons.IoIosPaper />
    //   },
    //   {
    //     title: 'Revenue',
    //     path: '/overview/revenue',
    //     icon: <IoIcons.IoIosPaper />
    //   }
    // ]
  },
  {
    title: 'Extrato',
    path: '',
    icon: <IoIcons.IoIosPaper color='black' />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Extrato1',
        path: '',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Extrato2',
        path: '',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Extrato3',
        path: '',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      }
    ]
  },
  {
    title: 'Transferencias',
    path: '',
    icon: <GrIcons.GrTransaction color='black'/>
  },
  {
    title: 'Area Pix',
    path: '',
    icon: <Fa6Icons.FaPix color='black' />
  },
  {
    title: 'Conta',
    path: '',
    icon: <AiIcons.AiOutlineUser color='black'/>,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Conta1',
        path: '',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Conta2',
        path: '',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  
];