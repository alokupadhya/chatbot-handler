<!DOCTYPE html>
<html>
<head>
	<title></title>
  <style>
    body,html{
      font-family: Arial, Helvetica, sans-serif;
      padding: 20px 50px;
    }
    .mail{
      border:1px solid grey;
      padding: 10px;
      text-align: left;
    }
		@media (max-width: 768px) {
			body,html{
				padding: 20px 5px;
			}
		}
  </style>
</head>
<body>
  <center><h1>Chatbot</h1></center>
  <div class="mail">
    Hi {{ $user->first_name }} {{ $user->last_name }}<br>
		<i><small>{{ $user->email }}</small></i><br/>
    <small><i>[This message is system generated from handler.schoolchatbot.local.]</i></small>

		<p>Your Agent account is created/updated successfully.</p>
		<br>

		<b>Credentials for login.</b>
		<table>
			<tr>
				<td>Username</td><td> : </td>
				<td>{{ $user->email }} </td>
			</tr>
			<tr>
				<td>Password</td><td> : </td>
				<td>{{ $user->password }} </td>
			</tr>
			<tr>
				<td>Link for Login</td><td> : </td>
				<td>{{ "http://handler.schoolchatbot.local" }} </td>
			</tr>
		</table>
		<br/><br/><br/>
    <br/>
    <hr>
    Thanks
    <br/>
    <small>handler.schoolchatbot.local<small>
    <br/>
    <br/>
  <div>
</body>
</html>
