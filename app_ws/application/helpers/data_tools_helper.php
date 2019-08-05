<?php

function arrayToDate($array)
{
    $array = (array) $array;
    $date = $array["year"] . "/" . $array["month"] . "/" . $array["day"];
    return $date;
}

function dateToArray($date)
{
    $array = (object) array(
        "year" => (int) substr($date, 0, 4),
        "month" => (int) substr($date, 5, 2),
        "day" => (int) substr($date, 8, 2),
    );
    return $array;
}

function getAge($date)
{
    list($Y, $m, $d) = explode("-", $date);
    return (date("md") < $m . $d ? date("Y") - $Y - 1 : date("Y") - $Y);
}

function tiempo($session_time)
{
    $time_difference = time() - strtotime($session_time);
    $seconds = $time_difference;
    $minutes = round($time_difference / 60);
    $hours = round($time_difference / 3600);
    $days = round($time_difference / 86400);
    $weeks = round($time_difference / 604800);
    $months = round($time_difference / 2419200);
    $years = round($time_difference / 29030400);

    if ($seconds <= 60) {
        return "Hace " . $seconds . " segundos";
    } else if ($minutes <= 60) {
        if ($minutes == 1) {
            return "Hace un minuto";
        } else {
            return "Hace " . $minutes . " min";
        }
    } else if ($hours <= 24) {
        if ($hours == 1) {
            return "Hace una hora";
        } else {
            return "Hace " . $hours . " horas";
        }
    } else if ($days <= 7) {
        if ($days == 1) {
            return "Hace un día";
        } else {
            return "Hace " . $days . " días";
        }
    } else if ($weeks <= 4) {
        if ($weeks == 1) {
            return "Hace una semana";
        } else {
            return "Hace " . $weeks . " semanas";
        }
    } else if ($months <= 12) {
        if ($months == 1) {
            return "Hace un mes";
        } else {
            return "Hace " . $months . " meses";
        }
    } else {
        if ($years == 1) {
            return "Hace un año";
        } else {
            return "Hace " . $years . " años";
        }
    }
}

