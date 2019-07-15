import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
    {
        path: '/starter', title: 'Inicio', icon: 'mdi mdi-home', class: '', label: '', labelClass: '', extralink: false, submenu: []
    },
    {
        path: '', title: 'Configuracion', icon: 'mdi mdi-settings', class: 'has-arrow', label: '', labelClass: '', extralink: false,
        submenu: [
            {path: '/usuarios', title: 'Usuarios', icon: 'mdi mdi-account', class: '', label: '', labelClass: '', extralink: false, submenu: []}
        ]
    }
];

