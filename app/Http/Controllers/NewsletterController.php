<?php

namespace App\Http\Controllers;

use App\Mail\NewsletterEmail;
use App\Mail\NewsletterSubscription;
use App\Models\Newsletter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;


class NewsletterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Newsletter::orderBy('email')->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:newsletters,email',
            'name' => 'nullable|string|max:255',
        ]);

        // Save subscriber details
        $newsletter = Newsletter::create([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        // Send confirmation email
        Mail::to($newsletter->email)->send(new NewsletterSubscription($newsletter));

        return response()->json([
            'message' => 'Subscribed Now! Subscription has been done successfully.'
        ]);
    }

    /**
     * Send email to selected subscribers.
     */
    public function sendEmails(Request $request)
    {
        $validated = $request->validate([
            'recipients' => 'required|array|min:1',
            'recipients.*' => 'email|exists:newsletters,email',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        $recipients = $validated['recipients'];
        $subject = $validated['subject'];
        $message = $validated['message'];

        foreach ($recipients as $email) {
            $subscriber = Newsletter::where('email', $email)->first();
            if ($subscriber) {
                Mail::to($subscriber->email)->send(new NewsletterEmail($subject, $message, $subscriber));
            }
        }

        return response()->json([
            'message' => 'Emails sent successfully!',
        ]);
    }
}
