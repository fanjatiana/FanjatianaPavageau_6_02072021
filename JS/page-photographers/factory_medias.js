/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
// factory method des médias

import { Image } from './class_images.js';
import { Video } from './class_videos.js';

export class MediasFactory {
  static buildMedia(media) {
    let objectMedia = null;
    if (media.image) {
      objectMedia = new Image(media);
    }
    if (media.video) {
      objectMedia = new Video(media);
    }
    return objectMedia;
  }
}
