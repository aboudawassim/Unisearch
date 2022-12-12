const {} = require("./functions");
var passport = require("passport");
var OutlookStrategy = require("passport-outlook").Strategy;

function outlookMails(query) {
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((obj, done) => done(null, obj));
  passport.initialize();
  passport.session();

  const data = passport.use(
    new OutlookStrategy(
      {
        clientID: "630a94a7-b279-47b5-aaa1-3e1275c32805",
        clientSecret: "a53dde57-c88a-4d2a-ad4a-fc9225e3eaf9",
        callbackURL: "http://localhost:3000/authorize",
      },
      function (accessToken, refreshToken, profile, done) {
        console.log("here 1");
        var user = {
          outlookId: profile.id,
          name: profile.DisplayName,
          email: profile.EmailAddress,
          accessToken: accessToken,
        };
        if (refreshToken) user.refreshToken = refreshToken;
        if (profile.MailboxGuid) user.mailboxGuid = profile.MailboxGuid;
        if (profile.Alias) user.alias = profile.Alias;
        return done(err, user);
        /*User.findOrCreate(user, function (err, user) {
          return done(err, user);
        });*/
      }
    )
  );
  console.log("data  ");
}

module.exports = { outlookMails };
