Drop DATABASE  HorizanDB;
Create Database HorizanDB;

Use HorizanDB;

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
  ScoreUpBound int null,
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
use HorizanDB;
drop table SchoolApplication;
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
drop table RankingSource;
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
Select count(*) from SchoolNLP;
Create 
Table SchoolNLP(
  SchoolNLPID int AUTO_INCREMENT primary key not null,
  SchoolID int not null REFERENCES SchoolDetail(SchoolID),
  NLPID int not null REFERSENCES NLPData(NLPID),
  NLPRating float not null
);
use HorizanDB;
alter table SchoolNLP
add constraint Foreign Key (SchoolID) REFERENCES SchoolDetail(SchoolID);
alter table SchoolNLP
add constraint Foreign Key (NLPID) REFERENCES NLPData(NLPID)

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

use HorizanDB;
alter table ImageDetail add column ImageType VarChar(20) not null;
drop table ImageDetail;
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
  UserEmail varChar(100) not null
);

Use HorizanDB;
Create 
Table UserCollege(
  UserSchoolID int AUTO_INCREMENT primary key not null,
  UserID int not null,
  SchoolID int not null,
  MatchPercentage int not null,
  Foreign Key (UserID) REFERENCES UserDetail(UserID),
  Foreign Key (SchoolID) REFERENCES SchoolDetail(SchoolID)
);


use HorizanDB;
alter table UserDetail
add unique (UserEmail);

use HorizanDB;
Create 
Table UserTest(
  UserTestID int AUTO_INCREMENT primary key not null,
  UserID int not null,
  TestID int not null,
  Score int not null,
  EntryDate Date not null default Now(),
  Foreign Key (UserID) REFERENCES UserDetail(UserID),
  Foreign key (TestID) REFERENCES TestDetail(TestID)
);
use HorizanDB;
alter table UserTest add column EntryDate Date not null default Now();

Use HorizanDB;
Drop table CollectionDetail;
Create 
Table CollectionDetail(
  CollectionID int AUTO_INCREMENT primary key not null,
  CollectionName varChar(100) not null,
  CollectionDesc varChar(2000) null
);

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
use HorizanDB;
alter table UserSchoolCollection drop column MatchPercentage;
alter table UserSchoolCollection modify SchoolID int null;
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
  EntryDate date not null default Now(),
  Foreign key (UserID) REFERENCES UserDetail(UserID),
  Foreign Key (ServeyID) REFERENCES ServeyDetail(ServeyID)
);

use HorizanDB;
Create 
Table ServeyDetail(
  ServeyID int AUTO_INCREMENT primary Key not null,
  ServeyName varChar(100) not null
);
Use HorizanDB;
alter table ServeyDetail add column ServeyName varChar(100) not null;
Use HorizanDB;
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
Use HorizanDB;

Create 
Procedure pGetSchool(
  In S_Name VarChar(255),
  Out School_ID Int)
Begin
  Set School_ID = (Select SchoolID 
   From SchoolDetail 
   where SchoolName = S_Name
  );
End;

Create
Procedure pGetMajorRanking(
  In rankingName VarChar(50),
  Out rankingID Int)
Begin
  Set rankingID = (
    Select MajorRankingID
    From MajorRanking
    Where MajorRankingName = rankingName
  );
End;
Use HorizanDB;
Drop Procedure pGetRankingSource;
Create 
Procedure pGetRankingSource(
  In SName Varchar(50),
  Out Source_ID Int)
Begin
  Set Source_ID = (
    Select SourceID
    From RankingSource
    Where SourceName = SName
  );
End;

Create 
Procedure pGetTestDetail(
  In TName VarChar(50),
  Out Test_ID Int)
Begin
  Set Test_ID = (
    Select TestID 
    From TestDetail
    Where TestName = TName
  );
End;

Create 
Procedure pGetTag(
  In TName VarChar(50),
  Out Tag_ID Int)
Begin
  Set Tag_ID = (
    Select TagID
    From Tags
    Where TagName = TName
  );
End;

Create 
Procedure pGetApp(
  In AppName VarChar(50),
  Out AppID Int)
Begin
  Set AppID = (
    Select ApplicationID
    From ApplicationDetail
    Where ApplicationName = AppName
  );
End;

Create 
Procedure pGetTuition(
  In TName VarChar(50),
  In TType VarChar(50),
  Out Tuition_ID Int)
Begin
  Set Tuition_ID = (
    Select TuitionID
    From TuitionDetail
    Where TuitionName = TName
    And TuitionType = TType
  );
End;

use HorizanDB;

Create
Procedure pGetUser(
  In UFName VarChar(20),
  In ULName VarCHar(20),
  In UEmail VarChar(100),
  Out User_ID int
)
Begin 
  Set User_ID = (
    Select UserID 
    From UserDetail
    Where UserFirstName = UFName
    And UserLastName = ULName
    And UserEmail = UEmail
  );
End;

Use HorizanDB;
Create 
Procedure pGetCollection(
  Collection_Name VarChar(100),
  Out Collection_ID int
)
Begin 
  Set Collection_ID = (
    Select CollectionID 
    From CollectionDetail
    Where CollectionName = Collection_Name
  );
End;

Use HorizanDB;
Create 
Procedure pGetServey(
  In Servey_Name VarChar(100),
  Out Servey_ID int 
)
Begin
  Set Servey_ID = (
    Select ServeyID 
    From ServeyDetail
    Where ServeyName = Servey_Name
  );
end;

Use HorizanDB;
Create 
Procedure pGetServeyData(
  In Servey_ID int,
  In NLP_ID int,
  Out Servey_Data_ID int
)
Begin
  Set Servey_Data_ID = (
      Select ServeyDataID
      From ServeyData
      Where ServeyID = Servey_ID 
      and NLPID = NLP_ID
  );
End;

Create 
Procedure pGetNLP(
  In NLP_Category VarChar(20),
  Out NLP_ID int)
Begin
  Set NLP_ID = (
    Select NLPID From NLPData
    Where NLPCategory = NLP_Category
  );
End;

Use HorizanDB;
drop procedure pInsSchoolMajorRankingSource;
Create
Procedure pInsSchoolMajorRankingSource(
  In School_Name VarChar(255),
  In R_Name VarChar(50),
  In Source_Name VarChar(50),
  In Ranking Int
)
Begin
  Declare School_ID Int;
  Declare Ranking_ID Int;
  Declare Source_ID Int;
  
  Call pGetSchool(School_Name, School_ID);
  If School_ID is null 
  then 
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Invalid School name';
  End if;

  Call pGetMajorRanking(R_Name, Ranking_ID);
  If Ranking_ID is null 
  then 
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT =  'Invalid ranking name';
  End if;

  Call pGetRankingSource(Source_Name, Source_ID);
  If Source_ID is null
  then
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Invalid Source name';
  End if;

  START TRANSACTION;
  Insert Into SchoolMajorRankingSource(SchoolID, MajorRankingID, SourceID, MajorRanking)
  Values (School_ID, Ranking_ID, Source_ID, Ranking);
  If @@error_count <> 0
  Then
    Rollback;
  Else 
    Commit;
  End if;
End;


use HorizanDB;
drop table SchoolTest;
Create 
Procedure pInsSchoolTest(
  School_Name VarChar(255),
  Test_Name VarChar(50),
  Score_Up_Bound int,
  Score_Lower_Bound int
)
Begin
  Declare School_ID int;
  Declare Test_ID int;

  Call pGetSchool(School_Name, School_ID);
  If School_ID is null 
  then 
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Invalid School name';
  End if;

  Call pGetTestDetail(Test_Name, Test_ID);
  If Test_ID is null
  then
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Invalid Test name';
  End if;

  START TRANSACTION;
  Insert Into SchoolTest(SchoolID, TestID, ScoreUpBound, ScoreLowerBound)
  Values (School_ID, Test_ID, Score_Up_Bound, Score_Lower_Bound);
  If @@error_count <> 0
  Then
    Rollback;
  Else 
    Commit;
  End if;
End;




Create 
Procedure pInsSchoolTag(
  School_Name VarChar(255),
  Tag_Name VarChar(50)
)
Begin
  Declare School_ID int;
  Declare Tag_ID int;

  Call pGetSchool(School_Name, School_ID);
  If School_ID is null 
  then 
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Invalid School name';
  End if;

  Call pGetTag(Tag_Name, Tag_ID);
  If Tag_ID is null
  then
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Invalid Tag name';
  End if;

  START TRANSACTION;
  Insert Into SchoolTag(SchoolID, TagID)
  Values (School_ID, Tag_ID);
  If @@error_count <> 0
  Then
    Rollback;
  Else 
    Commit;
  End if;
End;
use HorizanDB;
Create 
Procedure pInsSchoolTuition(
  School_Name VarChar(255),
  Tuition_Name VarChar(50),
  Tuition_Type VarChar(50),
  Tuition_Amount int
)
Begin
  Declare School_ID int;
  Declare Tuition_ID int;

  Call pGetSchool(School_Name, School_ID);
  If School_ID is null 
  then 
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Invalid School name';
  End if;

  Call pGetTuition(Tuition_Name, Tuition_Type, Tuition_ID);
  If Tuition_ID is null
  then
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Invalid Tuition name';
  End if;

  START TRANSACTION;
  Insert Into SchoolTuition(SchoolID, TuitionID, TuitionAmount)
  Values (School_ID, Tuition_ID, Tuition_Amount);
  If @@error_count <> 0
  Then
    Rollback;
  Else 
    Commit;
  End if;
End;
use HorizanDB;
drop procedure pInsSchoolApplication;
Create 
Procedure pInsSchoolApplication(
  School_Name VarChar(255),
  Application_Name VarChar(50)
)
Begin
  Declare School_ID int;
  Declare Application_ID int;

  Call pGetSchool(School_Name, School_ID);
  If School_ID is null 
  then 
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Invalid School name';
  End if;

  Call pGetApp(Application_Name, Application_ID);
  If Application_ID is null
  then
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Invalid Application name';
  End if;

  START TRANSACTION;
  Insert Into SchoolApplication(SchoolID, ApplicationID)
  Values (School_ID, Application_ID);
  If @@error_count <> 0
  Then
    Rollback;
  Else 
    Commit;
  End if;
End;




Use HorizanDB;
Create 
Procedure pInsSchoolNLPData(
  School_Name VarChar(255),
  NLP_Category VarChar(20),
  NLP_Rating float
)
Begin
  Declare School_ID int;
  Declare NLP_ID int;

  Call pGetSchool(School_Name, School_ID);
  If School_ID is null
  then
    SIGNAL SQLSTATE '45000'
    Set MESSAGE_TEXT = 'Invalid School name';
  End if;

  Call pGetNLP(NLP_Category, NLP_ID);
  If NLP_ID is null
  then 
    SIGNAL SQLSTATE '45000'
    Set MESSAGE_TEXT = 'Invalid NLP Category';
  End if;

  Start TRANSACTION;
  Insert Into SchoolNLP(SchoolID, NLPID, NLPRating)
  Values (School_ID, NLP_ID, NLP_Rating);
  If @@error_count <> 0
  Then 
    Rollback;
  Else
    Commit;
  End if;
End;

use HorizanDB;
drop view vAllSchoolData;
create
View vAllSchoolData as (
  Select s.SchoolName,  s.SchoolLocation, 
   s.SchoolEnvironment, s.SchoolSize, s.StudentFacultyRatio,
  s.SchoolType, n.NLPCategory, sn.NLPRating,  a.ApplicationName,
  st.TuitionAmount, t.TuitionName, t.TuitionType, ste.ScoreUpBound, ste.ScoreLowerBound,
  te.TestName, sms.MajorRanking, m.MajorRankingName
  from SchoolDetail s 
  join SchoolNLP sn on sn.SchoolID = s.SchoolID
  join NLPData n on n.NLPID = sn.NLPID
  join SchoolApplication sa on s.SchoolID = sa.SchoolID
  join ApplicationDetail a on a.ApplicationID = sa.ApplicationID
  join SchoolTuition st on st.SchoolID = s.SchoolID
  join TuitionDetail t on t.TuitionID = st.TuitionID
  join SchoolTest ste on ste.SchoolID = s.SchoolID
  join TestDetail te on te.TestID = ste.TestID
  join SchoolMajorRankingSource sms on sms.SchoolID = s.SchoolID
  join MajorRanking m on m.MajorRankingID = sms.MajorRankingID
  where t.TuitionName in ('in-state', 'out-state')
);

