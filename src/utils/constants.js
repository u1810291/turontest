import uz from "./uz.json";
import ru from "./ru.json";

const Base_Url = "http://172.16.1.188:8000";
export const lang = [
  { displayName: "ЎЗ", key: "uz" },
  { displayName: "РУ", key: "ru" }
];


export const languages = {
  ru: ru,
  uz: uz
};
export function timeConverter(unixTime){
    var date = new Date(unixTime*1000);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var convdataTime = month+'.'+day+'.'+year+' '+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return convdataTime;
}

export function formatTime(time){
    let minutes = Math.floor(time / 60).toString();
    if(minutes.length === 1){
        minutes = "0"+minutes
    }
    let seconds = (time - minutes * 60).toString();
    if(seconds.length === 1){
        seconds = "0"+seconds
    }
    return `${minutes+' min '} ${seconds+' sec '}`
  }

export const customModalStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      width                 : '80%',
      height                : '80%',
      transform             : 'translate(-50%, -50%)',
      borderRadius          : '10px',
      borderColor           : 'rgb(33,150,243)'
    }
  };

