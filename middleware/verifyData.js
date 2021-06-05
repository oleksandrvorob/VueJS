import axios from 'axios';

export default function (context) {
let token = JSON.parse(window.localStorage.vrs_).token





  return axios.get(`${process.env.API_URL}/verify/user-data`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
      .then((response) => {
          let status = response.data.status
          console.log(status, "from middleware")
      }).catch(e => {

        let payload = {
          msg: "Please complete your account detail",
          isActive: true
        }

        console.log(e)

        context.store.commit('notify/failed', payload)
        context.redirect('/profile')

      })

}
