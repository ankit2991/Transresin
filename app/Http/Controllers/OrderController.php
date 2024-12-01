<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Razorpay\Api\Api;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Order::query();

        if ($request?->type == 'my-orders') {
            $query->where('user_id', $request->user()->id);
        }

        $orders = $query->latest()->paginate($request?->limit ?: 10);

        return response()->json($orders);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            // Billing validation
            'billing_first_name' => 'required|string|max:255',
            'billing_email' => 'required|email|max:255',
            'billing_phone' => 'required|string|max:20',
            'billing_address' => 'required|string|max:255',
            'billing_city' => 'required|string|max:255',
            'billing_state' => 'required|string|max:255',
            'billing_zip' => 'required|string|max:20',
            // Shipping validation
            'shipping_first_name' => 'required|string|max:255',
            'shipping_email' => 'required|email|max:255',
            'shipping_phone' => 'required|string|max:20',
            'shipping_address' => 'required|string|max:255',
            'shipping_city' => 'required|string|max:255',
            'shipping_state' => 'required|string|max:255',
            'shipping_zip' => 'required|string|max:20',
            // Additional validation
            'status' => 'nullable|string',
            'total_amount' => 'required|numeric',
        ]);

        $api = new Api(env('RAZORPAY_KEY'), env('RAZORPAY_SECRET'));


        try {
            // Create the order with Razorpay
            $orderData = [
                'receipt'         => 'txn_' . time(),
                'amount'          => $request->total_amount * 100, // Amount in paise
                'currency'        => 'INR',
                'payment_capture' => 1, // Auto capture the payment
            ];

            // Create the order
            $order = $api->order->create($orderData);

            $validatedData['user_id'] = $request?->user()?->id;
            $validatedData['order_token'] = $order->id;

            $order = Order::create($validatedData);

            $order->products()->sync($request->cart_items);

            return response()->json($order, 201);
        } catch (\Exception $e) {
            // Catch any exceptions and return the error message
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($token)
    {
        $order = Order::with(['products', 'products.product'])->where('order_token', $token)->firstOrFail();

        return response()->json($order);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,  $orderToken)
    {
        $order = Order::where('order_token', $orderToken)->firstOrFail();

        $order->payment_txn_id = $request->txn_id;
        $order->is_paid = 'Y';
        $order->save();

        return response()->json([
            'message' => 'Order placed.',
            'order' => $order
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}
