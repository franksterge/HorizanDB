
Use HorizanDB;
drop table SchoolDetail
Create
Table SchoolDetail (
  SchoolID int AUTO_INCREMENT primary key not null,
  SchoolName VarChar(255) not null,
  SchoolWebsite VarChar(255) not null,
  PhoneNumber VarChar(14) not null,
  SchoolSize int not null,
  GenderRestriction VarChar(100) not null default 'Co-ed',
  SchoolType VarChar(100) not null,
  SchoolLocation VarChar(100) not null,
  SchoolEnvironment VarChar(100) not null,
  StudentFacultyRatio int not null,
  AcceptanceRate VarChar(4) not null
);

Create 
Table Tags (
  TagID int AUTO_INCREMENT primary key not null,
  TagName VarChar(50) not null,
  TagDesc VarChar(100) not null 
);

Create
Table SchoolTag (
  SchoolTagID int AUTO_INCREMENT primary key not null,
  SchoolID int not null,
  TagID int not null,
  Foreign Key (SchoolID) REFERENCES SchoolDetail(SchoolID),
  Foreign Key (TagID) REFERENCES Tags(TagID)
);

Create
Table TestDetail (
  TestID int AUTO_INCREMENT primary key not null,
  TestName VarChar(50) not null,
  TestDesc VarChar(100) null
);
use HorizanDB;
Create
Table SchoolTest(
  SchoolTestID int AUTO_INCREMENT primary key not null,
  SchoolID int not null,
  TestID int not null,
  ScoreUpperBound int null,
  ScoreLowerBound int not null,
  Foreign Key (SchoolID) REFERENCES SchoolDetail(SchoolID),
  Foreign Key (TestID) REFERENCES TestDetail(TestID)
);
use HorizanDB;

Create 
Table ApplicationDetail (
  ApplicationID int AUTO_INCREMENT primary key not null,
  ApplicationName VarChar(50) not null,
  ApplicationDesc VarChar(100) not null,
  ApplicationLink VarChar(500) not null
);
--TODO: find out how to get date
use HorizanDB;
alter table SchoolApplication 
add DueDate date not null default DATE(concat(Year(now()), "-", "01-01"));
/* drop table SchoolApplication; */
Create
Table SchoolApplication(
  SchoolApplicationID int AUTO_INCREMENT primary key not null,
  SchoolID int not null,
  ApplicationID int not null,
  Foreign Key (SchoolID)REFERENCES SchoolDetail(SchoolID),
  Foreign Key (ApplicationID) REFERENCES ApplicationDetail(ApplicationID)
);


/*
  tuition name: general/in-state/out-state
  tuition type: general/income-specific
*/
Create
Table TuitionDetail (
  TuitionID int AUTO_INCREMENT primary key not null,
  TuitionName VarChar(50) not null, 
  TuitionType VarChar(50) not null, 
  IncomeRangeUpperBound int null,
  IncomeRangeLowerBound int not null default 0
);
use HorizanDB;
Create
Table SchoolTuition(
  SchoolTuitionID int AUTO_INCREMENT primary key not null,
  SchoolID int not null,
  TuitionID int not null,
  TuitionAmount int not null,
  Foreign Key (SchoolID) REFERENCES SchoolDetail(SchoolID),
  Foreign Key (TuitionID) REFERENCES TuitionDetail(TuitionID)
);

Create 
Table MajorRanking(
  MajorRankingID int AUTO_INCREMENT primary key not null,
  MajorRankingName VarChar(50) not null,
  MajorRankingDescription VarChar(100) null
);
use HorizanDB;
/* drop table RankingSource; */
Create
Table RankingSource(
  SourceID int AUTO_INCREMENT primary key not null,
  SourceName VarChar(50) not null,
  SourceLink VarChar(500) not null
);

use HorizanDB;
Create 
Table SchoolMajorRankingSource(
  SchoolMajorRankingSourceID int AUTO_INCREMENT primary key not null,
  SchoolID int not null,
  MajorRankingID int not null,
  SourceID int not null,
  MajorRanking int not null,
  Foreign Key (SchoolID) REFERENCES SchoolDetail(SchoolID),
  Foreign Key (MajorRankingID) REFERENCES MajorRanking(MajorRankingID),
  Foreign Key (SourceID) REFERENCES RankingSource(SourceID)
);


use HorizanDB;
/* Select count(*) from SchoolNLP; */
Create 
Table SchoolNLP(
  SchoolNLPID int AUTO_INCREMENT primary key not null,
  SchoolID int not null,
  NLPID int not null,
  NLPRating float not null,
  Foreign Key (SchoolID) REFERENCES SchoolDetail(SchoolID),
  Foreign Key (NLPID) REFERENCES NLPData(NLPID)
);
use HorizanDB;
/* alter table SchoolNLP
add constraint Foreign Key (SchoolID) REFERENCES SchoolDetail(SchoolID);
alter table SchoolNLP
add constraint Foreign Key (NLPID) REFERENCES NLPData(NLPID) */

Create
Table NLPData(
  NLPID int AUTO_INCREMENT primary key not null,
  NLPCategory VarChar(20) not null
);
use HorizanDB;
Create 
Table ImageDetail(
  ImageID int AUTO_INCREMENT primary key not null,
  ImageName varChar(50) not null,
  ImageType varChar(20) not null,
  ImagePath varChar(2000) not null
);

/* 
alter table ImageDetail add column ImageType VarChar(20) not null;
drop table ImageDetail; */
use HorizanDB;
Create 
Table SchoolImage(
  SchoolImageID int AUTO_INCREMENT primary key not null,
  SchoolID int not null,
  ImageID int not null,
  Foreign key (SchoolID) REFERENCES SchoolDetail(SchoolID),
  Foreign key (ImageID) REFERENCES ImageDetail(ImageID)
);

use HorizanDB;
Create 
Table UserDetail (
  UserID int AUTO_INCREMENT primary key not null,
  UserFirstName varChar(20) not null,
  UserLastName varChar(20) not null,
  UserEmail varChar(100) unique not null
);

Use HorizanDB;
Create 
Table UserCollege(
  UserSchoolID int AUTO_INCREMENT primary key not null,
  UserID int not null,
  SchoolID int not null,
  MatchPercentage int not null,
  EntryDate date not null,
  Foreign Key (UserID) REFERENCES UserDetail(UserID),
  Foreign Key (SchoolID) REFERENCES SchoolDetail(SchoolID)
);
use HorizanDB;
create function fn_GetCurrentDate()
returns date
DETERMINISTIC
begin 
  return curdate();
end;
use HorizanDB;
/* alter table UserDetail
add unique (UserEmail); */

use HorizanDB;
Create 
Table UserTest(
  UserTestID int AUTO_INCREMENT primary key not null,
  UserID int not null,
  TestID int not null,
  Score int not null,
  EntryDate Date not null,
  Foreign Key (UserID) REFERENCES UserDetail(UserID),
  Foreign key (TestID) REFERENCES TestDetail(TestID)
);
use HorizanDB;
/* alter table UserTest add column EntryDate Date not null default Now(); */

Use HorizanDB;
/* Drop table CollectionDetail; */
Create 
Table CollectionDetail(
  CollectionID int AUTO_INCREMENT primary key not null,
  CollectionName varChar(100) not null,
  CollectionDesc varChar(2000) null
);

use HorizanDB;
Create 
Table UserSchoolCollection(
  UserSchoolCollectionID int AUTO_INCREMENT primary key not null,
  UserID int not null,
  SchoolID int null,
  CollectionID int not null,
  Foreign Key (UserID) REFERENCES UserDetail(UserID),
  Foreign key (SchoolID) REFERENCES SchoolDetail(SchoolID),
  Foreign Key (CollectionID) REFERENCES CollectionDetail(CollectionID)
);
/* use HorizanDB;
alter table UserSchoolCollection drop column MatchPercentage;
alter table UserSchoolCollection modify SchoolID int null; */
--delete matchpercentage, change schoolID to null
use HorizanDB;
Create 
Table Tips(
  TipID int AUTO_INCREMENT primary key not null,
  TipTitle varChar(50) not null,
  TipDetail VarChar(2000) not null,
  ImageID int not null,
  Foreign Key (ImageID) REFERENCES ImageDetail(ImageID)
);

Use HorizanDB;
Create 
Table Status(
  StatusID int AUTO_INCREMENT primary key not null,
  StatusName VarChar(10) not null
);

Create 
Table UserApplication(
  UserApplicationID int AUTO_INCREMENT primary key not null,
  UserID int not null,
  SchoolApplicationID int not null,
  StatusID int not null,
  ApplyDate date not null,
  Foreign Key (UserID) REFERENCES UserDetail(UserID),
  Foreign Key (SchoolApplicationID) REFERENCES SchoolApplication(SchoolApplicationID),
  Foreign Key (StatusID) REFERENCES Status(StatusID)
);

Use HorizanDB;
Create 
Table UserServey(
  UserServeyID int AUTO_INCREMENT primary key not null,
  UserID int not null,
  ServeyID int not null,
  EntryDate date not null,
  Foreign key (UserID) REFERENCES UserDetail(UserID),
  Foreign Key (ServeyID) REFERENCES ServeyDetail(ServeyID)
);

use HorizanDB;
Create 
Table ServeyDetail(
  ServeyID int AUTO_INCREMENT primary Key not null,
  ServeyName varChar(100) not null
);
/* Use HorizanDB;
 alter table ServeyDetail add column ServeyName varChar(100) not null;
Use HorizanDB; */
use HorizanDB;
Create
Table ServeyData(
  ServeyDataID int AUTO_INCREMENT primary Key not null,
  ServeyID int not null,
  NLPID int not null,
  Score float not null,
  Foreign key (ServeyID) REFERENCES ServeyDetail(ServeyID),
  Foreign Key (NLPID) REFERENCES NLPData(NLPID)
);
/*
--Create stored procedure to lookup+insert data
*/
