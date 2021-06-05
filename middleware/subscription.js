export default function (context) {
  // Acquiring token
  let token = null || window.localStorage.vrs_
  let user = null
  let isSubscribed = false

  // Parsing token
  if (token.length > 12) {
    let base64Url = token.split('.')[1]
    user = JSON.parse(atob(base64Url))

    // Check plan
    let plan = user.plan
   
    if (plan !="FREE") {
      isSubscribed = true
    } else {
      isSubscribed = false
    }
  }


  if (isSubscribed) {
    console.log('page move');
  } else {
    return context.redirect('/property-ads/?subscribed=false')
  }

}