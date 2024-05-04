const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");
const sendEmail = require("../config/email");
const bcrypt = require("bcrypt");

module.exports = {
	newUser: async (req, res, next) => {
		try {
			if (!validator.isEmail(req.body.email)) return res.status(400).json({ msg: "Please enter a valid email address" });
			if (!validator.isLength(req.body.password, { min: 8 })) return res.status(400).json({ msg: "Password must be at least 8 characters long" });
			if (req.body.password !== req.body.confirmPassword) return res.status(400).json({ msg: "Passwords do not match" });

			req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false });

			const existingUser = await User.findOne({ email: req.body.email }).exec();

			if (existingUser) {
				return res.status(400).json({ msg: "Account associated with that email already exists" });
			}

			const user = await User.create({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password,
			});

			const url = `http://localhost:5173/account/verify/${user._id}`;

			sendEmail(
				user.email,
				`Welcome to {untitled budget}, ${user.name.split(" ")[0]}!`,
				`<p>Hi ${user.name.split(" ")[0]}, <br><br> Thank you for signing up we hope you enjoy the app! <br><br> Please verify you email here ${url} <br><br> Thanks, <br> B</p>`
			);

			res.status(200).json({ name: user.name, email: user.email });
		} catch (error) {
			return next(error);
		}
	},
	login: async (req, res, next) => {
		try {
			if (!validator.isEmail(req.body.email)) return res.status(401).json({ msg: "Please enter a valid email address" });
			if (validator.isEmpty(req.body.password)) return res.status(401).json({ msg: "Password cannot be blank" });

			req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false });

			const user = await User.findOne({ email: req.body.email });

			passport.authenticate("local", (err, user, info) => {
				if (err) {
					return next(err);
				}
				if (!user) {
					return res.status(401).json(info);
				}

				if (user.verified === false) {
					return res.status(400).json("Please verify your email before attempting to log in");
				}

				req.logIn(user, async (err) => {
					if (err) {
						return next(err);
					}
					await User.findByIdAndUpdate(user._id, { lastLoginDate: Date.now() });
					return res.status(200).json({ id: req.user.id, name: req.user.name, email: req.user.email });
				});
			})(req, res, next);
		} catch (error) {
			return next(error);
		}
	},
	logout: async (req, res, next) => {
		const user = req.user;
		try {
			req.logout(() => {
				console.log("User has logged out");
			});
			res.cookie("connect.sid", "", {
				httpOnly: true,
				expires: new Date(0),
			});

			req.session.user = null;
			await User.findByIdAndUpdate(user.id, { lastLogoutDate: Date.now() });
			res.status(200).json("user has logged out");
		} catch (error) {
			console.log(error);
		}
	},
	verifyEmail: async (req, res) => {
		try {
			const user = await User.findOne({ _id: req.params.id });
			if (!user) {
				return res.status(404).json("Not a valid verification url");
			}

			if (user.verified) {
				return res.status(401).json("User already verified");
			}

			const update = await User.updateOne({ _id: user._id, verified: true });
			return res.status(200).json("User verified successfully");
		} catch (error) {
			console.log(error);
			res.status(400).json("Not a valid verification url");
		}
	},
	changePassword: async (req, res, next) => {
		if (!validator.isLength(req.body.newPassword, { min: 8 })) return res.status(400).json({ msg: "Your new password must be at least 8 characters" });
		if (req.body.newPassword !== req.body.confirmNewPassword) return res.status(400).json({ msg: "Passwords do not match" });

		const user = await User.findById(req.user.id);

		bcrypt.compare(req.body.password, user.password, (err, result) => {
			if (result) {
				bcrypt.genSalt(10, async (err, salt) => {
					bcrypt.hash(req.body.newPassword, salt, async (err, hash) => {
						await User.findByIdAndUpdate(req.user.id, { password: hash });

						sendEmail(
							user.email,
							"Your password has been updated",
							`<p>Hi ${
								user.name.split(" ")[0]
							}, <br><br> Your password was just updated. If this was not you please reach out otherwise you may ignore this message. <br><br> Happy budgeting! <br><br> Thanks, <br> B</p>`
						);

						res.status(200).json("Your password has been updated");
					});
				});
			} else {
				return res.status(400).json("Your current password does not match what you have entered");
			}
		});
	},
	resetPasswordRequest: async (req, res) => {
		try {
			const user = await User.findOne({ email: req.body.email });
			if (!user) {
				return res.status(400).json("User not found");
			}
			const { id, name, lastLoginDate, email } = user;
			const timeStamp = btoa(Date.now());
			const ident = btoa(id);
			const toHash = id + email + lastLoginDate.toISOString();
			bcrypt.genSalt(10, (err, salt) => {
				if (err) {
					return err;
				}
				bcrypt.hash(toHash, salt, (err, hash) => {
					if (err) {
						return err;
					}
					const url = `http://localhost:5173/account/password/reset/${ident}/${timeStamp}/${hash.replaceAll("/", "slash").replaceAll(".", "period")}`;
					sendEmail(
						email,
						"Reset password instructions",
						`<p>Hi ${
							name.split(" ")[0]
						} , <br><br> Someone has requested a link to change your passowrd. If this was you, it can be changed using the link below. <br><br> ${url} <br><br> If you didn't request it, please ignore this email.</p>`
					);
				});
			});
			res.status(200).json("Please check your email for password reset instructions");
		} catch (error) {
			console.log(error);
		}
	},
	resetPassword: async (req, res, next) => {
		try {
			const urlTime = atob(req.params.time);
			const currentTime = Date.now();

			if (currentTime - urlTime > 600000) {
				return res.status(400).json("Link has expired");
			}

			const userId = atob(req.params.ident);
			const user = await User.findById(userId);

			if (!user) {
				return res.status(400).json("Invalid user");
			}

			const { id, lastLoginDate, email } = user;
			const toHash = userId + email + lastLoginDate.toISOString();

			bcrypt.compare(toHash, req.params.hash.replaceAll("slash", "/").replaceAll("period", "."), async (err, isMatch) => {
				if (err) {
					console.log(err);
				}

				if (!isMatch) {
					return res.status(400).json("Reset link is invalid");
				}

				const user = await User.findOneAndUpdate({ _id: id }, { password: req.body.password });
				return res.status(200).json("Password changed successfully");
			});
		} catch (error) {
			return next(error);
		}
	},
	updateProfile: async (req, res) => {
		await User.findByIdAndUpdate(req.user.id, { name: req.body.name, email: req.body.email });
		const user = await User.findById(req.user.id);
		res.status(200).json({ id: user._id, name: user.name, email: user.email });
	},
};
