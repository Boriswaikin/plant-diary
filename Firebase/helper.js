import { async } from "@firebase/util";
import {
	collection,
	addDoc,
	deleteDoc,
	doc,
	updateDoc,
} from "firebase/firestore";
import { firestore } from "./firebase-setup";
// Add a new document with a generated id.
export async function createDiary(diary) {
	//console.log("call create diary function");
	const docRef = await addDoc(collection(firestore, "diary"), {
		photos: diary.photos,
		description: diary.description,
		species: diary.species,
		location: diary.location,
		date: diary.date,
		userId: diary.userId,
	});
	console.log("Diary written with ID: ", docRef.id);
}
export async function deleteDiary(id) {
	try {
		//console.log("call delete diary function");
		await deleteDoc(doc(firestore, "diary", id));
		console.log("Document deleted with ID: ", id);
	} catch (err) {
		console.log(err);
	}
}

export async function editDiary(id, updateField) {
	//console.log("call edit diary function");
	const docRef = doc(firestore, "diary", id);
	await updateDoc(docRef, updateField);
	console.log("Document updated with ID: ", id);
}
