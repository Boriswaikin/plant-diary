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
import { auth } from "./firebase-setup";
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
		//console.log("call get diary");
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
		//console.log("call get diaries");
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
		// console.log("call get diaries by location");
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
export async function getDiaryBySpecies(species) {
	try {
		// console.log("call get diaries by location");
		const q = query(
			collection(firestore, "diary"),
			where("species", "==", species)
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
export async function createProfile(user) {
	//console.log("call create diary function");
	const docRef1 = await addDoc(collection(firestore, "profile"), {
		uid: auth.currentUser.uid,
		name: user.name,
		email: user.email,
		achievement: user.achievement,
		followerCount: user.followerCount,
		followingCount: user.followingCount,
		headPhoto: user.headPhoto,
		postCount: user.postCount,
		favouritePlant: user.favouritePlant,
	});
	const docRef2 = await addDoc(collection(firestore, "follower"), {
		userUid: auth.currentUser.uid,
		follower: [],
	});
	const docRef3 = await addDoc(collection(firestore, "following"), {
		userUid: auth.currentUser.uid,
		following: [],
	});
	console.log("Profile written with ID: ", docRef.id);
}

export async function editProfile(uid, updateField) {
	try {
		//console.log("call edit diary function");
		const docRef = doc(firestore, "profile", uid);
		await updateDoc(docRef, updateField);
		console.log("Document updated with ID: ", uid);
	} catch (err) {
		console.log(err);
	}
}

export async function getProfileById(uid) {
	try {
		//console.log("call get diary");
		const docRef = doc(firestore, "profile", uid);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			//console.log(docSnap.data());
			return docSnap.data();
		} else {
			console.log("user does not exist");
		}
	} catch (err) {
		console.log(err);
	}
}

export async function getFollowerByUser(uid) {
	try {
		//console.log("call get diaries");
		const q = query(
			collection(firestore, "follower"),
			where("userUid", "==", uid)
		);
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			// const followers = [];
			// querySnapshot.forEach((doc) => {
			// 	followers.push(doc.data());
			// });
			console.log(querySnapshot.data());
			return querySnapshot.data();
		});
	} catch (err) {
		console.log(err);
	}
}
export async function getFollowingByUser(uid) {
	try {
		//console.log("call get diaries");
		const q = query(
			collection(firestore, "following"),
			where("userUid", "==", uid)
		);
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			// const followers = [];
			// querySnapshot.forEach((doc) => {
			// 	followers.push(doc.data());
			// });
			console.log(querySnapshot.data());
			return querySnapshot.data();
		});
	} catch (err) {
		console.log(err);
	}
}
