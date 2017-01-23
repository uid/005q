// this autologin (though recommended by CertAuth) causes a race condition -
// if the user sees the "Log in with MIT Certificates" button and manages to 
// push it before the autologin finishes, then the UI shows up apparently logged in
// but with none of its buttons functional.
// 
// Meteor.startup(function() {
//   CertAuth.login();
// });

Template.login.onCreated(function(){
  this.error = new ReactiveVar();
});

Template.login.events({
  'click #showPasswordLogin': function(){
    $("#showPasswordLogin").css("display", "none");
    $(".login-password.form").css("display", "block");
  },
  'click #login-github': function(){
    Meteor.loginWithGithub({
      loginStyle: 'redirect'
    });
  },
  'click #login-facebook': function(){
    Meteor.loginWithFacebook({
      loginStyle: 'redirect'
    });
  },
  'click #login-certauth': function(){
    CertAuth.login();
  },
  'click #login-password': function(e, t){
    loginPassword(t);
  },
  'keyup #password': function(e, t){
    if (e.keyCode === 13){
      loginPassword(t);
    }
  }
});

Template.login.helpers({
  enabled: function(){
    var services = {};
    ServiceConfiguration.configurations
        .find({})
        .fetch()
        .forEach(function(service){
          services[service.service] = true;
        });
    return services;
  },
  error: function(){
    return Template.instance().error.get();
  }
});

Template.login.rendered = function(){
  $(this.findAll('.container')).addClass('animated fadeIn');
};

function loginPassword(t){
  Meteor.loginWithPassword(
      $(t.findAll('#username')).val(),
      $(t.findAll('#password')).val(),
      function(error){
        if (error){
          $(t.findAll('#password')).val("");
          t.error.set(error.reason);
        }
      }
  )
}