import { PermissionsAndroid } from "react-native";
import CallLogs from 'react-native-call-log'


export const getPermission = async ()=> {
    try{
    callLogPermission = PermissionsAndroid.PERMISSIONS.READ_CALL_LOG
    permissionGranted = await PermissionsAndroid.request(
        callLogPermission,
        {title: "call log permission",
         message: "This app need call log permission",
         buttonPositive: "okay",
         buttonNegative: "cancel",
      }
    )
    if (permissionGranted === PermissionsAndroid.RESULTS.GRANTED){
        console.log("call log permission granted")
        try{
            const callLogs = await loadCallLog();
            return callLogs
        }catch(error){
            console.log(error)
        }
    }else{
        console.log("permission denied")
    }
    }
    catch(error){
         console.log("error while requesting permission",error)
    }

}


const loadCallLog = async () =>{
    try{
       const callLogs = await CallLogs.load(50)
       return callLogs
       
    }catch(error){
        console.log('error while fetching call log', error)
    }

    


}