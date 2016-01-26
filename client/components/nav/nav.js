// -----------------------------
// Mentor section of Nav
// -----------------------------
Template.navMentor.helpers({
  openTickets: function(){
    return Tickets.find({
      status: {
        $in: ["OPEN", "CLAIMED"]
      }
    }).fetch().length;
  }
});

// -----------------------------
// Account section of Nav
// -----------------------------
Template.navAccount.rendered = function(){
  $(this.findAll('.ui.dropdown')).dropdown();
};

Template.navAccount.events({
  'click #logout': function(){
    Meteor.logout();
  }
});

Template.navAccount.helpers({
  profile: function(){
    return Meteor.user().username;
    /*
    if (Meteor.user().profile.name){
      return Meteor.user().profile.name.split(" ")[0];
    }
    return "Profile";
    */
  }
});