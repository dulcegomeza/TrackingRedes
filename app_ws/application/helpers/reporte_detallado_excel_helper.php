<?php

include APPPATH . '/third_party/phpexcel/PHPExcel/IOFactory.php';
ini_set('memory_limit', '256M');


function reporte_detallado_excel($post)
{
    $CI = &get_instance();
    $CI->load->database();
    $CI->load->helper('data_tools');
    $fechas = $post['fechas'];
    $filtros = $post['filtros'];

    if (isset($fechas)) {
        $fechaInicio = arrayToDate($fechas['fechaInicio']) . " 00:00:00";
        $fechaFin = arrayToDate($fechas['fechaFin']) . " 23:59:59";
        $CI->db->where("fecha_creacion BETWEEN '$fechaInicio' AND '$fechaFin'");
    }

    $CI->db->like($filtros, 'match', 'after');
    // $CI->db->order_by($order[0], $order[1]);
    $query = $CI->db->get('view_reporte_detallado');



$objPHPExcel = new PHPExcel();
// Leemos un archivo Excel XLS
$objReader = PHPExcel_IOFactory::createReader('Excel5');
$objPHPExcel = $objReader->load(APPPATH . '/third_party/phpexcel/PHPExcel/plantillas/reporte_detallado.xls');

// Set document properties
$objPHPExcel->getProperties()->setCreator("DESARROLLO")
    ->setLastModifiedBy("DESARROLLO")
    ->setTitle("REPORTE DETALLADO")
    ->setSubject("REPORTE")
    ->setDescription("REPORTE DETALLADO.")
    ->setKeywords("office 2003 openxml php")
    ->setCategory("REPORTE");

//Se agregan los datos
$i = 6;

foreach ($query->result() as $t) {


    $objPHPExcel->setActiveSheetIndex(0)
        ->setCellValue('A' . $i, $t->idticket)
        ->setCellValue('B' . $i, $t->fecha_creacion)
        ->setCellValue('C' . $i, $t->secretaria)
        ->setCellValue('D' . $i, utf8_decode($t->subdireccion))
        ->setCellValue('E' . $i, $t->solicitante)
        ->setCellValue('F' . $i, utf8_decode($t->descripcion))
        ->setCellValue('G' . $i, $t->asignado)
        ->setCellValue('H' . $i, $t->equipo)
        ->setCellValue('I' . $i, $t->ip)
        ->setCellValue('J' . $i, $t->mac);
        
    $i++;
}
// Redirect output to a client’s web browser (Excel5)
header('Content-Type: application/vnd.ms-excel');
header('Content-Disposition: attachment;filename="Reporte_Detallado.xls"');
header('Cache-Control: max-age=0');
// If you're serving to IE 9, then the following may be needed
header('Cache-Control: max-age=1');

// If you're serving to IE over SSL, then the following may be needed
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT'); // Date in the past
header('Last-Modified: ' . gmdate('D, d M Y H:i:s') . ' GMT'); // always modified
header('Cache-Control: cache, must-revalidate'); // HTTP/1.1
header('Pragma: public'); // HTTP/1.0

//$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
$objWriter->setIncludeCharts(true);
$objWriter->save('php://output');
exit;

//$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
    $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
    $objWriter->setIncludeCharts(true);
    $objWriter->save('php://output');
    exit;
}
