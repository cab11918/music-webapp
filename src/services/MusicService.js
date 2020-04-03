export default class MusicService {
  static myInstance = null;

  static getInstance() {
    if (MusicService.myInstance == null) {
      MusicService.myInstance = new MusicService()
    }
    return this.myInstance
  }

  getASongUrl(id) {
    return  fetch("https://neteasemusicapi.herokuapp.com/song/url?id=" +id)
    .then(response => response.json())

  }

  getASongDetail(id) {
    return fetch("https://neteasemusicapi.herokuapp.com/song/detail?ids=" + id)
    .then(response => response.json())
  }

  checkSong(id) {
    return fetch("https://neteasemusicapi.herokuapp.com/check/music?id=" + id)
    .then(response => response.json())
  }

  searchSong(text) {
    return fetch("https://neteasemusicapi.herokuapp.com/search?keywords=" + text)
    .then(response => response.json())
  }


  //////////////////////////////////////////////////////////////////////////////

  // createUser(user) {
  //   return fetch('https://game-webapp-server.herokuapp.com/users', {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       name: user.name,
  //       birthday: user.birthday,
  //       email: user.email,
  //       password: user.password,
  //       username: user.username,
  //       gender: user.gender
  //     }),
  //     headers: {
  //       'content-type': 'application/json'
  //     }
  //   })
  // }
  //
  // findAllUsers() {
  //   return fetch("https://game-webapp-server.herokuapp.com/users")
  //   .then(response => response.json())
  // }
  //
  // findUserByUsn(usn) {
  //   return fetch("https://game-webapp-server.herokuapp.com/login/" + usn)
  //   .then(response => response.json()
  //   )
  // }
  //
  // findUserById(uid) {
  //   return fetch("https://game-webapp-server.herokuapp.com/users/" + uid)
  //   .then(response => response.json())
  // }
  //
  // deleteGameForUser(userId, gameId) {
  //
  //   return fetch(
  //       'https://game-webapp-server.herokuapp.com/users/' + userId + "/games/"
  //       + gameId, {
  //         method: 'DELETE',
  //         headers: {
  //           'content-type': 'application/json'
  //         }
  //
  //       }).then(response => response.json())
  //
  //   updateProfile(userId, user)
  //   {
  //     return fetch(
  //         'https://game-webapp-server.herokuapp.com/users/' + userId, {
  //           method: 'PUT',
  //           body: JSON.stringify(user),
  //           headers: {
  //             'content-type': 'application/json'
  //           }
  //         }).then(response => response.json())
  //
  //   }
  //
  //   deleteFriend(userId, friendId)
  //   {
  //     return fetch(
  //         'https://game-webapp-server.herokuapp.com/users/' + userId
  //         + "/friends/"
  //         + friendId
  //         , {
  //           method: 'DELETE',
  //           headers: {
  //             'content-type': 'application/json'
  //           }
  //
  //         }).then(response => response.json())
  //
  //   }
  //
  //   addFriend(userId, friend)
  //   {
  //     return fetch(
  //         'https://game-webapp-server.herokuapp.com/users/' + userId
  //         + "/friends",
  //         {
  //           method: 'POST',
  //           body: JSON.stringify(friend),
  //           headers: {
  //             'content-type': 'application/json'
  //           }
  //         }).then(response => response.json())
  //   }

  // }

}

