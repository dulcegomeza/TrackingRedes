<?php
if (!defined('BASEPATH')) {exit('No direct script access allowed');}

function asignarMenu($idrol)
{
    $menu = array(
        ['path' => '/starter', 'title' => 'Inicio', 'icon' => 'mdi mdi-home', 'class' => '', 'label' => '', 'labelClass' => '', 'extralink' => false, 'submenu' => []]
    );

    $tickets = array(
        'path' => '/tickets', 'title' => 'Tickets', 'icon' => 'mdi mdi-clipboard-text', 'class' => '', 'label' => '', 'labelClass' => '', 'extralink' => false, 'submenu' => []
    );

    $catalogos = array(
        'path' => '', 'title' => 'Catálogos', 'icon' => 'mdi mdi-settings', 'class' => 'has-arrow', 'label' => '', 'labelClass' => '', 'extralink' => false,
        'submenu' => [
            ['path' => '/secretarias', 'title' => 'Secretarias', 'icon' => 'mdi mdi-pillar', 'class' => '', 'label' => '', 'labelClass' => '', 'extralink' => false, 'submenu' => []],
            ['path' => '/direcciones', 'title' => 'Direcciones', 'icon' => 'fa fa-building', 'class' => '', 'label' => '', 'labelClass' => '', 'extralink' => false, 'submenu' => []],
            ['path' => '/subdirecciones', 'title' => 'Subdirecciones', 'icon' => 'mdi mdi-home-modern', 'class' => '', 'label' => '', 'labelClass' => '', 'extralink' => false, 'submenu' => []],
            ['path' => '/estados', 'title' => 'Estados', 'icon' => 'mdi mdi-priority-low', 'class' => '', 'label' => '', 'labelClass' => '', 'extralink' => false, 'submenu' => []],
            ['path' => '/usuarios', 'title' => 'Usuarios', 'icon' => 'mdi mdi-account', 'class' => '', 'label' => '', 'labelClass' => '', 'extralink' => false, 'submenu' => []],
            ['path' => '/servicios', 'title' => 'Servicios', 'icon' => 'mdi mdi-account', 'class' => '', 'label' => '', 'labelClass' => '', 'extralink' => false, 'submenu' => []],
        ]
    );

    switch ($idrol) {
        case '1':
            // ADMINISTRADOR
            array_push($menu, $tickets, $catalogos);
            break;

        case '2':
            // GENERAL
            array_push($menu, $tickets, $catalogos);
            break;
        default:
            break;
    }

    return $menu;
}
