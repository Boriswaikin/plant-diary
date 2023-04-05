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
	arrayUnion,
	arrayRemove,
} from "firebase/firestore";
import { firestore } from "./firebase-setup";
import { auth } from "./firebase-setup";

export async function createDiary(diary) {
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

	const countRef = doc(firestore, "profile", auth.currentUser.uid);
	await updateDoc(countRef, {
		postCount: increment(1) 
	})

	console.log("Diary written with ID: ", docRef.id);
}

export async function deleteDiary(id) {
	try {
		await deleteDoc(doc(firestore, "diary", id));

		const countRef = doc(firestore, "profile", auth.currentUser.uid);
		await updateDoc(countRef, {
			postCount: increment(-1) 
		})

		console.log("Document deleted with ID: ", id);
	} catch (err) {
		console.log(err);
	}
}

export async function editDiary(id, updateField) {
	try {
		const docRef = doc(firestore, "diary", id);
		await updateDoc(docRef, updateField);
		console.log("Document updated with ID: ", id);
	} catch (err) {
		console.log(err);
	}
}

export async function getDiaryById(id) {
	try {
		const docRef = doc(firestore, "diary", id);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
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
		const q = query(collection(firestore, "diary"), where("userId", "==", id), orderBy("date", "desc"));
		const querySnapshot = await getDocs(q);
		const diaries = [];
		querySnapshot.forEach((doc) => {
			diaries.push({ ...doc.data(), diaryId: doc.id });
		});
		return diaries;
	} catch (err) {
		console.log(err);
	}
}

export function getDiaryQueueByUser(id) {
	const q = query(collection(firestore, "diary"), where("userId", "==", id));
	return q;
}

export function getLatestDiariesQueue() {
	const q = query(
		collection(firestore, "diary"),
		orderBy("date", "desc"),
		// limit(10)
	);
	return q;
}

export async function getDiaryByLocation(location) {
	try {
		const q = query(
			collection(firestore, "diary"),
			where("location", "==", location)
		);
		const querySnapshot = await getDocs(q);
		const diaries = [];
		querySnapshot.forEach((doc) => {
			diaries.push({...doc.data(), diaryId: doc.id});
		});
		console.log(diaries);
		return diaries;
	} catch (err) {
		console.log(err);
	}
}

export async function getDiaryBySpecies(species) {
	try {
		const q = query(
			collection(firestore, "diary"),
			where("species", "==", species)
		);
		const querySnapshot = await getDocs(q);
		const diaries = [];
		querySnapshot.forEach((doc) => {
			diaries.push({...doc.data(), diaryId: doc.id});
		});
		console.log(diaries);
		return diaries;
	} catch (err) {
		console.log(err);
	}
}
export async function createProfile(user) {
	try {
		const docRef1 = await addDoc(doc(firestore, "profile", auth.currentUser.uid), {
			uid: auth.currentUser.uid,
			name: user.name,
			email: user.email,
			achievement: ["very", "good"],
			followerCount: 32,
			followingCount: 48,
			headPhoto: "https://ui-avatars.com/api/?name=XX",
			postCount: 10,
			favouritePlant: "default",
		});
		await addDoc(doc(firestore, "follower", auth.currentUser.uid), {
			uid: auth.currentUser.uid,
			follower: [],
		});
		await addDoc(doc(firestore, "following", auth.currentUser.uid), {
			uid: auth.currentUser.uid,
			following: [],
		});
		await addDoc(doc(firestore, "like", auth.currentUser.uid), {
			uid: auth.currentUser.uid,
			likeDiaries: [],
		});
		console.log("Profile written with ID: ", docRef1.id);
	} catch (err) {
		console.log(err);
	}
}

export async function editProfile(id, updateField) {
	try {
		const docRef = doc(firestore, "profile", id);
		await updateDoc(docRef, updateField);
		console.log("Document updated with ID: ", id);
	} catch (err) {
		console.log(err);
	}
}

export async function getProfileById(id) {
	try {
		const docRef = doc(firestore, "profile", id);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			return docSnap.data();
		} else {
			console.log("user does not exist");
		}
	} catch (err) {
		console.log(err);
	}
}

export async function getFollowerByUser(uid) {
	const docRef = doc(firestore, "follower", uid);
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		return docSnap.data();
	} else {
		console.log("user does not exist");
	}
}

export async function getFollowingByUser(uid) {
	const docRef = doc(firestore, "following", uid);
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		return docSnap.data();
	} else {
		console.log("user does not exist");
	}
}

export async function searchDiary(species) {
	try {
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

export async function addLike(diaryId) {
	try {
		const likeRef = doc(firestore, "like", auth.currentUser.uid);
		await updateDoc(likeRef, {
			likeDiaries: arrayUnion(diaryId) 
		})
		const countRef = doc(firestore, "diary", diaryId);
		await updateDoc(countRef, {
			like: increment(1) 
		})

	} catch (err) {
		console.log(err);
	}
}
export async function removeLike(diaryId) {
	try {
		const likeRef = doc(firestore, "like", auth.currentUser.uid);
		await updateDoc(likeRef, {
			likeDiaries: arrayRemove(diaryId) 
		})
		const countRef = doc(firestore, "diary", diaryId);
		await updateDoc(countRef, {
			like: increment(-1) 
		})
	} catch (err) {
		console.log(err);
	}
}

export async function checkLike(diaryId) {
	const likeRef = doc(firestore, "like", auth.currentUser.uid);
	const docSnap = await getDoc(likeRef);
	if (docSnap.exists()) {
		return docSnap.data().likeDiaries.includes(diaryId);
	} else {
		console.log("user does not exist");
	}
}

export async function followUser(userUid) {
	await addFollowing(auth.currentUser.uid, userUid);
	await addFollower(userUid, auth.currentUser.uid);
}

export async function unfollowUser(userUid) {
	await removeFollowing(auth.currentUser.uid, userUid);
	await removeFollower(userUid, auth.currentUser.uid);
}
export async function addFollowing(user, followingUser) {
	try {
		const followingRef = doc(firestore, "following", user);
		await updateDoc(followingRef, {
			following: arrayUnion(followingUser) 
		})
		const countRef = doc(firestore, "profile", user);
		await updateDoc(countRef, {
			followingCount: increment(1) 
		})
	} catch (err) {
		console.log(err);
	}
}

export async function removeFollowing(user, followingUser) {
	try {
		const followingRef = doc(firestore, "following", user);
		await updateDoc(followingRef, {
			following: arrayRemove(followingUser) 
		})
		const countRef = doc(firestore, "profile", user);
		await updateDoc(countRef, {
			followingCount: increment(-1) 
		})
	} catch (err) {
		console.log(err);
	}
}

export async function addFollower(user, userFollower) {
	try {
		const followerRef = doc(firestore, "follower", user);
		await updateDoc(followerRef, {
			follower: arrayUnion(userFollower) 
		})
		const countRef = doc(firestore, "profile", user);
		await updateDoc(countRef, {
			followerCount: increment(1) 
		})
	} catch (err) {
		console.log(err);
	}
}

export async function removeFollower(user, userFollower) {
	try {
		const followerRef = doc(firestore, "follower", user);
		await updateDoc(followerRef, {
			follower: arrayRemove(userFollower) 
		})
		const countRef = doc(firestore, "profile", user);
		await updateDoc(countRef, {
			followerCount: increment(-1) 
		})
	} catch (err) {
		console.log(err);
	}
}

export async function checkFollowingRelation(uid) {
	try {
		const followingRef = doc(firestore, "following", auth.currentUser.uid);
		const docSnap = await getDoc(followingRef);
		if (docSnap.exists()) {
			return docSnap.data().following.includes(uid);
		} else {
			console.log("user does not exist");
		}
	} catch (err) {
		console.log(err);
	}
}

export async function getSubscribedDiaries() {
	try {
		const docRef = doc(firestore, "following", auth.currentUser.uid);
		const docSnap = await getDoc(docRef);
		const following = docSnap.data().following;
		const q = query(collection(firestore, "diary"), where('userId', 'in', following), orderBy("date", "desc"));
		const diariesSnapshot = await getDocs(q);
		let diaries = [];
		diariesSnapshot.forEach((item)=>{
			diaries.push({...item.data(), diaryId:item.id});
		})
		return diaries;
	} catch (err) {
		console.log(err);
	}
}
