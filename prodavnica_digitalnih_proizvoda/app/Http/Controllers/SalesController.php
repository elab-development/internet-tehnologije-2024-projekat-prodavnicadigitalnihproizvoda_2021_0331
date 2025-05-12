<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\User;

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


    public function topBuyers()
{
    $buyers = DB::table('carts as cart')
        ->join('users as u', 'cart.user_id', '=', 'u.id')
        ->select(
            'u.name',
            DB::raw('COUNT(cart.id) as purchase_count')
        )
        ->groupBy('u.id', 'u.name')
        ->orderByDesc('purchase_count')
        ->limit(5)
        ->get();

    return response()->json($buyers);
}
}
