<!DOCTYPE html>
<html>
<head>
	<title>Login</title>
	<link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
	<div class="center">
		<h1>Login</h1>
		<form action="login.php" method="post">
			<div class="txt_field">
				<input type="text" required>
				<span></span>
				<label>Email ID</label>
			</div>
			<div class="txt_field">
				<input type="password" required>
				<span></span>
				<label>Password</label>
			</div>
			<div class="txt_field">
				<input type="text" required>
				<span></span>
				<label>Preferred User Name</label>
			</div>
			<div class="pass">Forgot Password?</div>
			<input type="submit" value="Submit">
			<div class="signup_link">
				Not a member? <a href="#">Register</a>
			</div>
		</form>
	</div>
</body>
</html>