<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You for Subscribing!</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f8f9fa;
            color: #333;
        }

        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            border: 1px solid #ddd;
        }

        .email-header {
            background: #007bff;
            color: #ffffff;
            padding: 20px;
            text-align: center;
        }

        .email-header h1 {
            margin: 0;
            font-size: 24px;
        }

        .email-body {
            padding: 20px;
            line-height: 1.6;
        }

        .email-body h2 {
            color: #007bff;
            font-size: 20px;
            margin-bottom: 10px;
        }

        .email-body p {
            margin: 10px 0;
        }

        .email-footer {
            background: #f1f1f1;
            padding: 10px 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
        }

        .email-footer a {
            color: #007bff;
            text-decoration: none;
        }

        .btn {
            display: inline-block;
            background: #007bff;
            color: #ffffff;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            font-size: 16px;
            margin-top: 20px;
        }

        .btn:hover {
            background: #0056b3;
        }
    </style>
</head>

<body>
    <div class="email-container">
        <!-- Header -->
        <div class="email-header">
            <h1>Welcome to Our Newsletter!</h1>
        </div>

        <!-- Body -->
        <div class="email-body">
            <h2>Hi {{ $newsletter->name ?? 'Subscriber' }},</h2>
            <p>Thank you for subscribing to our newsletter! We're thrilled to have you with us. 🎉</p>
            <p>You'll now receive regular updates about our latest news, exclusive offers, and exciting events directly
                in your inbox.</p>
            <p>We promise to keep it engaging and valuable!</p>
            <a href="{{ asset('/') }}" class="btn" style="color: #fff !important;">Visit Our Website</a>
        </div>

        <!-- Footer -->
        <div class="email-footer">
            <p>If you have any questions, feel free to <a href="mailto:support@transresin.in">contact us</a>.</p>
            <p>&copy; 2024 {{ env('APP_NAME') }}. All rights reserved.</p>
        </div>
    </div>
</body>

</html>
