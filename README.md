## Plant Diary
#### Team
Wai Kin Chu, Siqi Chen, Zhiyuan Yang

#### App Description
An app that allows plant lovers to record the growth of plants by taking photos week by week. Users can obtain achievements by sharing diaries, extending the length of a diary, getting likes and followers, or publishing a diary of a unique plant species.

### Iteration 1
- CRUD functions with firebase -- Siqi
  - createDiary(diary)
  - editDiary(diaryId, diary)
  - getDiary(diaryId)
  - getDiaries(id)
  - searchDiaries(keyword)
  - createProfile(profile)
  - editProfile(profile)
  - getProfile(id)
  - getFollower(id)
  - getFollowing(id)

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
  - Button
  - Card
  - Grid
  - Icon
  - SearchBar
  - Input
  - GalleryBox
  - Selection
  - ProfileItem
  - DiaryCard

#### Comments
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
- like(diaryId)

Other comments:
- all user id are uid
- change the id to uid in getDiaryByUser(uid), editProfile(uid, ...), getProfileById(uid) ...
- after create a diary, add diaryId in to the diaris list in user's profile.


**Navigation and Screens**
- Add CRUD functions
- Add images and camera function
- How to add multiple images?
- implement the style of screens



#### Iteration 2 