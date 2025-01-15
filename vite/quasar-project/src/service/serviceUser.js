import {User} from '../model/User.js';

export class serviceUser {
  // async getAllUser()
  getAllUser() {
    // const url = 'https://blogger.googleapis.com/v3/blogs/9188847005249173721/posts';

    // crear un usuario
    return new User(1, 'Leyenda', 'Guido', 'Figueroa', 'Castro', '12/12/1999', 'gmail@gmail.com', 'urlFotoPerfil', 'publico', 'activo', 'administrado');

    // const response = await fetch(url,
    //   {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       "Authorization": 'Bearer ' + localStorage.getItem('token')
    //     },
    //
    //   });

    // const data = await response.json();


    // const blogs = data.items;
    // if (!blogs) {
    //   return null;
    // }

    // console.log(blogs);

    // return blogs.map(n => {
    //   return new BlogerModel(n.id, n.title, n.content, n.url, n.updated, n.publish, n.labels);
    // })


  }
}


