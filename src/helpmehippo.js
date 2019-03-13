// src/lunchhippo.js

const helpMeHippoFactory = () => (body) => new Promise((resolve, reject) => {
  
      return resolve({
        text: `Hey There!  I'm The Lunch Hippo :bento:, and I'm here to help you order lunch for the Cary,NC Company Wide Lunch Orders. If you aren't already signed up, you can join the lunch program by typing */hippostart* (if you aren't sure just go for it, I'll only let you join once). \n\n-To view today's menu, type */hippomenu* . \n-To order your entree (sandwich plus side, salad, etc.), type */hippoentree* then your order.  \n-To add notes, such as special instructions or extra pickles (we hippos love pickles), type */hipponote* then your notes.  \n-To update the orders total value, type */hippototal* then the total.  \n-To check your current order, type */hippocheck* . \n-To opt out just for today, but stay in the lunch program, type */hippobreak* . \n-To opt out of the lunch program, type */hippostop* .\n\nI'll tell you a secret since you've read this far... ...I'm a hard working hippo and I can also shorten your urls for you, just type */hippourl* and the url and I'll take care of the rest`,
      })
})


module.exports = helpMeHippoFactory