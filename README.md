## Plant Diary
#### Team
Wai Kin Chu, Siqi Chen, Zhiyuan Yang

#### App Description
An app that allows plant lovers to record the growth of plants by taking photos week by week. Users can obtain achievements by sharing diaries, extending the length of a diary, getting likes and followers, or publishing a diary of a unique plant species.

#### Iteration 1
- CRUD functions with firebase -- Siqi
  - createDiary(diary)
  - editDiary(diaryId, diary)
  - getDiary(diaryId)
  - getDiaries(id)
  - searchDiaries(keyword)
  - createProfile(profile)
  - editProfile(id, profile)
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

#### Iteration 2 