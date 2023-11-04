import NavHome from "../../assets/img/navHome.svg";
import NavExtrato from "../../assets/img/navExtrato.svg";
import NavTransf from "../../assets/img/navTransf.svg";
import NavPix from "../../assets/img/navPix.svg";
import NavUser from "../../assets/img/navUser.svg";
import NavAdmin from "../../assets/img/navAdmin.svg";

export const SidebarData = [
  {
    title: 'Home',
    path: '',
    icon: NavHome,
    iconClosed: NavHome,
    iconOpened: NavHome
  },
  {
    title: 'Admin',
    icon: NavAdmin,
    iconClosed: NavAdmin,
    iconOpened: NavAdmin,
    subNav: [
      {
        title: 'Contas',
        cName: 'sub-nav',
        subSubNav: [ 
          {
            title: 'Solicitações',
            path: '',
            cName: 'sub-nav',
          },
        ]
      }
    ]
  },
  {
    title: 'Extrato',
    icon: NavExtrato,
    iconClosed: NavExtrato,
    iconOpened: NavExtrato,
    subNav: [
      {
        title: 'Consultar',
        path: '',
        cName: 'sub-nav',
      }
    ]
  },
  {
    title: 'Transferencias',
    icon: NavTransf,
    iconClosed: NavTransf,
    iconOpened: NavTransf,
    subNav: [
      {
        title: 'Consultar',
        path: '',
        cName: 'sub-nav'
      }
    ]
  },
  {
    title: 'Area Pix',
    icon: NavPix,
    iconClosed: NavPix,
    iconOpened: NavPix,
    subNav: [
      {
        title: 'Consultar',
        path: '',
        cName: 'sub-nav'
      }
    ]
  },
  {
    title: 'Conta',
    icon: NavUser,
    iconClosed: NavUser,
    iconOpened: NavUser,
    subNav: [
      {
        title: 'Consultar',
        path: '',
        cName: 'sub-nav'
      }
    ]
  },
];