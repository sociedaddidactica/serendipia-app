import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Photo } from '../photo/photo.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  
  url_base = 'https://serendipias.app/apirestful_serendipia/v1';

  constructor(public http: HttpClient, private transfer: FileTransfer) {}

  // Metodo para guardar los datos de un usuario registrado
  createPerfil(datos) {
    let f_nacimiento = datos.f_nacimiento.slice(0, datos.f_nacimiento.indexOf('T'));
    let countryCode = localStorage.getItem('countryCode');
    let httpParams = new HttpParams()
      .append('nombre_apellido', datos.nombre_apellido)
      .append('f_nacimiento', f_nacimiento)
      .append('genero', datos.genero)
      .append('email', datos.email)
      .append('usuario', datos.usuario)
      .append('contrasena', datos.contrasena)
      .append('pais', countryCode);

    const options = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      params: httpParams,
    };

    const url = this.url_base + '/usuario';

    return this.http.post(url, httpParams, options).toPromise();
  }

  loginUser(data_login) {
    const user = data_login.user;
    const pass = data_login.pass;

    let httpParams = new HttpParams().append('user', user).append('pass', pass);

    const options = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      params: httpParams,
    };
    const url = this.url_base + '/login';

    return this.http.post(url, httpParams, options).toPromise();
  }

  saveUserPreferences(data_preferences) {
    const param1: string = data_preferences[0].id_user;
    const param2: string = data_preferences[0].pref1;
    const param3: string = data_preferences[0].pref2;
    const param4: string = data_preferences[0].pref3;
    const param5: string = data_preferences[0].pref4;

    let httpParams = new HttpParams()
      .append('idUser', param1)
      .append('pref1', param2)
      .append('pref2', param3)
      .append('pref3', param4)
      .append('pref4', param5);

    const options = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      params: httpParams,
    };

    const url = this.url_base + '/preferences';

    return this.http.post(url, httpParams, options).toPromise();
  }

  recoveryPasswd(email_recovery) {
    let httpParams = new HttpParams().append('email_recovery', email_recovery);

    const options = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      params: httpParams,
    };

    const url = this.url_base + '/recoverypass';

    return this.http.post(url, httpParams, options).toPromise();
  }

  uploadProfilePic(photoProf: Photo, id_user: any) {
      console.info("foto in upload funcion: " + photoProf.filepath);
    const fileTransfer: FileTransferObject = this.transfer.create();
    const url = this.url_base + '/uploadprofilepic';
    const pictureName = id_user + "_" + photoProf.name;
    let options: FileUploadOptions = {
        fileKey: 'file',
        fileName: pictureName,
        chunkedMode: false,
        mimeType: 'image/jpeg',
        params : {'id_user': id_user}
    };
    return fileTransfer.upload( photoProf.filepath, url, options);
  }

  getIdProductSection(name_section) {
    let httpParams = new HttpParams().append('name_section', name_section);
    const options = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        params: httpParams,
    };
    const url = this.url_base + '/getidsectionbyname';
    return this.http.post(url, httpParams, options).toPromise();
  }

  getAllAudiosFile() {
      const options = {
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
          },
      };
      const url = this.url_base + '/getallaudiofiles';
      return this.http.get(url, options).toPromise();
  }

  getAudioFiles(id_section) {
      let httpParams = new HttpParams().append('id_section', id_section);
      const options = {
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
          },
          params: httpParams,
      };
      const url = this.url_base + '/getaudiofiles';
      return this.http.get(url, options).toPromise();
  }

  getSubSections(id_father) {
      let httpParams = new HttpParams().append('id_section_father', id_father);
      const options = {
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
          },
          params: httpParams,
      };
      const url = this.url_base + '/getsubsections';
      return this.http.get(url, options).toPromise();
  }

  getVersionAppForUser(id_user) {
      let httpParams = new HttpParams().append('id_usuario', id_user);
      const options = {
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
          },
          params: httpParams,
      };
      const url = this.url_base + '/getversionapp';
      return this.http.get(url, options).toPromise();
  }

  updateAccess(id_usuario){
    let httpParams = new HttpParams()
      .append('id_usuario', id_usuario);
    
    const options = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      params: httpParams,
    };

    const url = this.url_base + '/updateaccess';
    return this.http.post(url, httpParams, options).toPromise();
  }

  saveInteraction(datos) {
    const param1: string = datos[0].id_usuario;
    const param2: string = datos[0].id_tipo_interaccion;
    const param3: string = datos[0].id_objeto;
    
    let httpParams = new HttpParams()
      .append('id_usuario', param1)
      .append('id_tipo_interaccion', param2)
      .append('id_objeto', param3);

    const options = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      params: httpParams,
    };

    const url = this.url_base + '/saveinteraction';

    return this.http.post(url, httpParams, options).toPromise();
  }

  getNotes(id_user) {
    let httpParams = new HttpParams().append('id_user', id_user);
    const options = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        params: httpParams,
    };
    const url = this.url_base + '/getnotes';
    return this.http.get(url, options).toPromise();
  }

  getContentNote(id_note) {
    let httpParams = new HttpParams().append('id_note', id_note);
    const options = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        params: httpParams,
    };
    const url = this.url_base + '/getcontentnote';
    return this.http.get(url, options).toPromise();
  }

  saveNote(datos) {
    const param1: string = datos.id_nota;
    const param2: string = datos.texto;
    const param3: string = datos.id_usuario;
    
    let httpParams = new HttpParams()
      .append('id_usuario', param3)
      .append('id_nota', param1)
      .append('texto', param2);

    const options = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      params: httpParams,
    };

    const url = this.url_base + '/savenote';

    return this.http.post(url, httpParams, options).toPromise();
  }

  deleteNote(datos) {
    const param1: string = datos.id_nota;
    const param2: string = datos.id_usuario;
    
    let httpParams = new HttpParams()
      .append('id_usuario', param2)
      .append('id_nota', param1);

    const options = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      params: httpParams,
    };

    const url = this.url_base + '/deletenote';

    return this.http.post(url, httpParams, options).toPromise();
  }

  getMessagesHP(fecha, id_usuario) {
    let httpParams = new HttpParams()
		.append('date', fecha)
		.append('id_grupo_usuario', id_usuario);
    const options = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        params: httpParams,
    };
    const url = this.url_base + '/getmessages';
    return this.http.get(url, options).toPromise();
  }

	getGroups(id_usuario){
		let httpParams = new HttpParams()
		.append('id_usuario', id_usuario);
    const options = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        params: httpParams,
    };
    const url = this.url_base + '/getgroupsuser';
    return this.http.get(url, options).toPromise();
	}

	saveTask(datos) {
		// let fecha = datos.fecha.slice(0, datos.fecha.indexOf('T'));
    let httpParams = new HttpParams()
      .append('id_task', datos.id_task)
      .append('id_usuario', datos.id_usuario)
      .append('title', datos.title)
			.append('descrip', datos.descrip)
			.append('fecha', datos.fecha)
      .append('time', datos.time);

    const options = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      params: httpParams,
    };

    const url = this.url_base + '/savetaskhp';

    return this.http.post(url, httpParams, options).toPromise();
  }

  deleteTask(datos) {
    const param1: string = datos.id_task;
    const param2: string = datos.id_usuario;
    
    let httpParams = new HttpParams()
      .append('id_usuario', param2)
      .append('id_task', param1);

    const options = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      params: httpParams,
    };

    const url = this.url_base + '/deletetaskhp';

    return this.http.post(url, httpParams, options).toPromise();
  }

}
