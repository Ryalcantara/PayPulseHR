<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FundCluster;
use App\Models\Voucher;
use Inertia\Inertia;

class DashboardController extends Controller
{
    // public function index()
    // {
    //     // return Inertia::render('Dashboard');
    //     $fundClusters = FundCluster::all();
    //     $chartData = [
    //         'labels' => ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    //         'data' => [65],
    //     ];

    //     return Inertia::render('Dashboard/Dashboard', [
    //         'chartData' => $chartData,'fundClusters' => $fundClusters
    //     ]);
    // }
public function index()
{
    // Retrieve all vouchers with a valid div_num (excluding "0000")
    $vouchers = Voucher::where('div_num', '!=', '0000')->get();

    // Initialize an array to hold total expenses by month
    $monthlyExpenses = [
        'January' => 0,
        'February' => 0,
        'March' => 0,
        'April' => 0,
        'May' => 0,
        'June' => 0,
        'July' => 0,
        'August' => 0,
        'September' => 0,
        'October' => 0,
        'November' => 0,
        'December' => 0,
    ];

    // Initialize a variable to hold the total amount
    $totalAmount = 0;

    // Loop through vouchers and sum up the amount by month
    foreach ($vouchers as $voucher) {
        // Extract the month from the voucher's created_at date
        $month = $voucher->created_at->format('F'); // This will get the full month name (e.g., "January")

        // Add the voucher's amount to the corresponding month
        if (array_key_exists($month, $monthlyExpenses)) {
            $monthlyExpenses[$month] += $voucher->amount;
        }

        // Add the voucher's amount to the total amount
        $totalAmount += $voucher->amount;
    }

    // Prepare the data for the chart (labels and expenses data)
    $chartData = [
        'labels' => array_keys($monthlyExpenses),
        'data' => array_values($monthlyExpenses),
    ];

    // Retrieve fund clusters
    $fundClusters = FundCluster::all();

    // Pass the data to the view, including the total amount
    return Inertia::render('Dashboard/Dashboard', [
        'chartData' => $chartData,
        'fundClusters' => $fundClusters,
        'totalAmount' => $totalAmount, // Pass the total amount to the view
    ]);
}

}
