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
