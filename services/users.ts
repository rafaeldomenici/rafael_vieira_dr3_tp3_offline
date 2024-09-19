import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "@/app/ctx";

export async function inserirUsuario(novoUsuario) {
  const docRef = await addDoc(collection(db, "user"), novoUsuario);
  return docRef.id;
}

export async function listarUsuarios() {
  let retorno;
  await getDocs(collection(db, "user")).then((querySnapshot) => {
    retorno = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  });
  return retorno;
}

export async function obterUsuario(id) {
  const docRef = doc(db, "user", id);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

export async function excluirUsuario(id) {
  await deleteDoc(doc(db, "user", id));
}

export async function alterarUsuario(contato) {
  await setDoc(doc(db, "user", contato.id), contato);
}