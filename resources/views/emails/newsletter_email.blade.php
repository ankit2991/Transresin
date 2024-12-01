<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $subject }}</title>
    <style>
        /* Reset some default styles */
        body,
        html {
            margin: 0;
            padding: 0;
            font-family: 'Arial', sans-serif;
            background-color: #f7f7f7;
        }

        .email-wrapper {
            width: 100%;
            padding: 20px;
            background-color: #f7f7f7;
            text-align: center;
        }

        .email-container {
            max-width: 600px;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            text-align: left;
            margin: 0 auto;
        }

        h1 {
            font-size: 24px;
            color: #333333;
            margin-bottom: 20px;
        }

        p {
            font-size: 16px;
            line-height: 1.5;
            color: #555555;
        }

        .cta-button {
            display: inline-block;
            background-color: #4CAF50;
            color: #ffffff;
            padding: 15px 25px;
            border-radius: 50px;
            font-size: 16px;
            text-decoration: none;
            margin-top: 20px;
            transition: background-color 0.3s ease;
        }

        .cta-button:hover {
            background-color: #45a049;
        }

        .footer {
            margin-top: 30px;
            font-size: 14px;
            color: #777777;
        }

        @media (max-width: 600px) {
            .email-container {
                padding: 20px;
            }

            h1 {
                font-size: 20px;
            }

            p {
                font-size: 14px;
            }
        }
    </style>
</head>

<body>
    <div class="email-wrapper">
        <div class="email-container">
            <h1>Hello {{ $subscriber->name ?? 'Subscriber' }},</h1>
            <p>{!! $messageContent !!}</p>

            <a href="{{ asset('/') }}" class="cta-button" style="color: #fff !important;">Visit Our Website</a>

            <p class="footer">
                Best Regards,<br>
                {{ env('APP_NAME') }} Team
            </p>
        </div>
    </div>
</body>

</html>
