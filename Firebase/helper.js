import { async } from "@firebase/util";
import {
	collection,
	addDoc,
	deleteDoc,
	doc,
	updateDoc,
	getDoc,
	query,
	where,
	onSnapshot,
	querySnapshot,
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
	try {
		//console.log("call edit diary function");
		const docRef = doc(firestore, "diary", id);
		await updateDoc(docRef, updateField);
		console.log("Document updated with ID: ", id);
	} catch (err) {
		console.log(err);
	}
}

export async function getDiaryById(id) {
	try {
		console.log("call get diary");
		const docRef = doc(firestore, "diary", id);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			console.log(docSnap.data());
			return docSnap.data();
		} else {
			console.log("diary does not exist");
		}
	} catch (err) {
		console.log(err);
	}
}

export async function getDiaryByUser(userId) {
	try {
		console.log("call get diaries");
		const q = query(
			collection(firestore, "diary"),
			where("userId", "==", userId)
		);
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const diaries = [];
			querySnapshot.forEach((doc) => {
				diaries.push(doc.data());
			});
			console.log(diaries);
			return diaries;
		});
	} catch (err) {
		console.log(err);
	}
}
export async function getDiaryByLocation(location) {
	try {
		console.log("call get diaries by location");
		const q = query(
			collection(firestore, "diary"),
			where("location", "==", location)
		);
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const diaries = [];
			querySnapshot.forEach((doc) => {
				diaries.push(doc.data());
			});
			console.log(diaries);
			return diaries;
		});
	} catch (err) {
		console.log(err);
	}
}
