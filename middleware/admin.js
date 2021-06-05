import axios from 'axios';

export default function (context) {
let token = JSON.parse(window.localStorage.vrs_).token

  return axios.get(`${process.env.API_URL}/admin/verify`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
      .then((response) => {
          let status = response.data.status
          console.log(status, "Admin middleware")
      }).catch(e => {

        let payload = {
          msg: "You're not authorized to access this resources",
          isActive: true
        }

        console.log(e)

        context.store.commit('notify/failed', payload)
        context.redirect('/')

      })

}
