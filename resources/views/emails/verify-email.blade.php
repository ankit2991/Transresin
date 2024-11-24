<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email | {{ env('APP_NAME') }}</title>
</head>

<body>
    <h1>Welcome to {{ env('APP_NAME') }}!</h1>
    <p>Please verify your email address by clicking the link below:</p>
    <a href="{{ $url }}">Verify Email Address</a>
    <p>If you did not create an account, no further action is required.</p>
</body>

</html>
