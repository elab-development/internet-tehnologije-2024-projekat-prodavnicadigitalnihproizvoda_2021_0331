<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SalesController extends Controller
{
    /**
     * 
     *
     * @return \Illuminate\Http\Response
     */
    public function salesByCategory()
    {
        $categories = DB::select("
    SELECT
        cat.name AS category_name, 
        SUM(cart.price_to_pay) AS total_sales,
        COUNT(cart.id) AS total_sales_count,
        AVG(cart.price_to_pay) AS average_sale
    FROM
        carts cart
    JOIN
        pictures pic ON cart.picture_id = pic.id
    JOIN
        categories cat ON pic.category_id = cat.id
    GROUP BY
        cat.id, cat.name
    ORDER BY
        total_sales DESC;
");

        return response()->json($categories);
    }
}
