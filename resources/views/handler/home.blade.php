<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Handler</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@900&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="{{ mix('/css/app.css') }}" />
        <link href="{{asset('/vendor/fontawesome/css/all.min.css')}}" rel="stylesheet">

        <style media="screen">
            body{
                margin: 0;
                padding: 0;
                font-family: 'Nunito', sans-serif;
                background-color: #e4e4e4;
            }
        </style>
               
    </head>
    <body>
        <div id="handler"></div>
        <script src="{{ mix('/js/app.js') }}"></script>
    </body>
</html>
