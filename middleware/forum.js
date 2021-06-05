export default function (context) {
  // Acquiring token
  let token = null || window.localStorage.vrs_
  let user = null
  let isAutheticated = false

  // Parsing token
  if(token.length > 12){
    let base64Url = token.split('.')[1]
    user = JSON.parse(atob(base64Url))

  // Authenticating
    let expTime = user.exp
    let currentTime = new Date()
    let unixTime = Math.floor(currentTime / 1000)

    if (expTime >= unixTime) {
      isAutheticated = true
      console.log(true)
    } else {
      isAutheticated = false
      console.log(false)
    }
  }


  if (isAutheticated) {
    console.log('page move');
  } else {
    return context.redirect('/forum')
  }

}