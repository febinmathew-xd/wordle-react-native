import AsyncStorage from "@react-native-async-storage/async-storage";


const storeData = async (key, value)=>{
   const jsonValue = JSON.stringify(value);

    try{
        await AsyncStorage.setItem(key, jsonValue);
        console.log(`Data stored successfully for the key: ${key}`);
    }catch(error){
        console.log(`ERROR: unable to store value in AsyncStorage for key: ${key}`, error);
    }
    

};

const getData = async (key)=> {
    try{
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null ;
    }catch(error){
        console.log(`ERROR: unable to fetch data from asyncStorage for key: ${key}`, error);
        return null;
    }
};

const clearAllData = async ()=>{
    try{
        await AsyncStorage.clear();
        console.log("Storage cleared successfully")
    }catch(error){
        console.log("error while clearing storage", error)
    }
}

export {getData, storeData, clearAllData};