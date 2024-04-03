// import { DocumentData, QuerySnapshot, addDoc, deleteDoc, updateDoc } from "firebase/firestore";
// import { getUsers, usersDocumentRef, usersRef } from "./firebase";

// export interface UserData {
//   docId?: string;
//   name: string;
//   uid: string;
// }

// export default class UserCRUDUtils {
//   static createUser(userData: UserData){
//     addDoc(usersRef, {...userData});
//   }

//   static async getUsersList(){
//     return getUsers((snapshot: QuerySnapshot) => {
//       let temp: UserData[] = [];
//       snapshot.forEach((doc: DocumentData) => {
//         temp.push({
//           docId: doc.id,
//           ...doc.data(),
//         } as UserData);
//       });
//       temp = temp.sort((a: UserData, b: UserData) => {
//         return a.name.charCodeAt(0) - b.name.charCodeAt(0);
//       });
//       return temp
//     });
//   }

//   static updateUser(userData: UserData){
//     updateDoc(usersDocumentRef(userData.docId), {...userData})
//   }

//   static deleteUser(userData: UserData){
//     deleteDoc(usersDocumentRef(userData.docId));
//   }
// }

import React from "react";

function userDatabaseCRUD() {
  return <div>userDatabaseCRUD</div>;
}

export default userDatabaseCRUD;
