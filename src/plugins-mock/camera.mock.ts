import { Camera } from '@ionic-native/camera';

export class CameraMock extends Camera {

  getPicture(options) {
    return new Promise((resolve, reject) => {
      resolve(this.fakeImage);
    })
  }

  fakeImage = "data:image/jpeg;base64,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";
}