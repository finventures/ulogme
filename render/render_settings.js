// various settings for the rendering, to be modified 
//
// these are all regex patterns and the corresponding mapped title string
// the function mapwin() below will use these to transform the raw window
// titles into common groups. For example, any title mentioning Google Chrome
// may get mapped to just "Google Chrome".
// these get applied in order they are specified, from top to bottom
var title_mappings = [
{pattern : /Google Chrome/, mapto : 'Google Chrome'},
{pattern : /\.pdf/, mapto : 'Reading Pdf'},
{pattern : /Gmail/, mapto : 'Gmail'},
{pattern : /mail\.google/, mapto : 'Gmail'},
{pattern : /youtube/, mapto : 'Youtube'},
{pattern : /github/, mapto : 'Github'},
{pattern : /messenger\.com/, mapto : 'Facebook Messenger'},
{pattern : /facebook\.com/, mapto : 'Facebook'},
{pattern : /\/agent\/u/, mapto : 'Fin User Dashboard'},
{pattern : /\/agent\/q/, mapto : 'Fin Queue'},
{pattern : /fin\.local/, mapto : 'Dev Dashboard'},
{pattern : /Simulator/, mapto : 'iOS Simulator'},
{pattern : /Slack/, mapto : 'Slack'},
{pattern : /iTerm/, mapto : 'Terminal'},
{pattern : /iTerm.*vim/, mapto : 'vim'},
{pattern : /RubyMine.*\.rb/, mapto : 'Writing Ruby'},
{pattern : /RubyMine.*\.js/, mapto : 'Writing javascript'},
{pattern : /Xcode/, mapto : 'Xcode'},
{pattern : /Xcode.*\.swift/, mapto : 'Writing Swift'},
{pattern : /__LOCKEDSCREEN/, mapto : 'Locked Screen'}, // __LOCKEDSCREEN is a special token
];

// be very careful with ordering in the above because titles
// get matched from up to down (see mapwin()), so put the more specific
// window title rules on the bottom and more generic ones on top

/*
This function takes a raw window title w as string
and outputs a more compact code, to be treated as a single
unit during rendering. Every single possibility output from
this function will have its own row and its own analysis
*/
function mapwin(w) {
  var n = title_mappings.length;
  var mapped_title = 'MISC';
  for(var i=0;i<n;i++) {
    var patmap = title_mappings[i];
    if(patmap.pattern.test(w)) {
      mapped_title = patmap.mapto;
    }
  }
  return mapped_title;
}

var display_groups = [];
display_groups.push(["Gmail", "Google Chrome", "MISC", "SubText2", "Youtube", "Facebook", "Facebook Messenger"]); // random
display_groups.push(["Xcode", "iOS Simulator", "iTerm", "Writing Swift", "Writing Ruby", "Writing javascript", "vim"]); // work related
display_groups.push(["Slack", "Github", "Dev Dashboard", "Fin User Dashboard", "Fin Queue"]); // aux work related
display_groups.push(["Locked Screen"]); // computer not being used

// list of titles that classify as "hacking", or being productive in general
// the main goal of the day is to get a lot of focused sessions of hacking
// done throughout the day. Windows that arent in this list do not
// classify as hacking, and they break "streaks" (events of focused hacking)
// the implementation is currently quite hacky, experimental and contains
// many magic numbers.
var hacking_titles = ["Terminal","iTerm", "Xcode", "Simulator", "Writing Ruby", "Writing javascript", "vim"];
var draw_hacking = true; // by default turning this off

// draw notes row?
var draw_notes = true;

// experimental coffee levels indicator :)
// looks for notes that mention coffee and shows
// levels of coffee in body over time
var draw_coffee = true;
