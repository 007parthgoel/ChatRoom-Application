var moment = require('moment');

// Jan 1st 1970 00:00:00 AM

// var date =new Date();
// var months=['Jan','Feb'];
// console.log(date.getMonth());

var createdAt=1234
var date =moment(createdAt);
date.add(1,'years').subtract(5,'months');
console.log(date.format('Do MMM YYYY hh:mm:ss'));

console.log(date.format('h:MM a'));
console.log(date.format('h:MM A'));
