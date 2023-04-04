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
	getDocs,
	limit,
	orderBy,
} from "firebase/firestore";
import { firestore } from "./firebase-setup";
import { auth } from "./firebase-setup";

export async function createDiary(diary) {
	//console.log("call create diary function");
	const docRef = await addDoc(collection(firestore, "diary"), {
		photos: diary.photos,
		description: diary.description,
		species: diary.species,
		location: diary.location,
		date: diary.date,
		userId: auth.currentUser.uid,
		userName: diary.userName,
		like: 0,
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
			// console.log(docSnap.data());
			return docSnap.data();
		} else {
			console.log("diary does not exist");
		}
	} catch (err) {
		console.log(err);
	}
}

export async function getDiaryByUser(id) {
	try {
		console.log("call get diaries");
		const q = query(collection(firestore, "diary"), where("userId", "==", id));
		const querySnapshot = await getDocs(q);
		const diaries = [];
		querySnapshot.forEach((doc) => {
			diaries.push({ ...doc.data(), diaryId: doc.id });
		});
		// console.log(diaries);
		return diaries;
	} catch (err) {
		console.log(err);
	}
}

export function getDiaryQueueByUser(id) {
	// try {
	//console.log("call get diaries");
	const q = query(collection(firestore, "diary"), where("userId", "==", id));
	return q;
}

export function getLatestDiariesQueue() {
	// try {
	//console.log("call get diaries");
	const q = query(
		collection(firestore, "diary"),
		orderBy("date", "desc"),
		limit(10)
	);
	// const querySnapshot = await getDocs(q);
	// const diaries = [];
	// querySnapshot.forEach((doc) => {
	// 	diaries.push(doc.data());
	// });
	// console.log(diaries);
	// return diaries;
	return q;
	// } catch (err) {
	// 	console.log(err);
	// }
}

export async function getDiaryByLocation(location) {
	try {
		// console.log("call get diaries by location");
		const q = query(
			collection(firestore, "diary"),
			where("location", "==", location)
		);
		const querySnapshot = await getDocs(q);
		const diaries = [];
		querySnapshot.forEach((doc) => {
			diaries.push(doc.data());
		});
		console.log(diaries);
		return diaries;
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
		const querySnapshot = await getDocs(q);
		const diaries = [];
		querySnapshot.forEach((doc) => {
			diaries.push(doc.data());
		});
		console.log(diaries);
		return diaries;
	} catch (err) {
		console.log(err);
	}
}
export async function createProfile(user) {
	//console.log("call create diary function");
	const docRef1 = await addDoc(collection(firestore, "profile"), {
		uid: auth.currentUser.uid,
		// uid: user.id,
		name: user.name,
		email: user.email,
		achievement: ["very", "good"],
		followerCount: 32,
		followingCount: 48,
		headPhoto: "default",
		postCount: 10,
		favouritePlant: "default",
		diaries: ["123", "434", "809"],
	});
	const docRef2 = await addDoc(collection(firestore, "follower"), {
		userUid: auth.currentUser.uid,
		// uid: "12345",
		follower: [],
	});
	const docRef3 = await addDoc(collection(firestore, "following"), {
		userUid: auth.currentUser.uid,
		// uid: "12345",
		following: [],
	});
	console.log("Profile written with ID: ", docRef1.id);
}

export async function editProfile(id, updateField) {
	try {
		//console.log("call edit diary function");
		const docRef = doc(firestore, "profile", id);
		await updateDoc(docRef, updateField);
		console.log("Document updated with ID: ", id);
	} catch (err) {
		console.log(err);
	}
}

export async function getProfileById(id) {
	try {
		//console.log("call get diary");
		const docRef = doc(firestore, "profile", id);
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
export async function getProfileByUid(uid) {
	try {
		//console.log("call get diaries");
		const q = query(collection(firestore, "profile"), where("uid", "==", uid));
		const querySnapshot = await getDocs(q);
		const users = [];
		querySnapshot.forEach((doc) => {
			users.push({ ...doc.data(), id: doc.id });
		});
		// console.log(users[0]);
		// console.log(querySnapshot[0].data());
		return users[0];
	} catch (err) {
		console.log(err);
	}
}

export async function getFollowerByUser(uid) {
	try {
		//console.log("call get diaries");
		const q = query(collection(firestore, "follower"), where("uid", "==", uid));
		const querySnapshot = await getDocs(q);
		const followers = [];
		querySnapshot.forEach((doc) => {
			followers.push(doc.data());
		});
		//console.log(querySnapshot.data());
		// console.log(followers);
		return followers;
	} catch (err) {
		console.log(err);
	}
}
export async function getFollowingByUser(uid) {
	try {
		//console.log("call get diaries");
		const q = query(
			collection(firestore, "following"),
			where("uid", "==", uid)
		);
		const querySnapshot = await getDocs(q);
		const followings = [];
		querySnapshot.forEach((doc) => {
			followings.push(doc.data());
		});
		// console.log(querySnapshot);
		// console.log(followings);
		return followings;
	} catch (err) {
		console.log(err);
	}
}

export async function searchDiary(species) {
	try {
		// console.log("call get diaries by location");
		const q = query(
			collection(firestore, "diary"),
			where("species", "==", species)
		);
		const querySnapshot = await getDocs(q);
		const diaries = [];
		querySnapshot.forEach((doc) => {
			diaries.push(doc.data());
		});
		console.log(diaries);
		return diaries;
	} catch (err) {
		console.log(err);
	}
}
export async function createLike(diaryId) {
	const docRef = await addDoc(collection(firestore, "like"), {
		diaryId: diaryId,
		likeUsers: [],
	});
	console.log("Like written with ID: ", docRef.id);
}
export async function addLike(diaryId) {
	try {
		//console.log("call add like function");

		const q = query(
			collection(firestore, "like"),
			where("diaryId", "==", diaryId)
		);
		const querySnapshot = await getDocs(q);
		// console.log("qs", querySnapshot);
		const like = [];
		querySnapshot.forEach((docItem) => {
			like.push({ ...docItem.data(), id: docItem.id });
		});
		const likeItem = await like[0];
		console.log(likeItem);
		const docRef = doc(firestore, "like", likeItem.id);
		updateDoc(docRef, {
			likeUsers: [...likeItem.likeUsers, auth.currentUser.uid],
		});
		console.log("Like update with ID: ", docRef.id);
	} catch (err) {
		console.log(err);
	}
}
