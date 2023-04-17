import { View, FlatList, TextInput, SafeAreaView, Pressable, StyleSheet, Alert, ActivityIndicator} from 'react-native'
import React, { useEffect, useState } from 'react'
import DiaryCard from '../components/DiaryCard';
import {  getDiaryBySpecies, getDiaryQueueByUser, getFollowingQueue, getLatestDiariesQueue, getLikeListQueue, getSubscribedDiariesQueue } from '../Firebase/helper';
import { auth } from '../Firebase/firebase-setup';
import { MaterialIcons } from '@expo/vector-icons';
import PressableButton from '../components/PressableButton';
import { onSnapshot } from 'firebase/firestore';
import LocationManager from '../components/LocationManager';
import * as geofire from 'geofire-common';
import DropdownList from '../components/DropdownList';

export default function Home({ navigation, route }) {
	const [diaries, setDiaries] = useState(null);
	const [filteredDiary, setFilteredDiary] = useState(null);
	const [likeList, setLikeList] = useState(null);
	const [search, setSearch] = useState("");
	const [sort, setSort] = useState("recommand");
	const items = [
		{ label: "Sorted by: Recommand", value: "recommand" },
		{ label: "By Location", value: "location" },
	];
	const [recommend, setRecommend] = useState(route.params.recommend);
	const [location, setLocation] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [following, setFollowing] = useState(null);

	function setLoadingLocation(status) {
		setIsLoading(status);
	}

	useEffect(() => {
		let q;
		if (recommend) {
			q = getLatestDiariesQueue();
		} else {
			q = getFollowingQueue();
		}
		const unsubscribe = onSnapshot(
			q,
			(querySnapshot) => {
				if (querySnapshot.empty) {
					setDiaries([]);
				}
				if (!querySnapshot.empty) {
					if (recommend) {
						const newdiaries = [];
						querySnapshot.docs.forEach((doc) => {
							newdiaries.push({ ...doc.data(), diaryId: doc.id });
						});
						setDiaries(newdiaries);
					} else if (typeof querySnapshot.data() !== "undefined"){
						setFollowing(querySnapshot.data().following);
					}
				}
			},
			(err) => {
				console.log(err);
			}
		);
		return () => {
			unsubscribe();
		};
	}, []);

	useEffect(()=>{
		if (following && following.length>0) {
			const q = getSubscribedDiariesQueue(following);
			const unsubscribe3 = onSnapshot(q,(querySnapshot) => {
				if (!querySnapshot.empty) {
					const newdiaries = [];
					querySnapshot.docs.forEach((doc) => {
						newdiaries.push({ ...doc.data(), diaryId: doc.id });
					});
					setDiaries(newdiaries);
				}
			},
			(err) => {
				console.log(err);
			}
			);
			return () => {
				unsubscribe3();
			};
		}
	},[following])

	useEffect(()=>{
		if (location !== null) {
			console.log(location);
			const center = [location[2], location[3]];
			diaries.sort((a, b) => {
				const distanceFromA = geofire.distanceBetween(
					[a.location[2], a.location[3]],
					center
				);
				const distanceFromB = geofire.distanceBetween(
					[b.location[2], b.location[3]],
					center
				);
				return distanceFromA - distanceFromB;
			});
		}
		setFilteredDiary(diaries);
	},[location]);

	useEffect(()=>{
		if (sort==='recommand') {
			setFilteredDiary(null);
		}
	},[sort])

	useEffect(() => {
		const q = getLikeListQueue();
		const unsubscribe2 = onSnapshot(q, (snapshot) => {
			if (!snapshot.empty && typeof snapshot.data() !== "undefined") {
				setLikeList(snapshot.data().likeDiaries);
			}
		});
		return () => {
			unsubscribe2();
		};
	}, []);

	async function searchDiaries(species) {
		//console.log(species);
		if (!species.trim()) {
			Alert.alert("Species cannot be blank. Please input a species.");
			return;
		}
		const searchResult = await getDiaryBySpecies(species.trim());
		setFilteredDiary(searchResult);
	}

	function clearSearchContent() {
		setSearch("");
		setFilteredDiary(null);
	}

	return (
		<SafeAreaView style={styles.container}>
			{recommend && (
				<View style={styles.topContainer}>
					<DropdownList options={items} onSelect={setSort} />
					<View style={styles.iconInput}>
						<TextInput
							style={styles.input}
							placeholder="Search a plant"
							value={search}
							autoCapitalize="none"
							onChangeText={(newSearch) => {
								setSearch(newSearch);
							}}
						/>
						{search && (
							<PressableButton
								buttonPressed={() => {
									clearSearchContent();
								}}>
								<MaterialIcons
									name="highlight-remove"
									size={24}
									color="black"
									style={styles.icon}
								/>
							</PressableButton>
						)}
						<PressableButton
							buttonPressed={() => {
								searchDiaries(search);
							}}>
							<MaterialIcons
								name="search"
								size={24}
								color="black"
								style={styles.icon}
							/>
						</PressableButton>
					</View>
				</View>
			)}
			{sort === "location" && (
				<LocationManager
					locationHandler={setLocation}
					screenName={"Home"}
					setLoadingLocation={setLoadingLocation}
				/>
			)}
			{diaries && (
				<View style={styles.diariesContainer}>
				<FlatList
					data={filteredDiary?filteredDiary:diaries}
					keyExtractor={(item) => item.diaryId}
					renderItem={({ item }) => {
						return (
							<Pressable
								onPress={() => navigation.navigate("Gallery", { item: item })}>
								<DiaryCard
									item={item}
									like={likeList && likeList.includes(item.diaryId)}
								/>
							</Pressable>
						);
					}}
				/>
				</View>
			)}
			{isLoading && <View style={styles.indicator}>
				<ActivityIndicator size="small" color="black" />
			</View>}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize:16, 
    padding:12,
    paddingHorizontal: 20,
  },
  iconInput: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginVertical: 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: (Platform.OS === 'android') ? 9 : 0,
  },
  icon: {
    padding: 10,
    paddingRight: 15,
  },
  drop: {
    width: 300,
    fontSize: 18,
    borderRadius: 10,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: 30,
    marginTop: 6,
    zIndex: 10,
    elevation: (Platform.OS === 'android') ? 10 : 0,
  },
  diariesContainer: {
	flex: 1,
  },
  indicator: {
    position: 'absolute', 
    top: 0, left: 0, 
    right: 0, bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
});
