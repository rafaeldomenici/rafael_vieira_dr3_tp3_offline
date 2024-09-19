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

export async function inserirItem(novoItem) {
  const docRef = await addDoc(collection(db, "listaItens"), novoItem);
  return docRef.id;
}

export async function listarItens() {
  let retorno;
  await getDocs(collection(db, "listaItens")).then((querySnapshot) => {
    retorno = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  });
  return retorno;
}

export async function obterItem(id) {
  const docRef = doc(db, "listaItens", id);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

export async function excluirItem(id) {
  await deleteDoc(doc(db, "listaItens", id));
}

export async function alterarItem(item) {
  await setDoc(doc(db, "listaItens", item.id), item);
}