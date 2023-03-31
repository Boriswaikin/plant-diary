## Plant Diary

#### Team

Wai Kin Chu, Siqi Chen, Zhiyuan Yang

#### App Description

An app that allows plant lovers to record the growth of plants by taking photos week by week. Users can obtain achievements by sharing diaries, extending the length of a diary, getting likes and followers, or publishing a diary of a unique plant species.

### Iteration 1

#### Contributed by member:

- CRUD functions with firebase -- Siqi

  - createDiary(diary)
  - deleteDiary(id)
  - editDiary(id, updateField)
  - getDiaryById(id)
  - getDiaryByUser(id)
  - getDiaryQueueByUser(id)
  - getLatestDiariesQueue()
  - getDiaryByLocation(location)
  - getDiaryBySpecies(species)
  - createProfile(usr)
  - editProfile(id,updateField)
  - getProfileById(uid)
  - getProfileByUid(uid)
  - getFollowerByUser(uid)
  - getFollowingByUser(uid)
  - searchDiaries(keyword)

- Navigation and screens -- Zhiyuan

  - AuthStack
    - Start
    - Login
    - Signup
  - AppStack
    - Diaries
      - Recommend
      - Subscribed
    - Create (Edit)
    - Profile
    - Gallery
    - Follow (Following & Follower)
    - EditProfile

- Components -- Wai Kin
  
  - CardComponent
  - Color
  - DiaryCard
  - GalleryBox
  - Grid
  - Icon
  - InputComponent
  - PressableButton
  - SearchBar
  - UserItem
  - UserList

#### Internal Comments for next iteration 

**Components**
DiaryCard:

- params: {diaries} (e.g.[{diaryId:'23uoi9',author:'lesly',species:'bamboo',date:'2023-03-24',location:'Downtown Vancouver',images:['url1','url2'],likes:4}])
- need border for the card
- align center
- no need for head photo? `bold name` + `@location` + `#species` + `story` (limit the text length)
- like button
- press card will navigate to Gallery screen with params {item:diary}
- what if only one image in a diary

GalleryBox:

- params: {images}

Card:

- might need pre-define some styles e.g. border, border-radius, margin, padding

Grid:

- params: {images, width, column}

Icon:

- params: {url, size}
- witdh = height = border-radius = size

InputComponent / SearchBar

- params: {placeholder, value, onChangeText}
- might not be neccesary
- otherwise add some pre-define params

UserItem:

- params: {user} (e.g.{id:'123iou', name:'john', head:'url', following:true})
- show following status, press button to follow or unfollow
- press item go to Profile screen with {userId:id}

UserList:

- no need, detectly use flatlist in follow screen

**CRUD functions**
Add following function:

- followUser(id)
- unfollowUser(id)
- checkRelation(id)
- like(diaryId) (need another table for like)
- unlike(diaryId)
- checkLike(diaryId)
- getSubscribedDiary()

Other comments:

- all user id are uid
- change the id to uid in getDiaryByUser(uid), editProfile(uid, ...), getProfileById(uid) ...
- after create a diary, add diaryId in to the diaris list in user's profile. (may be no need if directly query the diary by uid)

**Navigation and Screens**

- Add CRUD functions (Done)
- Subscribe update in real time
- Add images and camera function
- How to add multiple images?
- implement the style of screens

**Screenshots**

<p float="left">
<img src="./images/start.png"  width="150" />
<img src="./images/login.png"  width="150" />
<img src="./images/signup.png"  width="150" />
</p>
<p float="left">
<img src="./images/recommend.png"  width="150" />
<img src="./images/create.png"  width="150" />
<img src="./images/profile.png"  width="150" />
</p>
<p float="left">
<img src="./images/gallery.png"  width="150" />
<img src="./images/follow.png"  width="150" />
<img src="./images/editprofile.png"  width="150" />
</p>

#### CRUD Demonstration
Create an item by clicking create button in bottomTab:
<p float="left">
<img src="./images/CRUD_Create.png"  width="150" />
</p>
Read an item by clicking the item in HomeScreen:
<p float="left">
<img src="./images/CRUD_Read1.png"  width="150" />
<img src="./images/CRUD_Read2.png"  width="150" />
</p>
Update an item by clicking "Profile" in bottomTab, then click "edit". After updated, click "Confirm"
Back to Home screen to view the update:
<p float="left">
<img src="./images/CRUD_Edit1.png"  width="150" />
<img src="./images/CRUD_Edit2.png"  width="150" />
<img src="./images/CRUD_Edit3.png"  width="150" />
</p>

Delete the item by clicking "Profile" in bottomTab, then click "edit". Click "Delete". Back to Home screen to view the item is deleted:
<p float="left">
<img src="./images/CRUD_Delete1.png"  width="150" />
<img src="./images/CRUD_Delete2.png"  width="150" />
<img src="./images/CRUD_Delete3.png"  width="150" />
</p>



#### Iteration 2
