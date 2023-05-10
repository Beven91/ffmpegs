/**
 * @name FFmpegMediaRecorder
 * @description 媒体录制器，目前主要用来进行音频录制
 */

export default class FFmpegMediaRecorder {

  constructor(){
    navigator.mediaDevices.getUserMedia({ audio:true }).then((stream)=>{
    })
  }
 
}